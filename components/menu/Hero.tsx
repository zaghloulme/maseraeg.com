'use client'

import Link from 'next/link'

interface HeroProps {
    showPrices?: boolean
    branchName?: string
}

export default function Hero({ showPrices = false, branchName }: HeroProps) {
    return (
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 flourish animate-float opacity-20">❧</div>
                <div className="absolute bottom-20 right-10 flourish animate-float opacity-20" style={{ animationDelay: '2s' }}>❧</div>
                <div className="absolute top-1/2 left-5 flourish animate-float opacity-10" style={{ animationDelay: '4s' }}>✦</div>
            </div>

            {/* Logo */}
            <div className="relative z-10 animate-fade-in-up">
                <h1
                    className="font-script text-5xl md:text-7xl lg:text-8xl mb-4"
                    style={{
                        color: 'var(--masera-cream)',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    Ma Sera
                </h1>

                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--masera-gold)]" />
                    <span className="text-[var(--masera-gold)] text-lg">✦</span>
                    <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--masera-gold)]" />
                </div>

                {/* Tagline */}
                <p
                    className="text-lg md:text-xl tracking-wide opacity-90 stagger-1 animate-fade-in-up"
                    style={{ color: 'var(--masera-cream)' }}
                >
                    Every Hour, a New Memory
                </p>

                {/* Branch Name (if viewing branch menu) */}
                {branchName && (
                    <div className="mt-6 stagger-2 animate-fade-in-up">
                        <span className="bg-[var(--glass-bg-light)] px-4 py-2 rounded-full text-sm border border-[var(--glass-border)]">
                            📍 {branchName}
                        </span>
                    </div>
                )}

                {/* Price Notice */}
                <p className="mt-8 text-sm opacity-60 stagger-3 animate-fade-in-up">
                    {showPrices
                        ? '(Prices exclude 14% VAT)'
                        : 'Scan QR at our branches for menu with prices'
                    }
                </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-10 z-10 stagger-4 animate-fade-in-up">
                <Link
                    href="https://www.instagram.com/masera.eg/"
                    target="_blank"
                    className="btn-secondary flex items-center gap-2"
                    aria-label="Follow us on Instagram"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                </Link>
                <Link
                    href="https://www.facebook.com/p/Ma-Sera-61571401528468/"
                    target="_blank"
                    className="btn-secondary flex items-center gap-2"
                    aria-label="Follow us on Facebook"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}
