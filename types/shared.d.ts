// types shared between server and client

import { DefaultTheme } from './default-theme'

export { DefaultTheme } from './default-theme'

export interface PageData {
  relativePath: string
  title: string
  titleTemplate?: string | boolean
  description: string
  headers: Header[]
  frontmatter: Record<string, any>
  lastUpdated?: number
}

export interface Header {
  level: number
  title: string
  slug: string
}

export type CleanUrlsMode =
  | 'disabled'
  | 'without-subfolders'
  | 'with-subfolders'

export interface SiteData<ThemeConfig = any> {
  base: string
  cleanUrls?: CleanUrlsMode
  lang: string
  title: string
  titleTemplate?: string | boolean
  description: string
  head: HeadConfig[]
  appearance: boolean
  themeConfig: ThemeConfig
  scrollOffset: number | string
  locales: LocaleConfig<ThemeConfig>
  localeIndex?: string
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export interface PageDataPayload {
  path: string
  pageData: PageData
}

export interface LocaleSpecificConfig<ThemeConfig = any> {
  lang?: string
  title?: string
  titleTemplate?: string | boolean
  description?: string
  head?: HeadConfig[]
  themeConfig?: ThemeConfig
}

export type LocaleConfig<ThemeConfig = any> = Record<
  string,
  LocaleSpecificConfig<ThemeConfig> & { label: string }
>
