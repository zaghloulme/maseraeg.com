import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Title displayed in search engine results (recommended: 50-60 characters)',
            validation: (Rule) => Rule.max(60).warning('Long titles may be truncated by search engines'),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Description displayed in search engine results (recommended: 150-160 characters)',
            validation: (Rule) => Rule.max(160).warning('Long descriptions may be truncated by search engines'),
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Keywords for search engines',
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            description: 'The preferred URL of this page to avoid duplicate content',
        }),
        defineField({
            name: 'robots',
            title: 'Robots Meta',
            type: 'object',
            fields: [
                { name: 'noIndex', type: 'boolean', title: 'No Index' },
                { name: 'noFollow', type: 'boolean', title: 'No Follow' },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            }
        }),
        defineField({
            name: 'openGraph',
            title: 'Open Graph (Social Sharing)',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    description: 'Heads up! Keep it under 60 characters.'
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                    description: 'Keep it under 160 characters.'
                },
                {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                    description: 'Recommended size: 1200x630 (Facebook), 400x400 (WhatsApp)'
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            }
        }),
    ],
})
