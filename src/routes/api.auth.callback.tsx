import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { getSupabaseWithHeaders } from '../lib/supabase.server'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const next = url.searchParams.get('next') || '/x'

    if (code) {
        const { headers, supabase } = getSupabaseWithHeaders({
            request,
        })

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.log('Error: auth callback ', error)
        }
        return redirect(next, { headers })
    }

    return redirect('/x')
}
