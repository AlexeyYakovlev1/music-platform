import useRoutes from "./hooks/useRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import SearchContext from "./context/search.context";
import UserWindowContext from "./context/UserWindow.context";import { useDispatch } from "react-redux";
import { setAllPlaylists } from "./redux/actions/audio.actions";
import { getPlaylists } from "./http/playlists.http";
import LoaderContext from "./context/loader.context";
import ModalContext from "./context/modal.context";

const App = (): JSX.Element => {
    const isAuth: boolean = false;
    const routes = useRoutes(isAuth);

    const [visible, setVisible] = React.useState<boolean>(false);
    const [visWindowUsr, setVisWindowUsr] = React.useState<boolean>(false);
    const [load, setLoad] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        setLoad(true);
        getPlaylists().then((response: any) => dispatch(setAllPlaylists(response.data.playlists)));
        setLoad(false);
        // eslint-disable-next-line
    }, []);

    return (
        <LoaderContext.Provider value={{ load, setLoad }}>
            <SearchContext.Provider value={{ visible, setVisible }}>
                <UserWindowContext.Provider value={{ visible: visWindowUsr, setVisible: setVisWindowUsr }}>
                    <ModalContext.Provider value={{ visible: modalVisible, setVisible: setModalVisible }}>
                        <Router>{routes}</Router>
                    </ModalContext.Provider>
                </UserWindowContext.Provider>
            </SearchContext.Provider>
        </LoaderContext.Provider>
    );
}

export default App;