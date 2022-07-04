import React from 'react';
import { useSelector } from "react-redux";
import classes from "../../pages/Pages.module.sass";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const AccountSettings = () => {
    const { info: user } = useSelector((state: any) => state.user);
    const [change, setChange] = React.useState({
        name: user.name,
        email: user.email,
        old_password: "",
        new_password: ""
    });
    const [avatar, setAvatar] = React.useState(user.avatar);

    async function uploadAvatarHandler(event: any) {
        setAvatar("new_avatar");
    }

    return (
        <div className={classes.settingsAccount}>
            <div className={classes.settingsBlock}>
                <h2 className={classes.settingsBlockTitle}>Общая информация</h2>
                <form className={classes.settingsBlockForm}>
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
                <form className={classes.settingsBlockForm}>
                    <Input
                        type="file"
                        label="Фотография пользователя"
                        name="avatar"
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