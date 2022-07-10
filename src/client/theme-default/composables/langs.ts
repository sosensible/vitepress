import { computed } from 'vue'
import { useData } from 'vitepress'
import { isActive, isExternal } from '../support/utils'

export function useLangs() {
  const { site, page } = useData()

  const currentLang = computed(
    () =>
      site.value.locales[
        Object.keys(site.value.locales).find(
          (key) =>
            key !== 'root' &&
            !isExternal(key) &&
            isActive(page.value.relativePath, `/${key}/`, true)
        ) || 'root'
      ].label
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
