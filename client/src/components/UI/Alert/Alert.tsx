import React from 'react';
import classes from "./Alert.module.sass";
import AlertContext from "src/context/alert.context";
import cn from "classnames";

const Alert = () => {
    const { info: { type, text }, setInfo } = React.useContext(AlertContext);
    const success = type === "SUCCESS";

    const closeHandler = () => {
        setInfo({ text: "", type: "SUCCESS" });
    }

    return (
        <div className={cn(classes.alert, {
            [classes.error]: !success
        })}>
            <p className={classes.text}>
                <strong>{success ? "Успешное оповещение" : "Неудачное оповещение"}</strong>
                &nbsp;- {text}
            </p>
            <span onClick={closeHandler} className={classes.close}>&#10006;</span>
        </div>
    )
}

export default Alert;