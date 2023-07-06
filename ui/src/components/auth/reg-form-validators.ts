import { computed } from 'vue'
import {
  isRequired,
  isValidEmail,
  isLength,
  isMatching,
  calcComplexity,
} from '../../utils/field-validators'

export default {
  props: {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    confirmation: { type: String },
  },
  setup(props, { slots }) {
    const firstNameRules = computed(() => [
      isRequired(props.first_name),
      isLength(props.first_name, 3),
    ])
    const lastNameRules = computed(() => [
      isRequired(props.last_name),
      isLength(props.last_name, 3),
    ])
    const emailRules = computed(() => [isValidEmail(props.email)])
    const passwordRules = computed(() => [
      isRequired(props.password),
      isLength(props.password, 6),
    ])
    const passwordConfirmationRules = computed(() => [
      isMatching(props.password, props.confirmation),
    ])
    //const complexity = computed(() => calcComplexity(props.password))
    return () =>
      slots.default({
        firstNameRules: firstNameRules.value,
        lastNameRules: lastNameRules.value,
        emailRules: emailRules.value,
        passwordRules: passwordRules.value,
        passwordConfirmationRules: passwordConfirmationRules.value,
      })
  },
}
