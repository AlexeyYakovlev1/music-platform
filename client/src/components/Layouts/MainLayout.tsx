import React from "react";
import Header from "../Header/Header";
import classes from "./MainLayout.module.sass";
import cn from "classnames";
import Footer from "../Footer/Footer";
import SearchContext from "../../context/search.context";
import UserWindowContext from "../../context/UserWindow.context";
import PlayerComponent from "../Player/PlayerComponent";
import { useSelector } from "react-redux";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps): JSX.Element => {
    const { setVisible } = React.useContext(SearchContext);
    const { setVisible: setUserVisible } = React.useContext(UserWindowContext);
    const { currentTrack }: any = useSelector((state: any) => state.audio);

    const handler = () => {
        setUserVisible(false);
        setVisible(false)
    }

    return (
        <div className={cn(classes.layout, "container")} onClick={handler}>
            <Header />
            <div className={classes.body}>{children}</div>
            <Footer className={classes.footer} style={{ paddingBottom: `${currentTrack.title && "100px"}` }} />
            {currentTrack.title && <PlayerComponent />}
        </div>
    );
}

export default MainLayout;