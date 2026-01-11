import { defineArrayMember, defineField, defineType } from 'sanity'

const featureItem = defineType({
    name: 'featureItem',
    title: 'Feature Item',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'e.g., "Check", "Star" (from Lucide icons)',
        }),
    ],
})

export default defineType({
    name: 'features',
    title: 'Features Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: 'Features',
            type: 'array',
            of: [defineArrayMember({ type: 'featureItem' })],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            return {
                title: title || 'Features',
                subtitle: `${items?.length || 0} items`,
            }
        },
    },
})

export { featureItem }
