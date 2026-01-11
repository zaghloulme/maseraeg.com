import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'image',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Hero',
                subtitle: subtitle || 'Hero Section',
                media,
            }
        },
    },
})
