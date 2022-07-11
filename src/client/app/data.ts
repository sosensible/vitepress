import { InjectionKey, Ref, shallowRef, readonly, computed, inject } from 'vue'
import { Route } from './router'
import siteData from '@siteData'
import {
  PageData,
  SiteData,
  createTitle,
  DefaultTheme,
  resolveSiteDataByRoute
} from '../shared'

export const dataSymbol: InjectionKey<VitePressData> = Symbol()

export interface VitePressData<T = any> {
  site: Ref<SiteData<T>>
  page: Ref<PageData>
  theme: Ref<T>
  frontmatter: Ref<PageData['frontmatter']>
  title: Ref<string>
  description: Ref<string>
  lang: Ref<string>
  localeIndex: Ref<string>
}

// site data is a singleton
export type SiteDataRef<T = DefaultTheme.Config> = Ref<SiteData<T>>

export const siteDataRef: Ref<SiteData> = shallowRef(
  import.meta.env.PROD ? siteData : readonly(siteData)
)

// hmr
if (import.meta.hot) {
  import.meta.hot.accept('/@siteData', (m) => {
    if (m) {
      siteDataRef.value = m.default
    }
  })
}

// per-app data
export function initData(route: Route): VitePressData {
  const site = computed(() =>
    resolveSiteDataByRoute(siteDataRef.value, route.data.relativePath)
  )

  return {
    site,
    theme: computed(() => site.value.themeConfig),
    page: computed(() => route.data),
    frontmatter: computed(() => route.data.frontmatter),
    lang: computed(() => site.value.lang),
    title: computed(() => {
      return createTitle(site.value, route.data)
    }),
    description: computed(() => {
      return route.data.description || site.value.description
    }),
    localeIndex: computed(() => site.value.localeIndex || 'root')
  }
}

export function useData<T = DefaultTheme.Config>(): VitePressData<T> {
  const data = inject(dataSymbol)
  if (!data) {
    throw new Error('vitepress data not properly injected in app')
  }
  return data
}
