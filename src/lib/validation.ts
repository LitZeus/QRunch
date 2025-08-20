interface ValidationRule {
  required?: boolean | string
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
  validate?: (value: any) => string | boolean
}

export type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule
}

export function validateForm<T extends Record<string, any>>(
  data: T,
  schema: ValidationSchema<T>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
  const errors: Partial<Record<keyof T, string>> = {}
  let isValid = true

  for (const key in schema) {
    const value = data[key]
    const rules = schema[key]
    const error = validateField(value, rules)

    if (error) {
      errors[key] = error
      isValid = false
    }
  }

  return { isValid, errors }
}

function validateField(value: any, rules: ValidationRule): string | null {
  if (rules.required) {
    const message = typeof rules.required === 'string' ? rules.required : 'This field is required'
    if (!value && value !== 0) return message
    if (Array.isArray(value) && value.length === 0) return message
    if (typeof value === 'string' && value.trim() === '') return message
  }

  if (rules.minLength && value && value.length < rules.minLength.value) {
    return rules.minLength.message
  }

  if (rules.maxLength && value && value.length > rules.maxLength.value) {
    return rules.maxLength.message
  }

  if (rules.pattern && value && !rules.pattern.value.test(value)) {
    return rules.pattern.message
  }

  if (rules.validate) {
    const customValidation = rules.validate(value)
    if (typeof customValidation === 'string') {
      return customValidation
    } else if (customValidation === false) {
      return 'Invalid value'
    }
  }

  return null
}

// Example usage:
/*
const loginSchema: ValidationSchema<{ email: string; password: string }> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
}

const { isValid, errors } = validateForm({ email, password }, loginSchema)
*/
