import React from "react";

const LoaderContext = React.createContext({
    load: false,
    setLoad: (value: boolean | ((active: boolean) => boolean)) => { }
});

export default LoaderContext;