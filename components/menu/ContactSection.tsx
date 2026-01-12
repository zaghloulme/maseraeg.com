import Link from 'next/link'
import Image from 'next/image'
import { SiteSettings } from '@/lib/menu/queries'
import { Instagram, Facebook } from 'lucide-react'

// TikTok icon component (not in lucide-react)
const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
)

interface Branch {
    name: string
    address?: string
    phone?: string
    operatingHours?: string
    googleMapsUrl?: string
}

interface ContactSectionProps {
    branches?: Branch[]
    siteSettings?: SiteSettings
}

export default function ContactSection({ branches = [], siteSettings }: ContactSectionProps) {
    const { socialLinks, contactInfo } = siteSettings || {}

    return (
        <footer className="footer-elegant">
            {/* Logo */}
            <Image
                src="/images/logo.png"
                alt="Ma Sera"
                width={200}
                height={150}
                className="mx-auto mb-8 w-[150px] brightness-0 invert opacity-80"
                style={{ height: 'auto' }}
            />

            {/* Divider */}
            <div className="divider">
                <span className="divider-icon text-[var(--color-gold)]">✦</span>
            </div>

            {/* Locations & Contact Grid */}
            <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-1 gap-8 text-center">

                {/* 1. Address Section */}
                <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#c9a961' }}>
                        Our Locations
                    </h3>

                    <div className="flex flex-col gap-6 items-center">
                        {branches.map((branch, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                {branch.googleMapsUrl ? (
                                    <Link
                                        href={branch.googleMapsUrl}
                                        target="_blank"
                                        className="text-base font-serif text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors inline-flex items-center gap-2 justify-center"
                                    >
                                        {branch.name}
                                        <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </Link>
                                ) : (
                                    <span className="text-base font-serif text-[var(--color-cream)]">{branch.name}</span>
                                )}

                                {branch.address && (
                                    <p className="text-sm text-[var(--color-text-muted)] max-w-xs mx-auto">
                                        {branch.address}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Global Contact & Hours */}
                <div className="space-y-6 mt-8">
                    {contactInfo?.phoneNumbers && contactInfo.phoneNumbers.length > 0 && (
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: '#c9a961' }}>
                                Contact Us
                            </h3>
                            <a href={`tel:${contactInfo.phoneNumbers[0].replace(/\s/g, '')}`} className="text-lg md:text-xl font-serif text-[var(--color-cream)] hover:text-white transition-colors">
                                {contactInfo.phoneNumbers.join(' - ')}
                            </a>
                        </div>
                    )}

                    {contactInfo?.workingHours && (
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: '#c9a961' }}>
                                Working Hours
                            </h3>
                            <p className="text-base text-[var(--color-text-muted)] font-serif">
                                {contactInfo.workingHours}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Social Links with Icons */}
            <div className="flex flex-col items-center gap-6 mb-8">
                {/* Row 1: Social Icons */}
                <div className="flex items-center gap-6 justify-center">
                    {socialLinks?.instagram && (
                        <Link
                            href={socialLinks.instagram}
                            target="_blank"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={22} />
                        </Link>
                    )}
                    {socialLinks?.facebook && (
                        <Link
                            href={socialLinks.facebook}
                            target="_blank"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={22} />
                        </Link>
                    )}
                    {socialLinks?.tiktok && (
                        <Link
                            href={socialLinks.tiktok}
                            target="_blank"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
                            aria-label="TikTok"
                        >
                            <TikTokIcon />
                        </Link>
                    )}
                </div>

                {/* Row 2: Talabat */}
                {socialLinks?.talabat && (
                    <Link
                        href={socialLinks.talabat}
                        target="_blank"
                        className="px-6 py-2 border border-[var(--color-gold)] text-[var(--color-gold)] rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-[#1c3149] transition-all"
                    >
                        Order on Talabat
                    </Link>
                )}
            </div>

            {/* Copyright */}
            <p className="footer-copyright text-xs opacity-40 mt-12">
                © {new Date().getFullYear()} Ma Sera. All rights reserved.
            </p>
        </footer >
    )
}
