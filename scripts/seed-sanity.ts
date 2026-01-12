import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Ma Sera Menu Data - English Only
const branches = [
  {
    _id: 'branch-semouha',
    _type: 'branch',
    name: 'Semouha',
    slug: { _type: 'slug', current: 'semouha' },
    address: 'Semouha, Alexandria, Egypt',
    phone: '+20 123 456 7890',
    whatsapp: '+201234567890',
    operatingHours: 'Daily: 8:00 AM - 11:00 PM',
    isActive: true,
  },
  {
    _id: 'branch-roushdy',
    _type: 'branch',
    name: 'Roushdy',
    slug: { _type: 'slug', current: 'roushdy' },
    address: 'Roushdy, Alexandria, Egypt',
    phone: '+20 123 456 7891',
    whatsapp: '+201234567891',
    operatingHours: 'Daily: 8:00 AM - 11:00 PM',
    isActive: true,
  },
]

const categories = [
  {
    _id: 'cat-topped-toasts',
    _type: 'menuCategory',
    name: 'Topped Toasts',
    slug: { _type: 'slug', current: 'topped-toasts' },
    description: 'Brioche toast creations with premium toppings',
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: 'cat-egg-on-toast',
    _type: 'menuCategory',
    name: 'Egg on Toast',
    slug: { _type: 'slug', current: 'egg-on-toast' },
    description: 'Poached eggs on artisan sourdough',
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'cat-omelets',
    _type: 'menuCategory',
    name: 'Omelets',
    slug: { _type: 'slug', current: 'omelets' },
    description: 'Folded omelets with premium fillings',
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: 'cat-first-light',
    _type: 'menuCategory',
    name: 'First Light (Non Egg)',
    slug: { _type: 'slug', current: 'first-light' },
    description: 'Non-egg breakfast options on sourdough',
    displayOrder: 4,
    isActive: true,
  },
  {
    _id: 'cat-focaccia-fiesta',
    _type: 'menuCategory',
    name: 'Focaccia Fiesta',
    slug: { _type: 'slug', current: 'focaccia-fiesta' },
    description: 'Artisan focaccia sandwiches',
    displayOrder: 5,
    isActive: true,
  },
  {
    _id: 'cat-appetizers',
    _type: 'menuCategory',
    name: 'Appetizers',
    slug: { _type: 'slug', current: 'appetizers' },
    description: 'Creative starters and sides',
    displayOrder: 6,
    isActive: true,
  },
]

// Helper to create branch pricing for all branches with same price
function createBranchPricing(price: number) {
  return branches.map(branch => ({
    _key: `price-${branch._id}`,
    branch: { _type: 'reference', _ref: branch._id },
    price,
    isAvailable: true,
  }))
}

// Menu items interface for type safety
interface MenuItemSeed {
  _id: string
  _type: 'menuItem'
  name: string
  description: string
  category: { _type: 'reference'; _ref: string }
  branchPricing: ReturnType<typeof createBranchPricing>
  displayOrder: number
  isActive: boolean
  isNew?: boolean
  isPopular?: boolean
  dietaryTags?: string[]
}

