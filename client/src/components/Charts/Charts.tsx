import ChartItem, { IChartsProps } from "./ChartItem/ChartItem";
import classes from "./Charts.module.sass";
import React from "react";
import { useSelector } from "react-redux";

const Charts = (): JSX.Element => {
    const { playlists }: any = useSelector((state: any) => state.audio);
    const charts: Array<IChartsProps> = [
        {
            id: 746,
            title: "Новые плейлисты",
            subtitle: "Новые треки, альбомы и сборники",
            link: "/new_realizes",
            playlists
        }
    ]
    
    return (
        <ul className={classes.list}>
            {charts.map((item: IChartsProps) => (
                <ChartItem key={item.id} { ...item } />
            ))}
        </ul>
    );
}

export default Charts;