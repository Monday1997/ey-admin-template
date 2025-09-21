import { consola } from 'consola'
import chalk from 'chalk'

export function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}
export function createSuccessTip(pkgName: string) {
  consola.success(chalk.green('创建成功，可执行如下操作'))
  consola.box({
    message: `cd ./${pkgName}    \npnpm i\npnpm format:all\npnpm dev`,
    style: {
      padding: 2,
      borderColor: 'yellow',
      borderStyle: 'rounded'
    }
  })
}
