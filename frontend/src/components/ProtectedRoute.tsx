import {Navigate, Outlet} from "react-router";
import {useState, useEffect} from "react";


export default function ProtectedRoute() {
    const [token, setToken] = useState(() => {
        const initialState = localStorage.getItem("taskflow_token")
        return initialState ? initialState: null
    })

    if (token) return <Outlet/>

    return <Navigate to="/login" replace/>


}