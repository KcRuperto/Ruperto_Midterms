import { useEffect, useState } from "react";

export default function TrackDetail({ track }) {
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    setActiveTrack(track);
  }, [track]);

  if (!activeTrack) {
    return (
      <div className="rounded-xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
        <p className="text-sm text-slate-500">
          Select a row to view its details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-violet-800">
          {activeTrack.title}
        </h2>
        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
          {activeTrack.role}
        </span>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-sm">
        <dt className="text-slate-500">Genre</dt>
        <dd className="font-medium">{activeTrack.genre}</dd>
        <dt className="text-slate-500">Artist</dt>
        <dd className="font-medium">{activeTrack.artist}</dd>
        <dt className="text-slate-500">BPM</dt>
        <dd className="font-medium">{activeTrack.bpm}</dd>
        <dt className="text-slate-500">Label</dt>
        <dd className="font-medium">{activeTrack.label}</dd>
      </dl>
    </div>
  );
}