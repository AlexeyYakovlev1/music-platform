import React from "react";
import { IInfo } from "src/interfaces/alert.interfaces";

const AlertContext = React.createContext({
    info: {
        text: "",
        type: ""
    },
    setInfo: (info: IInfo | ((info: IInfo) => IInfo)) => { }
});

export default AlertContext;