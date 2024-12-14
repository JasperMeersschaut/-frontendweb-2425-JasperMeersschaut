import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;
  const {isAuthed} = useAuth();

  useEffect(() => {
    if (isAuthed) {
      navigate('/');
    }
  }, [isAuthed, navigate]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ name, lastName, email, sex, password, birthdate, length, weight }) => {
      const loggedIn = await register({ name, lastName, email, sex, password, birthdate, length, weight });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 1,
        message: 'Name must be at least 1 character long',
      },
      maxLength: {
        value: 50,
        message: 'Name must be at most 50 characters long',
      },
    },
    lastName: {
      required: 'Last Name is required',
      minLength: {
        value: 1,
        message: 'Last Name must be at least 1 character long',
      },
      maxLength: {
        value: 50,
        message: 'Last Name must be at most 50 characters long',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email address',
      },
    },
    sex: {
      required: 'Sex is required',
      validate: (value) => ['Male', 'Female'].includes(value) || 'Should be Male or Female',
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
      },
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
    birthdate: {
      required: 'Birthdate is required',
      validate: (value) => {
        const today = new Date();
        const birthdate = new Date(value);
        return birthdate <= today || 'Birthdate cannot be in the future';
      },
    },
    length: {
      required: 'Length is required',
      validate: (value) => {
        if (value <= 0) return 'Length must be a positive number';
        if (value >= 300) return 'Length must be less than 300 cm';
        return true;
      },
    },
    weight: {
      required: 'Weight is required',
      validate: (value) => {
        if (value <= 0) return 'Weight must be a positive number';
        if (value >= 300) return 'Weight must be less than 300 kg';
        return true;
      },
    },
  };
  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <Error error={error} />

          <LabelInput
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            validationRules={validationRules.name}
            data-cy="name_input"
          />

          <LabelInput
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Your Last Name"
            validationRules={validationRules.lastName}
            data-cy="lastName_input"
          />

          <LabelInput
            label="Email"
            type="text"
            name="email"
            placeholder="your@email.com"
            validationRules={validationRules.email}
            data-cy="email_input"
          />

          <LabelInput
            label="Sex"
            type="text"
            name="sex"
            placeholder="Your Sex"
            validationRules={validationRules.sex}
            data-cy="sex_input"
          />

          <LabelInput
            label="Password"
            type="password"
            name="password"
            validationRules={validationRules.password}
            data-cy="password_input"
          />

          <LabelInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
            data-cy="confirmPassword_input"
          />

          <LabelInput
            label="Birthdate"
            type="date"
            name="birthdate"
            validationRules={validationRules.birthdate}
            data-cy="birthdate_input"
          />

          <LabelInput
            label="Length (cm)"
            type="number"
            name="length"
            placeholder="Your Length in cm"
            validationRules={validationRules.length}
            data-cy="length_input"
          />

          <LabelInput
            label="Weight (kg)"
            type="number"
            name="weight"
            placeholder="Your Weight in kg"
            validationRules={validationRules.weight}
            data-cy="weight_input"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline"
              disabled={loading}
              data-cy="submit_btn"
            >
              Register
            </button>

            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
              data-cy="cancel_btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}