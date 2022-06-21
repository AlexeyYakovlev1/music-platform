import React from 'react'
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import Playlists from "src/components/UserPage/Playlists";
import Tracks from "src/components/UserPage/Tracks";
import LoaderContext from "src/context/loader.context";
import { getUser } from "src/http/user.http";
import { IUser } from "src/interfaces/user.interface";
import classes from "./Pages.module.sass";
import cn from "classnames";
import Button from "src/components/UI/Button/Button";
import { ReactComponent as SettingsIcon } from "src/templates/svgs/settings.svg";
import useMounted from "src/hooks/useIsMounted";
import ModalContext from "src/context/modal.context";
import Modal from "src/components/UI/Modal/Modal";

const User = () => {
    const { id, type } = useParams();
    const { pathname } = useLocation();
    
    const { id: userId } = useSelector((state: any) => state.user.info);

    const [user, setUser] = React.useState<IUser>({
        id: -1,
        name: "",
        email: "",
        password: "",
        avatar: ""
    });
    const [activeUser, setActiveUser] = React.useState<boolean>(userId === id);
    
    const { setLoad } = React.useContext(LoaderContext);
    const { setVisible } = React.useContext(ModalContext);
    
    const isMounted = useMounted();
    const menu = [
        {
            name: "Плейлисты",
            url: `/user/${id}/playlists`
        },
        {
            name: "Треки",
            url: `/user/${id}/tracks`
        }
    ];

    React.useEffect(() => {
        setLoad(true);
        if (id && isMounted) {
            getUser(+id).then((response: any) => setUser(response.data.user));
            setActiveUser(+userId === +id);
        }
        setLoad(false);

        // eslint-disable-next-line
    }, [isMounted, userId, id]);

    return (
        <MainLayout>
            <Modal>
                <img src={user.avatar} alt={user.name} />
            </Modal>
            <div className={classes.user}>
                <header className={classes.userHeader}>
                    <img
                        onClick={() => setVisible(true)}
                        className={classes.userHeaderAvatar}
                        src={user.avatar}
                        alt={user.name}
                    />
                    <div className={classes.userHeaderInfo}>
                        <div className={classes.userHeaderInfoTop}>
                            <span className={classes.userHeaderInfoType}>Коллекция</span>
                            <h1 className={classes.userHeaderInfoName}>{user.name}</h1>
                        </div>
                        <div className={classes.userHeaderInfoActions}>
                            {activeUser &&
                            <Button
                                className={classes.userHeaderInfoActionsButton}
                                background="WHITE"
                            >
                                <NavLink to="/user/settings">
                                    <SettingsIcon width={20} height={20} />
                                    <span>Настройки</span>
                                </NavLink>
                            </Button>}
                        </div>
                    </div>
                </header>
                <div className={classes.userBody}>
                    <header className={classes.userBodyHeader}>
                        <nav className={classes.userBodyNav}>
                            <ul className={classes.userBodyNavList}>
                                {menu.map(item => (
                                    <li
                                        key={item.url}
                                        className={cn(classes.userBodyNavItem, {
                                            [classes.userBodyNavItemActive]: pathname === item.url
                                        })}
                                    >
                                        <NavLink to={item.url}>{item.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>    
                    </header>
                    {type === "tracks" && <Tracks />}
                    {type === "playlists" && <Playlists />}
                </div>
            </div>
        </MainLayout>
    )
}

export default User