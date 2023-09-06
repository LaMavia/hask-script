import { NodePath } from '@babel/traverse'
import { findChild } from '../helpers/findChild'
import { HTraverseOptions } from '../types'
import * as t from '@babel/types'
import { makeTraverse } from '../helpers/makeTraverse'

export const ArgApply = makeTraverse({
  CallExpression: {
    enter: path => {
      const callee = path.get('callee')
      if (!callee.isMemberExpression()) {
        return
      }

      const apply = findChild(
        callee,
        (path): path is NodePath<t.Identifier> =>
          path.isIdentifier() && path.node.name === 'apply'
      )
      if (!apply) {
        return
      }

      path.node.arguments.shift()
      if (path.node.arguments.length === 0) {
        return
      }

      const firstArg = path.get('arguments').at(0)
      if (
        firstArg?.isIdentifier() ||
        firstArg?.isLiteral()
      ) {
        path.node.arguments = [
          t.spreadElement(firstArg.node),
        ]
      } else if (firstArg?.isArrayExpression()) {
        path.node.arguments = firstArg
          .get('elements')
          .map(p => p.node)
          .filter(
            (
              node
            ): node is t.SpreadElement | t.Expression =>
              node !== null
          )
      }
    },
  },
})
