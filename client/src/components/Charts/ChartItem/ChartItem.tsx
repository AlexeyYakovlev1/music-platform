import classes from "./ChartItem.module.sass";
import PlaylistComponent, { IPlayListProps } from "../../PlayListComponent/PlayListComponent";

export interface IChartsProps {
    id: number;
    title: string;
    subtitle: string;
    link: string;
    playlists: Array<IPlayListProps>
}

const ChartItem = ({ playlists, title, subtitle }: IChartsProps): JSX.Element => {
    return (
        <li className={classes.item}>
            <header className={classes.header}>
                <h2 className={classes.title}>{title}</h2>
                <span className={classes.subtitle}>{subtitle}</span>
            </header>
            <ul className={classes.list}>
                {playlists.map((item: IPlayListProps) => (
                    <PlaylistComponent key={item.id} {...item} />
                ))}
            </ul>
        </li>
    );
};

export default ChartItem;