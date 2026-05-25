"use client";

import { useState } from "react";

interface LikeButtonProps {
  postId: number;
  initialCount: number;
}

export default function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(() => {
    if (typeof window === "undefined") return false;
    const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "[]") as number[];
    return likedPosts.includes(postId);
  });
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
        setLiked(data.liked);
        const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "[]") as number[];
        if (data.liked) {
          localStorage.setItem("liked-posts", JSON.stringify([...new Set([...likedPosts, postId])]));
        } else {
          localStorage.setItem("liked-posts", JSON.stringify(likedPosts.filter((id: number) => id !== postId)));
        }
      }
    } catch { /* 무시 */ }
    finally { setLoading(false); }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      className="btn btn-md"
      style={{
        borderColor: liked ? "#fca5a5" : undefined,
        background: liked ? "#fff0f0" : undefined,
        color: liked ? "#dc2626" : undefined,
        fontSize: "0.875rem",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: "1rem" }}>{liked ? "❤️" : "🤍"}</span>
      <span>{count.toLocaleString()}</span>
    </button>
  );
}
