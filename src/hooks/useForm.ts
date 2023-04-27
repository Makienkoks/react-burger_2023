import React, {ChangeEvent, useState} from "react";
interface IUseForm<T> {
  values: Partial<T>, 
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  setValues: (state: Partial<T>) => void
}

export default function useForm<T>(): IUseForm<T> {
  const [values, setValues] = useState<Partial<T>>({});

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}