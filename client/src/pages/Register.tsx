import { NavLink } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import classes from "./Pages.module.sass";
import LogoIcon from "../templates/images/music-logo.png";

const Register = (): JSX.Element => {
    document.title = "Регистрация";

    return (
        <div className={classes.auth}>
            <div className={classes.authWrapper}>
                <div className={classes.authContent}>
                    <header className={classes.authHeader}>
                        <img src={LogoIcon} alt="logo" />
                        <h2 className={classes.authTitle}>Регистрация аккаунта</h2>
                    </header>
                    <form className={classes.authForm}>
                        <Input
                            label="Введите имя"
                            name="name"
                            type="text" 
                            placeholder="alex"
                        />
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