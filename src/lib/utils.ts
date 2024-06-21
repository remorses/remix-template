import { env } from './env'

export function loginRedirectUrl({ next = '' }) {
    const u = new URL('/api/auth/callback', env.PUBLIC_URL)
    if (next) {
        u.searchParams.set('next', new URL(next, env.PUBLIC_URL).toString())
    }
    return u.toString()
}
