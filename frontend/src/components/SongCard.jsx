import { useSongStore } from "../store/songStore";

export default function SongCard({ song, showDelete, deleteSong }) {

  const playSong = useSongStore((state) => state.playSong);

  return (
    <div
      onClick={() => playSong(song)}
      className="bg-slate-800 rounded-xl shadow-md p-4
      hover:shadow-lg hover:-translate-y-1
      transition-all duration-300 ease-in-out
      cursor-pointer"
    >

      {/* Image */}
      <img
        src="https://images.pexels.com/photos/21088/music-record-player-b-w-black-and-white-21088.jpg"
        className="rounded-lg mb-3 w-full h-44 object-cover
        transition-transform duration-300 hover:scale-[1.03]"
      />

      {/* Song Name */}
      <h2 className="text-lg font-semibold text-white mb-1 truncate">
        {song.name}
      </h2>

      {/* Comment */}
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {song.comment}
      </p>

      {/* Delete Button */}
      {showDelete && (
        <button
          className="w-full py-2 text-sm rounded-lg
          bg-red-500 hover:bg-red-600
          text-white font-medium
          transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            deleteSong(song._id);
          }}
        >
          Delete
        </button>
      )}

    </div>
  );
}