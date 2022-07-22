import * as React from 'react';

interface ITextareaFieldProps {
    title: string,
    id: string,
    name: string,
    value?: string
    onChange?: (e: React.ChangeEvent<any>) => void,
    onBlur?: (e: React.FocusEvent<any, Element>) => void,
    disabled?: boolean,
    formik: any
}

const TextareaField: React.FunctionComponent<ITextareaFieldProps> = (props) => {

    let { title, id, name, value, onChange, onBlur, disabled, formik } = props
    let { touched, errors, values, handleChange, handleBlur, isSubmitting } = formik

    return (
        <>
            <label htmlFor={id} className="form-label">{title}</label>
            <textarea
                id={id}
                name={name}
                className={`form-control ${touched[name] && errors[name] ? "is-invalid" : ""}`}
                value={value || values[name]}
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

export default TextareaField;