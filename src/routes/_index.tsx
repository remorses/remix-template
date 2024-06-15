import { Button } from '@nextui-org/react'
import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ]
}

export default function Index() {
    return (
        <div className='flex flex-col h-full items-center'>
            <div className='text-8xl'>Hello</div>
            <Link to='/login'>
                <Button>Login</Button>
            </Link>
        </div>
    )
}
