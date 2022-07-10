import { SiteData, PageData } from '../../types/shared'

export type {
  SiteData,
  PageData,
  HeadConfig,
  Header,
  DefaultTheme,
  PageDataPayload,
  CleanUrlsMode,
  LocaleConfig,
  LocaleSpecificConfig
} from '../../types/shared'

export const EXTERNAL_URL_RE = /^[a-z]+:/i
export const APPEARANCE_KEY = 'vitepress-theme-appearance'

export const inBrowser = typeof window !== 'undefined'

export const notFoundPageData: PageData = {
  relativePath: '',
  title: '404',
  description: 'Not Found',
  headers: [],
  frontmatter: {},
  lastUpdated: 0
}

/**
 * Create the page title string based on configs.
 */
export function createTitle(siteData: SiteData, pageData: PageData): string {
  const title = pageData.title || siteData.title
  const template = pageData.titleTemplate ?? siteData.titleTemplate
  const templateString = createTitleTemplate(siteData.title, template)

  return `${title}${templateString}`
}

function createTitleTemplate(
  siteTitle: string,
  template?: string | boolean
): string {
  if (template === false) {
    return ''
  }

  if (template === true || template === undefined) {
    return ` | ${siteTitle}`
  }

  if (siteTitle === template) {
    return ''
  }

  return ` | ${template}`
}
