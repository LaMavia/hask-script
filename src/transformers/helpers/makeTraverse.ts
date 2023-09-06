import { Node } from '@babel/traverse'
import {
  HState,
  HTraverseOptions,
  newHState,
} from '../types'
import { hTraverse } from '.'
import { HOpinionatedTraverse } from '../types/HOpinionatedTraverse'

export const makeTraverse =
  (options: HTraverseOptions): HOpinionatedTraverse =>
  (ast: Node, state?: HState) => {
    state ??= newHState()
    hTraverse(ast, options, undefined, state)

    return state
  }
