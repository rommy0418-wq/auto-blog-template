import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { readFile, writeFile, access } from 'node:fs/promises';
config({ path: '.env.local', quiet: true });
async function main() {
  const dir = 'public/downloads/report-lab';
  if (await access(`${dir}/result.json`).then(() => true, () => false)) throw new Error('Evidence exists');
  const source = await readFile(`${dir}/source.txt`, 'utf8');
  const prompt = await readFile(`${dir}/prompt.txt`, 'utf8');
  if (!process.env.GEMINI_API_KEY) throw new Error('Missing key');
  const modelName = 'gemini-2.5-flash';
  const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: modelName, generationConfig: { temperature: 0 } });
  const started = new Date().toISOString();
  try {
    const response = await model.generateContent(`${prompt}\n<source>\n${source}\n</source>`);
    const output = response.response.text();
    if (!output) throw new Error('Empty response');
    await writeFile(`${dir}/result.json`, JSON.stringify({ synthetic: true, model: modelName, temperature: 0, started, source, prompt, output }, null, 2) + '\n', { flag: 'wx' });
    console.log('Report response saved');
  } catch (error) {
    const status = (error as {status?: number}).status ?? null;
    await writeFile(`${dir}/failed-${Date.now()}.json`, JSON.stringify({ started, status, outcome: 'No usable response' }) + '\n', { flag: 'wx' });
    console.log(`No usable response; HTTP ${status ?? 'unknown'}`);
    process.exitCode = 1;
  }
}
main().catch(() => { console.error('Experiment setup failed; evidence not overwritten'); process.exitCode = 1; });
