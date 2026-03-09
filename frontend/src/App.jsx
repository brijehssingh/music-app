import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import MySongs from "./pages/MySongs";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Album from "./pages/Album";
import Logout from "./pages/Logout";
function App() {

return (

<BrowserRouter>

<div className="min-h-screen pb-24">

{/* Navbar */}

<Navbar/>

{/* Routes */}

<Routes>

<Route path="/" element={<Dashboard/>}/>
<Route path="/album/:id" element={<Album/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/upload" element={<Upload/>}/>
<Route path="/mysongs" element={<MySongs/>}/>
<Route path="/logout" element={<Logout/>}/>
</Routes>

</div>

{/* Bottom Music Player */}

<MusicPlayer/>

</BrowserRouter>

)

}

export default App;