import Cookies from "js-cookie";
import { IActionUser } from "src/interfaces/redux.interfaces";

const initialState = {
    user: {
        id: -1,
        name: "",
        email: "",
        password: "",
        avatar: ""
    },
    isAuth: false
};

const SET_USER = "SET_USER";

export default function userReducer(state = initialState, action: IActionUser) {
    switch (action.type) {
        case SET_USER:
            if (action.logout) {
                Cookies.remove("token");

                return {
                    user: {
                        id: -1,
                        name: "",
                        email: "",
                        password: "",
                        avatar: ""
                    },
                    isAuth: false
                }
            };

            return {
                user: action.payload,
                isAuth: true
            };
        default:
            return state;
    }
}