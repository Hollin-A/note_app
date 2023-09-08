import { useField } from "formik";
import React, { FC } from "react";

const labelClasses: string = "font-semibold text-dark";

const inputClasses: string =
  "w-full rounded-lg p-2 mb-4 outline-none border-b border-grey";

const conditionalInputClasses: string = "border-b-2 border-red";

const errorClasses: string = "error -mt-3 mb-2 text-red font-bold text-sm";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `${inputClasses} ${
    meta.touched && meta.error ? conditionalInputClasses : ""
  }`;

  return (
    <>
      <label className={labelClasses} htmlFor={props.name}>
        {label}
      </label>
      <input className={inputModifiedClasses} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={errorClasses}>{meta.error}</div>
      ) : null}
    </>
  );
};

interface TextAreaProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `${inputClasses} ${
    meta.touched && meta.error ? conditionalInputClasses : ""
  }`;

  return (
    <>
      <label className={labelClasses} htmlFor={props.name}>
        {label}
      </label>
      <textarea className={inputModifiedClasses} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={errorClasses}>{meta.error}</div>
      ) : null}
    </>
  );
};

interface SelectProps {
  label: string;
  name: string;
}

export const Select: React.FC<SelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const inputModifiedClasses = `${inputClasses} ${
    meta.touched && meta.error ? conditionalInputClasses : ""
  }`;

  return (
    <div>
      <label className={labelClasses} htmlFor={props.name}>
        {label}
      </label>
      <select className={inputModifiedClasses} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={errorClasses}>{meta.error}</div>
      ) : null}
    </div>
  );
};
