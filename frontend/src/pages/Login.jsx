import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){

const login = useAuthStore(state=>state.login)
const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit = async(e)=>{
e.preventDefault()

await login(email,password)

alert("Login Success")

navigate("/")   // dashboard
}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

<div className="card w-96 bg-base-100 shadow-2xl">

<div className="card-body">

<h2 className="text-2xl font-bold text-center mb-4">
Welcome Back
</h2>

<form onSubmit={handleSubmit}>

<input
className="input input-bordered w-full mb-3"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="input input-bordered w-full mb-4"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn btn-primary w-full">
Login
</button>

</form>

<p className="text-center mt-4">

Don't have an account?{" "}

<Link to="/signup" className="text-primary font-semibold">
Signup
</Link>

</p>

</div>

</div>

</div>

)

}