'use client'

/**
 * Header Component
 * Generic navigation bar
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { SiteSettingsDTO } from '@/lib/cms/types/dtos'
import AnnouncementBar from './AnnouncementBar'

interface HeaderProps {
  storeName: string
  siteSettings?: SiteSettingsDTO | null
}

export default function Header({ storeName, siteSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm' : 'bg-background border-b border-border'}`}>
      {/* Announcement Bar */}
      {siteSettings?.announcementBar?.enabled && siteSettings?.announcementBar?.message && (
        <AnnouncementBar
          message={siteSettings.announcementBar.message}
          backgroundColor={siteSettings.announcementBar.backgroundColor}
          textColor={siteSettings.announcementBar.textColor}
        />
      )}

      {/* Main Navigation */}
      <nav className="container mx-auto" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            {siteSettings?.headerLogo?.url ? (
              <div className="relative h-10 md:h-12 w-auto aspect-[3/1]">
                <Image
                  src={siteSettings.headerLogo.url}
                  alt={siteSettings.headerLogo.alt || storeName}
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 120px, 160px"
                  priority
                />
              </div>
            ) : (
              <span className="text-xl font-bold text-foreground">
                {storeName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="py-4 space-y-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}