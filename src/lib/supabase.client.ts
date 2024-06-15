import { createClient } from '@supabase/supabase-js'
import { env } from './env'

export const supabase = createClient<any>(
    env.PUBLIC_SUPABASE_URL!,
    env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            flowType: 'pkce',
        },
    },
)
