import classes from "./Loader.module.sass";

const Loader = (): JSX.Element => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loader}></div>
        </div>
    );
}

export default Loader;