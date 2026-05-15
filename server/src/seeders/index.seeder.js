const mongoose = require("mongoose");
const Category = require("../model/category.model");
const Product = require("../model/product.model");
require("dotenv").config();

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
const categoryData = [
  {
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    description: "Fresh farm-picked fruits and vegetables delivered daily",
    imageUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
    imagePublicId: "categories/fruits-vegetables",
    isActive: true,
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    description: "Shampoo, soap, skincare, oral care and hygiene products",
    imageUrl: "https://images.unsplash.com/photo-1556228578-567ba127e37f?w=400",
    imagePublicId: "categories/personal-care",
    isActive: true,
  },
  {
    name: "Bakery",
    slug: "bakery",
    description: "Fresh breads, buns, cakes, biscuits and baked goods",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    imagePublicId: "categories/bakery",
    isActive: true,
  },
  {
    name: "Beverages",
    slug: "beverages",
    description: "Juices, soft drinks, water, tea, coffee and energy drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400",
    imagePublicId: "categories/beverages",
    isActive: true,
  },
  {
    name: "Meat & Seafood",
    slug: "meat-seafood",
    description: "Fresh chicken, beef, mutton, fish and seafood cuts",
    imageUrl:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
    imagePublicId: "categories/meat-seafood",
    isActive: true,
  },
  {
    name: "Snacks",
    slug: "snacks",
    description:
      "Chips, crackers, nuts, popcorn and all your favourite munchies",
    imageUrl:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
    imagePublicId: "categories/snacks",
    isActive: true,
  },
  {
    name: "Frozen Foods",
    slug: "frozen-foods",
    description: "Frozen meals, ice cream, vegetables and ready-to-cook items",
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400",
    imagePublicId: "categories/frozen-foods",
    isActive: true,
  },
  {
    name: "Baby Care",
    slug: "baby-care",
    description: "Baby food, diapers, wipes, formula and baby essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    imagePublicId: "categories/baby-care",
    isActive: true,
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    description: "Fresh dairy products, milk, cheese, butter and farm eggs",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    imagePublicId: "categories/dairy-eggs",
    isActive: true,
  },
  {
    name: "Pantry Staples",
    slug: "pantry-staples",
    description: "Rice, lentils, flour, oil, spices and everyday essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    imagePublicId: "categories/pantry-staples",
    isActive: true,
  },
];
// ─────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────
const buildProducts = (catMap) => [
  // ── Bakery ───────────────────────────────────────────────
  {
    name: "Butter Croissant 100g",
    slug: "butter-croissant-100g",
    description: "Flaky and buttery",
    price: 45,
    originalPrice: 50,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
    imagePublicId: "products/butter-croissant",
    category: catMap["bakery"],
    unit: "100g",
    stock: 100,
    rating: 5,
    reviewCount: 12,
    discount: 10,
    isOrganic: false,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Brown Bread 400g",
    slug: "brown-bread-400g",
    description: "Soft and healthy, Ideal for breakfast",
    price: 35,
    originalPrice: 40,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vy1xa7zovcu22smzapzv.png",
    imagePublicId: "products/brown-bread-400g",
    category: catMap["bakery"],
    unit: "400g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 13,
    isOrganic: false,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },

  // ── Pantry Staples ────────────────────────────────────────
  {
    name: "Organic Quinoa 500g",
    slug: "organic-quinoa-500g",
    description: "High protein, Gluten-free",
    price: 420,
    originalPrice: 450,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cxrrgnf12xuhkr4dyhi2.png",
    imagePublicId: "products/organic-quinoa",
    category: catMap["pantry-staples"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: true,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Barley 1kg",
    slug: "barley-1kg",
    description: "Rich in fiber, Helps digestion",
    price: 140,
    originalPrice: 150,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
    imagePublicId: "products/barley-1kg",
    category: catMap["pantry-staples"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Knorr Cup Soup 70g",
    slug: "knorr-cup-soup-70g",
    description: "Convenient and tasty",
    price: 30,
    originalPrice: 35,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vnzb2qbwtpab5gnqvx0f.png",
    imagePublicId: "products/knorr-cup-soup-70g",
    category: catMap["pantry-staples"],
    unit: "70g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 14,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Maggi Noodles 280g",
    slug: "maggi-noodles-280g",
    description: "Instant and easy to cook",
    price: 50,
    originalPrice: 55,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsep7owmwvfrukzbslqo.png",
    imagePublicId: "products/maggi-noodles-280g",
    category: catMap["pantry-staples"],
    unit: "280g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 9,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Brown Rice 1kg",
    slug: "brown-rice-1kg",
    description: "Whole grain and nutritious",
    price: 110,
    originalPrice: 120,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dboutcrkdjhoxcvbbqne.png",
    imagePublicId: "products/brown-rice-1kg",
    category: catMap["pantry-staples"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Basmati Rice 5kg",
    slug: "basmati-rice-5kg",
    description: "Long grain and aromatic, Perfect for biryani",
    price: 520,
    originalPrice: 550,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/evuovl2nlwdjukosfz23.png",
    imagePublicId: "products/basmati-rice-5kg",
    category: catMap["pantry-staples"],
    unit: "5kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 5,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Wheat Flour 5kg",
    slug: "wheat-flour-5kg",
    description: "Soft and fluffy rotis, Rich in nutrients",
    price: 230,
    originalPrice: 250,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ooitbkcjcky0gkjmkatb.png",
    imagePublicId: "products/wheat-flour-5kg",
    category: catMap["pantry-staples"],
    unit: "5kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    isOrganic: false,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },

  // ── Beverages ─────────────────────────────────────────────
  {
    name: "Sprite 1.5L",
    slug: "sprite-1-5l",
    description: "Chilled and refreshing, Perfect for celebrations",
    price: 60,
    originalPrice: 75,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/daiglpvgna1dlhjplbve.png",
    imagePublicId: "products/sprite-1-5l",
    category: catMap["beverages"],
    unit: "1.5L",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 20,
    isOrganic: false,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Coca-Cola 1.5L",
    slug: "coca-cola-1-5l",
    description: "Perfect for parties and gatherings, Best served chilled",
    price: 75,
    originalPrice: 80,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/eljxcdud6fduwfim5rdx.png",
    imagePublicId: "products/coca-cola-1-5l",
    category: catMap["beverages"],
    unit: "1.5L",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "7 Up 1.5L",
    slug: "7-up-1-5l",
    description: "Refreshing lemon-lime flavor",
    price: 70,
    originalPrice: 76,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/qt1ypzsoqni12ghf2ryp.png",
    imagePublicId: "products/7-up-1-5l",
    category: catMap["beverages"],
    unit: "1.5L",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Fanta 1.5L",
    slug: "fanta-1-5l",
    description: "Sweet and fizzy",
    price: 65,
    originalPrice: 70,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/nexecd3mgyzrpeun1bee.png",
    imagePublicId: "products/fanta-1-5l",
    category: catMap["beverages"],
    unit: "1.5L",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },

  // ── Fruits & Vegetables ───────────────────────────────────
  {
    name: "Carrot 500g",
    slug: "carrot-500g",
    description:
      "Sweet and crunchy, Good for eyesight, Ideal for juices and salads",
    price: 44,
    originalPrice: 50,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ceqgisupuizyste9aifg.png",
    imagePublicId: "products/carrot-500g",
    category: catMap["fruits-vegetables"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 12,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Spinach 500g",
    slug: "spinach-500g",
    description: "Rich in iron, High in vitamins, Perfect for soups and salads",
    price: 15,
    originalPrice: 18,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/bhrtl76sscvmeiq4kchm.png",
    imagePublicId: "products/spinach-500g",
    category: catMap["fruits-vegetables"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 17,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Onion 500g",
    slug: "onion-500g",
    description: "Fresh and pungent, Perfect for cooking, A kitchen staple",
    price: 45,
    originalPrice: 50,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/wnvtwlm2tphqburhsmyc.png",
    imagePublicId: "products/onion-500g",
    category: catMap["fruits-vegetables"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Orange 1 kg",
    slug: "orange-1kg",
    description:
      "Juicy and sweet, Rich in Vitamin C, Perfect for juices and salads",
    price: 75,
    originalPrice: 80,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/r1wxfortw5h12g7egx7k.png",
    imagePublicId: "products/orange-1kg",
    category: catMap["fruits-vegetables"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Banana 1 kg",
    slug: "banana-1kg",
    description:
      "Sweet and ripe, High in potassium, Great for smoothies and snacking",
    price: 45,
    originalPrice: 50,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/dsnmko6gqtyw31okby80.png",
    imagePublicId: "products/banana-1kg",
    category: catMap["fruits-vegetables"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Mango 1 kg",
    slug: "mango-1kg",
    description:
      "Sweet and flavorful, Perfect for smoothies and desserts, Rich in Vitamin A",
    price: 140,
    originalPrice: 150,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/nb1mpxuo4fdcik6ey5yj.png",
    imagePublicId: "products/mango-1kg",
    category: catMap["fruits-vegetables"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: false,
    isPopular: false,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Grapes 500g",
    slug: "grapes-500g",
    description:
      "Fresh and juicy, Rich in antioxidants, Perfect for snacking and fruit salads",
    price: 65,
    originalPrice: 70,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/jsmb7caaokhnyci2coga.png",
    imagePublicId: "products/grapes-500g",
    category: catMap["fruits-vegetables"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Tomato 1 kg",
    slug: "tomato-1kg",
    description:
      "Juicy and ripe, Rich in Vitamin C, Perfect for salads and sauces, Farm fresh quality",
    price: 28,
    originalPrice: 30,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/kdbfytxisrjymgy0ubhk.png",
    imagePublicId: "products/tomato-1kg",
    category: catMap["fruits-vegetables"],
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Potato 500g",
    slug: "potato-500g",
    description:
      "Fresh and organic, Rich in carbohydrates, Ideal for curries and fries",
    price: 35,
    originalPrice: 40,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/tzibj2ntsnbn4e0u5kwv.png",
    imagePublicId: "products/potato-500g",
    category: catMap["fruits-vegetables"],
    unit: "500g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 13,
    isOrganic: true,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Apple 1 kg",
    slug: "apple-1kg",
    description: "Boosts immunity, Rich in fiber",
    price: 90,
    originalPrice: 100,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/pjt1y6xdo46tluemhf0o.png",
    imagePublicId: "products/apple-1-1kg",
    category: catMap["fruits-vegetables"], // ← was: catMap (broken)
    unit: "1kg",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 10,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },

  // ── Dairy & Eggs ──────────────────────────────────────────
  {
    name: "Eggs 12 pcs",
    slug: "eggs-12-pcs",
    description: "Farm fresh, Rich in protein, Ideal for breakfast and baking",
    price: 85,
    originalPrice: 90,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/cnjrpbcnqesqxy1wr30g.png",
    imagePublicId: "products/eggs-12-pcs",
    category: catMap["dairy-eggs"],
    unit: "12pcs",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Paneer 200g",
    slug: "paneer-200g",
    description:
      "Soft and fresh, Rich in protein, Ideal for curries and snacks",
    price: 85,
    originalPrice: 90,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/vihqr6wquv57byurvz46.png",
    imagePublicId: "products/paneer-200g",
    category: catMap["dairy-eggs"],
    unit: "200g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 6,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Cheese 200g",
    slug: "cheese-200g",
    description:
      "Creamy and delicious, Perfect for pizzas and sandwiches, Rich in calcium",
    price: 130,
    originalPrice: 140,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/gek3mmiig3lixlkpxks8.png",
    imagePublicId: "products/cheese-200g",
    category: catMap["dairy-eggs"],
    unit: "200g",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 7,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
  {
    name: "Amul Milk 1L",
    slug: "amul-milk-1l",
    description: "Fresh milk, Rich in calcium",
    price: 55,
    originalPrice: 60,
    imageUrl:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/ooamzy497lhsj2gjuwby.png",
    imagePublicId: "products/amul-milk-1l",
    category: catMap["dairy-eggs"], // ← was: "dairy-eggs" string
    unit: "1L",
    stock: 100,
    rating: 4.5,
    reviewCount: 12,
    discount: 8,
    isOrganic: false,
    isPopular: true,
    isNew: false,
    isTrending: true,
  },
];
// ─────────────────────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // ── 1. Clear existing data ──────────────────────────────
    await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    console.log("🗑️  Cleared existing products and categories\n");

    // ── 2. Insert categories ────────────────────────────────
    const insertedCategories = await Category.insertMany(categoryData);
    console.log(`📦 Seeded ${insertedCategories.length} categories:`);
    insertedCategories.forEach((c) =>
      console.log(`   • ${c.name.padEnd(24)} slug: ${c.slug}`),
    );

    // ── 3. Build catMap: slug → ObjectId ────────────────────
    const catMap = {};
    insertedCategories.forEach((c) => {
      catMap[c.slug] = c._id;
    });

    // ── 4. Insert products ──────────────────────────────────
    const products = buildProducts(catMap);
    const insertedProducts = await Product.insertMany(products);

    // Count per category
    const countMap = {};
    insertedProducts.forEach((p) => {
      const catSlug = Object.keys(catMap).find(
        (k) => catMap[k].toString() === p.category.toString(),
      );
      countMap[catSlug] = (countMap[catSlug] || 0) + 1;
    });

    console.log(`\n🛒 Seeded ${insertedProducts.length} products:`);
    Object.entries(countMap).forEach(([slug, count]) =>
      console.log(`   • ${slug.padEnd(28)} ${count} products`),
    );

    console.log("\n✅ Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();
