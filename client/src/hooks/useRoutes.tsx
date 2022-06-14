import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Playlist from "../pages/Playlist";

const useRoutes = (isAuth: boolean): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/playlist/:id" element={<Playlist />} />
        </Routes>
    );
};

export default useRoutes;