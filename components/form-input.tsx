interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({ name, type, placeholder, required, errors }: FormInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-pink-300 border-none px-4 placeholder:text-neutral-400'
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className='font-medium text-red-500'>
          {error}
        </span>
      ))}
    </div>
  );
}
