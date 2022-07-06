import Cookies from "js-cookie";
import React from 'react';
import { useSelector } from "react-redux";
import AlertContext from "src/context/alert.context";
import classes from "../../pages/Pages.module.sass";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const AccountSettings = () => {
    const { info: user } = useSelector((state: any) => state.user);
    const [change, setChange] = React.useState({
        name: user.name,
        email: user.email,
        old_password: "",
        new_password: ""
    });
    const [avatar, setAvatar] = React.useState<string>(user.avatar);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const { setInfo } = React.useContext(AlertContext);

    async function uploadAvatarHandler(event: any) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        const response: any = await axios.post(`${REACT_APP_API_URL}/upload/photo?dir=avatars`, formData, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });
        
        if (!response.data.success) {
            return setInfo({ type: "ERROR", text: response.data.message });
        }

        setAvatarName(response.data.fileName);
        setAvatar(response.data.file);
    }

    async function submitInfoHandler(event: any) {
        event.preventDefault();

        const response = await fetch(`${REACT_APP_API_URL}/settings/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(change)
        });
        const data = await response.json();

        if (!data.success) {
            return setInfo({ text: data.message, type: "ERROR" });
        }

        setInfo({ text: data.message, type: "SUCCESS" });
    }

    async function submitAvatarHandler(event: any) {
        event.preventDefault();

        const response = await fetch(`${REACT_APP_API_URL}/settings/user/avatar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify({avatar: avatar})
        });
        const data = await response.json();

        if (!data.success) {
            return setInfo({ text: data.message, type: "ERROR" });
        }

        setInfo({ text: data.message, type: "SUCCESS" });
    }

    return (
        <div className={classes.settingsAccount}>
            <div className={classes.settingsBlock}>
                <h2 className={classes.settingsBlockTitle}>Общая информация</h2>
                <form className={classes.settingsBlockForm} onSubmit={submitInfoHandler}>
                    <Input
                        type="text"
                        label="Имя пользователя"
                        name="name"
                        value={change.name}
                        onChange={event => setChange({ ...change, name: event.target.value })}
                    />
                    <Input
                        type="email"
                        label="Электронная почта"
                        name="email"
                        value={change.email}
                        onChange={event => setChange({ ...change, email: event.target.value })}
                    />
                    <Input
                        type="password"
                        label="Старый пароль"
                        name="old_password"
                        value={change.old_password}
                        onChange={event => setChange({ ...change, old_password: event.target.value })}
                    />
                    <Input
                        type="password"
                        label="Новый пароль"
                        name="new_password"
                        value={change.new_password}
                        onChange={event => setChange({ ...change, new_password: event.target.value })}
                    />
                    <Button className={classes.settingsBlockSubmit}>Сохранить</Button>
                </form>
            </div>
            <div className={classes.settingsBlock}>
                <h2 className={classes.settingsBlockTitle}>Аватар</h2>
                <form className={classes.settingsBlockForm} onSubmit={submitAvatarHandler}>
                    <Input
                        type="file"
                        label="Фотография пользователя"
                        name="avatar"
                        accept="image/*"
                        onChange={uploadAvatarHandler}
                    />
                    <img className={classes.settingsBlockAvatar} src={avatar} alt={user.name} />
                    <Button className={classes.settingsBlockSubmit}>Сохранить</Button>
                </form>
            </div>
        </div>
    )
}

export default AccountSettings;