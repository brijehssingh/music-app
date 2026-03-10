import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Player(){

  const location = useLocation()
  const navigate = useNavigate()

  const song = location.state

  const audioRef = useRef(null)
  const [playing,setPlaying] = useState(false)

  // Prevent crash if page reloads
  if(!song){
    return(
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        No song selected
      </div>
    )
  }

  const togglePlay = () => {

    if(!audioRef.current) return

    if(playing){
      audioRef.current.pause()
    }else{
      audioRef.current.play()
    }

    setPlaying(!playing)
  }

  const forward = () =>{
    if(audioRef.current){
      audioRef.current.currentTime += 10
    }
  }

  const backward = () =>{
    if(audioRef.current){
      audioRef.current.currentTime -= 10
    }
  }

  return(

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white">

      


      {/* Player Card */}

      <div className="bg-base-200 p-10 rounded-2xl shadow-2xl text-center w-96">


      {/* Rotating Disk */}

      <div className="flex justify-center mb-6">

      <div className={`w-64 h-64 rounded-full border-8 border-gray-700 overflow-hidden ${playing ? "animate-spin" : ""}`}>

      <img
      src="https://images.pexels.com/photos/21088/music-record-player-b-w-black-and-white-21088.jpg"
      className="w-full h-full object-cover"
      />

      </div>

      </div>


      {/* Song Title */}

      <h1 className="text-2xl font-bold mb-2">
      {song.name}
      </h1>

      <p className="text-gray-400 mb-6">
      {song.comment}
      </p>


      {/* Audio */}

      <audio ref={audioRef} src={song.url}/>


      {/* Controls */}

      <div className="flex justify-center gap-6">

      <button
      onClick={backward}
      className="btn btn-circle btn-outline"
      >
      ⏮
      </button>

      <button
      onClick={togglePlay}
      className="btn btn-circle btn-primary"
      >
      {playing ? "⏸" : "▶"}
      </button>

      <button
      onClick={forward}
      className="btn btn-circle btn-outline"
      >
      ⏭
      </button>

      </div>

      </div>

    </div>

  )

}