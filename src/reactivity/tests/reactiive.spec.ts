import { reactive } from '../reactive'

describe('reactive_base', () => {
  it('test', () => {
    const raw = {
      name: 'zenon'
    }
    const observed = reactive(raw)
    // 不相等
    expect(raw).not.toBe(observed)
    // 且两者值相等
    expect(observed.name).toBe('zenon')
  })
})
