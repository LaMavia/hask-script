import traverse from '@babel/traverse'
import { HState } from '../types'

export const hTraverse = (
  ...params: Parameters<typeof traverse<HState>>
) => traverse<HState>(...params)
