import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Navbar(){

const { user } = useAuthStore()

return(

<div className="navbar bg-base-200 shadow-lg px-6">

{/* Left */}

<div className="flex-1">

<Link
to="/"
className="text-2xl font-bold text-primary"
>
🎵 Music App
</Link>

</div>

{/* Right */}

<div className="flex items-center gap-4">

{user ? (

<div className="dropdown dropdown-end">

<label tabIndex={0} className="btn btn-ghost flex items-center gap-2">

<div className="avatar">

<div className="w-8 rounded-full bg-primary text-white flex items-center justify-center">

{user.name[0]}

</div>

</div>

<span className="font-semibold">
{user.name}
</span>

</label>

<ul
tabIndex={0}
className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-40"
>

<li>
<Link to="/mysongs">My Songs</Link>
</li>

<li>
<Link to="/upload">Upload</Link>
</li>

<li>
<Link to="/logout">Logout</Link>
</li>

</ul>

</div>

) : (

<div className="flex gap-2">

<Link
to="/login"
className="btn btn-outline btn-sm"
>
Login
</Link>

<Link
to="/signup"
className="btn btn-accent btn-sm"
>
Signup
</Link>

</div>

)}

</div>

</div>

)

}