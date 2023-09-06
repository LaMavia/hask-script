import { makeTraverse } from '../helpers/makeTraverse'

export const RemoveABC = makeTraverse({
  MemberExpression: {
    exit: path => {
      const property = path.get('property')

      if (
        property.isIdentifier() &&
        ['apply', 'bind', 'call'].includes(
          property.node.name
        )
      ) {
        path.replaceWith(path.get('object'))
      }
    },
  },
})
