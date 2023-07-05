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
    password: {
      type: String,
    },
    confirmation: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const required = computed(() => [isRequired(props.first_name)])
    const matching = computed(() => [
      isMatching(props.password, props.confirmation),
    ])
    const complexity = computed(() => calcComplexity(props.password))
    return () =>
      slots.default({
        required: required.value,
        matching: matching.value,
        complexity: complexity.value,
      })
  },
}
