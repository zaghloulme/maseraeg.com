
import Link from 'next/link'
import Image from 'next/image'
import type { HeroSection } from '@/lib/cms/types/dtos'

export default function Hero({ data }: { data: HeroSection }) {
    if (!data) return null

    return (
        <section className="relative overflow-hidden bg-muted py-12 md:py-24">
            <div className="container relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                        {data.title}
                    </h1>
                    {data.subtitle && (
                        <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-lg">
                            {data.subtitle}
                        </p>
                    )}
                    {data.ctaLink && (
                        <Link
                            href={data.ctaLink}
                            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {data.ctaText || 'Shop Now'}
                        </Link>
                    )}
                </div>
                {data.image?.url && (
                    <div className="flex-1">
                        <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-xl border bg-background shadow-xl">
                            <Image
                                src={data.image.url}
                                alt={data.image.alt || data.title || 'Hero'}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

