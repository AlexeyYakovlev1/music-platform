import React from "react";
import Header from "../Header/Header";
import classes from "./MainLayout.module.sass";
import cn from "classnames";
import Footer from "../Footer/Footer";
import SearchContext from "../../context/search.context";
import UserWindowContext from "../../context/UserWindow.context";
import PlayerComponent from "../PlayerComponent/PlayerComponent";
import { useSelector } from "react-redux";
import LoaderContext from "src/context/loader.context";
import Loader from "../UI/Loader/Loader";
import Alert from "../UI/Alert/Alert";
import AlertContext from "src/context/alert.context";
import Cookies from "js-cookie";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps): JSX.Element => {
    const { setVisible } = React.useContext(SearchContext);
    const { setVisible: setUserVisible } = React.useContext(UserWindowContext);
    const { load } = React.useContext(LoaderContext);
    const { info } = React.useContext(AlertContext);

    const { currentTrack }: any = useSelector((state: any) => state.audio);

    const handler = () => {
        setUserVisible(false);
        setVisible(false)
    }

    return (
        <div className={cn(classes.layout, "container")} onClick={handler}>
            {info.text && <Alert />}
            <Header />
            <div className={classes.body}>
                {load ? <Loader /> : children}
            </div>
            <Footer className={classes.footer} style={{ paddingBottom: `${currentTrack.title && "100px"}` }} />
            {currentTrack.title && <PlayerComponent />}
        </div>
    );
}

export default MainLayout;