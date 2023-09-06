import { pipeTraverse } from '../helpers/pipeTraverse'
import { ArgApply } from './argApply'
import { ArgBind } from './argBind'
import { ArgCall } from './argCall'
import { RemoveABC } from './removeABC'

export const HRemoveThis = pipeTraverse(
  ArgBind,
  ArgApply,
  ArgCall,
  RemoveABC
)
