import { useState } from "react";

const genres = ["Pop", "Rock", "Indie", "Jazz"];

export default function TrackForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [bpm, setBpm] = useState("");
  const [label, setLabel] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  function checkErrors() {
    let err = {};

    if (title.trim().length < 5) err.title = "Title needs at least 5 characters";
    if (genre === "") err.genre = "Pick a genre";
    if (artist.trim().length < 2) err.artist = "Artist name is required";

    let bpmNum = Number(bpm);
    if (bpm === "" || isNaN(bpmNum) || bpmNum < 1 || bpmNum > 100) {
      err.bpm = "BPM must be between 1 and 100";
    }

    if (label.trim() === "") err.label = "Record label is required";
    if (role === "") err.role = "Select a role";

    return err;
  }

  function submit(e) {
    e.preventDefault();

    const err = checkErrors();
    setErrors(err);

    if (Object.keys(err).length > 0) {
      return;
    }

    onAdd({
      title: title.trim(),
      genre,
      artist: artist.trim(),
      bpm: Number(bpm),
      label: label.trim(),
      role,
    });

    setTitle("");
    setGenre("");
    setArtist("");
    setBpm("");
    setLabel("");
    setRole("");
    setErrors({});
  }

  return (
    <form onSubmit={submit} className="rounded-md border border-gray-200 bg-white p-5 flex flex-col gap-3">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Register Track</h2>

      <div>
        <label className="text-sm text-gray-600">Track Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
        />
        {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Genre</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
        >
          <option value="">Select genre</option>
          {genres.map((g) => (
            <option value={g} key={g}>{g}</option>
          ))}
        </select>
        {errors.genre && <p className="text-xs text-red-600">{errors.genre}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Artist Name</label>
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
        />
        {errors.artist && <p className="text-xs text-red-600">{errors.artist}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">BPM (1-100)</label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
        />
        {errors.bpm && <p className="text-xs text-red-600">{errors.bpm}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">Record Label</label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
        />
        {errors.label && <p className="text-xs text-red-600">{errors.label}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-600">User Role</label>
        <div className="flex gap-4 mt-1">
          <label className="text-sm text-gray-700 flex items-center gap-1">
            <input type="radio" checked={role === "Creator"} onChange={() => setRole("Creator")} />
            Creator
          </label>
          <label className="text-sm text-gray-700 flex items-center gap-1">
            <input type="radio" checked={role === "Listener"} onChange={() => setRole("Listener")} />
            Listener
          </label>
        </div>
        {errors.role && <p className="text-xs text-red-600">{errors.role}</p>}
      </div>

      <button type="submit" className="mt-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5">
        Add Track
      </button>
    </form>
  );
}