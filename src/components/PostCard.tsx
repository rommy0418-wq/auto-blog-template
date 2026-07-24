import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import PostShareButton from "./PostShareButton";
import AdBanner from "./AdBanner";

interface PostCardProps {
  posts: Partial<Post>[];
}

const catLabels: Record<string, string> = {
  foundation: "AI 입문",
  tools:      "도구 실전",
  marketing:  "AI 마케팅",
  transform:  "전환 전략",
  business:   "1인기업",
  cases:      "사례 분석",
};

const catBadgeClass: Record<string, string> = {
  foundation: "badge badge-before",
  tools:      "badge badge-bidding",
  marketing:  "badge badge-after",
  transform:  "badge badge-tax",
  business:   "badge badge-law",
  cases:      "badge badge-ai",
};

const catAccent: Record<string, string> = {
  foundation: "var(--cat-before-c)",
  tools:      "var(--cat-bidding-c)",
  marketing:  "var(--cat-after-c)",
  transform:  "var(--cat-tax-c)",
  business:   "var(--cat-law-c)",
  cases:      "var(--cat-ai-c)",
};

function getLevelBadge(level?: string | null): { cls: string; label: string } | null {
  if (!level) return null;
  if (level === "기초편") return { cls: "badge badge-basic", label: "기초" };
  if (level === "중급편") return { cls: "badge badge-mid",   label: "중급" };
  if (level === "고급편") return { cls: "badge badge-adv",   label: "고급" };
  return null;
}

const CHUNK_SIZE = 6;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function PostCard({ posts }: PostCardProps) {
  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 1rem", color: "var(--ink-muted)" }}>
        <p>아직 게시된 글이 없습니다.</p>
      </div>
    );
  }

  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST || "";
  const chunks = chunkArray(posts, CHUNK_SIZE);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
          <div style={gridStyle}>
            {chunk.map((post) => {
              const cat = post.category || "foundation";
              const level = getLevelBadge(post.level);
              const accent = catAccent[cat] || "var(--accent)";
              const publishedDate = post.published_at
                ? new Date(post.published_at).toLocaleDateString("ko-KR")
                : "";

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="post-card"
                  style={{ borderTop: `3px solid ${accent}` }}
                >
                  {post.thumbnail_url ? (
                    <div className="post-card-thumb">
                      <Image
                        src={post.thumbnail_url}
                        alt={post.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="post-card-placeholder">
                      <span style={{ fontSize: "2rem", opacity: 0.4 }}>🏛</span>
                    </div>
                  )}

                  <div className="post-card-body">
                    <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                      <span className={catBadgeClass[cat] || "badge"}>{catLabels[cat] || cat}</span>
                      {level && <span className={level.cls}>{level.label}</span>}
                    </div>

                    <h2 className="post-card-title">{post.title}</h2>

                    {post.meta_description && (
                      <p style={{
                        fontSize: "0.75rem",
                        color: "var(--ink-muted)",
                        lineHeight: 1.6,
                        marginBottom: "0.75rem",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}>
                        {post.meta_description}
                      </p>
                    )}

                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      fontSize: "0.6875rem", color: "var(--ink-faint)", marginTop: "auto",
                      paddingTop: "0.5rem", borderTop: "1px solid var(--border-light)",
                    }}>
                      <span>{publishedDate || ""} · 조회 {(post.view_count || 0).toLocaleString()}</span>
                      <PostShareButton slug={post.slug || ""} title={post.title || ""} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {adSlot && chunkIndex < chunks.length - 1 && (
            <div style={{ marginTop: "1rem" }}>
              <AdBanner slot={adSlot} format="horizontal" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
