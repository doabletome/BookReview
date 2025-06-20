import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center mb-2">
        <img
          src={review.user.avatarUrl || "/placeholder-avatar.png"}
          alt={review.user.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <span className="font-semibold text-slate-800">{review.user.name}</span>
        <span className="ml-auto text-yellow-500">
          {"★".repeat(review.rating)}
        </span>
      </div>
      <p className="text-slate-700 mb-2">{review.comment}</p>
      <p className="text-slate-500 text-xs">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
