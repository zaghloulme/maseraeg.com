import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
            <h1 className="title-hero mb-4">Ma Sera</h1>
            <div className="divider">
                <span className="divider-icon">✦</span>
            </div>
            <h2 className="title-section mb-6">Page Not Found</h2>
            <p className="text-[var(--color-text-muted)] mb-8">
                The page you are looking for does not exist.
            </p>
            <Link href="/" className="btn-primary">
                Back to Menu
            </Link>
        </main>
    )
}
