'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/lib/menu'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
    showPrices?: boolean
    branchName?: string
    data?: HeroSection
}

export default function Hero({ showPrices = false, branchName, data }: HeroProps) {
    const content = {
        title: data?.title,
        subtitle: data?.subtitle || "Where culinary artistry meets cherished moments.\nEach dish tells a story, each visit becomes a memory.",
        ctaText: data?.ctaText || "Explore Menu",
        ctaLink: data?.ctaLink || "#menu",
        image: data?.image
    }

    return (
        <section className="hero-landing">
            {/* Branch Name - only on branch pages */}
            {branchName && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[var(--color-gold)] opacity-50 text-sm tracking-[0.3em] uppercase animate-fade-in">
                    {branchName} Branch
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Logo or Hero Image */}
                <div className="animate-fade-in-up">
                    {content.image ? (
                        <Image
                            src={urlFor(content.image).width(800).url()}
                            alt={content.title || "Ma Sera"}
                            width={400}
                            height={300}
                            priority
                            className="mx-auto w-[280px] md:w-[400px] h-auto"
                        />
                    ) : (
                        <Image
                            src="/images/logo.png"
                            alt="Ma Sera - Every Hour, a New Memory"
                            width={400}
                            height={300}
                            priority
                            className="mx-auto w-[280px] md:w-[400px] brightness-0 invert"
                            style={{ height: 'auto' }}
                        />
                    )}
                </div>

                {/* Title (if text based and NO image?) OR if title provided */}
                {content.title && !content.image && (
                    <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-gold)] mt-8">{content.title}</h1>
                )}

                {/* Story Text */}
                <p className="mt-4 text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed animate-fade-in-up delay-2 whitespace-pre-line">
                    {content.subtitle}
                </p>

                {/* CTA Button */}
                <div className="mt-10 animate-fade-in-up delay-3">
                    <Link href={content.ctaLink} className="btn-primary">
                        {content.ctaText}
                    </Link>
                </div>

                {/* Price Notice */}
                <p className="mt-12 text-xs text-[var(--color-text-muted)] tracking-wider uppercase animate-fade-in-up delay-4">
                    {showPrices
                        ? 'Prices exclude 14% VAT'
                        : 'Visit us to view our full menu with prices'
                    }
                </p>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float opacity-40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}
