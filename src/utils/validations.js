// src/utils/validations.js

import * as yup from 'yup';

/**
 * Validation Schema for User Form
 *
 * Defines the validation rules for the user creation and update forms.
 */
export const userValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),

  address: yup.object().shape({
    street: yup
      .string()
      .required('Street is required'),

    city: yup
      .string()
      .required('City is required'),
  }),

  company: yup.object().shape({
    name: yup
      .string()
      .notRequired()
      .min(3, 'Company name must be at least 3 characters'),
  }),

  website: yup
    .string()
    .notRequired()
    .url('Website must be a valid URL'),
});

/**
 * Additional Validation Schemas
 *
 * You can define additional schemas here for other forms as your application grows.
 */

// Example: Validation Schema for Login Form
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
