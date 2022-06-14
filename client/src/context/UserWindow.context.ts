import React from "react";

const UserWindowContext = React.createContext({
    visible: false,
    setVisible: (value: boolean | ((active: boolean) => boolean)) => { }
});

export default UserWindowContext;