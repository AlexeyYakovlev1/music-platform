import { NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.sass";
import cn from "classnames";
import React from "react";
import UserWindowContext from "../../context/UserWindow.context";
import User from "../UserComponent/UserComponent";
import Button from "../UI/Button/Button";
import { useSelector } from "react-redux";
import Search from "./Search/Search";

export interface IMenu {
    name: string;
    link: string;
}

const Header = (): JSX.Element => {
    const { setVisible: setUserVisible } = React.useContext(UserWindowContext); 

    const { isAuth, info } = useSelector((state: any) => state.user);

    const location:any = useLocation();
    const menu: Array<IMenu> = [
        {
            name: "Главная",
            link: "/"
        },
        {
            name: "Коллекция",
            link: `/user/${info.id}/playlists`
        }
    ];
    
    return (
        <header className={classes.header}>
            <div className={classes.left}>
                <h1 className={classes.logo}>
                    <NavLink to="/">Платформа Музыка</NavLink>
                </h1>
                <div className={classes.leftActions}>
                    <nav className={classes.nav}>
                        <ul className={classes.navList}>
                            {menu.map((item: IMenu) => (
                                <li
                                    className={cn(classes.navItem, {
                                        [classes.navItemActive]: location.pathname === item.link
                                    })}
                                    key={item.link}
                                >
                                    <NavLink to={item.link}>{item.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={classes.desktopSearch}>
                        <Search />
                    </div>
                </div>
            </div>
            <div className={classes.right} onClick={(event) => event.stopPropagation()}>
                {isAuth ?
                    <React.Fragment>
                        <div className={classes.user} onClick={() => setUserVisible(true)}>
                            <img
                                src={info.avatar}
                                alt="user avatar"
                                className={classes.userAvatar}
                            />
                        </div>
                        <User {...info} />
                    </React.Fragment>
                    :
                    <Button className={classes.rightUserLogin}>
                        <NavLink to="/login">Войти</NavLink>
                    </Button>
                }
                <div className={classes.mobileSearch}>
                    <Search />
                </div>
            </div>
        </header>
    );
}

export default Header;