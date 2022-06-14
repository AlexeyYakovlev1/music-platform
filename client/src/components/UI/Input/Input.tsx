import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import classes from "./Input.module.sass";
import cn from "classnames";

interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    name: string;
}

const Input = ({ className, label, name, ...props }: IInputProps): JSX.Element => {
    return (
        <div className={classes.inputBlock}>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input className={cn(classes.input, className)} {...props} />
        </div>
    );
}

export default Input;