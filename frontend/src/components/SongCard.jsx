import { useNavigate } from "react-router-dom";

export default function SongCard({ song, showDelete, deleteSong }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/player", { state: song })}
      className="bg-slate-800 rounded-xl shadow-md p-4
      hover:shadow-lg hover:-translate-y-1
      transition-all duration-300 ease-in-out
      cursor-pointer"
    >

      <img
        src="https://images.pexels.com/photos/21088/music-record-player-b-w-black-and-white-21088.jpg"
        className="rounded-lg mb-3 w-full h-44 object-cover"
      />

      <h2 className="text-lg font-semibold text-white mb-1">
        {song.name}
      </h2>

      <p className="text-sm text-gray-400 mb-3">
        {song.comment}
      </p>

      {showDelete && (
        <button
          className="w-full py-2 text-sm rounded-lg bg-red-500 text-white"
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