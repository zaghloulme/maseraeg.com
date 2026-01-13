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
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'tiktok', type: 'url', title: 'TikTok URL' },
        { name: 'talabat', type: 'url', title: 'Talabat URL' }
      ]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Global Contact Info',
      type: 'object',
      fields: [
        {
          name: 'phoneNumbers',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Phone Numbers (Footer)'
        },
        {
          name: 'workingHours',
          type: 'string',
          title: 'Working Hours Text'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Homepage Hero',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 },
        { name: 'image', type: 'image', title: 'Hero Image', options: { hotspot: true } },
        { name: 'ctaText', type: 'string', title: 'CTA Text' },
        { name: 'ctaLink', type: 'string', title: 'CTA Link' }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Homepage Features',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' }
          ]
        }
      ]
    }),
  ],
  groups: [
    { name: 'settings', title: 'Settings', default: true },
    { name: 'content', title: 'Homepage Content' },
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: {
      _type: '_type',
    },
    prepare() {
      return { title: 'Site Settings' }
    }
  }
})
