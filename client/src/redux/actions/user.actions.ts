import { IActionUser } from "src/interfaces/redux.interfaces"
import { IUser } from "src/interfaces/user.interface"

export const setUser = (user: IUser, logout: boolean): IActionUser => {
    return {
        type: "SET_USER",
        payload: user,
        logout
    }
}