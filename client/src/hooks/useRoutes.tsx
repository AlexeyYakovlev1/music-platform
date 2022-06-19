import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Playlist from "../pages/Playlist";
import Owner from "src/pages/Owner";
import Error from "src/pages/404";

const useRoutes = (isAuth: boolean): JSX.Element => {
    return (
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/owner/:id/:type" element={<Owner />} />
        </Routes>
    );
};

export default useRoutes;