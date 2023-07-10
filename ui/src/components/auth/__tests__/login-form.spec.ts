import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../login-form.vue'
import { createVuetify } from 'vuetify'
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('test', () => {
  it('pass', () => {
    const vuetify = createVuetify()
    const wrapper = mount(LoginForm, {
      global: { plugins: [vuetify] },
    })
    expect(wrapper.html()).toContain('Login')
  })
})
