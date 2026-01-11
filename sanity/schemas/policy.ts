/**
 * Policy Schema
 * For store policies like Return Policy, Shipping Policy, Privacy Policy, etc.
 * Each policy is a separate document accessible at /policy/[slug]
 */

import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'policy',
    title: 'Policy',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Policy Title',
            type: 'string',
            description: 'e.g., "Return Policy", "Shipping Policy", "Privacy Policy"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly name (e.g., "return", "shipping", "privacy")',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Emoji or icon name to display alongside the policy title',
            initialValue: '📄',
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 2,
            description: 'Brief summary shown in policy listings',
        }),
        defineField({
            name: 'content',
            title: 'Policy Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Heading 4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule) =>
                                            Rule.uri({
                                                scheme: ['http', 'https', 'mailto', 'tel'],
                                            }),
                                    },
                                ],
                            },
                        ],
                    },
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                },
            ],
            description: 'Full policy content with rich text formatting',
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'date',
            description: 'When was this policy last updated?',
            options: {
                dateFormat: 'MMMM D, YYYY',
            },
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            description: 'Toggle to show/hide this policy on the website',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in policy listings (lower numbers appear first)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            icon: 'icon',
            isPublished: 'isPublished',
        },
        prepare({ title, icon, isPublished }) {
            return {
                title: `${icon || '📄'} ${title}`,
                subtitle: isPublished ? 'Published' : 'Draft',
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Title A-Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
