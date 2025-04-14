"use client"
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useLocalStorageForm<T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
  const [formState, setFormState] = useState<T>(() => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) as T : initialState;
    } catch (error) {
      console.error('Error reading localStorage key "' + key + '": ', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(formState));
    } catch (error) {
      console.error('Error setting localStorage key "' + key + '": ', error);
    }
  }, [key, formState]);

  return [formState, setFormState];
}

export default useLocalStorageForm;
