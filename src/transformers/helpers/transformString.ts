import { parse } from '@babel/parser'
import generate from '@babel/generator'
import { HOpinionatedTraverse } from '../types/HOpinionatedTraverse'

export const transformString = (
  traverse: HOpinionatedTraverse,
  input: string
): string => {
  const ast = parse(input)
  traverse(ast)

  return generate(ast).code
}
