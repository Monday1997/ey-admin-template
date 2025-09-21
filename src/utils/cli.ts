import { isValidPackageName } from './tools'
import minimist from 'minimist'
import prompts from 'prompts'
import { TDealParamsWithNameArags } from '../types/cli'
import _ from 'lodash'
import consola from 'consola'
export function getUserArgs(options) {
  return minimist(process.argv.slice(2), options)
}
// 需要用户带name进入时
export async function dealParamsWithName<T extends Record<string, any>>(
  data: TDealParamsWithNameArags<T>
) {
  const { defaultConfig, transformBefore, mainStep } = data
  const args = getUserArgs({
    alias: {
      template: 't'
    }
  })
  const [pkgName] = args._
  if (pkgName && isValidPackageName(pkgName)) {
    args.pkgName = pkgName
    transformBefore && transformBefore(args)
    // 使用预设值 用户可以覆盖预设值
    if (args.template) {
      const result = Object.assign(
        defaultConfig,
        _.pick(args, _.keys(defaultConfig).push('pkgName'))
      )
      await mainStep(result)
      process.exit()
    }
  } else if (pkgName || args._.length > 0) {
    consola.error('用户输入不合法')
    process.exit()
  }
  prompts.override(args)
}
