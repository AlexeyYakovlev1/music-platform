import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import classes from "./Pages.module.sass";
import LogoIcon from "../templates/images/music-logo.png";
import React from "react";
import AlertContext from "src/context/alert.context";
import Alert from "src/components/UI/Alert/Alert";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser as setReduxUser } from "src/redux/actions/user.actions";

const { REACT_APP_API_URL } = process.env;

const Login = (): JSX.Element => {
    document.title = "Авторизация";

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const { info, setInfo } = React.useContext(AlertContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async (event: any) => {
        event.preventDefault();

        const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
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

        dispatch(setReduxUser(data.user, false));
        Cookies.set("token", data.token);

        navigate("/");
        document.title = "Платформа Музыка - собираем музыку и подкасты для вас";
    }

    return (
        <div className={classes.auth}>
            {info.text && <Alert />}
            <div className={classes.authWrapper}>
                <div className={classes.authContent}>
                    <header className={classes.authHeader}>
                        <img src={LogoIcon} alt="logo" />
                        <h2 className={classes.authTitle}>Остался один шаг до Музыки</h2>
                    </header>
                    <form className={classes.authForm} onSubmit={loginHandler}>
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
                        <Button style={{marginTop: "15px"}}>Войти</Button>
                    </form>
                    <div className={classes.authDown}>
                        <p className={classes.authText}>Нет аккаунта? <NavLink to="/register">Зарегистрироваться</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;