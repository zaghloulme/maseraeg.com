import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Check if product has a valid discount
 */
export function hasDiscount(price: number, salePrice?: number | null): boolean {
    return !!(price && salePrice && price > salePrice)
}
