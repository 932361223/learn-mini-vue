let activeEffect
class ReactiveEffect {
  private _fn
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}

export const effect = (fn) => {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}

// targetMap[target] => depsMap[key] => dep:Set()
// targetMap(new Map()) = {
//   target => {
//     depsMap(new Map()) => {
//       key => dep(new Set())
//     }
//   }
// }
const targetMap = new Map()
// 依赖收集
export const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  // 把当前activeEffect添加 后面触发依赖就执行里面的run
  dep.add(activeEffect)
}
// 触发依赖
export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  for (const effect of deps) {
    effect.run()
  }
}
