import { DetailedHTMLProps, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { IMenu } from "../Header/Header";
import classes from "./Footer.module.sass";
import cn from "classnames";

interface IFooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Footer = ({ className, ...props }: IFooterProps): JSX.Element => {
    const menu: Array<IMenu> = [
        {
            name: "Правообладателям",
            link: "/owners"
        },
        {
            name: "Пользовательское соглашение",
            link: "/policy"
        },
        {
            name: "Справка",
            link: "/faq"
        }
    ];
    return (
        <footer className={cn(classes.footer, className)} { ...props }>
            <div className={classes.top}>
                <nav className={classes.topMenu}>
                    <ul className={classes.topMenuList}>
                        {menu.map((item:IMenu) => (
                            <li className={classes.topMenuItem} key={item.link}>
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className={classes.text} style={{color: "#222"}}>© 2022 ООО «Платформа.Медиасервисы»</p>
            </div>
            <div className={classes.down}>
                <p className={classes.text}>
                    Сервис Платформа.Музыка может содержать информацию, не предназначенную для несовершеннолетних
                </p>
            </div>
        </footer>
    );
}

export default Footer;