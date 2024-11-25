import { z } from 'zod';

const passwordValidations = z
  .string({
    required_error: 'Password is required!',
  })
  .min(1, { message: 'Password is required!' })
  .min(8, { message: 'Password must be between 8 and 20 characters' })
  .max(20, { message: 'Password is too lengthy!.' })
  .refine(
    (value) => {
      return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
        pattern.test(value)
      );
    },
    {
      message:
        'Password must contain at least one lowercase letter, uppercase letter, digit and special character (@*/%)',
    }
  );

export const SignupEmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address!' }),
});
export const SignupUserInfoSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  surname: z.string().min(1, { message: 'Surname is required!' }),
  password: passwordValidations,
  dob: z.date({
    required_error: 'Please select a date',
    invalid_type_error: "That's not a date!",
  }),
});

export const SignupQuestionsSchema = z.object({
  'custom:tradingexptype': z
    .string()
    .min(1, { message: 'Trading type is required!' }),
  'custom:tradingexplive': z
    .string()
    .min(1, { message: 'Trading live is required!' }),
  'custom:tradingexpyear': z
    .string()
    .min(1, { message: 'Trading year is required!' }),
  accepted: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'Please accept terms and conditions' }),
  }),
});

export const SignupConfirmEmailSchema = z.object({
  code: z.string().min(6, { message: 'Please enter a valid email code' }),
});

export const SigninSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address!' }),
  password: z.string().min(1, { message: 'Password is required!' }),
});
export const ResetPasswordEmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address!' }),
});

export const ResetChangePasswordSchema = z
  .object({
    code: z.string().min(6, { message: 'Please enter a valid email code' }),
    newPassword: passwordValidations,
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'Passwords should be matched',
      path: ['confirmPassword'],
    }
  );
