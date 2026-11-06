import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const required = ['BASE_URL', 'USER_NAME', 'PASSWORD', 'FIRST_NAME', 'LAST_NAME', 'ZIP_CODE', 'BLOCKED_USER_NAME', 'WRONG_PASSWORD'];
const missing = required.filter(key => !process.env[key]?.trim());
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}. See .env.example.`);
if (!['http:', 'https:'].includes(new URL(process.env.BASE_URL).protocol)) throw new Error('BASE_URL must be an HTTP(S) URL.');
export const env = Object.freeze(Object.fromEntries(required.map(key => [key, process.env[key]])));
