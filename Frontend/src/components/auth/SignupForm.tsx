import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../../services/firebase';
import { checkAuthEmail, loginUser } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/authSlice';
import { ROUTES } from '../../routes/routes';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Input from '../ui/Input';
import { Heading2, Paragraph } from '../ui/Text';
import en from '../../en.json';

type FormData = {
  name: string;

  email: string;

  password: string;
};

const signupText = en.auth.signup;
const authErrors = en.auth.errors;
const validationText = en.auth.validation;

const getSignupErrorMessage = (error: unknown) => {
  const code =
    typeof error === 'object' && error && 'code' in error
      ? String(error.code)
      : '';

  switch (code) {
    case 'auth/email-already-in-use':
      return authErrors.emailAlreadyInUse;

    case 'auth/invalid-email':
      return authErrors.emailInvalid;

    case 'auth/weak-password':
      return authErrors.weakPassword;

    case 'auth/network-request-failed':
      return authErrors.network;

    case 'auth/operation-not-allowed':
      return authErrors.operationNotAllowed;

    default:
      return authErrors.signupFailed;
  }
};

export default function SignupForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const email = data.email.trim().toLowerCase();

    try {
      const existingEmail = await checkAuthEmail(email).catch(() => null);

      if (existingEmail?.exists) {
        if (
          existingEmail.provider === 'google' ||
          existingEmail.providers.includes('google.com')
        ) {
          toast.error(signupText.googleLinked);
          return;
        }

        toast.error(signupText.existingAccount);
        return;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        data.password,
      );

      await updateProfile(credential.user, {
        displayName: data.name.trim(),
      });

      const token = await credential.user.getIdToken(true);

      try {
        const user = await loginUser(token);

        dispatch(setUser(user));

        toast.success(signupText.success);

        navigate(ROUTES.dashboard);
      } catch {
        toast.success(signupText.backendUnavailable);

        navigate(ROUTES.login);
      }
    } catch (error) {
      toast.error(getSignupErrorMessage(error));
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950'>
      <div className='animate-rise w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
        <Heading2 className='mb-6 text-center text-3xl font-black'>
          {signupText.title}
        </Heading2>

        <Form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <Input
              type='text'
              placeholder={signupText.namePlaceholder}
              {...register('name', {
                required: validationText.nameRequired,
                minLength: {
                  value: 2,
                  message: validationText.nameMin,
                },
              })}
            />

            {errors.name && (
              <Paragraph className='mt-2 text-sm text-red-500'>
                {errors.name.message}
              </Paragraph>
            )}
          </div>

          <div>
            <Input
              type='email'
              placeholder={signupText.emailPlaceholder}
              {...register('email', {
                required: validationText.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: validationText.emailInvalid,
                },
              })}
            />

            {errors.email && (
              <Paragraph className='mt-2 text-sm text-red-500'>
                {errors.email.message}
              </Paragraph>
            )}
          </div>

          <div>
            <Input
              type='password'
              placeholder={signupText.passwordPlaceholder}
              {...register('password', {
                required: validationText.passwordRequired,
                minLength: {
                  value: 6,
                  message: validationText.passwordMin,
                },
              })}
            />

            {errors.password && (
              <Paragraph className='mt-2 text-sm text-red-500'>
                {errors.password.message}
              </Paragraph>
            )}
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-2xl bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? signupText.submitting : signupText.submit}
          </Button>
        </Form>
      </div>
    </div>
  );
}
