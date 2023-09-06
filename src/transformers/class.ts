import { HTraverseOptions } from './types'
import template from '@babel/template'

const propertyTemplate = template`
  
`

export const HClass: HTraverseOptions = {
  Class: (p, s) => {
    // p.node.body.body
  },
}
