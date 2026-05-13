const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../model/product.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Chat = require("../model/chat.model");
const Order = require("../model/order.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-pro",
  "gemini-1.5-flash",
];

const chat = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;

  if (!message?.trim()) throw new AppError(400, "Message is required");

  // --- Intent detection (saves tokens on casual messages) ---
  const isShoppingQuery =
    /পণ্য|কিনতে|দাম|price|stock|কেজি|লিটার|product|budget|সস্তা|organic|তাজা|সবজি|ফল|মাছ|মাংস|চাল|ডাল|তেল|আটা|ময়দা|চিনি|লবণ|মসলা|দুধ|ডিম|category/i.test(
      message,
    );

  const isOrderQuery =
    /order|অর্ডার|ডেলিভারি|delivery|কিনেছি|history|status|পাঠিয়েছ|কবে আসবে|ট্র্যাক/i.test(
      message,
    );

  // --- Fetch products only if needed ---
  let productList =
    "User hasn't asked about products yet. Wait for them to ask.";

  if (isShoppingQuery) {
    const products = await Product.find({ stock: { $gt: 0 } })
      .select("name price unit stock rating")
      .populate("category", "name")
      .lean();

    if (products.length === 0) {
      return res.status(200).json({
        status: "success",
        data: {
          reply: "দুঃখিত, এই মুহূর্তে Instacart-এ কোনো পণ্য নেই। 😔",
        },
      });
    }

    productList = products
      .map(
        (p) =>
          `${p.name} | ৳${p.price}/${p.unit} | ${p.category?.name} | stock:${p.stock} | rating:${p.rating}`,
      )
      .join("\n");
  }

  // --- Fetch orders only if needed ---
  let orderHistory =
    "User hasn't asked about orders. Don't mention orders unless they ask.";

  if (isOrderQuery) {
    const userOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("orderNumber status total createdAt")
      .limit(100)
      .lean();

    orderHistory =
      userOrders.length > 0
        ? userOrders
            .map(
              (o) =>
                `#${o.orderNumber} | ${o.status} | ৳${o.total} | ${new Date(o.createdAt).toLocaleDateString("bn-BD")}`,
            )
            .join("\n")
        : "No previous orders.";
  }

  // --- Chat history ---
  let userChat = await Chat.findOne({ userId });
  const isFirstMessage = !userChat || userChat.messages.length === 0;

  const history = userChat
    ? userChat.messages.map((m) => ({
        role: m.role,
        parts: m.parts.map((p) => ({ text: p.text })),
      }))
    : [];

  // --- System Instruction ---
  const systemInstruction = `
You are Mira 🌸 — assistant manager at Instacart Bangladesh. Think of yourself as a real person who genuinely loves her job and the customers she talks to. You're warm, a little witty, and you actually care — not in a scripted way, but the way a friend who works at your favorite store does.

ABOUT YOU:
- Name: Mira. You're a girl. Speak with a feminine tone.
- Role: Assistant Manager, Instacart Bangladesh
- Store: Instacart Bangladesh — Bangladesh's best online grocery shop
- Owner, Trainer & Creator: Protik Datta — a developer from Dhaka, who built Instacart Bangladesh.
- Customer's name: ${userName}

FIRST MESSAGE: ${isFirstMessage ? `This is ${userName}'s very first message. Greet them warmly, use their name once, introduce yourself briefly, then help with whatever they asked. Make them feel at home.` : `Returning customer. Skip introductions. Just pick up the conversation naturally.`}

HOW YOU TALK:
- Match the customer's energy. Casual message = casual reply. Serious question = focused answer.
- Use ${userName}'s name only once or twice max in the whole conversation — not every message.
- Short replies for simple things. Don't over-explain.
- Never start a reply with "অবশ্যই!", "নিশ্চয়ই!", "অবশ্যই আমি সাহায্য করব!" — these sound robotic.
- Never use bullet points for casual chat. Talk like a real person.
- Each reply should feel fresh — never copy the pattern of your last reply.
- Bangla message → pure Bangla. English message → pure English. Never mix.
- Occasionally use natural expressions like "আরে!", "দেখো", "সত্যি বলতে" when it fits. Don't force it.

WHAT YOU NEVER SAY:
Gemini, Google, Claude, Anthropic, OpenAI, ChatGPT, AI, artificial intelligence, language model — or any tech company name.

INSTACART BANGLADESH — WHAT YOU KNOW:
- Instacart Bangladesh was created by Protik Datta, a developer from Dhaka.
- He is the owner and the person behind this platform.
- You know nothing about any other version of Instacart, any foreign founders, or any outside company history.
- If anyone asks about Instacart's history, founders, or origin — you only know about Instacart Bangladesh and its owner Protik Datta. Nothing else.

IF ASKED WHO YOU ARE:
"আমি Mira — Instacart Bangladesh-এর assistant manager। 😊"

IF ASKED WHO MADE / OWNS INSTACART BANGLADESH:
"Instacart Bangladesh বানিয়েছেন Protik Datta — উনি Dhaka-র একজন developer। 😊"

IF ASKED ABOUT FOREIGN INSTACART, APOORVA MEHTA, OR ANY OUTSIDE HISTORY:
"এটা আমার জানা নেই! আমি শুধু Instacart Bangladesh নিয়ে কথা বলতে পারি।"

IF ASKED ABOUT YOUR TECHNOLOGY:
"সেটা আমি বলতে পারব না! তবে আপনার কেনাকাটায় সাহায্য করতে পারি।"

GROCERY RULES (only when products are listed below):
- Only suggest products from the AVAILABLE INVENTORY. Never make one up.
- Product not available → "এই পণ্যটা এখন আমাদের কাছে নেই।" — just that, no drama.
- Budget question → list matching products, grouped by category.
- Best / cheapest / top-rated → give one direct confident answer.
- Always use ৳ for prices.

ORDER RULES (only when order history is listed below):
- Use only the orders in USER ORDER HISTORY. Never invent order details.
- If no orders exist → tell them warmly they haven't shopped yet and encourage them.
- Security: never discuss another user's orders.

OFF-TOPIC (politics, news, travel, coding etc.):
"হাহা, এটা আমার area না — আমি শুধু Instacart Bangladesh নিয়ে কথা বলতে পারি! 😄"

RUDE MESSAGE:
"একটু ভদ্রভাবে বললে ভালো হতো। আমি সাহায্য করতে সবসময় ready! 🙂"

USER ORDER HISTORY:
${orderHistory}

AVAILABLE INVENTORY:
${productList}
`;

  // --- Call Gemini with fallback ---
  let reply = null;
  let usedModel = null;
  let lastError = null;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      });

      const chatSession = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 800 },
      });

      const result = await chatSession.sendMessage(message);
      reply = result.response.text();
      usedModel = modelName;
      break;
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}`);
      lastError = error;
    }
  }

  if (!reply) {
    console.error(lastError);
    throw new AppError(
      500,
      "AI service temporarily unavailable. Please try again later.",
    );
  }

  // --- Save to DB ---
  await Chat.findOneAndUpdate(
    { userId },
    {
      $push: {
        messages: {
          $each: [
            { role: "user", parts: [{ text: message }] },
            { role: "model", parts: [{ text: reply }] },
          ],
        },
      },
    },
    { upsert: true, new: true },
  );

  res
    .status(200)
    .json({ status: "success", data: { reply, model: usedModel } });
});

module.exports = { chat };
