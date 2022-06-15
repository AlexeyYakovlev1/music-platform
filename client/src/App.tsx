import useRoutes from "./hooks/useRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import SearchContext from "./context/search.context";
import UserWindowContext from "./context/UserWindow.context";import { useDispatch } from "react-redux";
import { setAllPlaylists } from "./redux/actions/audio.actions";
import { getPlaylists } from "./http/playlists.http";

const App = (): JSX.Element => {
    const isAuth: boolean = false;
    const routes = useRoutes(isAuth);

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
    );
}

export default App;