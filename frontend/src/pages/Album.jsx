import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSongStore } from "../store/songStore"
import SongCard from "../components/SongCard"

export default function Album() {

  const { id } = useParams()
  const { artistSongs, getArtistSongs } = useSongStore()

  const [search, setSearch] = useState("")

  useEffect(() => {
    getArtistSongs(id)
  }, [id])

  const filteredSongs = artistSongs.filter(song =>
    song.name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Artist Album
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search song..."
        className="w-full mb-8 px-4 py-2 rounded-lg
        bg-slate-800 border border-slate-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Songs */}
      {filteredSongs.length === 0 ? (

        <p className="text-gray-400">
          No songs found
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}

        </div>

      )}

    </div>
  )
}