import React from "react";
import { NavLink } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import { getAllFilts } from "src/http/filts.http";
import { IFilt } from "src/interfaces/audio.interfaces";
import classes from "./Pages.module.sass";

const Error = () => {
    const [filts, setFilts] = React.useState<Array<IFilt>>([{ id: -1, name: "" }]);
    
    React.useEffect(() => {
        getAllFilts().then(response => setFilts(response.data.filts));
    }, []);

    return (
        <MainLayout>
            <div className={classes.error}>
                <header className={classes.errorHeader}>
                    <h1 className={classes.errorHeaderTitle}>Ошибка 404</h1>
                    <div className={classes.errorHeaderDescription}>
                        <p className={classes.errorHeaderText}>Вы попали на несуществующую страницу.</p>
                        <p className={classes.errorHeaderText}>Вероятно, это произошло из-за опечатки или неправильной раскладки клавиатуры.</p>
                    </div>
                    <p className={classes.errorHeaderText}>
                        Если вы прошли сюда по ссылке, <NavLink to="/support">поделитесь ею с нами</NavLink>, пожалуйста.
                    </p>
                </header>
                <div className={classes.errorDown}>
                    <h2 className={classes.errorDownTitle}>Выбирайте музыку по вкусу</h2>
                    <ul className={classes.errorDownFilts}>
                        {filts.map((item: IFilt, index: number) => (
                            <li key={item.id}>
                                <NavLink to={`/tracks/${item.name}`}>
                                    {`${item.name.toLowerCase()}${index < filts.length - 1 ? "," : ""}`}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </MainLayout>
    )
}

export default Error;