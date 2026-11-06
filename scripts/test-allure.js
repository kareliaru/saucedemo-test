import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { rimrafSync } from 'rimraf';

const root = new URL('../', import.meta.url);
const run = (path, args) => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(path, root)), ...args], {
    cwd: fileURLToPath(root), stdio: 'inherit',
  });
  if (result.error) console.error(result.error.message);
  return result.status ?? 1;
};
rimrafSync(['allure-results', 'allure-report'].map(path => fileURLToPath(new URL(path, root))));
const testStatus = run('node_modules/@playwright/test/cli.js', ['test', ...process.argv.slice(2)]);
const reportStatus = run('node_modules/allure-commandline/bin/allure', ['generate', 'allure-results', '--clean', '-o', 'allure-report']);
process.exitCode = testStatus || reportStatus;
