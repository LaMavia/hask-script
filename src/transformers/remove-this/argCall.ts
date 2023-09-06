import { NodePath } from '@babel/traverse'
import { findChild } from '../helpers/findChild'
import * as t from '@babel/types'
import { makeTraverse } from '../helpers/makeTraverse'

export const ArgCall = makeTraverse({
  CallExpression: {
    enter: (path: NodePath<t.CallExpression>) => {
      path.assertCallExpression()

      const callee = path.get('callee')
      if (!callee.isMemberExpression()) {
        return
      }

      const call = findChild(
        callee,
        (path): path is NodePath<t.Identifier> =>
          path.isIdentifier() && path.node.name === 'call'
      )
      if (!call) {
        return
      }

      path.node.arguments.shift()
    },
  },
})
