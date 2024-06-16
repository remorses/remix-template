import { env } from './env'

export function loginRedirectUrl({ next = '' }) {
    const u = new URL('/api/auth/callback', env.PUBLIC_URL)
    if (next) {
        u.searchParams.set('next', next)
    }
    return u.toString()
}
