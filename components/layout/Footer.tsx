
/**
 * Footer Component
 * Site footer with location, WhatsApp contact, and copyright info
 */

import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettingsDTO } from '@/lib/cms/types'


interface FooterProps {
  storeName: string
  storeLocation?: string
  siteSettings?: SiteSettingsDTO | null
}

export default function Footer({
  storeName,
  storeLocation,
  siteSettings,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-auto relative overflow-hidden">
      {/* Decorative mesh overlay */}
      <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />

      <div className="container mx-auto py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Company Info */}
          <div>
            {siteSettings?.footerLogo?.url ? (
              <div className="relative h-10 md:h-14 w-auto aspect-[2.2/1] mb-6">
                <Image
                  src={siteSettings.footerLogo.url}
                  alt={siteSettings.footerLogo.alt || storeName}
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 160px, 200px"
                />
              </div>
            ) : (
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {storeName}
              </h3>
            )}
            {(siteSettings?.address || storeLocation) && (
              siteSettings?.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 mb-4 flex items-start gap-3 hover:text-accent transition-colors group"
                >
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="underline decoration-dotted underline-offset-2">{siteSettings?.address || storeLocation}</span>
                </a>
              ) : (
                <p className="text-gray-300 mb-4 flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{siteSettings?.address || storeLocation}</span>
                </p>
              )
            )}
            <p className="text-gray-300 text-sm leading-relaxed">
              {siteSettings?.footerDescription || 'Leading tech and laptop retailer serving the community with quality products and excellent service.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {siteSettings?.quickLinks && siteSettings.quickLinks.length > 0 ? (
                siteSettings.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-300 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                    >
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {link.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-300 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                    >
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-gray-300 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                    >
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      Products
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              Contact Us
            </h4>
            {/* Contact info placeholder */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-accent font-semibold">{storeName}</span>. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div >
    </footer >
  )
}
