export const env = {
    //
    PUBLIC_URL: process.env.PUBLIC_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

// for (let k in env) {
//     if (
//         env[k] == null &&
//         (typeof window === 'undefined' || k.includes('PUBLIC'))
//     ) {
//         throw new Error(`Missing env var ${k}`)
//     }
// }
