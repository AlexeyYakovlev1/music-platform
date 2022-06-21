import { NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.sass";
import cn from "classnames";
import React from "react";
import SearchContext from "../../context/search.context";
import UserWindowContext from "../../context/UserWindow.context";
import User from "../UserComponent/UserComponent";
import Button from "../UI/Button/Button";
import { ReactComponent as SearchIcon } from "../../templates/svgs/search.svg";
import { useSelector } from "react-redux";

export interface IMenu {
    name: string;
    link: string;
}

const Header = (): JSX.Element => {
    const { visible, setVisible } = React.useContext(SearchContext);
    const { setVisible: setUserVisible } = React.useContext(UserWindowContext); 

    const { isAuth, info } = useSelector((state: any) => state.user);

    const location:any = useLocation();
    const menu: Array<IMenu> = [
        {
            name: "Главная",
            link: "/"
        },
        {
            name: "Подкасты и книги",
            link: "/books"
        },
        {
            name: "Детям",
            link: "/kids"
        },
        {
            name: "Коллекция",
            link: "/collection"
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
                    <div className={classes.search} onClick={(event) => event.stopPropagation()}>
                        <button
                            className={classes.searchButton}
                            onClick={() => setVisible(true)}
                        >
                            <SearchIcon />
                        </button>
                        <form className={classes.searchForm}>
                            <input
                                className={cn(classes.searchInput, {
                                    [classes.searchInputHide]: !visible
                                })}
                                type="text"
                                placeholder="Трек, альбом, исполнитель, подкаст"
                            />
                        </form>
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
                    <Button><NavLink to="/login">Войти</NavLink></Button>
                }
            </div>
        </header>
    );
}

export default Header;