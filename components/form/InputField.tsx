import * as React from 'react';

type InputFieldTypeAttribute = 'date' | 'email' | 'number' | 'password' | 'text'

interface IInputFieldProps {
    title: string,
    type: InputFieldTypeAttribute,
    id: string,
    name: string,
    value?: string
    onChange?: (e: React.ChangeEvent<any>) => void,
    onBlur?: (e: React.FocusEvent<any, Element>) => void,
    disabled?: boolean,
    formik: any
}

const InputField: React.FunctionComponent<IInputFieldProps> = (props) => {


    let { title, type, id, name, value, onChange, onBlur, disabled, formik } = props
    let { touched , errors, values, handleChange, handleBlur, isSubmitting } = formik

    return (
        <>
            <label htmlFor={id} className="form-label">{title}</label>
            <input
                type={type}
                id={id}
                name={name}
                className={`form-control ${touched[name] && errors[name] ? "is-invalid" : ""}`}
                value={value || values.username}
                onChange={onChange || handleChange}
                onBlur={onBlur || handleBlur}
                disabled={disabled || isSubmitting}
            />
            {errors[name] && touched[name] && (
                <span className="text-danger">{errors[name]}</span>
            )}
        </>
    );
};

export default InputField;