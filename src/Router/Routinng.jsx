import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SideBar from "../Componets/SideBar";
import Profile from "../pages/Profile";
import Create from "../CRUD/Create";
import ShowAppart from "../CRUD/ShowAppart";
import Login from "../Authentication/Login";
import Logout from "../Authentication/Logout";
import ListAppart from "../CRUD/ListAppart";
import EditAppart from "../CRUD/EditAppart";

export default function Routinng(){
    return <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SideBar />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product" element={<ListAppart />} />
                <Route path="/product/:id" element={<ShowAppart />} />
                <Route path="/product/create" element={<Create />} />
                <Route path="/product/edit/:id" element={<EditAppart />} />
            </Route>    
            <Route path="login" element={<Login />}></Route>
            <Route path="logout" element={<Logout />}></Route>
        </Routes>
    </BrowserRouter>
    </>
}