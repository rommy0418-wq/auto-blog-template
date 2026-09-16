"use client";

import { useState, useRef } from "react";

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          nickname,
          password,
          content,
          website: honeypotRef.current?.value || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "댓글 등록에 실패했습니다.");
        return;
      }

      setNickname("");
      setPassword("");
      setContent("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (!data.pendingApproval) onCommentAdded();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* 허니팟 - 봇 방어용 hidden 필드 */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            aria-label="닉네임"
            maxLength={30}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (삭제 시 필요)"
            aria-label="댓글 삭제용 비밀번호 (4자 이상, 72바이트 이내)"
            minLength={4}
            maxLength={72}
            autoComplete="new-password"
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        aria-label="댓글 내용"
        maxLength={2000}
        required
        rows={3}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-600">
          댓글이 접수되었습니다. 운영자 확인 후 공개됩니다.
        </p>
      )}

      <p className="text-xs text-gray-500">댓글은 검토 후 공개됩니다. 개인정보·기밀은 입력하지 마세요. 삭제용 비밀번호는 4자 이상, 72바이트 이내입니다. <a href="/privacy" className="underline">개인정보 안내</a></p>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "등록 중..." : "댓글 등록"}
        </button>
      </div>
    </form>
  );
}
