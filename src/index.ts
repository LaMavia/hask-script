import { parse } from '@babel/parser'
import g from '@babel/generator'
import { HRemoveThis } from './transformers/remove-this'

export const main = () => {
  const code = `
const f = (a) => g => (g.bind(null)(a), g.apply(null, a))
  `
  const ast = parse(code)
  HRemoveThis(ast)

  console.log(code)
  console.log(g(ast).code)
}

main()
