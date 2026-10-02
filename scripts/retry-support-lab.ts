import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { access, readFile, writeFile } from 'node:fs/promises';
config({ path: '.env.local', quiet: true });
async function main() {
  const exists = await access('public/downloads/support-lab/retries.json').then(() => true, () => false);
  if (exists) throw new Error('Retry evidence exists; create a new versioned experiment.');
  const data = JSON.parse(await readFile('public/downloads/support-lab/results.json', 'utf8'));
  if (!process.env.GEMINI_API_KEY) throw new Error('Missing key');
  const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: data.model, generationConfig: { temperature: data.temperature } });
  const results = [];
  for (const item of data.results.filter((r: {status: string}) => r.status !== 'response')) {
    const started = new Date().toISOString();
    try {
      const response = await model.generateContent(`${data.prompt}\n\n<policy>\n${data.policy}\n</policy>\n<inquiry>\n${item.input}\n</inquiry>`);
      const output = response.response.text();
      results.push({ ...item, started, status: output ? 'response' : 'empty', output: output || '응답 텍스트가 반환되지 않았습니다.' });
      console.log(`Retried ${item.id}`);
    } catch (error) {
      const status = (error as {status?: number}).status;
      console.log(`Retry failed: ${item.id}, HTTP ${status ?? 'unknown'}`);
      results.push({ ...item, started, status: 'error', output: `추가 요청도 실패했습니다. HTTP 상태: ${status ?? '미확인'}. 정책 준수 판정 불가.` });
    }
  }
  await writeFile('public/downloads/support-lab/retries.json', JSON.stringify({ model: data.model, temperature: data.temperature, prompt: data.prompt, policy: data.policy, synthetic: true, results }, null, 2) + '\n', { flag: 'wx' });
}
main().catch(() => { console.error('Retry failed; existing records not overwritten.'); process.exitCode = 1; });
