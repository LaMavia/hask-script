import * as t from '@babel/types'

export const foldArguments = (
  node: t.FunctionExpression | t.FunctionDeclaration
) => {
  const { params, body, async, generator } = node

  const [p, ...ps] = params.slice(0, -1)
  const pLast = params[params.length - 1]

  const foldedParamsStatement = ps.reduceRight(
    (u, p) => t.arrowFunctionExpression([p], u),
    t.functionExpression(
      undefined,
      [pLast],
      body,
      generator,
      async
    ) as t.Expression
  )

  return [foldedParamsStatement, p] as const
}
