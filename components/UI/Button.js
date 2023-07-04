import style from "./Button.module.css";
const Button = (props) => {
  const combineClasses = `${style.button} ${props.className}`;
  return (
    <div className={combineClasses} {...props.data}>
      {props.text}
    </div>
  );
};
export default Button;
