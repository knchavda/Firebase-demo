
type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  autoComplete:string;
  onChnage: (e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  endIcon?: any;
}

const Input = ({ type = "text", id, name, placeholder, value, onChnage, className, endIcon, autoComplete="off" }: InputProps) => {
  return (
    <div className={`main-input ${className}`}>
      <input type={type} id={id} name={name} value={value} placeholder={placeholder} onChange={onChnage} autoComplete={autoComplete}/>
      {endIcon && <div>{endIcon}</div>}
    </div>
  )
}

export default Input;