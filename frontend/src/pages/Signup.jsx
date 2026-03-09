import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Signup(){

const signup = useAuthStore(state=>state.signup)
const navigate = useNavigate();

const [data,setData] = useState({
name:"",
email:"",
password:"",
user:"normal"
})

const handleSubmit = async(e)=>{
e.preventDefault()

await signup(data)

alert("Account Created")

navigate("/")   // dashboard redirect
}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

<div className="card w-96 bg-base-100 shadow-2xl">

<div className="card-body">

<h2 className="text-2xl font-bold text-center mb-4">
Create Account
</h2>

<form onSubmit={handleSubmit}>

<input
className="input input-bordered w-full mb-3"
placeholder="Name"
onChange={(e)=>setData({...data,name:e.target.value})}
/>

<input
className="input input-bordered w-full mb-3"
placeholder="Email"
onChange={(e)=>setData({...data,email:e.target.value})}
/>

<input
type="password"
className="input input-bordered w-full mb-3"
placeholder="Password"
onChange={(e)=>setData({...data,password:e.target.value})}
/>

<select
className="select select-bordered w-full mb-4"
onChange={(e)=>setData({...data,user:e.target.value})}
>

<option value="normal">Normal User</option>
<option value="premium">Premium User</option>

</select>

<button className="btn btn-primary w-full">
Signup
</button>

</form>

<p className="text-center mt-4">

Already have an account?{" "}

<Link
to="/login"
className="text-primary font-semibold hover:underline"
>

Login

</Link>

</p>

</div>

</div>

</div>

)

}