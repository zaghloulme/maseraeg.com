'use client'

import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
    showPrices?: boolean
    branchName?: string
}

export default function Hero({ showPrices = false, branchName }: HeroProps) {
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
                {/* Logo Image */}
                <div className="animate-fade-in-up">
                    <Image
                        src="/images/logo.png"
                        alt="Ma Sera - Every Hour, a New Memory"
                        width={400}
                        height={300}
                        priority
                        className="mx-auto w-[280px] md:w-[400px] h-auto brightness-0 invert"
                    />
                </div>

                {/* Story Text */}
                <p className="mt-4 text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed animate-fade-in-up delay-2">
                    Where culinary artistry meets cherished moments.
                    Each dish tells a story, each visit becomes a memory.
                </p>

                {/* CTA Button */}
                <div className="mt-10 animate-fade-in-up delay-3">
                    <Link href="#menu" className="btn-primary">
                        Explore Menu
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
