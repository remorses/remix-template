import { LoaderFunctionArgs } from '@remix-run/node'


export async function loader({ request }: LoaderFunctionArgs) {
    // allow cors from anywhere
    return Response.json({ ok: true })
}
