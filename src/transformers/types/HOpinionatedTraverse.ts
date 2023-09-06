import { Node } from '@babel/traverse'
import { HState } from '.'

export type HOpinionatedTraverse = (
  ast: Node,
  state?: HState
) => HState
