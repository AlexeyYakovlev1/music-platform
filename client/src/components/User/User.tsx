import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./User.module.sass";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import UserWindowContext from "../../context/UserWindow.context";

interface IUserProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string;
}

const User = ({ name, className, ...props }: IUserProps): JSX.Element => {
    const { visible } = React.useContext(UserWindowContext);
    
    return (
        <div
            onClick={event => event.stopPropagation()}
            className={cn(classes.window, className, {
                [classes.windowHidden]: !visible
            })}
            {...props}
        >
            <header className={classes.header}>
                <span className={classes.name}>{name}</span>
            </header>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <NavLink to="/likes">Коллекция</NavLink>
                    </li>
                    <li className={classes.listItem}>
                        <NavLink to="/playlists">Плейлисты</NavLink>
                    </li>
                    <li className={classes.listItem}>
                        <NavLink to="/settings">Настройки</NavLink>
                    </li>
                    <li className={classes.listItem}>
                        Выйти
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default User;