import { useState } from "react";
import TrackForm from "./components/Trackform";
import Track from "./components/Track";
import TrackDetail from "./components/Trackdetail";

let nextId = 1;

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  function handleAddTrack(track) {
    setTracks([...tracks, { id: nextId++, ...track }]);
  }

  const selected = tracks.find((t) => t.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-purple-100">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-1">
            <span>Track</span>
            <span className="text-purple-700">& Spin</span>
          </h1>
          <p className="text-xs text-gray-500">Register tracks and manage your library</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        <main className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6">
          <section className="md:row-span-2">
            <TrackForm onAdd={handleAddTrack} />
          </section>

          <section className="min-w-0">
            <Track tracks={tracks} selectedId={selectedId} onSelectRow={setSelectedId} />
          </section>

          <aside className="min-w-0">
            <TrackDetail track={selected} />
          </aside>
        </main>
      </div>
    </div>
  );
}