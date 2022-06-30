import React from "react";
import { ReactComponent as SearchIcon } from "../../../templates/svgs/search.svg";
import classes from "./Search.module.sass";
import cn from "classnames";
import SearchContext from "src/context/search.context";

const Search = () => {
    const { setVisible, visible } = React.useContext(SearchContext);
    
    return (
        <div className={classes.search} onClick={(event) => event.stopPropagation()}>
            <button
                className={classes.searchButton}
                onClick={() => setVisible(true)}
            >
                <SearchIcon />
            </button>
            <form className={classes.searchForm}>
                <input
                    className={cn(classes.searchInput, {
                        [classes.searchInputHide]: !visible
                    })}
                    type="text"
                    placeholder="Трек, альбом, исполнитель, подкаст"
                />
            </form>
        </div>
    )
}

export default Search;