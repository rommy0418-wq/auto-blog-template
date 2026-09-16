"use client";

import { useState, useSyncExternalStore } from "react";

function savedLikes(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("liked-posts") || "[]");
    return Array.isArray(value) ? value.filter((id): id is number => Number.isSafeInteger(id)) : [];
  } catch { return []; }
}
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

interface LikeButtonProps {
  postId: number;
  initialCount: number;
}

export default function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const savedLiked = useSyncExternalStore(subscribe, () => savedLikes().includes(postId), () => false);
  const [changedLiked, setLiked] = useState<boolean | null>(null);
  const liked = changedLiked ?? savedLiked;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
        setLiked(data.liked);
        const likedPosts = savedLikes();
        try {
        if (data.liked) {
          localStorage.setItem("liked-posts", JSON.stringify([...new Set([...likedPosts, postId])]));
        } else {
          localStorage.setItem("liked-posts", JSON.stringify(likedPosts.filter((id: number) => id !== postId)));
        }
        } catch { /* Server result still remains usable without local storage. */ }
      } else setError("좋아요 처리에 실패했습니다. 다시 시도해 주세요.");
    } catch { setError("연결을 확인하고 다시 시도해 주세요."); }
    finally { setLoading(false); }
  };

  return (
    <span><button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      aria-pressed={liked}
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
    </button>{error && <span role="alert" className="text-xs text-red-600">{error}</span>}</span>
  );
}
