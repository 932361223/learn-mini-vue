import { effect } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
  it('reactive', () => {
    const user = reactive({
      age: 10
    })

    let nextAge
    effect(() => {
      // update effect.run()之后会重新调用当前函数
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    //update
    user.age++
    expect(nextAge).toBe(12)
  })

  it('return runner when call effect', () => {
    let foo = 10
    // 能够返回一个当前调用的函数Fn
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(11)
    // 重新调用一次effect里的fn函数，且能拿到返回值
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })
})
