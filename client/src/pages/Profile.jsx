import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../features/reviews/reviewsSlice";
import { updateUserProfile } from "../features/auth/authSlice";
import ReviewCard from "../components/ReviewCard";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { list: reviews, status: reviewStatus } = useSelector(
    (state) => state.reviews
  );
  const { updateStatus, updateError } = useSelector((state) => state.auth);

  // Local state for edit form
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  useEffect(() => {
    if (user) {
      dispatch(fetchReviews({ userId: user.id }));
    }
  }, [dispatch, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile({ name, avatarUrl })).unwrap();
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-extrabold text-indigo-600">My Profile</h1>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          {updateError && <p className="text-red-600">{updateError}</p>}
          <div>
            <label className="block text-slate-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Avatar URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={updateStatus === "loading"}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {updateStatus === "loading" ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center space-x-6">
          <img
            src={user.avatarUrl || "/placeholder-avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-indigo-500"
          />
          <div className="flex-1">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-slate-600">{user.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Profile
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-slate-800">My Reviews</h2>
      {reviewStatus === "loading" && (
        <p className="text-center text-slate-600">Loading reviews…</p>
      )}
      <div className="space-y-4">
        {reviews.map((r) => (
          <ReviewCard key={r._id} review={r} />
        ))}
      </div>
    </div>
  );
}
