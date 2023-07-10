import { computed } from 'vue'
import { isRequired } from '../../utils/field-validators'

interface props {
  email: string
  password: string
}

export default {
  props: {
    email: { type: String },
    password: { type: String },
  },
  setup(props: props, { slots }) {
    const emailRules = computed(() => [isRequired(props.email)])
    const passwordRules = computed(() => [isRequired(props.password)])
    return () =>
      slots.default({
        emailRules: emailRules.value,
        passwordRules: passwordRules.value,
      })
  },
}
