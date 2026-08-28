import { useState } from "react";

const GENRES = ["Pop", "Rock", "Indie", "Jazz"];
const EMPTY_FORM = {
  title: "",
  genre: "",
  artist: "",
  bpm: "",
  label: "",
  role: "",
};

const inputClass =
  "w-full rounded-lg border border-violet-100 px-3 py-2 text-sm outline-none focus:border-blue-500";
const labelClass = "text-sm text-slate-500";
const errorClass = "text-xs text-rose-600";

export default function TrackForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(values) {
    const next = {};

    if (values.title.trim().length < 3) {
      next.title = "Title needs at least 3 characters";
    }
    if (!values.genre) {
      next.genre = "Pick a genre";
    }
    if (values.artist.trim().length < 2) {
      next.artist = "Artist name is required";
    }
    const bpm = Number(values.bpm);
    if (values.bpm === "" || Number.isNaN(bpm) || bpm < 1 || bpm > 100) {
      next.bpm = "BPM must be between 1 and 100";
    }
    if (!values.label.trim()) {
      next.label = "Record label is required";
    }
    if (!values.role) {
      next.role = "Select a role";
    }

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onAdd({
      title: form.title.trim(),
      genre: form.genre,
      artist: form.artist.trim(),
      bpm: Number(form.bpm),
      label: form.label.trim(),
      role: form.role,
    });

    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <form
      className="flex flex-col gap-3.5 rounded-xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="mb-1 text-base font-semibold text-violet-800">
        Register Track
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClass}>Track Title</label>
        <input
          id="title"
          type="text"
          className={inputClass}
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        {errors.title && <span className={errorClass}>{errors.title}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="genre" className={labelClass}>Genre</label>
        <select
          id="genre"
          className={inputClass}
          value={form.genre}
          onChange={(e) => updateField("genre", e.target.value)}
        >
          <option value="">Select genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.genre && <span className={errorClass}>{errors.genre}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="artist" className={labelClass}>Artist Name</label>
        <input
          id="artist"
          type="text"
          className={inputClass}
          value={form.artist}
          onChange={(e) => updateField("artist", e.target.value)}
        />
        {errors.artist && <span className={errorClass}>{errors.artist}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bpm" className={labelClass}>BPM (1-100)</label>
        <input
          id="bpm"
          type="number"
          min="1"
          max="100"
          className={inputClass}
          value={form.bpm}
          onChange={(e) => updateField("bpm", e.target.value)}
        />
        {errors.bpm && <span className={errorClass}>{errors.bpm}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="label" className={labelClass}>Record Label</label>
        <input
          id="label"
          type="text"
          className={inputClass}
          value={form.label}
          onChange={(e) => updateField("label", e.target.value)}
        />
        {errors.label && <span className={errorClass}>{errors.label}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span className={labelClass}>User Role</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="radio"
              name="role"
              value="Creator"
              checked={form.role === "Creator"}
              onChange={(e) => updateField("role", e.target.value)}
            />
            Creator
          </label>
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="radio"
              name="role"
              value="Listener"
              checked={form.role === "Listener"}
              onChange={(e) => updateField("role", e.target.value)}
            />
            Listener
          </label>
        </div>
        {errors.role && <span className={errorClass}>{errors.role}</span>}
      </div>

      <button
        type="submit"
        className="mt-1.5 rounded-lg bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-800"
      >
        Add Track
      </button>
    </form>
  );
}