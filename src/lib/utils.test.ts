import { replaceText } from '@/pages/api/replace-text'
import { test, expect } from 'vitest'

test('replaceText', async () => {
    const gen = await replaceText({
        description: 'a shoes shop',
        oldText: [
            { text: 'the best shoes shop on the planet' },
            {
                text: 'use this template to create a new page for your shoes shop',
            },
            {
                text: 'available in every part of the world for your convenience',
            },
            { text: 'close cookies to enhance your shopping experience' },
        ].map((x, i) => ({ text: x.text, id: i })),
    })

    for await (const res of gen()) {
        // console.log(res)
    }
})
