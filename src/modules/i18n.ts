import type { App } from 'vue'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false, //Composition API 模式
    locale: '',
    messages: {},
})

const localesMap = Object.fromEntries(
    Object.entries(import.meta.glob('../../locales/*.js')).map(([path, loadLocale]) => [
        path.match(/([\w-]*)\.js$/)?.[1],
        loadLocale,
    ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const loadedLanguages: string[] = []
export function setI18nLanguage(locale: string) {
    i18n.global.locale.value = locale
    if (typeof document !== 'undefined') {
        document.querySelector('html')!.setAttribute('lang', locale)
    }
}

export async function loadLocaleMessages(lang: string) {
    // 缓存
    if (i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
        return setI18nLanguage(lang)
    }
    // 加载文件
    const messages = await localesMap[lang]()
    // 设置文件
    i18n.global.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)

    return setI18nLanguage(lang)
}
export default {
    install(app: App) {
        app.use(i18n)
        loadLocaleMessages('zh-CN')
    },
}
