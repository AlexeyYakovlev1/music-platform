import React from "react";

const ModalContext = React.createContext({
    visible: false,
    setVisible: (value: boolean | ((visible: boolean) => boolean)) => { }
});

export default ModalContext;