import { z } from 'zod'

// Shared Image Schema
export const ImageSchema = z.object({
    url: z.string().url().default(''),
    alt: z.string().optional().default(''),
    width: z.number().optional(),
    height: z.number().optional(),
    blurDataURL: z.string().optional(),
}).default({ url: '', alt: '' })

// 1. Hero Section
export const HeroSchema = z.object({
    _type: z.literal('hero'),
    _key: z.string().optional(),
    title: z.string().min(1, "Title is required").default('New Hero'),
    subtitle: z.string().optional(),
    image: ImageSchema.optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
})

// 2. Features Section
export const FeatureItemSchema = z.object({
    title: z.string().min(1).default('Feature'),
    description: z.string().optional().default(''),
    icon: z.string().optional(),
})

export const FeaturesSchema = z.object({
    _type: z.literal('features'),
    _key: z.string().optional(),
    title: z.string().optional(),
    items: z.array(FeatureItemSchema).default([]),
})

// Union of all sections
export const SectionSchema = z.discriminatedUnion('_type', [
    HeroSchema,
    FeaturesSchema,
])

// Homepage Schema
export const HomepageSchema = z.object({
    sections: z.array(SectionSchema).default([]),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
    }).optional(),
})

export type Image = z.infer<typeof ImageSchema>
export type HeroSection = z.infer<typeof HeroSchema>
export type FeatureItem = z.infer<typeof FeatureItemSchema>
export type FeaturesSection = z.infer<typeof FeaturesSchema>
export type Section = z.infer<typeof SectionSchema>
export type Homepage = z.infer<typeof HomepageSchema>
