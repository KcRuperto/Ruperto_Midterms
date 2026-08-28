import { useState } from "react";
import TrackForm from "./components/Trackform";
import Track from "./components/Track";
import TrackDetail from "./components/Trackdetail";

let nextId = 1;

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  function handleAddTrack(track) {
    const newTrack = { id: nextId++, ...track };
    setTracks((prev) => [...prev, newTrack]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-purple-200">
      <header className="sticky top-0 z-10 border-b border-violet-200 bg-white/80 px-6 py-3 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-blue-600 bg-clip-text text-transparent">Track & Spin</h1>
          <p className="text-xs text-slate-500">
            Register tracks and manage your library
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        <main className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6">
          <section className="md:row-span-2">
            <TrackForm onAdd={handleAddTrack} />
          </section>

          <section className="min-w-0">
            <Track
              tracks={tracks}
              selectedId={selectedId}
              onSelectRow={setSelectedId}
            />
          </section>

          <aside className="min-w-0">
            <TrackDetail
              track={tracks.find((t) => t.id === selectedId) ?? null}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}