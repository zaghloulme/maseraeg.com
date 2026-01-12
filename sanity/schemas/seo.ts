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
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Image displayed when sharing on social media',
            options: {
                hotspot: true,
            },
        }),
    ],
})
