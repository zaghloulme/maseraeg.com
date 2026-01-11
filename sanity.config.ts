'use client'

/**
 * Sanity Studio Configuration
 * This file configures the Sanity Studio for Ma Sera Egypt
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '27p8z5ah'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Singleton document types
const singletonTypes = new Set(['homepage', 'siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Ma Sera Egypt',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Menu Management
            S.listItem()
              .title('🍽️ Menu')
              .child(
                S.list()
                  .title('Menu Management')
                  .items([
                    S.documentTypeListItem('branch').title('🏪 Branches'),
                    S.documentTypeListItem('menuCategory').title('📂 Categories'),
                    S.documentTypeListItem('menuItem').title('🍴 Menu Items'),
                  ])
              ),
            S.divider(),
            // Singletons
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Regular document types (filtered)
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() || '') &&
                !['branch', 'menuCategory', 'menuItem'].includes(item.getId() || '')
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
