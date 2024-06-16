import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { getSupabaseWithHeaders } from '../lib/supabase.server'
import { notifyError } from '../lib/errors'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code') || ''
    const type = url.searchParams.get('type') || ''
    const next = url.searchParams.get('next') || '/x'

    if (code) {
        const { headers, supabase } = getSupabaseWithHeaders({
            request,
        })

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            notifyError(error, 'Error exchanging code for session')
        }
        return redirect(next, { headers })
    }
    if (type === 'magiclink') {
        const { headers, supabase } = getSupabaseWithHeaders({
            request,
        })
        const token_hash = url.searchParams.get('token_hash') || ''
        const { error } = await supabase.auth.verifyOtp({ token_hash, type })

        if (error) {
            notifyError(error, 'Error verifying OTP')
        }
        return redirect(next, { headers })
    }
    return redirect(next)
}
