import { useEffect } from "react";
import { useSongStore } from "../store/songStore";
import SongCard from "../components/SongCard";

export default function MySongs(){

const { mySongs, getSongs, deleteSong } = useSongStore()

useEffect(()=>{
  getSongs()
},[getSongs])

return(

<div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white p-10">

{/* Header */}

<div className="text-center mb-10">

<h1 className="text-4xl font-bold mb-2">
🎵 My Uploaded Songs
</h1>

<p className="text-gray-400">
Manage the songs you uploaded
</p>

</div>

{/* Empty State */}

{mySongs.length === 0 ? (

<div className="text-center mt-20">

<h2 className="text-2xl font-semibold">
No Songs Uploaded
</h2>

<p className="text-gray-400">
Upload your first song to see it here
</p>

</div>

) : (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{mySongs.map((song)=>(
<SongCard
key={song._id}
song={song}
showDelete={true}
deleteSong={deleteSong}
/>
))}

</div>

)}

</div>

)

}