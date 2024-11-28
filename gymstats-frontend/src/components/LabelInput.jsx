import { useFormContext } from 'react-hook-form';

export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-gray-700 font-bold mb-2'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, validationRules)}
          id={name}
          disabled={isSubmitting}
          className='shadow appearance-none border rounded w-full py-2 
          px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          rows={4}
          {...rest}
        />
      ) : (
        <input
          {...register(name, validationRules)}
          id={name}
          type={type}
          disabled={isSubmitting}
          className='shadow appearance-none border rounded w-full py-2 
          px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          {...rest}
        />
      )}
      {hasError ? (
        <div className='text-red-500 text-xs italic' data-cy='label_input_error'>{errors[name]?.message}</div>
      ) : null}
    </div>
  );
}