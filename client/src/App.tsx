import useRoutes from "./hooks/useRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import SearchContext from "./context/search.context";
import UserWindowContext from "./context/UserWindow.context"; import { useDispatch, useSelector } from "react-redux";
import { setAllFollow, setAllPlaylists } from "./redux/actions/audio.actions";
import { getPlaylists } from "./http/playlists.http";
import LoaderContext from "./context/loader.context";
import ModalContext from "./context/modal.context";
import { IInfo } from "./interfaces/alert.interfaces";
import AlertContext from "./context/alert.context";
import { checkAuth } from "./http/auth.http";
import Cookies from "js-cookie";
import { setUser } from "./redux/actions/user.actions";
import { getFollow } from "./http/follow.http";

const App = (): JSX.Element => {
    const isAuth: boolean = useSelector((state: any) => state.user.isAuth);
    const routes = useRoutes(isAuth);

    const [visible, setVisible] = React.useState<boolean>(false);
    const [visWindowUsr, setVisWindowUsr] = React.useState<boolean>(false);
    const [load, setLoad] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [info, setInfo] = React.useState<IInfo>({ text: "", type: "SUCCESS" });

    const dispatch = useDispatch();

    React.useEffect(() => {
        setLoad(true);
        getPlaylists().then((response: any) => dispatch(setAllPlaylists(response.data.playlists)));
        checkAuth().then((response: any) => {
            if (!response.data.success) dispatch(setUser(response.data.user, true));

            Cookies.set("token", response.data.token);
            dispatch(setUser(response.data.user, false));
            getFollow(response.data.user.id).then((obj: any) => {
                dispatch(setAllFollow(obj.data.follow.tracks, obj.data.follow.playlists));
            });
        });
        setLoad(false);
        // eslint-disable-next-line
    }, []);

    return (
        <AlertContext.Provider value={{ info, setInfo }}>
            <LoaderContext.Provider value={{ load, setLoad }}>
                <SearchContext.Provider value={{ visible, setVisible }}>
                    <UserWindowContext.Provider value={{ visible: visWindowUsr, setVisible: setVisWindowUsr }}>
                        <ModalContext.Provider value={{ visible: modalVisible, setVisible: setModalVisible }}>
                            <Router>{routes}</Router>
                        </ModalContext.Provider>
                    </UserWindowContext.Provider>
                </SearchContext.Provider>
            </LoaderContext.Provider>
        </AlertContext.Provider>
    );
}

export default App;