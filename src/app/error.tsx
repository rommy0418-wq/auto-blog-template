"use client";
import Link from 'next/link';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main style={{ maxWidth: '48rem', margin: '4rem auto', padding: '1.5rem' }}>
    <h1>페이지를 불러오지 못했습니다</h1>
    <p>일시적인 연결 문제일 수 있습니다. 잠시 후 다시 시도해 주세요.</p>
    <button type="button" className="btn btn-md" onClick={reset}>다시 시도</button>{' '}
    <Link href="/" className="btn btn-md">홈으로</Link>
  </main>;
}
