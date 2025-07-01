"use client";
import { useState, ChangeEvent, FormEvent } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

interface UseFormProps<T> {
  /** Начальные значения полей формы */
  initialValues: T;
  /** Функция валидации, возвращающая объект ошибок */
  validate?: (values: T) => Errors<T>;
  /** Колбэк при успешной отправке */
  onSubmit: (values: T) => void | Promise<void>;
}

/**
 * useForm — универсальный хуκ для управления формами регистрации и авторизации.
 * 📌 Работает на любом наборе полей.
 */
const useForm = <T>({ initialValues, validate, onSubmit }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Обработчик изменения поля */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /** Обработчик отправки формы */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        // Нет шанса отправиться, пока не исправишь
        return;
      }
    }
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Сброс состояния формы к начальным значениям */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
