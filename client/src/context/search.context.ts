import React from "react";

const SearchContext = React.createContext({
    visible: false,
    setVisible: (value: boolean | ((active: boolean) => boolean)) => { }
});

export default SearchContext;