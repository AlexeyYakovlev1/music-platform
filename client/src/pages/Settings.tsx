import React from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import classes from "./Pages.module.sass";
import cn from "classnames";
import AccountSettings from "src/components/TypesPage/AccountSettings";
import OtherSettings from "src/components/TypesPage/OtherSettings";

interface IMenuItem {
    name: string;
    url: string;
}

const Settings = () => {
    const { pathname } = useLocation();
    const { type } = useParams();
    const menu: Array<IMenuItem> = [
        {
            name: "Аккаунт",
            url: "/settings/account"
        },
        {
            name: "Прочее",
            url: "/settings/other"
        }
    ];

    return (
        <MainLayout>
            <div className={classes.settings}>
                <header className={classes.settingsHeader}>
                    <h1 className={classes.settingsTitle}>Настройки</h1>
                </header>
                <nav className={classes.settingsNav}>
                    <ul className={classes.settingsNavList}>
                        {menu.map((item: IMenuItem) => (
                            <li
                                key={item.url}
                                className={cn(classes.settingsNavListItem, {
                                    [classes.settingsNavListItemActive]: pathname === item.url
                                })}
                            >
                                <NavLink to={item.url}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                {type === "account" && <AccountSettings />}
                {type === "other" && <OtherSettings />}
            </div>
        </MainLayout>
    )
}

export default Settings;