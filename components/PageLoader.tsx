'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        // Lock scroll during loading
        document.body.classList.add('loading')
        document.documentElement.style.overflow = 'hidden'

        // Start reveal after logo animation
        const revealTimer = setTimeout(() => {
            setIsLoading(false)
        }, 1200)

        // Unlock scroll and trigger content animations
        const unlockTimer = setTimeout(() => {
            document.body.classList.remove('loading')
            document.body.classList.add('loaded')
            document.documentElement.style.overflow = ''
        }, 2000)

        // Remove loader from DOM
        const removeTimer = setTimeout(() => {
            setIsAnimating(false)
        }, 2800)

        return () => {
            clearTimeout(revealTimer)
            clearTimeout(unlockTimer)
            clearTimeout(removeTimer)
            document.body.classList.remove('loading')
            document.documentElement.style.overflow = ''
        }
    }, [])

    if (!isAnimating) return null

    return (
        <div
            className={`page-loader ${isLoading ? 'loading' : 'loaded'}`}
            aria-hidden="true"
        >
            {/* Logo pulse */}
            <div className="loader-logo">
                <Image
                    src="/images/logo.png"
                    alt=""
                    width={200}
                    height={150}
                    priority
                    className="brightness-0 invert"
                />
            </div>

            {/* Curtain panels */}
            <div className="curtain curtain-left" />
            <div className="curtain curtain-right" />
        </div>
    )
}