const menuItems: MenuItemSeed[] = [
  // ========== TOPPED TOASTS ==========
  {
    _id: 'item-tlt-egg-toast',
    _type: 'menuItem',
    name: 'TLT Egg Toast',
    description: 'Brioche toast stuffed with smoked turkey, Batavia lettuce, tomato, light mayo cream, and topped with a fried egg, parmesan cheese, house spices, and infused basil oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-topped-toasts' },
    branchPricing: createBranchPricing(140),
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: 'item-mushroom-truffle-toast',
    _type: 'menuItem',
    name: 'Mushroom Truffle Toast',
    description: 'Brioche toast stuffed with marinated mushrooms, baby roca, truffle cream, and beetroot, topped with a fried egg, parmesan cheese, house spices, and truffle oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-topped-toasts' },
    branchPricing: createBranchPricing(150),
    displayOrder: 2,
    isActive: true,
  },

  // ========== EGG ON TOAST ==========
  {
    _id: 'item-avocado-egg-toast',
    _type: 'menuItem',
    name: 'Avocado Egg on Toast',
    description: 'Poached egg with guacamole, baby roca, fresh lemon, onion, and smoked salmon on sourdough, topped with red hollandaise sauce, beef bacon, parmesan cheese, and basil oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-egg-on-toast' },
    branchPricing: createBranchPricing(240),
    displayOrder: 1,
    isActive: true,
    isPopular: true,
  },
  {
    _id: 'item-spinach-cheese-toast',
    _type: 'menuItem',
    name: 'Spinach & Cheese Toast',
    description: 'Poached egg with guacamole, baby spinach, and mushrooms on sourdough, topped with cheese sauce and paprika oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-egg-on-toast' },
    branchPricing: createBranchPricing(160),
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'item-soft-scrambled-smoky-salmon',
    _type: 'menuItem',
    name: 'Soft Scrambled Smoky Salmon',
    description: 'Scrambled eggs on sourdough with beet cream cheese, roca, capers, smoked salmon, dry herbs, and infused lemon oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-egg-on-toast' },
    branchPricing: createBranchPricing(240),
    displayOrder: 3,
    isActive: true,
    isPopular: true,
  },
  {
    _id: 'item-soft-scrambled-smoky-turkey',
    _type: 'menuItem',
    name: 'Soft Scrambled Smoky Turkey',
    description: 'Scrambled eggs on sourdough with pesto cream cheese, lettuce, cucumber relish, smoked turkey, dry herbs, and infused basil oil, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-egg-on-toast' },
    branchPricing: createBranchPricing(180),
    displayOrder: 4,
    isActive: true,
  },

  // ========== OMELETS ==========
  {
    _id: 'item-fried-feta-omelet',
    _type: 'menuItem',
    name: 'Fried Feta Omelet',
    description: 'Folded omelet with pesto cream cheese, melted cheddar cheese, and fried feta, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-omelets' },
    branchPricing: createBranchPricing(160),
    displayOrder: 1,
    isActive: true,
  },
  {
    _id: 'item-sausage-carne-omelet',
    _type: 'menuItem',
    name: 'Sausage Carne Omelet',
    description: 'Folded omelet with roasted peppers, grilled sausage, chili con carne, melted cheddar cheese, and chopped parsley, served with a mixed green citrus salad and roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-omelets' },
    branchPricing: createBranchPricing(140),
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'item-classic-cheese-omelet',
    _type: 'menuItem',
    name: 'Classic Cheese Omelet',
    description: 'Folded omelet topped with melted cheddar cheese, chopped nuts, and herbs, served with a mixed green citrus salad and toasted potatoes',
    category: { _type: 'reference', _ref: 'cat-omelets' },
    branchPricing: createBranchPricing(140),
    displayOrder: 3,
    isActive: true,
  },

  // ========== FIRST LIGHT (NON EGG) ==========
  {
    _id: 'item-burrata-avocado',
    _type: 'menuItem',
    name: 'Burrata Avocado',
    description: 'Sourdough topped with creamy cheese, burrata, fresh avocado, roasted pepper, chimichurri, and sunflower seeds, drizzled with olive oil, served with roasted potatoes',
    category: { _type: 'reference', _ref: 'cat-first-light' },
    branchPricing: createBranchPricing(200),
    displayOrder: 1,
    isActive: true,
    isPopular: true,
  },
  {
    _id: 'item-modern-caprese',
    _type: 'menuItem',
    name: 'Modern Caprese',
    description: 'Sourdough topped with guacamole, baby roca, mozzarella cheese, fresh tomato, cottage cheese, and balsamic reduction',
    category: { _type: 'reference', _ref: 'cat-first-light' },
    branchPricing: createBranchPricing(145),
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'item-apple-mascarpone',
    _type: 'menuItem',
    name: 'Apple Mascarpone',
    description: 'Sourdough topped with mascarpone cheese, fresh green apple, roasted walnuts, and drizzled with honey',
    category: { _type: 'reference', _ref: 'cat-first-light' },
    branchPricing: createBranchPricing(180),
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: 'item-chocolate-banana',
    _type: 'menuItem',
    name: 'Chocolate Banana',
    description: 'Sourdough topped with peanut butter, fresh banana, dark chocolate, and chia seeds',
    category: { _type: 'reference', _ref: 'cat-first-light' },
    branchPricing: createBranchPricing(130),
    displayOrder: 4,
    isActive: true,
  },

  // ========== FOCACCIA FIESTA ==========
  {
    _id: 'item-fire-kissed-chicken',
    _type: 'menuItem',
    name: 'Fire Kissed Chicken',
    description: 'Grilled chicken, basil & pepper pesto spread, roca, parmesan, pickled onion, served with a mixed salad with seeds',
    category: { _type: 'reference', _ref: 'cat-focaccia-fiesta' },
    branchPricing: createBranchPricing(185),
    displayOrder: 1,
    isActive: true,
    isPopular: true,
  },
  {
    _id: 'item-roast-beef-cut',
    _type: 'menuItem',
    name: 'Roast Beef Cut',
    description: 'House-roasted beef, cream cheese spread, cucumber relish, roca, served with a mixed salad with seeds',
    category: { _type: 'reference', _ref: 'cat-focaccia-fiesta' },
    branchPricing: createBranchPricing(175),
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'item-sea-smoke-sandwich',
    _type: 'menuItem',
    name: 'Sea Smoke Sandwich',
    description: 'Smoked salmon, baby roca, dill, pickled red onion, beet cream cheese spread, served with a mixed salad with seeds',
    category: { _type: 'reference', _ref: 'cat-focaccia-fiesta' },
    branchPricing: createBranchPricing(195),
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: 'item-turkey-melt',
    _type: 'menuItem',
    name: 'Turkey Melt',
    description: 'Smoked turkey, pesto spread, pickled mayo, lettuce, cheddar cheese, served with a mixed salad with seeds',
    category: { _type: 'reference', _ref: 'cat-focaccia-fiesta' },
    branchPricing: createBranchPricing(180),
    displayOrder: 4,
    isActive: true,
  },

  // ========== APPETIZERS ==========
  {
    _id: 'item-crab-rangoon',
    _type: 'menuItem',
    name: 'Crab Rangoon',
    description: 'Crispy cream cheese wontons with crab filling',
    category: { _type: 'reference', _ref: 'cat-appetizers' },
    branchPricing: createBranchPricing(110),
    displayOrder: 1,
    isActive: true,
    isNew: true,
  },
  {
    _id: 'item-corn-ribs',
    _type: 'menuItem',
    name: 'Corn Ribs',
    description: 'Crispy fried corn ribs with special seasoning',
    category: { _type: 'reference', _ref: 'cat-appetizers' },
    branchPricing: createBranchPricing(160),
    displayOrder: 2,
    isActive: true,
  },
  {
    _id: 'item-chicken-mac-n-cheese',
    _type: 'menuItem',
    name: 'Chicken Mac n Cheese',
    description: 'Creamy mac and cheese with tender chicken pieces',
    category: { _type: 'reference', _ref: 'cat-appetizers' },
    branchPricing: createBranchPricing(190),
    displayOrder: 3,
    isActive: true,
  },
  {
    _id: 'item-golden-tender-fire',
    _type: 'menuItem',
    name: 'Golden Tender (Fire)',
    description: 'Crispy golden chicken tenders with spicy fire sauce',
    category: { _type: 'reference', _ref: 'cat-appetizers' },
    branchPricing: createBranchPricing(170),
    dietaryTags: ['spicy'],
    displayOrder: 4,
    isActive: true,
  },
  {
    _id: 'item-golden-tender-not',
    _type: 'menuItem',
    name: 'Golden Tender (Not Spicy)',
    description: 'Crispy golden chicken tenders with mild sauce',
    category: { _type: 'reference', _ref: 'cat-appetizers' },
    branchPricing: createBranchPricing(160),
    displayOrder: 5,
    isActive: true,
  },
]

async function seed() {
  console.log('🌱 Seeding Ma Sera Menu Data (English Only)...\n')

  try {
    // Seed Branches
    console.log('📍 Creating branches...')
    for (const branch of branches) {
      await client.createOrReplace(branch)
      console.log(`   ✓ ${branch.name}`)
    }
    console.log('')

    // Seed Categories
    console.log('📂 Creating categories...')
    for (const category of categories) {
      await client.createOrReplace(category)
      console.log(`   ✓ ${category.name}`)
    }
    console.log('')

    // Seed Menu Items
    console.log('🍽️ Creating menu items...')
    for (const item of menuItems) {
      await client.createOrReplace(item)
      const price = item.branchPricing[0].price
      console.log(`   ✓ ${item.name} - ${price} L.E`)
    }
    console.log('')

    console.log('✅ Seeding complete!')
    console.log(`   📍 ${branches.length} branches`)
    console.log(`   📂 ${categories.length} categories`)
    console.log(`   🍽️ ${menuItems.length} menu items`)

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()
