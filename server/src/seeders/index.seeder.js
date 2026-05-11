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
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    description: "Fresh dairy products, milk, cheese, butter and farm eggs",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    imagePublicId: "categories/dairy-eggs",
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
    name: "Pantry Staples",
    slug: "pantry-staples",
    description: "Rice, lentils, flour, oil, spices and everyday essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    imagePublicId: "categories/pantry-staples",
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
    name: "Meat & Seafood",
    slug: "meat-seafood",
    description: "Fresh chicken, beef, mutton, fish and seafood cuts",
    imageUrl:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
    imagePublicId: "categories/meat-seafood",
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
    name: "Personal Care",
    slug: "personal-care",
    description: "Shampoo, soap, skincare, oral care and hygiene products",
    imageUrl: "https://images.unsplash.com/photo-1556228578-567ba127e37f?w=400",
    imagePublicId: "categories/personal-care",
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
];

// ─────────────────────────────────────────────────────────────
// PRODUCTS  (catMap: name → ObjectId)
// ─────────────────────────────────────────────────────────────
const buildProducts = (catMap) => [
  // ── Fruits & Vegetables (8) ───────────────────────────────
  {
    name: "Orange 1 kg",
    slug: "orange-1-kg",
    description:
      "Sweet and juicy Nagpur oranges, rich in Vitamin C and antioxidants",
    price: 75,
    originalPrice: 90,
    unit: "1kg",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
    imagePublicId: "products/orange-1kg",
    category: catMap["Fruits & Vegetables"],
    stock: 120,
    rating: 4.5,
    reviewCount: 38,
    isOrganic: true,
    isPopular: true,
  },
  {
    name: "Banana Dozen",
    slug: "banana-dozen",
    description:
      "Ripe and fresh Cavendish bananas, perfect for snacking and smoothies",
    price: 45,
    originalPrice: 55,
    unit: "12pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
    imagePublicId: "products/banana-dozen",
    category: catMap["Fruits & Vegetables"],
    stock: 200,
    rating: 4.3,
    reviewCount: 52,
    isOrganic: true,
    isPopular: true,
  },
  {
    name: "Potato 500g",
    slug: "potato-500g",
    description: "Fresh farm potatoes, ideal for curries, fries and stews",
    price: 35,
    originalPrice: 40,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
    imagePublicId: "products/potato-500g",
    category: catMap["Fruits & Vegetables"],
    stock: 300,
    rating: 4.2,
    reviewCount: 29,
    isTrending: true,
  },
  {
    name: "Tomato 500g",
    slug: "tomato-500g",
    description: "Fresh red tomatoes, great for salads, curries and sauces",
    price: 30,
    originalPrice: 38,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
    imagePublicId: "products/tomato-500g",
    category: catMap["Fruits & Vegetables"],
    stock: 180,
    rating: 4.1,
    reviewCount: 21,
    isOrganic: true,
  },
  {
    name: "Spinach 250g",
    slug: "spinach-250g",
    description:
      "Tender organic spinach leaves, packed with iron and essential nutrients",
    price: 25,
    originalPrice: 30,
    unit: "250g",
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
    imagePublicId: "products/spinach-250g",
    category: catMap["Fruits & Vegetables"],
    stock: 90,
    rating: 4.4,
    reviewCount: 17,
    isOrganic: true,
    isNewArrival: true,
  },
  {
    name: "Apple 1kg",
    slug: "apple-1kg",
    description: "Crisp and sweet Shimla apples, hand-picked from the hills",
    price: 160,
    originalPrice: 190,
    unit: "1kg",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    imagePublicId: "products/apple-1kg",
    category: catMap["Fruits & Vegetables"],
    stock: 100,
    rating: 4.6,
    reviewCount: 61,
    isOrganic: true,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Carrot 500g",
    slug: "carrot-500g",
    description:
      "Crunchy fresh carrots, rich in beta-carotene and great for juicing",
    price: 40,
    originalPrice: 50,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
    imagePublicId: "products/carrot-500g",
    category: catMap["Fruits & Vegetables"],
    stock: 150,
    rating: 4.3,
    reviewCount: 24,
    isOrganic: true,
  },
  {
    name: "Watermelon 1pc",
    slug: "watermelon-1pc",
    description: "Juicy whole watermelon, sweet and refreshing for summer",
    price: 120,
    originalPrice: 150,
    unit: "1pc (~3kg)",
    imageUrl: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400",
    imagePublicId: "products/watermelon-1pc",
    category: catMap["Fruits & Vegetables"],
    stock: 60,
    rating: 4.5,
    reviewCount: 33,
    isTrending: true,
    isNewArrival: true,
  },

  // ── Dairy & Eggs (6) ──────────────────────────────────────
  {
    name: "Full Cream Milk 1L",
    slug: "full-cream-milk-1l",
    description:
      "Fresh pasteurized full cream milk, rich in calcium and protein",
    price: 60,
    originalPrice: 65,
    unit: "1L",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    imagePublicId: "products/milk-1l",
    category: catMap["Dairy & Eggs"],
    stock: 150,
    rating: 4.6,
    reviewCount: 84,
    isPopular: true,
  },
  {
    name: "Farm Eggs 12pcs",
    slug: "farm-eggs-12pcs",
    description: "Free-range farm fresh eggs, high in protein and omega-3",
    price: 90,
    originalPrice: 105,
    unit: "12pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
    imagePublicId: "products/eggs-12pcs",
    category: catMap["Dairy & Eggs"],
    stock: 200,
    rating: 4.5,
    reviewCount: 63,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Amul Butter 500g",
    slug: "amul-butter-500g",
    description:
      "Creamy salted butter made from fresh cream, perfect for baking",
    price: 240,
    originalPrice: 260,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
    imagePublicId: "products/amul-butter-500g",
    category: catMap["Dairy & Eggs"],
    stock: 80,
    rating: 4.7,
    reviewCount: 45,
    isPopular: true,
  },
  {
    name: "Paneer 200g",
    slug: "paneer-200g",
    description:
      "Fresh homestyle paneer (cottage cheese), soft and creamy texture",
    price: 85,
    originalPrice: 100,
    unit: "200g",
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    imagePublicId: "products/paneer-200g",
    category: catMap["Dairy & Eggs"],
    stock: 60,
    rating: 4.3,
    reviewCount: 31,
    isNewArrival: true,
  },
  {
    name: "Greek Yoghurt 400g",
    slug: "greek-yoghurt-400g",
    description: "Thick and creamy Greek yoghurt, high protein, low fat",
    price: 110,
    originalPrice: 130,
    unit: "400g",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    imagePublicId: "products/greek-yoghurt-400g",
    category: catMap["Dairy & Eggs"],
    stock: 70,
    rating: 4.5,
    reviewCount: 28,
    isTrending: true,
  },
  {
    name: "Cheddar Cheese 200g",
    slug: "cheddar-cheese-200g",
    description: "Aged cheddar cheese block, sharp and flavourful",
    price: 195,
    originalPrice: 220,
    unit: "200g",
    imageUrl:
      "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400",
    imagePublicId: "products/cheddar-200g",
    category: catMap["Dairy & Eggs"],
    stock: 45,
    rating: 4.4,
    reviewCount: 19,
    isNewArrival: true,
  },

  // ── Beverages (6) ─────────────────────────────────────────
  {
    name: "Coca-Cola 1.5L",
    slug: "coca-cola-1-5l",
    description: "The original refreshing cola drink everyone loves",
    price: 75,
    originalPrice: 80,
    unit: "1.5L",
    imageUrl:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
    imagePublicId: "products/coca-cola-1-5l",
    category: catMap["Beverages"],
    stock: 250,
    rating: 4.5,
    reviewCount: 120,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Tropicana Orange Juice 1L",
    slug: "tropicana-orange-juice-1l",
    description:
      "100% pure squeezed orange juice with no added sugar or preservatives",
    price: 110,
    originalPrice: 130,
    unit: "1L",
    imageUrl:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    imagePublicId: "products/tropicana-oj-1l",
    category: catMap["Beverages"],
    stock: 100,
    rating: 4.4,
    reviewCount: 47,
    isNewArrival: true,
  },
  {
    name: "Green Tea 25 Bags",
    slug: "green-tea-25-bags",
    description:
      "Premium Darjeeling green tea bags, antioxidant rich and calming",
    price: 95,
    originalPrice: 110,
    unit: "25 bags",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    imagePublicId: "products/green-tea-25bags",
    category: catMap["Beverages"],
    stock: 130,
    rating: 4.6,
    reviewCount: 58,
    isOrganic: true,
    isTrending: true,
  },
  {
    name: "Minute Maid Mango 1L",
    slug: "minute-maid-mango-1l",
    description: "Chilled mango nectar drink bursting with tropical flavour",
    price: 85,
    originalPrice: 95,
    unit: "1L",
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    imagePublicId: "products/minute-maid-mango-1l",
    category: catMap["Beverages"],
    stock: 90,
    rating: 4.2,
    reviewCount: 36,
    isPopular: true,
  },
  {
    name: "Red Bull Energy Drink 250ml",
    slug: "red-bull-250ml",
    description: "Original energy drink with caffeine, taurine and B-vitamins",
    price: 125,
    originalPrice: 140,
    unit: "250ml",
    imageUrl:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400",
    imagePublicId: "products/red-bull-250ml",
    category: catMap["Beverages"],
    stock: 180,
    rating: 4.3,
    reviewCount: 72,
    isTrending: true,
  },
  {
    name: "Mineral Water 1L",
    slug: "mineral-water-1l",
    description: "Pure natural mineral water from Himalayan springs",
    price: 20,
    originalPrice: 25,
    unit: "1L",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    imagePublicId: "products/mineral-water-1l",
    category: catMap["Beverages"],
    stock: 500,
    rating: 4.0,
    reviewCount: 44,
    isPopular: true,
  },

  // ── Pantry Staples (7) ────────────────────────────────────
  {
    name: "Basmati Rice 5kg",
    slug: "basmati-rice-5kg",
    description:
      "Extra long grain aged basmati rice, aromatic and perfectly fluffy",
    price: 480,
    originalPrice: 520,
    unit: "5kg",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    imagePublicId: "products/basmati-rice-5kg",
    category: catMap["Pantry Staples"],
    stock: 90,
    rating: 4.7,
    reviewCount: 93,
    isPopular: true,
  },
  {
    name: "Toor Dal 1kg",
    slug: "toor-dal-1kg",
    description:
      "Premium quality toor (pigeon pea) lentils, protein-packed and easy to cook",
    price: 130,
    originalPrice: 150,
    unit: "1kg",
    imageUrl:
      "https://images.unsplash.com/photo-1585996162688-b5e01f5ea6e7?w=400",
    imagePublicId: "products/toor-dal-1kg",
    category: catMap["Pantry Staples"],
    stock: 140,
    rating: 4.4,
    reviewCount: 36,
    isOrganic: true,
  },
  {
    name: "Sunflower Oil 1L",
    slug: "sunflower-oil-1l",
    description:
      "Refined sunflower oil, light and heart-healthy for everyday cooking",
    price: 145,
    originalPrice: 160,
    unit: "1L",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    imagePublicId: "products/sunflower-oil-1l",
    category: catMap["Pantry Staples"],
    stock: 110,
    rating: 4.2,
    reviewCount: 28,
  },
  {
    name: "Maggi Noodles 280g",
    slug: "maggi-noodles-280g",
    description:
      "The original 2-minute instant noodles, a timeless household favourite",
    price: 40,
    originalPrice: 55,
    unit: "280g",
    imageUrl:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400",
    imagePublicId: "products/maggi-280g",
    category: catMap["Pantry Staples"],
    stock: 300,
    rating: 4.5,
    reviewCount: 112,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Turmeric Powder 200g",
    slug: "turmeric-powder-200g",
    description:
      "Pure and vibrant turmeric powder, anti-inflammatory and aromatic",
    price: 55,
    originalPrice: 65,
    unit: "200g",
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
    imagePublicId: "products/turmeric-200g",
    category: catMap["Pantry Staples"],
    stock: 200,
    rating: 4.5,
    reviewCount: 41,
    isOrganic: true,
  },
  {
    name: "Whole Wheat Flour 5kg",
    slug: "whole-wheat-flour-5kg",
    description:
      "Stone-ground whole wheat atta, rich in fibre for healthy rotis",
    price: 260,
    originalPrice: 290,
    unit: "5kg",
    imageUrl:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    imagePublicId: "products/wheat-flour-5kg",
    category: catMap["Pantry Staples"],
    stock: 120,
    rating: 4.3,
    reviewCount: 55,
    isPopular: true,
  },
  {
    name: "Mustard Oil 1L",
    slug: "mustard-oil-1l",
    description:
      "Cold-pressed kachi ghani mustard oil, pungent and traditionally flavourful",
    price: 160,
    originalPrice: 180,
    unit: "1L",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    imagePublicId: "products/mustard-oil-1l",
    category: catMap["Pantry Staples"],
    stock: 85,
    rating: 4.4,
    reviewCount: 32,
    isOrganic: true,
  },

  // ── Bakery (5) ────────────────────────────────────────────
  {
    name: "Whole Wheat Bread 400g",
    slug: "whole-wheat-bread-400g",
    description:
      "Soft whole wheat sandwich bread with zero maida, baked fresh daily",
    price: 50,
    originalPrice: 58,
    unit: "400g loaf",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    imagePublicId: "products/whole-wheat-bread",
    category: catMap["Bakery"],
    stock: 70,
    rating: 4.3,
    reviewCount: 41,
    isPopular: true,
  },
  {
    name: "Butter Croissant 4pcs",
    slug: "butter-croissant-4pcs",
    description: "Flaky golden butter croissants baked fresh every morning",
    price: 120,
    originalPrice: 140,
    unit: "4pcs",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    imagePublicId: "products/butter-croissant-4pcs",
    category: catMap["Bakery"],
    stock: 40,
    rating: 4.6,
    reviewCount: 33,
    isNewArrival: true,
    isTrending: true,
  },
  {
    name: "Chocolate Muffin 2pcs",
    slug: "chocolate-muffin-2pcs",
    description: "Moist double chocolate muffins with a gooey centre",
    price: 80,
    originalPrice: 95,
    unit: "2pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
    imagePublicId: "products/choco-muffin-2pcs",
    category: catMap["Bakery"],
    stock: 55,
    rating: 4.5,
    reviewCount: 27,
    isTrending: true,
  },
  {
    name: "Multigrain Biscuits 200g",
    slug: "multigrain-biscuits-200g",
    description: "Crunchy multigrain biscuits loaded with seeds and oats",
    price: 65,
    originalPrice: 75,
    unit: "200g",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    imagePublicId: "products/multigrain-biscuits",
    category: catMap["Bakery"],
    stock: 90,
    rating: 4.2,
    reviewCount: 18,
    isOrganic: true,
  },
  {
    name: "Sourdough Loaf 500g",
    slug: "sourdough-loaf-500g",
    description: "Artisan sourdough loaf with a crispy crust and chewy crumb",
    price: 180,
    originalPrice: 210,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400",
    imagePublicId: "products/sourdough-500g",
    category: catMap["Bakery"],
    stock: 30,
    rating: 4.8,
    reviewCount: 22,
    isNewArrival: true,
    isPopular: true,
  },

  // ── Snacks (6) ────────────────────────────────────────────
  {
    name: "Lay's Classic Salted 100g",
    slug: "lays-classic-salted-100g",
    description:
      "Crispy light potato chips with a perfect classic salted flavour",
    price: 30,
    originalPrice: 35,
    unit: "100g",
    imageUrl:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
    imagePublicId: "products/lays-100g",
    category: catMap["Snacks"],
    stock: 400,
    rating: 4.4,
    reviewCount: 156,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Mixed Nuts 200g",
    slug: "mixed-nuts-200g",
    description:
      "Premium roasted mixed nuts — cashews, almonds, walnuts and pistachios",
    price: 220,
    originalPrice: 260,
    unit: "200g",
    imageUrl:
      "https://images.unsplash.com/photo-1563412580953-b0a9a1b8f15a?w=400",
    imagePublicId: "products/mixed-nuts-200g",
    category: catMap["Snacks"],
    stock: 80,
    rating: 4.7,
    reviewCount: 68,
    isOrganic: true,
  },
  {
    name: "Digestive Biscuits 400g",
    slug: "digestive-biscuits-400g",
    description:
      "Classic wholemeal digestive biscuits, great with tea or coffee",
    price: 85,
    originalPrice: 95,
    unit: "400g",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    imagePublicId: "products/digestive-400g",
    category: catMap["Snacks"],
    stock: 160,
    rating: 4.2,
    reviewCount: 44,
    isPopular: true,
  },
  {
    name: "Popcorn Butter 150g",
    slug: "popcorn-butter-150g",
    description:
      "Light and fluffy microwave butter popcorn, cinema-style at home",
    price: 60,
    originalPrice: 70,
    unit: "150g",
    imageUrl:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400",
    imagePublicId: "products/popcorn-butter-150g",
    category: catMap["Snacks"],
    stock: 200,
    rating: 4.3,
    reviewCount: 52,
    isTrending: true,
  },
  {
    name: "Dark Chocolate 90g",
    slug: "dark-chocolate-90g",
    description: "70% cocoa dark chocolate, rich and intense with antioxidants",
    price: 150,
    originalPrice: 175,
    unit: "90g",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400",
    imagePublicId: "products/dark-choco-90g",
    category: catMap["Snacks"],
    stock: 110,
    rating: 4.6,
    reviewCount: 39,
    isNewArrival: true,
  },
  {
    name: "Trail Mix 250g",
    slug: "trail-mix-250g",
    description:
      "Energy-boosting trail mix with dried fruits, seeds and dark chocolate chips",
    price: 190,
    originalPrice: 220,
    unit: "250g",
    imageUrl:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400",
    imagePublicId: "products/trail-mix-250g",
    category: catMap["Snacks"],
    stock: 75,
    rating: 4.5,
    reviewCount: 26,
    isOrganic: true,
    isNewArrival: true,
  },

  // ── Meat & Seafood (5) ────────────────────────────────────
  {
    name: "Chicken Breast 500g",
    slug: "chicken-breast-500g",
    description:
      "Boneless skinless chicken breast, fresh and lean, ideal for grilling",
    price: 180,
    originalPrice: 210,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=400",
    imagePublicId: "products/chicken-breast-500g",
    category: catMap["Meat & Seafood"],
    stock: 80,
    rating: 4.5,
    reviewCount: 47,
    isPopular: true,
  },
  {
    name: "Salmon Fillet 300g",
    slug: "salmon-fillet-300g",
    description: "Fresh Atlantic salmon fillet, rich in omega-3 fatty acids",
    price: 380,
    originalPrice: 430,
    unit: "300g",
    imageUrl:
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400",
    imagePublicId: "products/salmon-300g",
    category: catMap["Meat & Seafood"],
    stock: 40,
    rating: 4.7,
    reviewCount: 29,
    isNewArrival: true,
    isTrending: true,
  },
  {
    name: "Mutton Curry Cut 500g",
    slug: "mutton-curry-cut-500g",
    description:
      "Fresh bone-in mutton curry cut, perfect for slow-cooked curries",
    price: 420,
    originalPrice: 480,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
    imagePublicId: "products/mutton-500g",
    category: catMap["Meat & Seafood"],
    stock: 50,
    rating: 4.4,
    reviewCount: 35,
    isPopular: true,
  },
  {
    name: "Tiger Prawns 250g",
    slug: "tiger-prawns-250g",
    description:
      "Large fresh tiger prawns, cleaned and deveined, ready to cook",
    price: 280,
    originalPrice: 320,
    unit: "250g",
    imageUrl:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400",
    imagePublicId: "products/tiger-prawns-250g",
    category: catMap["Meat & Seafood"],
    stock: 35,
    rating: 4.5,
    reviewCount: 21,
    isTrending: true,
  },
  {
    name: "Rohu Fish 500g",
    slug: "rohu-fish-500g",
    description:
      "Fresh river rohu fish, cut into steaks, great for Bengali curries",
    price: 150,
    originalPrice: 170,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400",
    imagePublicId: "products/rohu-500g",
    category: catMap["Meat & Seafood"],
    stock: 55,
    rating: 4.3,
    reviewCount: 18,
    isNewArrival: true,
  },

  // ── Frozen Foods (5) ──────────────────────────────────────
  {
    name: "McCain French Fries 400g",
    slug: "mccain-french-fries-400g",
    description: "Crispy golden French fries, straight-cut and oven-ready",
    price: 160,
    originalPrice: 185,
    unit: "400g",
    imageUrl:
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=400",
    imagePublicId: "products/mccain-fries-400g",
    category: catMap["Frozen Foods"],
    stock: 120,
    rating: 4.4,
    reviewCount: 73,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Amul Ice Cream Vanilla 500ml",
    slug: "amul-ice-cream-vanilla-500ml",
    description:
      "Classic creamy vanilla ice cream made with real milk and cream",
    price: 130,
    originalPrice: 150,
    unit: "500ml",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    imagePublicId: "products/amul-vanilla-500ml",
    category: catMap["Frozen Foods"],
    stock: 90,
    rating: 4.5,
    reviewCount: 58,
    isPopular: true,
  },
  {
    name: "Frozen Peas 500g",
    slug: "frozen-peas-500g",
    description:
      "Garden fresh green peas flash-frozen to lock in nutrients and sweetness",
    price: 70,
    originalPrice: 85,
    unit: "500g",
    imageUrl:
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400",
    imagePublicId: "products/frozen-peas-500g",
    category: catMap["Frozen Foods"],
    stock: 100,
    rating: 4.2,
    reviewCount: 31,
  },
  {
    name: "Frozen Chicken Nuggets 400g",
    slug: "frozen-chicken-nuggets-400g",
    description:
      "Crispy breaded chicken nuggets, kids favourite, ready in 15 minutes",
    price: 220,
    originalPrice: 255,
    unit: "400g",
    imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400",
    imagePublicId: "products/chicken-nuggets-400g",
    category: catMap["Frozen Foods"],
    stock: 75,
    rating: 4.3,
    reviewCount: 44,
    isNewArrival: true,
    isTrending: true,
  },
  {
    name: "Frozen Corn 500g",
    slug: "frozen-corn-500g",
    description:
      "Sweet golden corn kernels, blanched and frozen for year-round freshness",
    price: 80,
    originalPrice: 95,
    unit: "500g",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
    imagePublicId: "products/frozen-corn-500g",
    category: catMap["Frozen Foods"],
    stock: 85,
    rating: 4.1,
    reviewCount: 22,
  },

  // ── Personal Care (5) ─────────────────────────────────────
  {
    name: "Dove Shampoo 340ml",
    slug: "dove-shampoo-340ml",
    description: "Nourishing moisturising shampoo for dry and damaged hair",
    price: 220,
    originalPrice: 250,
    unit: "340ml",
    imageUrl: "https://images.unsplash.com/photo-1556228578-567ba127e37f?w=400",
    imagePublicId: "products/dove-shampoo-340ml",
    category: catMap["Personal Care"],
    stock: 130,
    rating: 4.5,
    reviewCount: 67,
    isPopular: true,
  },
  {
    name: "Colgate Toothpaste 200g",
    slug: "colgate-toothpaste-200g",
    description:
      "Cavity protection toothpaste with active fluoride for strong teeth",
    price: 85,
    originalPrice: 98,
    unit: "200g",
    imageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
    imagePublicId: "products/colgate-200g",
    category: catMap["Personal Care"],
    stock: 200,
    rating: 4.6,
    reviewCount: 89,
    isPopular: true,
  },
  {
    name: "Nivea Body Lotion 400ml",
    slug: "nivea-body-lotion-400ml",
    description: "Deep moisturising body lotion with Aloe Vera for smooth skin",
    price: 295,
    originalPrice: 340,
    unit: "400ml",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    imagePublicId: "products/nivea-lotion-400ml",
    category: catMap["Personal Care"],
    stock: 95,
    rating: 4.4,
    reviewCount: 52,
    isTrending: true,
  },
  {
    name: "Dettol Hand Wash 200ml",
    slug: "dettol-hand-wash-200ml",
    description: "Antibacterial liquid hand wash, kills 99.9% of germs",
    price: 75,
    originalPrice: 90,
    unit: "200ml",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    imagePublicId: "products/dettol-handwash-200ml",
    category: catMap["Personal Care"],
    stock: 250,
    rating: 4.5,
    reviewCount: 98,
    isPopular: true,
    isTrending: true,
  },
  {
    name: "Gillette Razor 2pcs",
    slug: "gillette-razor-2pcs",
    description:
      "Mach3 triple blade disposable razors for a close comfortable shave",
    price: 160,
    originalPrice: 185,
    unit: "2pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400",
    imagePublicId: "products/gillette-razor-2pcs",
    category: catMap["Personal Care"],
    stock: 80,
    rating: 4.3,
    reviewCount: 34,
    isNewArrival: true,
  },

  // ── Baby Care (5) ─────────────────────────────────────────
  {
    name: "Pampers Diapers S 40pcs",
    slug: "pampers-diapers-s-40pcs",
    description:
      "Ultra-soft baby dry diapers with up to 12-hour leakage protection",
    price: 450,
    originalPrice: 520,
    unit: "40pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    imagePublicId: "products/pampers-s-40pcs",
    category: catMap["Baby Care"],
    stock: 100,
    rating: 4.6,
    reviewCount: 74,
    isPopular: true,
  },
  {
    name: "Nestle Cerelac Rice 300g",
    slug: "nestle-cerelac-rice-300g",
    description:
      "Fortified infant cereal with rice and milk for babies 6 months+",
    price: 210,
    originalPrice: 240,
    unit: "300g",
    imageUrl:
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400",
    imagePublicId: "products/cerelac-rice-300g",
    category: catMap["Baby Care"],
    stock: 75,
    rating: 4.7,
    reviewCount: 48,
    isPopular: true,
  },
  {
    name: "Johnson's Baby Shampoo 200ml",
    slug: "johnsons-baby-shampoo-200ml",
    description: "No more tears gentle baby shampoo, mild and hypoallergenic",
    price: 180,
    originalPrice: 205,
    unit: "200ml",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    imagePublicId: "products/johnsons-shampoo-200ml",
    category: catMap["Baby Care"],
    stock: 90,
    rating: 4.5,
    reviewCount: 42,
    isTrending: true,
  },
  {
    name: "WaterWipes Baby Wipes 60pcs",
    slug: "waterwipes-baby-wipes-60pcs",
    description: "99.9% pure water wipes, safe for newborns and sensitive skin",
    price: 320,
    originalPrice: 365,
    unit: "60pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    imagePublicId: "products/waterwipes-60pcs",
    category: catMap["Baby Care"],
    stock: 60,
    rating: 4.8,
    reviewCount: 35,
    isNewArrival: true,
    isPopular: true,
  },
  {
    name: "Himalaya Baby Cream 100ml",
    slug: "himalaya-baby-cream-100ml",
    description:
      "Gentle daily moisturising cream with almond oil and Indian pennywort",
    price: 120,
    originalPrice: 140,
    unit: "100ml",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    imagePublicId: "products/himalaya-baby-cream-100ml",
    category: catMap["Baby Care"],
    stock: 85,
    rating: 4.5,
    reviewCount: 29,
    isOrganic: true,
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

    // ── 3. Build catMap: name → ObjectId ────────────────────
    const catMap = {};
    insertedCategories.forEach((c) => {
      catMap[c.name] = c._id;
    });

    // ── 4. Insert products ──────────────────────────────────
    const products = buildProducts(catMap);
    const insertedProducts = await Product.insertMany(products);

    // Count per category
    const countMap = {};
    insertedProducts.forEach((p) => {
      const catName = Object.keys(catMap).find(
        (k) => catMap[k].toString() === p.category.toString(),
      );
      countMap[catName] = (countMap[catName] || 0) + 1;
    });

    console.log(`\n🛒 Seeded ${insertedProducts.length} products:`);
    Object.entries(countMap).forEach(([name, count]) =>
      console.log(`   • ${name.padEnd(24)} ${count} products`),
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
