import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./User.module.sass";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import UserWindowContext from "../../context/UserWindow.context";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/actions/user.actions";

interface IUserProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string;
}

const User = ({ name, className, id, ...props }: IUserProps): JSX.Element => {
    const { visible } = React.useContext(UserWindowContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(setUser({
            id: -1,
            name: "",
            email: "",
            password: "",
            avatar: ""
        }, true));
        navigate("/");
    }

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
                        <NavLink to={`/user/${id}/playlists`}>Плейлисты</NavLink>
                    </li>
                    <li className={classes.listItem}>
                        <NavLink to={`/user/${id}/tracks`}>Треки</NavLink>
                    </li>
                    <li className={classes.listItem}>
                        <NavLink to={`/user/settings`}>Настройки</NavLink>
                    </li>
                    <li className={classes.listItem} onClick={logoutHandler}>Выйти</li>
                </ul>
            </nav>
        </div>
    );
}

export default User;