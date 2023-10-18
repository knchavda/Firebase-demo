type ButtonProps = {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextButton = ({ label, className, onClick }: ButtonProps) => {
  return <button onClick={onClick} className={`main-text-btn ${className}`}>{label}</button>;
}

export default TextButton;