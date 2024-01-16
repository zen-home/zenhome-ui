import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia'
import useStore from 'src/stores'

describe('Store', () => {
  it('should create a new Pinia instance', () => {
    const store = useStore()

    expect(store).toBeInstanceOf(createPinia().constructor)
  })
})
