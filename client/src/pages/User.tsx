import React from 'react'
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import LoaderContext from "src/context/loader.context";
import classes from "./Pages.module.sass";
import cn from "classnames";
import Button from "src/components/UI/Button/Button";
import { ReactComponent as SettingsIcon } from "src/templates/svgs/settings.svg";
import useMounted from "src/hooks/useIsMounted";
import ModalContext from "src/context/modal.context";
import Modal from "src/components/UI/Modal/Modal";
import Tracks from "src/components/TypesPage/Tracks";
import Playlists from "src/components/TypesPage/Playlists";
import { ITrack } from "src/interfaces/audio.interfaces";
import { IUser } from "src/interfaces/user.interface";
import { getUser } from "src/http/user.http";

const User = () => {
    const { id, type } = useParams();
    const { pathname } = useLocation();
    
    const { info } = useSelector((state: any) => state.user);
    const { tracks, playlists } = useSelector((state: any) => state.audio.follow);

    const { setLoad } = React.useContext(LoaderContext);
    const { setVisible } = React.useContext(ModalContext);

    const [activeUser, setActiveUser] = React.useState<boolean>(info.id === id);
    const [user, setUser] = React.useState<IUser>(info);
    
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
    const currentPlaylist: any = {
        name: `${user.name}-all`,
        id: 0,
        title: `Все треки ${user.name}`,
        owners: tracks && tracks.map((track: ITrack) => track.owners),
        audios: tracks,
        cover: "none"
    };

    React.useEffect(() => {
        setLoad(true);
        if (id && isMounted) {
            getUser(+id).then((response: any) => setUser(response.data.user));
            setActiveUser(+user.id === +id);
        };
        setLoad(false);

        // eslint-disable-next-line
    }, [isMounted, user.id, id]);

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
                                <NavLink to="/settings/account">
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
                    {type === "tracks" && <Tracks playlist={currentPlaylist} tracks={tracks} />}
                    {type === "playlists" && <Playlists playlists={playlists} />}
                </div>
            </div>
        </MainLayout>
    )
}

export default User