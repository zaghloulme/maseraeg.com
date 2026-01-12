'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        // Short delay to ensure content is ready
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1200)

        // Remove from DOM after animation completes
        const removeTimer = setTimeout(() => {
            setIsAnimating(false)
        }, 2400)

        return () => {
            clearTimeout(timer)
            clearTimeout(removeTimer)
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
