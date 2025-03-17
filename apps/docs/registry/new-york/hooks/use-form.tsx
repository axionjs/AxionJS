"use client"

import * as React from "react"

type FormState<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

type FormActions<T> = {
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string) => void
  setFieldTouched: (field: keyof T, isTouched: boolean) => void
  setValues: (values: Partial<T>) => void
  setErrors: (errors: Partial<Record<keyof T, string>>) => void
  resetForm: () => void
  submitForm: () => Promise<void>
}

interface UseFormProps<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => Promise<void> | void
}

/**
 * A hook for managing form state and validation
 * @param props The form configuration
 * @returns Form state and actions
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>): [FormState<T>, FormActions<T>] {
  const [state, setState] = React.useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  })

  const validateForm = React.useCallback(() => {
    if (!validate) return {}

    const errors = validate(state.values)
    return errors
  }, [validate, state.values])

  // Update isValid when values change
  React.useEffect(() => {
    if (!validate) return

    const errors = validate(state.values)
    const isValid = Object.keys(errors).length === 0

    // Only update state if errors or validity changed
    if (JSON.stringify(errors) !== JSON.stringify(state.errors) || isValid !== state.isValid) {
      setState((prev) => ({ ...prev, errors, isValid }))
    }
  }, [validate, state.values])

  const setFieldValue = React.useCallback((field: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }))
  }, [])

  const setFieldError = React.useCallback((field: keyof T, error: string) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }))
  }, [])

  const setFieldTouched = React.useCallback((field: keyof T, isTouched: boolean) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: isTouched },
    }))
  }, [])

  const setValues = React.useCallback((values: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, ...values },
    }))
  }, [])

  const setErrors = React.useCallback((errors: Partial<Record<keyof T, string>>) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...errors },
    }))
  }, [])

  const resetForm = React.useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    })
  }, [initialValues])

  const submitForm = React.useCallback(async () => {
    if (!validate) {
      setState((prev) => ({ ...prev, isSubmitting: true }))

      try {
        await onSubmit(state.values)
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }))
      }
      return
    }

    const errors = validate(state.values)

    if (Object.keys(errors).length === 0) {
      setState((prev) => ({ ...prev, isSubmitting: true }))

      try {
        await onSubmit(state.values)
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }))
      }
    } else {
      setState((prev) => ({
        ...prev,
        errors,
        isValid: false,
      }))
    }
  }, [onSubmit, state.values, validate])

  const actions: FormActions<T> = {
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setValues,
    setErrors,
    resetForm,
    submitForm,
  }

  return [state, actions]
}

