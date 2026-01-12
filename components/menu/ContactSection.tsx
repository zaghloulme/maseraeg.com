import Link from 'next/link'
import Image from 'next/image'

interface Branch {
    name: string
    address?: string
    phone?: string
    operatingHours?: string
    googleMapsUrl?: string
}

interface ContactSectionProps {
    branches?: Branch[]
}

export default function ContactSection({ branches = [] }: ContactSectionProps) {
    return (
        <footer className="footer-elegant">
            {/* Logo */}
            <Image
                src="/images/logo.png"
                alt="Ma Sera"
                width={200}
                height={150}
                className="mx-auto mb-4 w-[150px] h-auto brightness-0 invert opacity-80"
            />

            {/* Divider */}
            <div className="divider">
                <span className="divider-icon">✦</span>
            </div>

            {/* Locations */}
            {branches.length > 0 && (
                <div className="max-w-md mx-auto mb-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-4">
                        Our Locations
                    </h3>
                    <div className="space-y-4">
                        {branches.map((branch, index) => (
                            <div key={index} className="text-sm">
                                {branch.googleMapsUrl ? (
                                    <>
                                        <Link
                                            href={branch.googleMapsUrl}
                                            target="_blank"
                                            className="text-[var(--color-cream)] font-medium hover:text-[var(--color-gold)] transition-colors"
                                        >
                                            {branch.name} ↗
                                        </Link>
                                        {branch.address && (
                                            <p className="text-[var(--color-text-muted)]">
                                                {branch.address}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[var(--color-cream)] font-medium">{branch.name}</p>
                                        {branch.address && (
                                            <p className="text-[var(--color-text-muted)]">{branch.address}</p>
                                        )}
                                    </>
                                )}
                                {branch.phone && (
                                    <div className="mt-2 text-[var(--color-text-muted)]">
                                        <p className="text-[var(--color-gold)] text-xs uppercase tracking-wider mb-0.5">Contact Us</p>
                                        <p>{branch.phone}</p>
                                    </div>
                                )}
                                {branch.operatingHours && (
                                    <div className="mt-2 text-[var(--color-text-muted)]">
                                        <p className="text-[var(--color-gold)] text-xs uppercase tracking-wider mb-0.5">Working Hours</p>
                                        <p>{branch.operatingHours}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )
            }

            {/* Social Links */}
            <div className="footer-links">
                <Link
                    href="https://www.instagram.com/masera.eg/"
                    target="_blank"
                    className="footer-link"
                >
                    Instagram
                </Link>
                <Link
                    href="https://www.facebook.com/p/Ma-Sera-61571401528468/"
                    target="_blank"
                    className="footer-link"
                >
                    Facebook
                </Link>
                <Link
                    href="https://www.talabat.com/egypt/ma-sera"
                    target="_blank"
                    className="footer-link"
                >
                    Order on Talabat
                </Link>
            </div>

            {/* Copyright */}
            <p className="footer-copyright">
                © {new Date().getFullYear()} Ma Sera. All rights reserved.
            </p>
        </footer >
    )
}
