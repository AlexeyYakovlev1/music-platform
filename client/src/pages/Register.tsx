import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import classes from "./Pages.module.sass";
import LogoIcon from "../templates/images/music-logo.png";
import React from "react";
import Alert from "src/components/UI/Alert/Alert";
import AlertContext from "src/context/alert.context";

const { REACT_APP_API_URL } = process.env;

const Register = (): JSX.Element => {
    document.title = "Регистрация";

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { info, setInfo } = React.useContext(AlertContext);

    const registerHandler = async (event: any) => {
        event.preventDefault();
        
        const response = await fetch(`${REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if (!data.success) {
            return setInfo({ text: data.message, type: "ERROR" });
        }

        setInfo({ text: "Вы зарегистрировались", type: "SUCCESS" });
        navigate("/login");
    }

    return (
        <div className={classes.auth}>
            {info.text && <Alert />}
            <div className={classes.authWrapper}>
                <div className={classes.authContent}>
                    <header className={classes.authHeader}>
                        <img src={LogoIcon} alt="logo" />
                        <h2 className={classes.authTitle}>Регистрация аккаунта</h2>
                    </header>
                    <form className={classes.authForm} onSubmit={registerHandler}>
                        <Input
                            value={user.name}
                            onChange={event => setUser({ ...user, name: event.target.value })}
                            label="Введите имя"
                            name="name"
                            type="text" 
                            placeholder="alex"
                        />
                        <Input
                            value={user.email}
                            onChange={event => setUser({ ...user, email: event.target.value })}
                            label="Введите почту"
                            name="email"
                            type="email"
                            placeholder="email@gmail.com"
                        />
                        <Input
                            value={user.password}
                            onChange={event => setUser({ ...user, password: event.target.value })}
                            label="Введите пароль"
                            name="password"
                            type="password"
                            placeholder="*******"
                        />
                        <Button style={{marginTop: "15px"}}>Зарегистрироваться</Button>
                    </form>
                    <div className={classes.authDown}>
                        <p className={classes.authText}>Есть аккаунт? <NavLink to="/login">Войти</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;