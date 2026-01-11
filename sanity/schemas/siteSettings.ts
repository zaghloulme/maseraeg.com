import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headerLogo',
      title: 'Header Logo',
      type: 'image',
      description: 'Logo displayed in the header/navbar',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Logo displayed in the footer (can be different from header)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
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
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      description: 'Company description shown in footer'
    }),
    defineField({
      name: 'address',
      title: 'Store Address',
      type: 'string',
      description: 'Physical address displayed in footer (e.g. 123 Tech Street, Downtown)'
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Location URL',
      type: 'url',
      description: 'Google Maps link to your store location (e.g., https://maps.app.goo.gl/...)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
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
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      description: 'Top banner message (closable by users)',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Announcement Bar',
          initialValue: true
        },
        {
          name: 'message',
          type: 'string',
          title: 'Announcement Message',
          description: 'e.g., "Free shipping on orders over $200"'
        },
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          description: 'CSS gradient or color (e.g., "linear-gradient(to right, #3b82f6, #1e40af)")',
          initialValue: 'linear-gradient(to right, #3b82f6, #1e40af)'
        },
        {
          name: 'textColor',
          type: 'string',
          title: 'Text Color',
          description: 'CSS color value',
          initialValue: '#ffffff'
        }
      ]
    }),
    defineField({
      name: 'dealsPageBackground',
      title: 'Deals Page Background',
      type: 'image',
      description: 'Optional custom background image for the Deals page hero section. If not set, uses default blue/green gradient.',
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
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'object',
      description: 'Default SEO settings for the entire site',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title displayed in search engine results (often used as default)',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description displayed in search engine results',
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
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    }
  }
})
