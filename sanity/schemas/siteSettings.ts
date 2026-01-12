import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon displayed in browser tabs (recommended: 32x32px or 64x64px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Footer Quick Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Link Title' },
          { name: 'url', type: 'string', title: 'URL' }
        ]
      }],
      validation: Rule => Rule.max(6)
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    }
  }
})
