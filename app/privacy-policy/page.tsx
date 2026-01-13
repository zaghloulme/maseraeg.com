import { client } from '@/sanity/lib/client'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import Link from 'next/link'
import { Metadata } from 'next'

interface PrivacyPolicy {
    title: string
    content: PortableTextBlock[]
    effectiveDate: string
    lastUpdated: string
}

async function getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
    return client.fetch(`*[_type == "privacyPolicy"][0]{
    title,
    content,
    effectiveDate,
    lastUpdated
  }`)
}

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy policy and cookie usage information for Ma Sera Egypt',
}

export default async function PrivacyPolicyPage() {
    const policy = await getPrivacyPolicy()

    if (!policy) {
        return (
            <main className="min-h-screen py-20 bg-[var(--color-bg-primary)]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-serif text-[var(--color-gold)] mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-[var(--color-text-muted)] mb-8">
                        Privacy policy content is being updated. Please check back soon.
                    </p>
                    <Link href="/" className="btn-primary">
                        Back to Menu
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen py-20 bg-[var(--color-bg-primary)]">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Menu
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-gold)] mb-4">
                        {policy.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-[var(--color-text-muted)]">
                        <div>
                            <span className="font-semibold">Effective Date:</span>{' '}
                            {new Date(policy.effectiveDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div>
                            <span className="font-semibold">Last Updated:</span>{' '}
                            {new Date(policy.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-gold max-w-none">
                    <PortableText
                        value={policy.content}
                        components={{
                            block: {
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-4">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-serif text-[var(--color-gold-light)] mt-8 mb-3">
                                        {children}
                                    </h3>
                                ),
                                normal: ({ children }) => (
                                    <p className="text-[var(--color-text-primary)] leading-relaxed mb-4">
                                        {children}
                                    </p>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-[var(--color-gold)] pl-4 italic text-[var(--color-text-secondary)] my-6">
                                        {children}
                                    </blockquote>
                                ),
                            },
                            list: {
                                bullet: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-2 text-[var(--color-text-primary)] mb-4">
                                        {children}
                                    </ul>
                                ),
                                number: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-2 text-[var(--color-text-primary)] mb-4">
                                        {children}
                                    </ol>
                                ),
                            },
                            marks: {
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-[var(--color-cream)]">{children}</strong>
                                ),
                                em: ({ children }) => <em className="italic">{children}</em>,
                                code: ({ children }) => (
                                    <code className="bg-[var(--color-bg-secondary)] px-2 py-1 rounded text-sm font-mono">
                                        {children}
                                    </code>
                                ),
                                link: ({ children, value }) => (
                                    <a
                                        href={value?.href}
                                        className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] underline transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                            },
                        }}
                    />
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-[var(--color-border-subtle)]">
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                    <Link href="/" className="btn-primary">
                        Back to Menu
                    </Link>
                </div>
            </div>
        </main>
    )
}
