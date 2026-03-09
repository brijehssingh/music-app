import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Logout(){

const logout = useAuthStore(state => state.logout)

const navigate = useNavigate()

useEffect(()=>{

const doLogout = async ()=>{

await logout()

navigate("/signup")

}

doLogout()

},[])

return <p className="text-center mt-20">Logging out...</p>

}