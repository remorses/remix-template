import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSupabaseSession } from '../lib/supabase.server'

export let loader = async ({ request }: LoaderFunctionArgs) => {
    const { headers, user, redirectTo } = await getSupabaseSession({
        request,
    })
    if (redirectTo) {
        return redirectTo
    }

    return json({ user }, { headers })
}

export default function Page() {
    const { user } = useLoaderData<any>()

    return (
        <>
            <div className='flex gap-12 pt-24 flex-col items-center justify-center'>
                <pre className=''>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </>
    )
}
