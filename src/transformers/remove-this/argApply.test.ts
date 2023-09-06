import { describe, it, expect } from 'bun:test'
import { transformString } from '../helpers/transformString'
import { ArgApply } from './argApply'

describe('ArgApply', () => {
  it('removes this: identifier', () =>
    expect(
      transformString(ArgApply, `f.apply(argument)`)
    ).toBe(`f.apply();`))

  it('removes this: this', () =>
    expect(transformString(ArgApply, `f.apply(this)`)).toBe(
      `f.apply();`
    ))

  it('removes this: literal', () =>
    expect(
      transformString(
        ArgApply,
        `f.apply(42); f.apply('hello'); f.apply([1, 2, 3])`
      )
    ).toBe(`f.apply();\nf.apply();\nf.apply();`))

  it('spreads: array literal', () =>
    expect(
      transformString(ArgApply, `f.apply(this, [1, 2, 3])`)
    ).toBe(`f.apply(1, 2, 3);`))

  it('spreads: identifier', () =>
    expect(
      transformString(ArgApply, `f.apply(this, arr)`)
    ).toBe(`f.apply(...arr);`))

  it('spreads: string literal', () =>
    expect(
      transformString(ArgApply, `f.apply(this, 'Hello')`)
    ).toBe(`f.apply(...'Hello');`))
})
