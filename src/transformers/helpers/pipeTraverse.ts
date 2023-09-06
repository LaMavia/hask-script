import { newHState } from '../types'
import { HOpinionatedTraverse } from '../types/HOpinionatedTraverse'

export const pipeTraverse =
  (
    ...traversals: HOpinionatedTraverse[]
  ): HOpinionatedTraverse =>
  (node, state) => {
    state ??= newHState()
    traversals.reduce(
      (state, traverse) => traverse(node, state),
      state
    )

    return state
  }
