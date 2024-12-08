import { useCallback } from 'react';
import LabelInput from '../components/LabelInput.jsx';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { useAuth } from '../contexts/auth.js';
import { useNavigate, useLocation } from 'react-router-dom';
import Error from './Error.jsx';
import { NavLink } from 'react-router-dom';

const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Invalid email address',
    },
  },
  password: { required: 'Password is required' },
};

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const methods = useForm();
  const { reset, handleSubmit } = methods;
  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate(params.get('redirect') || '/', { replace: true });
      }
    },
    [login, navigate, search],
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <div className='container mx-auto p-4'>
        <form className='flex flex-col' onSubmit={handleSubmit(handleLogin)}>
          <h1 className='text-3xl font-bold mb-4'>Sign in</h1>
          <Error error={error}></Error>
          <LabelInput
            label='Email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
            data-cy='email_input'
          />
          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
            data-cy='password_input'
          />
          <div className="flex justify-between items-center">
            <NavLink className="text-blue-800 mb-2 p-2" to="/register">
              New here? Sign up!
            </NavLink>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white
                 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                data-cy="submit_btn"
              >
                Sign in
              </button>
              <button
                type="button"
                className="ml-4 bg-gray-200 hover:bg-gray-300 
                text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}