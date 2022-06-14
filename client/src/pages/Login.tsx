import { NavLink } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import classes from "./Pages.module.sass";
import LogoIcon from "../templates/images/music-logo.png";

const Login = (): JSX.Element => {
    document.title = "Авторизация";
    
    return (
        <div className={classes.auth}>
            <div className={classes.authWrapper}>
                <div className={classes.authContent}>
                    <header className={classes.authHeader}>
                        <img src={LogoIcon} alt="logo" />
                        <h2 className={classes.authTitle}>Остался один шаг до Музыки</h2>
                    </header>
                    <form className={classes.authForm}>
                        <Input
                            label="Введите почту"
                            name="email"
                            type="email"
                            placeholder="email@gmail.com"
                        />
                        <Input
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