import { useFormContext } from 'react-hook-form';

export default function SelectList({
  label, name, placeholder, items, validationRules, ...rest
}) {
  const {
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <select
        {...register(name, validationRules)}
        id={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        disabled={isSubmitting}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className="text-red-500 text-xs italic">
          {errors[name]?.message}
        </div>
      ) : null}
    </div>
  );
}