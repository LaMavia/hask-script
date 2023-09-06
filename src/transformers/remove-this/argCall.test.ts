import { describe, it, expect } from 'bun:test'
import { transformString } from '../helpers/transformString'
import { ArgCall } from './argCall'

describe('ArgCall', () => {
  it('removes this: identifier', () =>
    expect(
      transformString(ArgCall, `f.call(argument)`)
    ).toBe(`f.call();`))

  it('removes this: this', () =>
    expect(transformString(ArgCall, `f.call(this)`)).toBe(
      `f.call();`
    ))

  it('removes this: literal', () =>
    expect(
      transformString(
        ArgCall,
        `f.call(42); f.call('hello'); f.call([1, 2, 3])`
      )
    ).toBe(`f.call();\nf.call();\nf.call();`))

  it('preserves arguments', () =>
    expect(
      transformString(
        ArgCall,
        `f.call(this, [1, 2, 3], 'hello', {a: 2})`
      )
    ).toBe(`f.call([1, 2, 3], 'hello', {\n  a: 2\n});`))
})
