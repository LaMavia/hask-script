import { NodePath } from '@babel/traverse'
import * as t from '@babel/types'

export const findChild = <T extends t.Node>(
  path: NodePath,
  predicate: (path: NodePath) => path is NodePath<T>
): NodePath<T> | undefined => {
  const state = {
    child: undefined as NodePath<T> | undefined,
  }
  path.traverse(
    {
      enter: (path, state) => {
        // console.dir(path.isIdentifier() && path.node.name)
        if (state.child === undefined && predicate(path)) {
          state.child = path
        }
      },
    },
    state
  )

  return state.child
}
