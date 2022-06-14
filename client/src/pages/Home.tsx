import Charts from "../components/Charts/Charts";
import MainLayout from "../components/Layouts/MainLayout";
import classes from "./Pages.module.sass";

const Home = (): JSX.Element => {
    return (
        <MainLayout>
            <div className={classes.home}>
                <Charts />
            </div>
        </MainLayout>
    );
}

export default Home;