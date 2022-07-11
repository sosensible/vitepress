import { computed } from 'vue'
import { useData } from 'vitepress'
import { isExternal } from '../support/utils'

export function useLangs() {
  const { site, localeIndex } = useData()
  const currentLang = computed(
    () => site.value.locales[localeIndex.value].label
  )

  const localeLinks = computed(() =>
    Object.entries(site.value.locales).flatMap(([key, value]) =>
      currentLang.value === value.label
        ? []
        : {
            text: value.label,
            link: key === 'root' ? '/' : isExternal(key) ? key : `/${key}/`
          }
    )
  )

  return { localeLinks, currentLang }
}
