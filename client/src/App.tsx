<<<<<<< HEAD
=======
// other
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
import useRoutes from "./hooks/useRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import SearchContext from "./context/search.context";
<<<<<<< HEAD
import UserWindowContext from "./context/UserWindow.context";import { useDispatch } from "react-redux";
import { setAllPlaylists } from "./redux/actions/audio.actions";
import { getPlaylists } from "./http/playlists.http";
=======
import UserWindowContext from "./context/UserWindow.context";
import { Provider } from "react-redux";
import store from "./redux/store";
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

const App = (): JSX.Element => {
    const isAuth: boolean = false;
    const routes = useRoutes(isAuth);
<<<<<<< HEAD

    const [visible, setVisible] = React.useState<boolean>(false);
    const [visWindowUsr, setVisWindowUsr] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        getPlaylists().then((response: any) => dispatch(setAllPlaylists(response.data.playlists)));

        // eslint-disable-next-line
    }, []);

    return (
        <SearchContext.Provider value={{ visible, setVisible }}>
            <UserWindowContext.Provider value={{ visible: visWindowUsr, setVisible: setVisWindowUsr }}>
                <Router>{routes}</Router>
            </UserWindowContext.Provider>
        </SearchContext.Provider>
=======
    
    const [visible, setVisible] = React.useState<boolean>(false);
    const [visWindowUsr, setVisWindowUsr] = React.useState<boolean>(false);

    return (
        <Provider store={store}>
            <SearchContext.Provider value={{ visible, setVisible }}>
                <UserWindowContext.Provider value={{ visible: visWindowUsr, setVisible: setVisWindowUsr }}>
                    <Router>{routes}</Router>
                </UserWindowContext.Provider>
            </SearchContext.Provider>
        </Provider>
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    );
}

export default App;