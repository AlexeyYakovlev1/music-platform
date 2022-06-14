import { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./Button.module.sass";
import cn from "classnames";

interface IButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>,HTMLButtonElement> {
    children: React.ReactNode;
    background?: "WHITE" | "YELLOW";
}

const Button = ({ children, className, background, ...props }: IButtonProps): JSX.Element => {
    return (
        <button
            className={cn(classes.button, className, {
                [classes.buttonWhite]: background === "WHITE"
            })}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;