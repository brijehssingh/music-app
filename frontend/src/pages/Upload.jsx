import { useState } from "react";
import { useSongStore } from "../store/songStore";

export default function Upload(){

const { uploadSong, uploadProgress } = useSongStore()

const [name,setName] = useState("")
const [comment,setComment] = useState("")
const [music,setMusic] = useState(null)

const handleSubmit = async(e)=>{

e.preventDefault()

const formData = new FormData()

formData.append("name",name)
formData.append("comment",comment)
formData.append("music",music)

await uploadSong(formData)

alert("Song Uploaded")

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-gray-900 to-black">

<div className="card w-96 bg-base-200 shadow-xl">

<div className="card-body">

<h2 className="text-2xl font-bold text-center text-primary mb-4">
Upload Song
</h2>

<form onSubmit={handleSubmit}>

<input
className="input input-bordered w-full mb-3"
placeholder="Song Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="file"
className="file-input file-input-bordered w-full mb-3"
onChange={(e)=>setMusic(e.target.files[0])}
/>

<input
className="input input-bordered w-full mb-3"
placeholder="Comment"
onChange={(e)=>setComment(e.target.value)}
/>

{/* Upload Progress */}

{uploadProgress > 0 && (

<div className="mb-4">

<progress
className="progress progress-primary w-full"
value={uploadProgress}
max="100"
/>

<p className="text-center text-sm mt-1">

{uploadProgress < 100
? `Uploading ${uploadProgress}%`
: "Processing..."}

</p>

</div>

)}

<button
className="btn btn-primary w-full"
disabled={uploadProgress > 0 && uploadProgress < 100}
>
Upload
</button>

</form>

</div>

</div>

</div>

)

}