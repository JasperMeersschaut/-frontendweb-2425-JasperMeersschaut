import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import { FormProvider, useForm } from 'react-hook-form';

const EMPTY_USER = {
  id: undefined,
  name: '',
  lastName: '',
  email: '',
  sex: '',
  birthdate: new Date(),
  length: '',
  weight: '',
};

const toDateInputString = (date) => {
  if (!date) return null;
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

const validationRules = {
  name: {
    required: 'Name is required',
  },
  lastName: {
    required: 'Last Name is required',
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
  },
  birthdate: {
    required: 'Birthdate is required',
    valueAsDate: true,
  },
  length: {
    required: 'Length is required',
    valueAsNumber: true,
  },
  weight: {
    required: 'Weight is required',
    valueAsNumber: true,
  },
};

export default function UserForm({ user = EMPTY_USER, saveUser }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: user?.name,
      lastName: user?.lastName,
      email: user?.email,
      sex: user?.sex,
      birthdate: toDateInputString(user?.birthdate),
      length: user?.length,
      weight: user?.weight,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    await saveUser({
      id: user?.id,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/Profile'),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
        <div className='mb-4'>
          <LabelInput
            label='Name'
            name='name'
            type='text'
            placeholder='Name'
            validationRules={validationRules.name}
            data-cy='name_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Last Name'
            validationRules={validationRules.lastName}
            data-cy='lastName_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Email'
            name='email'
            type='email'
            placeholder='Email'
            validationRules={validationRules.email}
            data-cy='email_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Sex'
            name='sex'
            type='text'
            placeholder='Sex'
            validationRules={validationRules.sex}
            data-cy='sex_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Birthdate'
            name='birthdate'
            type='date'
            placeholder='Birthdate'
            validationRules={validationRules.birthdate}
            data-cy='birthdate_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Length (cm)'
            name='length'
            type='number'
            placeholder='Length'
            validationRules={validationRules.length}
            data-cy='length_input'
          />
        </div>
        <div className='mb-4'>
          <LabelInput
            label='Weight (kg)'
            name='weight'
            type='number'
            placeholder='Weight'
            validationRules={validationRules.weight}
            data-cy='weight_input'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            disabled={isSubmitting}
            data-cy='submit_user'
          >
            {user?.id ? 'Save User' : 'Add User'}
          </button>
          <Link
            disabled={isSubmitting}
            className='ml-4 bg-gray-200 hover:bg-gray-300 
            text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            to='/Profile'
          >
            Cancel
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}