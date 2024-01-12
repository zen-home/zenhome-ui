import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from 'src/stores/store.example'

describe('useCounterStore', () => {
  setActivePinia(createPinia())
  const counterStore = useCounterStore()
  beforeEach(() => {
    useCounterStore().counter = 0
  })

  it('should increment counter', () => {
    expect(counterStore.counter).toEqual(0)
    counterStore.increment()
    expect(counterStore.counter).toEqual(1)
  })

  it('should calculate double count', () => {
    expect(counterStore.doubleCount).toEqual(0)
    counterStore.increment()
    expect(counterStore.doubleCount).toEqual(2)
  })
})
