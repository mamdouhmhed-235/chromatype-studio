/**
 * Seeded Pseudo-Random Number Generator (Mulberry32)
 * Deterministic results for the same seed.
 */
export class PRNG {
    private seed: number

    constructor(seed: number | string) {
        if (typeof seed === "string") {
            this.seed = this.hashString(seed)
        } else {
            this.seed = seed
        }
    }

    // Simple string hashing to integer
    private hashString(str: string): number {
        let hash = 0,
            i,
            chr
        if (str.length === 0) return hash
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i)
            hash = (hash << 5) - hash + chr
            hash |= 0 // Convert to 32bit integer
        }
        return Math.abs(hash)
    }

    // Mulberry32 algorithm
    next(): number {
        let t = (this.seed += 0x6d2b79f5)
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    // Float between 0 and 1
    random(): number {
        return this.next()
    }

    // Float between min and max
    range(min: number, max: number): number {
        return min + this.next() * (max - min)
    }

    // Integer between min and max (inclusive)
    rangeInt(min: number, max: number): number {
        return Math.floor(this.range(min, max + 1))
    }

    // Pick random element from array
    pick<T>(arr: T[]): T {
        return arr[this.rangeInt(0, arr.length - 1)]
    }

    // Pick N random elements from array
    pickMultiple<T>(arr: T[], n: number): T[] {
        const shuffled = [...arr].sort(() => 0.5 - this.next())
        return shuffled.slice(0, n)
    }

    // Boolean with probability
    bool(chance = 0.5): boolean {
        return this.next() < chance
    }
}
