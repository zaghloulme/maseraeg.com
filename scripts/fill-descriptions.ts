
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const DESCRIPTIONS: Record<string, string> = {
    // BAKERY
    "Butter Croissant": "Classic French pastry with flaky, buttery layers, baked to golden perfection.",
    "Pistachio Cream Croissant": "Flaky croissant filled with rich pistachio cream and crushed pistachios.",
    "Hazelnut Croissant": "Buttery croissant filled with smooth hazelnut cream.",
    "Almond Croissant": "Twice-baked croissant filled with almond cream and topped with sliced almonds.",
    "Nutella Hazelnut Croissant": "Indulgent croissant filled with Nutella and hazelnut bits.",
    "Pain au Chocolat": "Classic pastry filled with dark chocolate batons.",
    "Pain au Suisse": "Custard and chocolate chip filled pastry.",
    "Apple Pie": "Classic pie with spiced apple filling and a flaky crust.",
    "Strawberry Custard Pie": "Buttery tart filled with silky custard and fresh strawberries.",

    // SALAD
    "cobb quinoa": "Nutrient-packed quinoa with mixed greens, avocado, corn, cherry tomatoes, and house dressing.",
    "Hawaiian Golden Chiken": "Grilled chicken breast, fresh pineapple, mixed greens, and a zesty tropical dressing.",
    "Halloumi Greek": "Grilled halloumi cheese, cucumber, tomatoes, kalimata olives, onions, and oregano olive oil dressing.",
    "Beef Green goodies": "Tender beef slices with fresh green vegetables, broccoli, avocado, and balsamic vinaigrette.",
    "jala shrimp": "Spicy jalapeño marinated shrimp served on a bed of fresh greens and vegetables.",

    // COFFEE & DRINKS
    "Espresso": "Rich and intense shot of premium concentrated coffee.",
    "Cortado": "Espresso cut with a small amount of warm milk to reduce acidity.",
    "White mocha": "Espresso combines with white chocolate sauce and steamed milk.",
    "Macchiato": "Espresso stained with a dollop of milk foam.",
    "Turkish Coffee": "Traditional unfiltered coffee brewed in a cezve.",
    "Flat White": "Espresso with micro-foam steamed milk for a velvety texture.",
    "Latte": "Espresso with steamed milk and a light layer of foam.",
    "Cappuccino": "Espresso with equal parts steamed milk and milk foam.",
    "Mocha": "Espresso with rich bittersweet chocolate sauce and steamed milk.",
    "Spanish Latte": "Espresso with sweet condensed milk and steamed milk.",
    "Crème Brûlée Latte": "Rich latte with caramelized sugar flavor and crunchy topping.",
    "Dulce De Leche": "Sweet caramel milk coffee inspired by Latin American flavors.",
    "Toffee Nut Crunch Latte": "Buttery toffee nut flavor paired with espresso and steamed milk.",
    "Lavender Coffee": "Floral lavender infused coffee latte.",
    "Hot Chocolate Cookies": "Creamy hot chocolate with cookie crumbles.",
    "Hot White Chocolate": "Velvety melted white chocolate with steamed milk.",
    "Apple Cider": "Warm spiced apple beverage.",
    "Anti Flu": "Hot lemon, ginger, and honey tea blend for immunity.",
    "English Tea": "Classic black tea.",
    "Green Tea": "Refreshing antioxidant-rich green tea.",
    "Flavor Tea": "Aromatic fruit infused tea.",
    "Hot Caramel Macchiato": "Steamed milk with vanilla syrup, marked with espresso and caramel drizzle.",

    // MATCHA
    "Hot Matcha": "Premium Japanese green tea powder whisked with milk.",
    "Hot White Matcha": "Matcha green tea blended with white chocolate.",
    "Hot Honey Matcha": "Matcha latte sweetened with natural honey.",
    "Hot Cinnamon Matcha": "Spiced matcha latte with cinnamon.",
    "Hot Spanish Matcha": "Matcha latte with sweet condensed milk.",
    "Hot Pistachio Matcha": "Matcha latte infused with pistachio flavor.",

    // Default Generics
    // Iced Matcha, Iced Coffee, Frappes, Fizzys will use fallback logic if not mapped
}

// Fallback logic for categories
const CATEGORY_DEFAULTS: Record<string, string> = {
    "Frappe": "Ice blended beverage topped with whipped cream.",
    "Fizzy Frizzy": "Refreshing sparkling soda with fruit flavors.",
    "Iced Coffee": "Chilled coffee beverage served over ice.",
    "Iced Matcha Ma sera": "Chilled premium matcha green tea drink.",
    "Smoothies": "Freshly blended fruit smoothie."
}

function normalize(s: string) {
    return s.toLowerCase().trim()
}

async function fill() {
    console.log('✍️ Filling Missing Descriptions...')

    // Fetch items with empty descriptions
    // Check if description is null or empty string
    const items = await client.fetch(`*[_type == "menuItem" && !defined(description)]`)
    const itemsEmptyString = await client.fetch(`*[_type == "menuItem" && description == ""]`)
    const allItems = [...items, ...(itemsEmptyString || [])]

    // Fetch category map for fallback logic
    const categoryDocs = await client.fetch(`*[_type == "menuCategory"]{ _id, name }`)
    const catMap = new Map(categoryDocs.map((c: { _id: string, name: string }) => [c._id, c.name]))

    let updated = 0
    for (const item of allItems) {
        let desc = DESCRIPTIONS[item.name]

        // Try fuzzy name match (ignore case, ignore contents in parens)
        if (!desc) {
            const cleanName = item.name.split('(')[0].trim()
            const key = Object.keys(DESCRIPTIONS).find(k => normalize(k) === normalize(cleanName))
            if (key) desc = DESCRIPTIONS[key]
        }

        // Try Category default
        if (!desc && item.category) {
            const catName = catMap.get(item.category._ref) as string | undefined
            if (catName) {
                // Find matching category default
                const defaultKey = Object.keys(CATEGORY_DEFAULTS).find(k => catName.includes(k) || k.includes(catName))
                if (defaultKey) desc = CATEGORY_DEFAULTS[defaultKey]
            }
        }

        if (desc) {
            await client.patch(item._id).set({ description: desc }).commit()
            console.log(`   ✓ ${item.name}: ${desc.substring(0, 30)}...`)
            updated++
        } else {
            console.log(`   - Skipping ${item.name} (No description found)`)
        }
    }

    console.log(`✅ Updated ${updated} items.`)
}

fill()
