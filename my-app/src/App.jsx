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
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-violet-800">Playlist Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Register tracks and manage your library
          </p>
        </header>

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