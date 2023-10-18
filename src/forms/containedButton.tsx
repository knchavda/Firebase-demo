type ButtonProps = {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ContainedButton = ({label,className, onClick}: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={`main-contained-btn ${className}`}>{label}</button>
    </div>
  )
}

export default ContainedButton;