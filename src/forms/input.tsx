import { Typography } from "@mui/material";

type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  autoComplete: string;
  className?: string;
  endIcon?: any;
  formik?: any;
}

const Input = ({ type = "text", id, name, placeholder, className, endIcon, autoComplete = "off", formik }: InputProps) => {  
  return (
    <div className="input-field">
      <div className={`main-input ${className} ${formik.errors[name] && formik.touched[name] && "error-border"}`}>
        <input type={type} id={id} name={name} value={formik.values[name]} placeholder={placeholder} onChange={formik.handleChange} autoComplete={autoComplete} />
        {endIcon && <div>{endIcon}</div>}
      </div>
      {formik.errors[name] && formik.touched[name] &&
        <Typography paragraph className="error-text">{formik.errors[name]}</Typography>
      }
    </div>
  )
}

export default Input;