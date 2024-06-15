import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import tsconfigPaths from 'vite-tsconfig-paths'

const building = process.env.NODE_ENV === 'production'

export default defineConfig({
    plugins: [
        Inspect(),

        remix({
            appDirectory: 'src',
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
    ssr: {
        noExternal: building || undefined,
    },
    legacy: {
        proxySsrExternalModules: true,
    },
})
