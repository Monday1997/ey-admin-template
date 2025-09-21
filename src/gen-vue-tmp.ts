#!/usr/bin/env node
import { init } from './common-tmp'
import { promptsOptions } from './config/gen-vue-tmp'
import path from 'path'
import { getDir } from './utils/path'

const __dirname = getDir(import.meta.url)
export const vueTmp = path.resolve(__dirname, '../template')

type TdefaultConfig = {
  pkgName: string
  config: string[]
  css: string
}
const defaultConfig = {
  pkgName: '',
  config: ['router', 'i-18n', 'pwa', 'cdn'],
  css: 'unocss',
  axios: true
}

init<TdefaultConfig>({
  defaultConfig,
  tmpPath: vueTmp,
  tansformUserArgs(args: any) {
    if (args.config && !Array.isArray(args.config)) {
      args.config = [args.config]
    }
  },
  promptsOptions
})
