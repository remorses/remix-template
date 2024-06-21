import { createClient } from '@supabase/supabase-js'
import { redirect } from '@remix-run/node'
import { createServerClient, parse, serialize } from '@supabase/ssr'

import { env } from './env'

export function createSupabaseAdmin() {
    return createClient<any>(
        env.PUBLIC_SUPABASE_URL!,
        env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            }, //
        },
    )
}

export function createSupabaseAnon() {
    return createClient<any>(
        env.PUBLIC_SUPABASE_URL!,
        env.PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            }, //
        },
    )
}

export function getSupabaseWithHeaders({ request }: { request: Request }) {
    const cookies = parse(request.headers.get('Cookie') ?? '')
    const headers = new Headers()

    const supabase = createServerClient(
        env.PUBLIC_SUPABASE_URL!,
        env.PUBLIC_SUPABASE_ANON_KEY!,
        {
            // jwtSecret: process.env.SUPABASE_JWT_SECRET,

            cookies: {
                get(key) {
                    return cookies[key]
                },
                set(key, value, options) {
                    headers.append('Set-Cookie', serialize(key, value, options))
                },
                remove(key, options) {
                    headers.append('Set-Cookie', serialize(key, '', options))
                },
            },
            auth: {
                detectSessionInUrl: true,
                flowType: 'pkce',
            },
        },
    )

    return { supabase, headers }
}

export async function getSupabaseSession({ request }: { request: Request }) {
    const { supabase, headers } = getSupabaseWithHeaders({
        request,
    })
    const [
        {
            data: { session },
        },
        {
            data: { user },
        },
    ] = await Promise.all([
        supabase.auth.getSession(), //
        supabase.auth.getUser(),
    ])
    const userId = user?.id as string
    let redirectTo: Response | undefined
    if (!userId) {
        redirectTo = redirect('/login', { headers })
    }

    return { session, headers, supabase, userId, user, redirectTo }
}
