import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: unknown) {
    return builder.image(source as Parameters<typeof builder.image>[0])
}

// Types
export interface Branch {
    _id: string
    name: string
    slug: { current: string }
    address?: string
    phone?: string
    whatsapp?: string
    operatingHours?: string
    isActive: boolean
}

export interface MenuCategory {
    _id: string
    name: string
    nameAr?: string
    slug: { current: string }
    description?: string
    image?: unknown
    displayOrder: number
    isActive: boolean
}

export interface MenuItem {
    _id: string
    name: string
    nameAr?: string
    description?: string
    descriptionAr?: string
    image?: unknown
    category: {
        _id: string
        slug: { current: string }
    }
    branchPricing?: Array<{
        branch: { _id: string; slug: { current: string } }
        price: number
        isAvailable: boolean
    }>
    dietaryTags?: string[]
    displayOrder: number
    isActive: boolean
    isNew?: boolean
    isPopular?: boolean
}

// Queries
export async function getBranches(): Promise<Branch[]> {
    return client.fetch(`
    *[_type == "branch" && isActive == true] | order(name asc) {
      _id,
      name,
      slug,
      address,
      phone,
      whatsapp,
      operatingHours,
      isActive
    }
  `)
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
    return client.fetch(`
    *[_type == "branch" && slug.current == $slug && isActive == true][0] {
      _id,
      name,
      slug,
      address,
      phone,
      whatsapp,
      operatingHours,
      isActive
    }
  `, { slug })
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
    return client.fetch(`
    *[_type == "menuCategory" && isActive == true] | order(displayOrder asc) {
      _id,
      name,
      nameAr,
      slug,
      description,
      image,
      displayOrder,
      isActive
    }
  `)
}

export async function getMenuItems(): Promise<MenuItem[]> {
    return client.fetch(`
    *[_type == "menuItem" && isActive == true] | order(displayOrder asc) {
      _id,
      name,
      nameAr,
      description,
      descriptionAr,
      image,
      category->{
        _id,
        slug
      },
      branchPricing[]{
        branch->{
          _id,
          slug
        },
        price,
        isAvailable
      },
      dietaryTags,
      displayOrder,
      isActive,
      isNew,
      isPopular
    }
  `)
}

// Transform menu items for display
export function transformMenuItemsForDisplay(
    items: MenuItem[],
    branchSlug?: string
): Array<{
    _id: string
    name: string
    nameAr?: string
    description?: string
    descriptionAr?: string
    image?: { url: string; alt?: string }
    categorySlug: string
    price?: number
    dietaryTags?: string[]
    isNew?: boolean
    isPopular?: boolean
    isAvailable: boolean
}> {
    return items.map((item) => {
        let price: number | undefined
        let isAvailable = true

        if (branchSlug && item.branchPricing) {
            const branchPrice = item.branchPricing.find(
                (bp) => bp.branch?.slug?.current === branchSlug
            )
            if (branchPrice) {
                price = branchPrice.price
                isAvailable = branchPrice.isAvailable !== false
            }
        }

        return {
            _id: item._id,
            name: item.name,
            nameAr: item.nameAr,
            description: item.description,
            descriptionAr: item.descriptionAr,
            image: item.image
                ? {
                    url: urlFor(item.image).width(600).height(450).url(),
                    alt: item.name,
                }
                : undefined,
            categorySlug: item.category?.slug?.current || '',
            price,
            dietaryTags: item.dietaryTags,
            isNew: item.isNew,
            isPopular: item.isPopular,
            isAvailable,
        }
    })
}

// Group items by category
export function groupItemsByCategory(
    items: ReturnType<typeof transformMenuItemsForDisplay>,
    categories: MenuCategory[]
): Array<{
    category: MenuCategory
    items: typeof items
}> {
    return categories
        .map((category) => ({
            category,
            items: items.filter(
                (item) => item.categorySlug === category.slug.current && item.isAvailable
            ),
        }))
        .filter((group) => group.items.length > 0)
}
