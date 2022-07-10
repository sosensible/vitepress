// types shared between server and client

import { DefaultTheme } from './default-theme'

export { DefaultTheme }

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

  /**
   * Language of the site as it should be set on the `html` element.
   *
   * @example `en-US`, `zh-CN`
   */
  lang: string

  title: string
  titleTemplate?: string | boolean
  description: string
  head: HeadConfig[]
  appearance: boolean
  themeConfig: ThemeConfig
  scrollOffset: number | string
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export interface PageDataPayload {
  path: string
  pageData: PageData
}
