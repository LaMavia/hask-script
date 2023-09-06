import { NodePath } from '@babel/traverse'
import { findChild } from '../helpers/findChild'
import * as t from '@babel/types'
import { makeTraverse } from '../helpers/makeTraverse'

export const ArgBind = makeTraverse({
  CallExpression: {
    enter: path => {
      const callee = path.get('callee')
      if (!callee.isMemberExpression()) {
        return
      }

      const bind = findChild(
        callee,
        (path): path is NodePath<t.Identifier> =>
          path.isIdentifier() && path.node.name === 'bind'
      )

      if (bind) {
        path.replaceWith(path.node.callee)
      }
    },
  },
})
