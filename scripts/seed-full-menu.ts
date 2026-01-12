
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'
import { v4 as uuidv4 } from 'uuid'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const BRANCHES = [
    {
        _id: 'branch-fouad-street',
        _type: 'branch',
        name: 'Fouad Street',
        slug: { _type: 'slug', current: 'fouad-street' },
        address: '67 El Horeya Road (Fouad Street) in front of Greco-Roman Museum',
        phone: '0155 380 3579',
        isActive: true,
    },
    {
        _id: 'branch-smouha',
        _type: 'branch',
        name: 'Smouha',
        slug: { _type: 'slug', current: 'smouha' },
        address: 'Smouha, Alexandria',
        phone: '0123 456 7890', // Placeholder
        isActive: true, // Auto-create requested
    }
]

const RAW_MENU_DATA = [
    { "category": "Appetizers", "subCategory": null, "name": "CRAP Rangoon", "description": null, "price": 110 },
    { "category": "Appetizers", "subCategory": null, "name": "Corn ribs", "description": null, "price": 160 },
    { "category": "Appetizers", "subCategory": null, "name": "chiken mac n cheese", "description": null, "price": 190 },
    { "category": "Appetizers", "subCategory": null, "name": "Golden tender", "description": "Fire / Not", "price": "170 / 160" },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Butter Croissant", "description": null, "price": 90 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Pistachio Cream Croissant", "description": null, "price": 120 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Hazelnut Croissant", "description": null, "price": 110 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Almond Croissant", "description": null, "price": 95 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Nutella Hazelnut Croissant", "description": null, "price": 115 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Pain au Chocolat", "description": null, "price": 95 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Pain au Suisse", "description": null, "price": 85 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Apple Pie", "description": null, "price": 80 },
    { "category": "Crust wonder (Bakery)", "subCategory": null, "name": "Strawberry Custard Pie", "description": null, "price": 80 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Regina Margherita", "description": "San Marzano tomato sauce, buffalo mozzarella, fresh basil, olive oil", "price": 200 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "New York Margherita", "description": "San Marzano tomato sauce, cow mozzarella, cheddar, oregano", "price": 210 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Frutti di Mare", "description": "Margherita base, shrimp, calamari, sepia, mussels, crab sticks, oregano", "price": 380 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Giardino", "description": "Margherita base, roca, cherry tomatoes, buffalo mozzarella, balsamic reduction, parmesan", "price": 245 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Diavola", "description": "Margherita base, beef salami, jalapeño, roasted red pepper", "price": 260 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Salsiccia", "description": "Margherita base, Italian beef sausage, roasted red pepper", "price": 290 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Cinque Formaggi", "description": "Buffalo mozzarella, cow mozzarella, parmesan, gorgonzola, red cheddar, served with honey", "price": 245 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Tartufara", "description": "Truffle cream, mozzarella, parmesan, mushrooms, truffle oil, basil leaves", "price": 265 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Breasaola", "description": null, "price": 320 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Chicken pesto", "description": null, "price": 315 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Smokey salmon", "description": null, "price": 350 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Stracciatella Pizza", "description": null, "price": 400 },
    { "category": "Sorrento Sunshine (Pizza)", "subCategory": null, "name": "Capricciosa Pizza", "description": null, "price": 350 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Rigatoni Sausage Ragu", "description": "Rigatoni pasta with creamy sausage ragu, red beans, parmesan cheese, chili flakes, and chopped parsley", "price": 220 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Linguine Chicken Florentine", "description": "Linguine pasta with creamy Florentine sauce, spinach, grilled chicken, parmesan cheese, and chopped parsley", "price": 260 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Pappardelle Bolognese", "description": "Pappardelle pasta with slow-cooked Bolognese beef sauce, chopped parsley, and parmesan cheese", "price": 190 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Farfalle Pistachio Pesto", "description": "Farfalle pasta with creamy basil pesto sauce, roasted red pepper, roasted pistachios, and parmesan cheese", "price": 190 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Spaghetti Marinara", "description": "Spaghetti pasta with traditional marinara sauce, parmesan cheese, olive oil, and fresh basil", "price": 160 },
    { "category": "Twist & Fork (Pasta)", "subCategory": null, "name": "Penne Pink Seafood", "description": "Penne pasta with tomato cream sauce, shrimp, sepia, mussels, crab sticks, chopped parsley, and parmesan cheese", "price": 250 },
    { "category": "Global inspiration", "subCategory": "Cluck Deluxe", "name": "Homemade Smash Burger", "description": "6 oz beef burger with marinated mushrooms, caramelized onions, Monterey Jack cheese, and house burger sauce, served with homemade fries", "price": 220 },
    { "category": "Global inspiration", "subCategory": "Cluck Deluxe", "name": "Golden Chicken", "description": "Fire / Not", "price": "170 / 160" },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Ma Sera Boom", "description": "Golden-fried chicken balls stuffed with melted cheese, served with crispy fries", "price": 295 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Beef Duxelle", "description": "Tender beef fillet topped with mushroom duxelles, served with sautéed vegetables, mashed potatoes, and rich demi-glace sauce", "price": 395 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Chicken Parm", "description": "Japanese-style crispy fried chicken topped with parmesan and creamy cheese sauce, served with a fresh side salad", "price": 330 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Kung Pao Shrimp", "description": "Stir-fried shrimp in authentic Kung Pao sauce, served over steamed rice with green onions, cashews, and stir-fried vegetables", "price": 385 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Mongolian Beef", "description": "Wok-seared beef in savory Mongolian sauce, served over steamed rice with green onions and toasted sesame seeds", "price": 390 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Chicken French Lemon", "description": "Grilled chicken coated in a zesty French lemon sauce, served with vegetable couscous on the side", "price": 340 },
    { "category": "Global inspiration", "subCategory": "Main Course", "name": "Chicken marrone", "description": null, "price": 320 },
    { "category": "Non Egg", "subCategory": "First Light", "name": "Burrata Avocado", "description": "Sourdough topped with creamy cheese, burrata, fresh avocado, roasted pepper, chimichurri, and sunflower seeds, drizzled with olive oil, served with roasted potatoes", "price": 200 },
    { "category": "Non Egg", "subCategory": "First Light", "name": "Modern Caprese", "description": "Sourdough topped with guacamole, baby roca, mozzarella cheese, fresh tomato, cottage cheese, and balsamic reduction", "price": 145 },
    { "category": "Non Egg", "subCategory": "First Light", "name": "Apple Mascarpone", "description": "Sourdough topped with mascarpone cheese, fresh green apple, roasted walnuts, and drizzled with honey", "price": 180 },
    { "category": "Non Egg", "subCategory": "First Light", "name": "Chocolate Banana", "description": "Sourdough topped with peanut butter, fresh banana, dark chocolate, and chia seeds", "price": 130 },
    { "category": "Salad", "subCategory": null, "name": "cobb quinoa", "description": null, "price": 240 },
    { "category": "Salad", "subCategory": null, "name": "Hawaiian Golden Chiken", "description": null, "price": 200 },
    { "category": "Salad", "subCategory": null, "name": "Halloumi Greek", "description": null, "price": 180 },
    { "category": "Salad", "subCategory": null, "name": "Beef Green goodies", "description": null, "price": 250 },
    { "category": "Salad", "subCategory": null, "name": "jala shrimp", "description": null, "price": 320 },
    { "category": "Morning Glory Breakfast", "subCategory": "Topped Toasts", "name": "TLT Egg Toast", "description": "Brioche toast stuffed with smoked turkey, Batavia lettuce, tomato, light mayo cream, and topped with a fried egg, parmesan cheese, house spices, and infused basil oil, served with a mixed green citrus salad and roasted potatoes", "price": 140 },
    { "category": "Morning Glory Breakfast", "subCategory": "Topped Toasts", "name": "Mushroom Truffle Toast", "description": "Brioche toast stuffed with marinated mushrooms, baby roca, truffle cream, and beetroot, topped with a fried egg, parmesan cheese, house spices, and truffle oil, served with a mixed green citrus salad and roasted potatoes", "price": 150 },
    { "category": "Morning Glory Breakfast", "subCategory": "Egg on Toast", "name": "Avocado Egg on Toast", "description": "Poached egg with guacamole, baby roca, fresh lemon, onion, and smoked salmon on sourdough, topped with Hollandaise sauce, beef bacon, parmesan cheese, and basil oil, served with a mixed green citrus salad and roasted potatoes", "price": 240 },
    { "category": "Morning Glory Breakfast", "subCategory": "Egg on Toast", "name": "Spinach & Cheese Toast", "description": "Poached egg with guacamole, baby spinach, and mushrooms on sourdough, topped with cheese sauce and paprika oil, served with a mixed green citrus salad and roasted potatoes", "price": 160 },
    { "category": "Morning Glory Breakfast", "subCategory": "Egg on Toast", "name": "Soft Scrambled Smoky Salmon", "description": "Scrambled eggs on sourdough with beet cream cheese, roca, capers, smoked salmon, dry herbs, and infused lemon oil, served with a mixed green citrus salad and roasted potatoes", "price": 240 },
    { "category": "Morning Glory Breakfast", "subCategory": "Egg on Toast", "name": "Soft Scrambled Smoky Turkey", "description": "Scrambled eggs on sourdough with pesto cream cheese, lettuce, cucumber relish, smoked turkey, dry herbs, and infused basil oil, served with a mixed green citrus salad and roasted potatoes", "price": 180 },
    { "category": "Morning Glory Breakfast", "subCategory": "Omelets", "name": "Fried Feta Omelet", "description": "Folded omelet with pesto cream cheese, melted cheddar cheese, and fried feta, served with a mixed green citrus salad and roasted potatoes", "price": 180 },
    { "category": "Morning Glory Breakfast", "subCategory": "Omelets", "name": "Sausage Carne Omelet", "description": "Folded omelet with roasted peppers, grilled sausage, chili con carne, melted cheddar cheese, and chopped parsley, served with a mixed green citrus salad and roasted potatoes", "price": 140 },
    { "category": "Morning Glory Breakfast", "subCategory": "Omelets", "name": "Classic Cheese Omelet", "description": "Folded omelet topped with melted cheddar cheese, chopped mix cheese, herbs, served with a mixed green citrus salad and roasted potatoes", "price": 140 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Crème Brûlée Cheesecake", "description": "Cheesecake with crème brûlée crust, strawberries, and pretzel sticks", "price": 90 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Rocher Chocolate Cake", "description": "Hot sticky hazelnut chocolate cake with Oreo, vanilla ice cream, crushed hazelnuts, and Rocher balls", "price": 120 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Hazelnut Paris-Brest", "description": "Pastry biscuits filled with hazelnut cream and topped with sugar and hazelnut paste", "price": 120 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Pecan Pie Cheesecake", "description": "Cheesecake with caramelized pecans and salted caramel biscuits", "price": 135 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Tiramisu", "description": "Classic tiramisu with chocolate powder and tiramisu frosting", "price": 140 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Trio Choco Crumb", "description": "Sable tart with chocolate cream, light cocoa cream, and caramel chocolate paste", "price": 110 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Lady mango", "description": null, "price": 130 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Strawberry tiramisu", "description": null, "price": 140 },
    { "category": "Dessert", "subCategory": "Sweet Escape", "name": "Trio tart", "description": null, "price": 120 },
    { "category": "Dessert", "subCategory": "Éclair", "name": "Strawberry Éclair", "description": null, "price": 120 },
    { "category": "Dessert", "subCategory": "Éclair", "name": "Hazelnut Éclair", "description": null, "price": 100 },
    { "category": "Dessert", "subCategory": "Éclair", "name": "Mixed Berry Éclair", "description": null, "price": 140 },
    { "category": "Dessert", "subCategory": "Pancakes", "name": "Rich fudge", "description": null, "price": 160 },
    { "category": "Dessert", "subCategory": "Pancakes", "name": "BEE SWEET", "description": null, "price": 100 },
    { "category": "Dessert", "subCategory": "Pancakes", "name": "BISCOFF BLISS", "description": null, "price": 160 },
    { "category": "Dessert", "subCategory": "Pancakes", "name": "Pistachio Dubai style", "description": null, "price": 220 },
    { "category": "Dessert", "subCategory": "Frensh Toast", "name": "lucsh dulci", "description": null, "price": 150 },
    { "category": "Dessert", "subCategory": "Frensh Toast", "name": "Ruby creme", "description": null, "price": 140 },
    { "category": "Gentle Glow (Soup)", "subCategory": null, "name": "Coconut Thai Soup", "description": null, "price": 180 },
    { "category": "Gentle Glow (Soup)", "subCategory": null, "name": "Smoked Tomato", "description": null, "price": 120 },
    { "category": "Gentle Glow (Soup)", "subCategory": null, "name": "Hungarian Mushroom", "description": null, "price": 130 },
    { "category": "Gentle Glow (Soup)", "subCategory": null, "name": "Chicken Cream", "description": null, "price": 150 },
    { "category": "Focaccia Fiesta", "subCategory": null, "name": "Fire Kissed Chicken", "description": "Grilled chicken, basil & pepper pesto spread, roca, parmesan, pickled onion, served with a mixed salad with seeds", "price": 185 },
    { "category": "Focaccia Fiesta", "subCategory": null, "name": "Roast Beef Cut", "description": "House-roasted beef, cream cheese spread, cucumber relish, roca, served with a mixed salad with seeds", "price": 175 },
    { "category": "Focaccia Fiesta", "subCategory": null, "name": "Sea Smoke Sandwich", "description": "Smoked salmon, baby roca, dill, pickled red onion, beet cream cheese spread, served with a mixed salad with seeds", "price": 195 },
    { "category": "Focaccia Fiesta", "subCategory": null, "name": "Turkey Melt", "description": "Smoked turkey, pesto spread, pickled mayo, lettuce, cheddar cheese, served with a mixed salad with seeds", "price": 180 },
    { "category": "Frappe", "subCategory": null, "name": "Caramel Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Frappe", "subCategory": null, "name": "Mocha Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Frappe", "subCategory": null, "name": "Salted Caramel Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Frappe", "subCategory": null, "name": "Coffee Cream Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Frappe", "subCategory": null, "name": "Pistachio Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Frappe", "subCategory": null, "name": "Lotus Frappuccino", "description": "Choice of coffee or non-coffee", "price": "150 / 180" },
    { "category": "Hot Drinks", "subCategory": null, "name": "Espresso", "description": null, "price": 65 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Cortado", "description": null, "price": 80 },
    { "category": "Hot Drinks", "subCategory": null, "name": "White mocha", "description": null, "price": 145 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Macchiato", "description": null, "price": 85 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Turkish Coffee", "description": null, "price": 65 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Flat White", "description": null, "price": 90 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Latte", "description": null, "price": 95 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Cappuccino", "description": null, "price": 95 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Mocha", "description": null, "price": 140 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Spanish Latte", "description": null, "price": 105 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Crème Brûlée Latte", "description": null, "price": 150 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Dulce De Leche", "description": null, "price": 135 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Toffee Nut Crunch Latte", "description": null, "price": 135 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Lavender Coffee", "description": null, "price": 150 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Hot Chocolate Cookies", "description": null, "price": 160 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Hot White Chocolate", "description": null, "price": 145 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Apple Cider", "description": null, "price": 120 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Anti Flu", "description": null, "price": 90 },
    { "category": "Hot Drinks", "subCategory": null, "name": "English Tea", "description": null, "price": 45 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Green Tea", "description": null, "price": 45 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Flavor Tea", "description": null, "price": 50 },
    { "category": "Hot Drinks", "subCategory": null, "name": "Hot Caramel Macchiato", "description": null, "price": 100 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot Matcha", "description": null, "price": 140 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot White Matcha", "description": null, "price": 190 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot Honey Matcha", "description": null, "price": 150 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot Cinnamon Matcha", "description": null, "price": 190 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot Spanish Matcha", "description": null, "price": 150 },
    { "category": "Hot Matcha Ma sera", "subCategory": null, "name": "Hot Pistachio Matcha", "description": null, "price": 190 },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Matcha", "description": null, "price": "150 / 180" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Spanish Matcha", "description": null, "price": "180 / 190" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Matcha Strawberry", "description": null, "price": "180 / 200" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Pistachio Matcha", "description": null, "price": "180 / 200" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Mango Matcha", "description": null, "price": "160 / 190" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Salted Matcha", "description": null, "price": "180 / 200" },
    { "category": "Iced Matcha Ma sera", "subCategory": null, "name": "Iced Peach Matcha", "description": null, "price": "180 / 200" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Chill Bliss", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Iced Salted Caramel", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Midnight Chill", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Choco Frost", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Iced Dulce", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Iced Shaker", "description": null, "price": "145 / 175" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Iced Tiramisu Latte", "description": null, "price": "150" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Espresso Avocado", "description": null, "price": "120" },
    { "category": "Iced Coffee", "subCategory": null, "name": "Iced Caramel Macchiato", "description": null, "price": "145 / 175" },
    { "category": "Fresh Juice", "subCategory": null, "name": "Fresh Juice", "description": "Mango - Orange - Watermelon - Guava - Strawberry - Lemon", "price": 90 },
    { "category": "Smoothies", "subCategory": null, "name": "Smoothies", "description": "Mango Passion - Pina Colada - Blue Passion - Mix Berries - Watermelon", "price": 180 },
    { "category": "Specialty Coffee", "subCategory": null, "name": "Specialty Coffee", "description": "V 60 - Chemex - French Press - AeroPress - Siphon", "price": 130 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Kiwi", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Strawberry", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Blue Ocean", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Blueberry", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Passion", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Power", "description": null, "price": 200 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Pink Lemon", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Lemon Peach", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Masera", "description": null, "price": 180 },
    { "category": "Fizzy Frizzy", "subCategory": null, "name": "Fizzy Cherry Cola", "description": null, "price": 180 },
    { "category": "Soft Drinks", "subCategory": null, "name": "V 7", "description": null, "price": 40 },
    { "category": "Soft Drinks", "subCategory": null, "name": "Red Bull", "description": null, "price": 120 },
    { "category": "Soft Drinks", "subCategory": null, "name": "Water", "description": null, "price": 25 },
    { "category": "Soft Drinks", "subCategory": null, "name": "Sparkling Water", "description": null, "price": 40 },
    { "category": "Extra", "subCategory": null, "name": "Single Origin", "description": null, "price": 10 },
    { "category": "Extra", "subCategory": null, "name": "Milk", "description": null, "price": 20 },
    { "category": "Extra", "subCategory": null, "name": "Whipped Cream", "description": null, "price": 25 },
    { "category": "Extra", "subCategory": null, "name": "Coffee", "description": null, "price": 30 },
    { "category": "Extra", "subCategory": null, "name": "Lactose Free", "description": null, "price": 30 },
    { "category": "Extra", "subCategory": null, "name": "Flavor", "description": null, "price": 35 }
]

function createBranchPricing(price: number) {
    return BRANCHES.map(branch => ({
        _key: uuidv4(),
        branch: { _type: 'reference', _ref: branch._id },
        price,
        isAvailable: true,
    }))
}

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

async function seed() {
    console.log('🌱 Seeding Full Ma Sera Menu...\n')

    try {
        // 1. Branches
        console.log('📍 Seeding Branches...')
        for (const branch of BRANCHES) {
            await client.createOrReplace(branch)
            console.log(`   ✓ ${branch.name}`)
        }

        // 2. Categories
        // Extract unique categories
        const categoriesSet = new Set(RAW_MENU_DATA.map(i => i.category))
        const categories = Array.from(categoriesSet)
        const categoryIds: Record<string, string> = {}

        console.log(`\n📂 Seeding ${categories.length} Categories...`)
        let displayOrder = 1
        for (const catName of categories) {
            const slug = slugify(catName)
            const id = `category-${slug}`
            categoryIds[catName] = id

            const doc = {
                _id: id,
                _type: 'menuCategory',
                name: catName,
                // slug no longer in schema
                description: `${catName} Menu Items`, // Generic desc
                displayOrder: displayOrder++,
                isActive: true,
            }
            await client.createOrReplace(doc)
            console.log(`   ✓ ${catName}`)
        }

        // 3. Menu Items
        console.log(`\n🍽️ Seeding Menu Items...`)

        // Process items
        // If price has split, create variants
        let itemDisplayOrder = 1

        // We must generate unique IDs for items to avoid collision if run multiple times
        // But better to use deterministic IDs based on name to allow updates
        // For variants: item-slug-variant-1

        for (const item of RAW_MENU_DATA) {
            const catId = categoryIds[item.category]
            const baseSlug = slugify(item.name)

            const priceStr = String(item.price)
            let itemsToCreate = []

            // Heuristic for split prices
            if (priceStr.includes('/')) {
                const prices = priceStr.split('/').map(p => parseInt(p.trim()))
                const descHasSplit = item.description?.includes('/')
                const descParts = descHasSplit ? item.description!.split('/').map(d => d.trim()) : []

                prices.forEach((p, idx) => {
                    let variantName = item.name

                    if (descParts.length === prices.length) {
                        // Explicit description split (e.g. "Fire / Not")
                        variantName = `${item.name} (${descParts[idx]})`
                    } else {
                        // Default to Medium / Large per user request
                        const sizeName = idx === 0 ? 'Medium' : 'Large'
                        variantName = `${item.name} (${sizeName})`
                    }

                    itemsToCreate.push({
                        _id: `item-${baseSlug}-${idx + 1}`,
                        name: variantName,
                        description: item.description,
                        price: p
                    })
                })
            } else {
                // Single item
                itemsToCreate.push({
                    _id: `item-${baseSlug}`,
                    name: item.name,
                    description: item.description,
                    price: typeof item.price === 'number' ? item.price : parseInt(item.price)
                })
            }

            for (const variant of itemsToCreate) {
                const doc = {
                    _id: variant._id,
                    _type: 'menuItem',
                    name: variant.name,
                    description: variant.description,
                    category: { _type: 'reference', _ref: catId },
                    subCategory: item.subCategory,
                    branchPricing: createBranchPricing(variant.price),
                    displayOrder: itemDisplayOrder++,
                    isActive: true,
                }
                await client.createOrReplace(doc)
                console.log(`   ✓ ${variant.name} (${variant.price})`)
            }
        }

        console.log('\n✅ Seed successful!')

    } catch (err) {
        console.error('❌ Failed:', err)
        process.exit(1)
    }
}

seed()
