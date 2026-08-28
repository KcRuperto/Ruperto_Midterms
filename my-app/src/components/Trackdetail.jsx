import { useEffect, useState } from "react";

export default function TrackDetail({ track }) {
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    setActiveTrack(track);
  }, [track]);

  if (!activeTrack) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Select a track to see what's playing.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-3">Now Playing</p>

      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 flex items-center justify-center rounded-md bg-purple-600 text-2xl text-white">
          ♪
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{activeTrack.title}</h2>
          <p className="text-sm text-gray-500 truncate">{activeTrack.artist}</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-sm mt-4">
        <span className="text-gray-500">Genre</span>
        <span className="font-medium text-gray-800">{activeTrack.genre}</span>

        <span className="text-gray-500">BPM</span>
        <span className="font-mono font-medium text-gray-800">{activeTrack.bpm}</span>

        <span className="text-gray-500">Label</span>
        <span className="font-medium text-gray-800">{activeTrack.label}</span>

        <span className="text-gray-500">Role</span>
        <span>
          <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            {activeTrack.role}
          </span>
        </span>
      </div>
    </div>
  );
}