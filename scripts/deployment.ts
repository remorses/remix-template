import {
    shell,
    getDopplerEnv,
    getCurrentStage,
    deployFly,
} from '@xmorse/deployment-utils'
import path from 'path'

async function main() {
    const stage = getCurrentStage()
    const env = await getDopplerEnv({ stage: 'production', project: 'website' })
    await Promise.all([
        shell(`pnpm build`, {
            env,
        }),
    ])
    const port = 4334
    await deployFly({
        appName: '4334',
        port,
        buildRemotely: true,
        dockerfile: 'Dockerfile',
        forceHttps: false,
        minInstances: 1,
        maxInstances: 1,
        healthCheckPath: '/api/health',
        memorySize: '512mb',

        env: {
            ...env,
            NODE_ENV: 'production',
            PORT: port,
        },
        regions: ['iad'],
    })
}

main()
