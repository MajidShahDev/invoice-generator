'use client';
import React, { ChangeEvent } from 'react';
import useLocalStorageForm from './useLocalStorageForm';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
};

const MyFormComponent: React.FC = () => {
  const [form, setForm] = useLocalStorageForm<FormState>(
    'myForm',
    initialFormState
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <p>{form.firstName}</p>
      <label>
        First Name:
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
      </label>
      <br />
      <label>
        Email:
        <input
          name="email"
          value={form.email}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
      </label>
    </div>
  );
};

export default MyFormComponent;
