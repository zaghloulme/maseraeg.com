import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'menuItem',
    title: 'Menu Item',
    type: 'document',
    icon: () => '🍽️',
    fields: [
        defineField({
            name: 'name',
            title: 'Item Name',
            type: 'string',
            description: 'e.g., Burrata Avocado, Fire Kissed Chicken',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Ingredients and preparation details',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'menuCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subCategory',
            title: 'Sub Category',
            type: 'string',
            description: 'Optional grouping within category (e.g. "Omelets")',
        }),
        defineField({
            name: 'image',
            title: 'Item Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'branchPricing',
            title: 'Branch Pricing',
            type: 'array',
            description: 'Set different prices for each branch',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'branchPrice',
                    fields: [
                        defineField({
                            name: 'branch',
                            title: 'Branch',
                            type: 'reference',
                            to: [{ type: 'branch' }],
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'price',
                            title: 'Price (L.E)',
                            type: 'number',
                            validation: (Rule) => Rule.required().min(0),
                        }),
                        defineField({
                            name: 'isAvailable',
                            title: 'Available at this branch',
                            type: 'boolean',
                            initialValue: true,
                        }),
                        defineField({
                            name: 'isHighlighted',
                            title: 'Highlight in this branch',
                            type: 'boolean',
                            description: 'Mark as a featured/popular item unique to this branch',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: {
                            branch: 'branch.name',
                            price: 'price',
                            available: 'isAvailable',
                        },
                        prepare({ branch, price, available }) {
                            return {
                                title: branch || 'Select branch',
                                subtitle: available !== false ? `${price} L.E` : 'Not available',
                            }
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'dietaryTags',
            title: 'Dietary Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Vegetarian', value: 'vegetarian' },
                    { title: 'Vegan', value: 'vegan' },
                    { title: 'Gluten-Free', value: 'gluten-free' },
                    { title: 'Spicy', value: 'spicy' },
                    { title: 'Contains Nuts', value: 'nuts' },
                ],
            },
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first within category',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Show this item on the menu',
            initialValue: true,
        }),
        defineField({
            name: 'isNew',
            title: 'New Item',
            type: 'boolean',
            description: 'Show "New" badge on this item',
            initialValue: false,
        }),
        defineField({
            name: 'isPopular',
            title: 'Popular Item',
            type: 'boolean',
            description: 'Highlight as a popular choice',
            initialValue: false,
        }),
        defineField({
            name: 'popularAt',
            title: 'Popular At (Location)',
            type: 'string',
            options: {
                list: [
                    { title: 'All Branches', value: 'all' },
                    { title: 'Smouha Only', value: 'smouha' },
                    { title: 'Fouad Street Only', value: 'fouad-street' },
                ],
                layout: 'radio',
            },
            description: 'Choose where this item is highlighted as popular',
            initialValue: 'all',
            hidden: ({ document }) => !document?.isPopular,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
        {
            title: 'Name A-Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            category: 'category.name',
            media: 'image',
        },
        prepare({ title, category, media }) {
            return {
                title,
                subtitle: category,
                media,
            }
        },
    },
})
