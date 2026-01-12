import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'branch',
    title: 'Branch',
    type: 'document',
    icon: () => '🏪',
    fields: [
        defineField({
            name: 'name',
            title: 'Branch Name',
            type: 'string',
            description: 'e.g., Semouha, Roushdy, Sidi Gaber',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description: 'Used in the QR menu URL: /branch/[slug]',
            options: {
                source: 'name',
                maxLength: 50,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'Include country code, e.g., +201234567890',
        }),
        defineField({
            name: 'operatingHours',
            title: 'Operating Hours',
            type: 'text',
            rows: 3,
            description: 'e.g., Daily: 8:00 AM - 11:00 PM',
        }),
        defineField({
            name: 'googleMapsUrl',
            title: 'Google Maps URL',
            type: 'url',
            description: 'Link to Google Maps location',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Show this branch on the website',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'address',
        },
    },
})
