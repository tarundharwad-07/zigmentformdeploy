import React from 'react';
import { useForm } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern: string;
    message: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const DynamicForm: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold">{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id} className="mb-4">
          <label className="block mb-1">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded"
            />
          )}
          
          
          {errors[field.id] && (
            <p className="text-red-600">
              {field.validation?.message || 'This field is required'}
            </p>
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
