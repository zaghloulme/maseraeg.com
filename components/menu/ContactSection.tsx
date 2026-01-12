import Link from 'next/link'

interface Branch {
    name: string
    address?: string
    phone?: string
    whatsapp?: string
    operatingHours?: string
}

interface ContactSectionProps {
    branches?: Branch[]
}

export default function ContactSection({ branches = [] }: ContactSectionProps) {
    const whatsappNumber = branches[0]?.whatsapp || '+201234567890'
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

    return (
        <footer className="footer-elegant">
            {/* Logo */}
            <div className="footer-logo">Ma Sera</div>
            <p className="footer-tagline">Every Hour, a New Memory</p>

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
                                <p className="text-[var(--color-cream)] font-medium">{branch.name}</p>
                                {branch.address && (
                                    <p className="text-[var(--color-text-muted)]">{branch.address}</p>
                                )}
                                {branch.operatingHours && (
                                    <p className="text-[var(--color-text-muted)] text-xs mt-1">
                                        {branch.operatingHours}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contact Button */}
            <Link
                href={whatsappLink}
                target="_blank"
                className="btn-primary"
            >
                Reserve via WhatsApp
            </Link>

            {/* Social Links */}
            <div className="footer-links mt-8">
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
        </footer>
    )
}
