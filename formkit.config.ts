import { it, en } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme.js'

export default defaultConfig({
  config: { rootClasses },
  locales: { en },
  locale: 'en'
})