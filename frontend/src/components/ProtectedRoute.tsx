import {Navigate} from "react-router";
import {useState} from "react";
import Navbar from "./Navbar.tsx";


export default function ProtectedRoute() {
    const [token, setToken] = useState(() => {
        const initialState = localStorage.getItem("taskflow_token")
        return initialState ? initialState: null
    })

    if (token) return <Navbar />

    return <Navigate to="/login" replace/>


}