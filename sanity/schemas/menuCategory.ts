import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'menuCategory',
    title: 'Menu Category',
    type: 'document',
    icon: () => '📂',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
            type: 'string',
            description: 'e.g., Morning Glory Breakfast, Focaccia Fiesta',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Category Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Food', value: 'food' },
                    { title: 'Drink', value: 'drink' },
                ],
                layout: 'radio',
            },
            initialValue: 'food',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'image',
            title: 'Category Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Show this category on the menu',
            initialValue: true,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
            media: 'image',
        },
    },
})
