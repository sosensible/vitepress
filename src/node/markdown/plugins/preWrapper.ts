import MarkdownIt from 'markdown-it'

export const preWrapperPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const [_, title, name, id, first] =
      tokens[idx].info
        .trim()
        .match(/(?:\[(.*?)\] )?group (\S*?) (\S*?) (\S*?)( |$)/) ?? []
    const lang = tokens[idx].info
      .trim()
      .replace(/(-vue|{| |group).*$/, '')
      .replace(/^vue-html$/, 'template')
    const rawCode = fence(...args)
    return `${
      _
        ? `<input name="group-${name}" type="radio" id="block-${id}" ${
            first === 'true' ? 'checked="checked"' : ''
          }><label for="block-${id}">${title || lang || 'txt'}</label>`
        : ''
    }<div class="language-${lang}"><button title="Copy Code" class="copy"></button><span class="lang">${lang}</span>${rawCode}</div>`
  }
}
