import Home from './pages/Home.jsx'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router"
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./pages/Product.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
               <Route path={"/"} element={<Home/>}/>
                <Route path={"/dashboard"} element={<Dashboard />}/>
                <Route path={"/products"} element={<Product/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/forget-password"} element={<ForgetPassword/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
            </Routes>

        </BrowserRouter>

    )
}