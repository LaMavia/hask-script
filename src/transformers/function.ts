import * as t from '@babel/types'
import { HTraverseOptions } from './types'
import { foldArguments } from './helpers/foldArguments'

export const HFunctionCurry: HTraverseOptions = {
  FunctionDeclaration: {
    exit: path => {
      if (path.node.params.length <= 1) {
        return
      }

      const [foldedParamsStatement, p] = foldArguments(
        path.node
      )

      path.replaceWith(
        t.functionDeclaration(
          path.node.id,
          [p],
          t.blockStatement([
            t.returnStatement(foldedParamsStatement),
          ])
        )
      )
    },
  },
  FunctionExpression: {
    exit: path => {
      if (path.node.params.length <= 1) {
        return
      }

      const [foldedParamsStatement, p] = foldArguments(
        path.node
      )

      path.replaceWith(
        t.functionExpression(
          path.node.id,
          [p],
          t.blockStatement([
            t.returnStatement(foldedParamsStatement),
          ])
        )
      )
    },
  },
  ArrowFunctionExpression: {
    exit: path => {
      if (t.isClassMethod(path.node)) {
        return
      }

      if (path.node.params.length <= 1) {
        return
      }

      path.replaceWith(
        path.node.params.reduceRight(
          (u, p, i) =>
            i === path.node.params.length - 1
              ? t.arrowFunctionExpression(
                  [p],
                  u,
                  path.node.async
                )
              : t.arrowFunctionExpression([p], u),
          path.node.body
        )
      )
    },
  },
}
