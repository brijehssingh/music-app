import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSongStore } from "../store/songStore"

export default function Dashboard() {

  const { artists, getArtists } = useSongStore()
  const navigate = useNavigate()

  useEffect(() => {
    getArtists()
  }, [])

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">

      {artists.map((artist) => (

        <div
          key={artist._id}
          onClick={() => navigate(`/album/${artist._id}`)}
          className="bg-slate-800 rounded-xl p-6 text-center
          shadow-md
          hover:shadow-lg hover:-translate-y-1
          transition-all duration-300 ease-in-out
          cursor-pointer"
        >

          {/* Artist Image */}
          <img
            src="https://images.pexels.com/photos/21088/music-record-player-b-w-black-and-white-21088.jpg"
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4
            transition-transform duration-300 hover:scale-105"
          />

          {/* Artist Name */}
          <h2 className="text-lg font-semibold text-white">
            {artist.artistName}
          </h2>

        </div>

      ))}

    </div>

  )
}