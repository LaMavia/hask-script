import { describe, it, expect } from 'bun:test'
import { transformString } from '../helpers/transformString'
import { HRemoveThis } from '.'

describe('HRemoveThis', () => {
  it('bind', () => {
    expect(
      transformString(HRemoveThis, `f.bind(this)(1, 2, 3)`)
    ).toBe(`f(1, 2, 3);`)
  })

  it('apply', () => {
    expect(
      transformString(
        HRemoveThis,
        `f.apply(this, [1, 2, 3])`
      )
    ).toBe(`f(1, 2, 3);`)
  })

  it('call', () => {
    expect(
      transformString(HRemoveThis, `f.call(this, 1, 2, 3)`)
    ).toBe(`f(1, 2, 3);`)
  })
})
