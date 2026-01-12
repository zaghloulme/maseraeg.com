import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[var(--color-bg-primary)]">
            {/* Logo */}
            <Image
                src="/images/logo.png"
                alt="Ma Sera"
                width={300}
                height={225}
                priority
                className="w-[200px] md:w-[300px] brightness-0 invert opacity-90 mb-8"
                style={{ height: 'auto' }}
            />

            {/* Divider */}
            <div className="divider mb-8">
                <span className="divider-icon text-[var(--color-gold)]">✦</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif italic text-[var(--color-cream)] mb-4">
                Page Not Found
            </h1>

            {/* Description */}
            <p className="text-[var(--color-text-muted)] mb-10 max-w-md">
                The page you are looking for does not exist.
            </p>

            {/* CTA Button */}
            <Link href="/" className="btn-primary">
                Back to Menu
            </Link>
        </main>
    )
}
