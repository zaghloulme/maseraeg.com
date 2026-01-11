
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'features' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage',
      }
    },
  },
})
