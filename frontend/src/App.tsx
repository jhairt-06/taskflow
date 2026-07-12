import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {BrowserRouter, Routes, Route} from 'react-router'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
