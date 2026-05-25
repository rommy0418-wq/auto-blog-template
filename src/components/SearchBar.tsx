"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  category: string;
  level: string;
  meta_description: string;
  published_at: string;
}

const catLabels: Record<string, string> = {
  foundation: "AI 입문",
  tools: "도구 실전",
  marketing: "AI 마케팅",
  transform: "전환 전략",
  business: "1인기업",
  cases: "사례 분석",
};

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.posts || []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="검색"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.35rem 0.75rem",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)",
          color: "var(--header-muted)",
          fontSize: "0.75rem",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        검색
      </button>
    );
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "0.35rem 0.75rem",
        border: "1px solid rgba(255,255,255,0.2)",
      }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--header-muted)" strokeWidth="2">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="글 제목, 키워드 검색..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--header-text)",
            fontSize: "0.8125rem",
            width: "180px",
          }}
        />
        <button
          onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
          style={{
            background: "none", border: "none", color: "var(--header-muted)",
            cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0,
          }}
        >
          ×
        </button>
      </div>

      {(results.length > 0 || (query.length >= 2 && !loading)) && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: "min(400px, 90vw)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          zIndex: 100,
          maxHeight: "400px",
          overflowY: "auto",
        }}>
          {loading ? (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
              검색 중...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
              &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
            </div>
          ) : (
            <div>
              <div style={{ padding: "0.75rem 1rem", fontSize: "0.6875rem", color: "var(--ink-faint)", fontWeight: 600, borderBottom: "1px solid var(--border-light)" }}>
                {results.length}개의 검색 결과
              </div>
              {results.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
                  style={{
                    display: "block",
                    padding: "0.75rem 1rem",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border-light)",
                    transition: "background 0.1s",
                  }}
                  className="search-result-item"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 700, padding: "0.15em 0.5em",
                      borderRadius: "999px", background: "var(--accent-faint)", color: "var(--accent)",
                    }}>
                      {catLabels[post.category] || post.category}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--ink-faint)" }}>
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("ko-KR") : ""}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "0.875rem", fontWeight: 600, color: "var(--ink)",
                    margin: 0, lineHeight: 1.4,
                  }}>
                    {post.title}
                  </p>
                  {post.meta_description && (
                    <p style={{
                      fontSize: "0.75rem", color: "var(--ink-muted)", margin: "0.25rem 0 0",
                      lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {post.meta_description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
