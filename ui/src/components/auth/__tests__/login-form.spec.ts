import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../login-form.vue'
import { createVuetify } from 'vuetify'
import { setActivePinia, createPinia } from 'pinia'

describe('mount login component', () => {
  /*let wrapper: any
  beforeEach(() => {
    setActivePinia(createPinia())
    const vuetify = createVuetify()
    wrapper = mount(LoginForm, {
      global: { plugins: [vuetify] },
    })
  })
  it('should contain Login title', () => {
    expect(wrapper.html()).toContain('Login')
  })*/
  it('should have the required validation', async () => {
    setActivePinia(createPinia())
    const vuetify = createVuetify()
    const wrapper = mount(LoginForm, {
      global: { plugins: [vuetify] },
    })
    const emailInput = await wrapper.find('#email-input')
    await emailInput.setValue('admin@test.com')
    console.log('email', emailInput)
    //await wrapper.find('#email-input').setValue('')
    expect(wrapper.html()).toContain('This fliend is required')
  })
})
