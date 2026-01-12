'use client'

import { FeaturesSection } from '@/lib/menu'
import * as Icons from 'lucide-react'

interface FeaturesProps {
    data: FeaturesSection
}

export default function Features({ data }: FeaturesProps) {
    if (!data.items?.length) return null

    return (
        <section className="py-24 bg-[var(--color-bg-secondary)]/30 border-y border-[var(--color-border)]">
            <div className="container-narrow">
                {data.title && (
                    <h2 className="text-3xl font-serif text-[var(--color-gold)] text-center mb-16 animate-fade-in-up">
                        {data.title}
                    </h2>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
                    {data.items.map((item, idx) => {
                        // Dynamic icon lookup from Lucide
                        const IconComponent = item.icon ? (Icons as any)[item.icon] : null

                        return (
                            <div
                                key={idx}
                                className="text-center group animate-fade-in-up"
                                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                            >
                                {IconComponent && (
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[#1c3149] transition-all duration-500">
                                            <IconComponent size={24} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                )}
                                <h3 className="text-xl font-serif text-[var(--color-cream)] mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
