import { useSongStore } from "../store/songStore";
import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const { currentSong } = useSongStore();
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  if (!currentSong) return null;

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const skipBack = () => audioRef.current.currentTime -= 10;
  const skipForward = () => audioRef.current.currentTime += 10;

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => setProgress(0);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSong]);

  return (
    <>
      <style jsx>{`
        .music-player-3d {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95));
          backdrop-filter: blur(25px);
          border-top: 1px solid rgba(99,102,241,0.3);
          box-shadow: 
            0 -20px 40px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transform: perspective(1000px) rotateX(2deg);
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .music-player-3d:hover {
          transform: perspective(1000px) rotateX(0deg) translateY(-5px);
          box-shadow: 
            0 -30px 60px rgba(99,102,241,0.3),
            0 20px 40px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .album-art-3d {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.23,1,0.32,1);
          cursor: pointer;
        }
        .album-art-3d:hover {
          transform: perspective(1000px) rotateY(10deg) rotateX(5deg) scale(1.1);
        }
        .album-art-3d::before,
        .album-art-3d::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 24px;
          z-index: -1;
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
          filter: blur(8px);
          opacity: 0.7;
        }
        .album-art-3d::after {
          animation-direction: reverse;
          opacity: 0.4;
          filter: blur(16px);
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .progress-3d {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(51,65,85,0.8);
          border-radius: 2px;
          overflow: hidden;
          transform: perspective(500px) rotateX(30deg);
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 300% 300%;
          border-radius: 2px;
          position: relative;
          animation: progressShine 2s infinite;
          transition: width 0.1s ease;
          box-shadow: 0 0 20px rgba(99,102,241,0.6);
        }
        @keyframes progressShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: progressGlow 1.5s infinite;
        }
        @keyframes progressGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .title-3d {
          font-weight: 800;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.1rem;
          transition: all 0.4s ease;
          transform: translateZ(20px);
        }
        .title-3d:hover {
          filter: drop-shadow(0 0 10px rgba(99,102,241,0.5));
          transform: translateZ(30px) scale(1.02);
        }
        .btn-3d {
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          border: none !important;
        }
        .btn-3d:active {
          transform: translateY(2px) !important;
        }
        .play-btn-3d {
          background: linear-gradient(145deg, #6366f1, #8b5cf6) !important;
          box-shadow: 
            0 10px 20px rgba(99,102,241,0.4),
            0 5px 10px rgba(139,92,246,0.3),
            inset 0 1px 0 rgba(255,255,255,0.3);
          width: 64px !important;
          height: 64px !important;
          font-size: 1.5rem !important;
        }
        .play-btn-3d:hover {
          transform: perspective(1000px) rotateY(15deg) rotateX(10deg) scale(1.15) translateZ(20px);
          box-shadow: 
            0 20px 40px rgba(99,102,241,0.6),
            0 10px 20px rgba(139,92,246,0.5),
            inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .play-btn-3d.playing {
          animation: pulse3D 2s infinite;
        }
        @keyframes pulse3D {
          0%, 100% { transform: perspective(1000px) rotateY(15deg) rotateX(10deg) scale(1.15) translateZ(20px); }
          50% { transform: perspective(1000px) rotateY(15deg) rotateX(10deg) scale(1.2) translateZ(30px); }
        }
        .skip-btn-3d {
          background: rgba(71,85,105,0.6) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148,163,184,0.3) !important;
          width: 52px !important;
          height: 52px !important;
        }
        .skip-btn-3d:hover {
          background: rgba(99,102,241,0.3) !important;
          transform: perspective(500px) rotateY(180deg) scale(1.1) translateZ(10px);
          border-color: rgba(99,102,241,0.6) !important;
          box-shadow: 
            0 10px 25px rgba(99,102,241,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .volume-control {
          width: 80px;
          height: 4px;
          background: rgba(51,65,85,0.8);
          border-radius: 2px;
          position: relative;
          cursor: pointer;
          transform: perspective(500px) rotateX(15deg);
        }
        .volume-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(16,185,129,0.6);
        }
      `}</style>

      <div className="music-player-3d">
        {/* 3D Progress Bar */}
        <div className="progress-3d">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="px-6 py-5 flex items-center justify-between relative">
          
          {/* 3D Album Art + Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="album-art-3d">
              <img
                src={currentSong.cover || "https://images.pexels.com/photos/21088/music-record-player-b-w-black-and-white-21088.jpg"}
                className="w-full h-full rounded-xl object-cover shadow-2xl"
                alt={currentSong.name}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="title-3d truncate pr-4">{currentSong.name}</h2>
              <p className="text-sm text-slate-400 font-medium truncate mt-1 opacity-90">
                {currentSong.artist || currentSong.comment}
              </p>
            </div>
          </div>

          {/* 3D Controls */}
          <div className="flex items-center gap-4">
            <button onClick={skipBack} className="btn btn-circle skip-btn-3d btn-3d">
              <span className="text-xl">⏮</span>
            </button>

            <button
              onClick={togglePlay}
              className={`btn btn-circle play-btn-3d btn-3d ${playing ? 'playing' : ''}`}
            >
              <span className="text-2xl font-light">{playing ? "⏸" : "▶"}</span>
            </button>

            <button onClick={skipForward} className="btn btn-circle skip-btn-3d btn-3d">
              <span className="text-xl">⏭</span>
            </button>

            {/* Volume Slider */}
            <div className="volume-control ml-2">
              <div 
                className="volume-fill" 
                style={{ width: `${volume * 100}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  setVolume(Math.max(0, Math.min(1, percent)));
                  audioRef.current.volume = percent;
                }}
              />
            </div>
          </div>

          <audio ref={audioRef} src={currentSong.url} className="hidden" preload="metadata" />
        </div>
      </div>
    </>
  );
}
