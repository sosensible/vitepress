import { isExternal } from '../../shared'
import { withBase, useData } from 'vitepress'

export { isExternal, isActive } from '../../shared'

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeout: number
  let called = false

  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }

    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}

export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

export function normalizeLink(url: string): string {
  if (isExternal(url)) {
    return url
  }

  const { site } = useData()
  const { pathname, search, hash } = new URL(url, 'http://example.com')

  const normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : `${pathname.replace(
          /(\.md)?$/,
          site.value.cleanUrls === 'disabled' ? '.html' : ''
        )}${search}${hash}`

  return withBase(normalizedPath)
}
