#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const targetArg = args.find((arg) => !arg.startsWith('--')) ?? '.';
const root = path.resolve(process.cwd(), targetArg);

const excludedDirs = new Set([
  '.git',
  '.next',
  '.nuxt',
  '.output',
  '.svelte-kit',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'out',
  'target',
]);

const excludedFiles = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lockb',
  'Cargo.lock',
]);

const includedExtensions = new Set([
  '.astro',
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.mdx',
  '.scss',
  '.svelte',
  '.ts',
  '.tsx',
  '.vue',
]);

const patternGroups = [
  {
    id: 'typography-defaults',
    title: 'Default typography',
    severity: 'high',
    patterns: [
      /Inter\b/g,
      /Roboto\b/g,
      /Open Sans\b/g,
      /font-inter\b/g,
      /font-roboto\b/g,
      /font-sans\b/g,
      /Space Grotesk\b/g,
    ],
  },
  {
    id: 'purple-violet',
    title: 'Purple/violet visual language',
    severity: 'high',
    patterns: [
      /purple-\d{2,3}/g,
      /violet-\d{2,3}/g,
      /from-purple/g,
      /from-violet/g,
      /to-purple/g,
      /to-violet/g,
      /#(?:7C3AED|8B5CF6|A855F7|9333EA|6D28D9)\b/gi,
    ],
  },
  {
    id: 'generic-blue-cta',
    title: 'Generic blue CTA',
    severity: 'medium',
    patterns: [/bg-blue-500\b/g, /bg-blue-600\b/g, /#3B82F6\b/gi, /#2563EB\b/gi],
  },
  {
    id: 'three-column-grid',
    title: 'Predictable 3-column grid',
    severity: 'high',
    patterns: [/grid-cols-3\b/g, /repeat\(\s*3\s*,/g, /features?.{0,80}grid/gi],
  },
  {
    id: 'large-radius',
    title: 'Blanket large radius',
    severity: 'medium',
    patterns: [/rounded-xl\b/g, /rounded-2xl\b/g, /rounded-3xl\b/g, /border-radius\s*:\s*(?:1[6-9]|[2-9]\d)px/gi],
  },
  {
    id: 'heavy-shadow',
    title: 'Heavy repeated shadow',
    severity: 'medium',
    patterns: [/shadow-lg\b/g, /shadow-xl\b/g, /shadow-2xl\b/g],
  },
  {
    id: 'uniform-hover',
    title: 'Uniform hover scale/shadow',
    severity: 'medium',
    patterns: [/hover:scale-105\b/g, /hover:shadow-lg\b/g, /hover:shadow-xl\b/g],
  },
  {
    id: 'flat-background',
    title: 'Flat default background',
    severity: 'medium',
    patterns: [/\bbg-white\b/g, /\bbg-gray-50\b/g, /\bbg-gray-100\b/g, /background(?:-color)?\s*:\s*#fff(?:fff)?\b/gi],
  },
  {
    id: 'motion-present',
    title: 'Motion primitives present',
    severity: 'info',
    patterns: [/animation\b/g, /transition\b/g, /@keyframes\b/g, /motion\./g, /framer-motion\b/g],
  },
  {
    id: 'reduced-motion',
    title: 'Reduced-motion fallback',
    severity: 'info',
    patterns: [/prefers-reduced-motion/g],
  },
  {
    id: 'focus-visible',
    title: 'Visible focus handling',
    severity: 'info',
    patterns: [/focus-visible/g, /:focus/g, /focus:/g],
  },
];

function emptyGroup(group) {
  return {
    id: group.id,
    title: group.title,
    severity: group.severity,
    count: 0,
    matches: [],
  };
}

function lineForIndex(source, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (source.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function excerpt(source, index, length) {
  const start = Math.max(0, index - 60);
  const end = Math.min(source.length, index + length + 60);
  return source.slice(start, end).replace(/\s+/g, ' ').trim();
}

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!excludedDirs.has(entry.name)) {
        await walk(path.join(dir, entry.name), files);
      }
      continue;
    }

    if (!entry.isFile() || excludedFiles.has(entry.name)) continue;

    const absolute = path.join(dir, entry.name);
    const ext = path.extname(entry.name);
    if (includedExtensions.has(ext)) files.push(absolute);
  }
  return files;
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function detectStack(rootDir, files) {
  const names = new Set(files.map((file) => path.basename(file)));
  const rootFiles = {
    packageJson: await fileExists(path.join(rootDir, 'package.json')),
    nextConfig:
      (await fileExists(path.join(rootDir, 'next.config.js'))) ||
      (await fileExists(path.join(rootDir, 'next.config.mjs'))) ||
      (await fileExists(path.join(rootDir, 'next.config.ts'))),
    viteConfig:
      (await fileExists(path.join(rootDir, 'vite.config.js'))) ||
      (await fileExists(path.join(rootDir, 'vite.config.ts'))) ||
      (await fileExists(path.join(rootDir, 'vite.config.mjs'))),
    tailwindConfig:
      (await fileExists(path.join(rootDir, 'tailwind.config.js'))) ||
      (await fileExists(path.join(rootDir, 'tailwind.config.ts'))) ||
      (await fileExists(path.join(rootDir, 'tailwind.config.mjs'))),
    componentsJson: await fileExists(path.join(rootDir, 'components.json')),
  };

  let packageJson = null;
  if (rootFiles.packageJson) {
    try {
      packageJson = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));
    } catch {
      packageJson = null;
    }
  }

  const deps = {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };

  return {
    packageManager: names.has('pnpm-lock.yaml') ? 'pnpm' : names.has('yarn.lock') ? 'yarn' : names.has('package-lock.json') ? 'npm' : null,
    next: rootFiles.nextConfig || Boolean(deps.next),
    react: Boolean(deps.react) || files.some((file) => ['.jsx', '.tsx'].includes(path.extname(file))),
    vite: rootFiles.viteConfig || Boolean(deps.vite),
    tailwind: rootFiles.tailwindConfig || Boolean(deps.tailwindcss),
    shadcn: rootFiles.componentsJson,
    cssOnly: !rootFiles.packageJson && files.some((file) => ['.html', '.css'].includes(path.extname(file))),
  };
}

function classifyStack(stack) {
  const labels = [];
  if (stack.next) labels.push('Next.js');
  else if (stack.react && stack.vite) labels.push('React/Vite');
  else if (stack.react) labels.push('React');
  else if (stack.cssOnly) labels.push('HTML/CSS');
  if (stack.tailwind) labels.push('Tailwind');
  if (stack.shadcn) labels.push('shadcn');
  return labels.length > 0 ? labels.join(' + ') : 'Unknown';
}

function summarizeRisks(groups) {
  const risks = [];
  const byId = Object.fromEntries(groups.map((group) => [group.id, group]));
  const noMotion = byId['motion-present'].count === 0;
  const noReducedMotion = byId['reduced-motion'].count === 0;
  const noFocus = byId['focus-visible'].count === 0;

  if (noMotion) {
    risks.push({
      id: 'motion-absent',
      severity: 'low',
      title: 'No motion primitives found',
      recommendation: 'Add one purposeful reveal or state transition if the UI needs more presence.',
    });
  }

  if (!noMotion && noReducedMotion) {
    risks.push({
      id: 'missing-reduced-motion',
      severity: 'high',
      title: 'Motion exists without reduced-motion fallback',
      recommendation: 'Add a `prefers-reduced-motion` fallback before adding more animation.',
    });
  }

  if (noFocus) {
    risks.push({
      id: 'missing-focus-visible',
      severity: 'medium',
      title: 'No focus-visible handling found',
      recommendation: 'Verify keyboard focus and add visible focus styles for interactive elements.',
    });
  }

  return risks;
}

async function main() {
  const files = await walk(root);
  const groups = patternGroups.map(emptyGroup);
  const byId = Object.fromEntries(groups.map((group) => [group.id, group]));

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const relative = path.relative(root, file);
    for (const group of patternGroups) {
      for (const pattern of group.patterns) {
        pattern.lastIndex = 0;
        for (const match of source.matchAll(pattern)) {
          const value = match[0];
          const index = match.index ?? 0;
          byId[group.id].count += 1;
          if (byId[group.id].matches.length < 20) {
            byId[group.id].matches.push({
              file: relative,
              line: lineForIndex(source, index),
              match: value,
              excerpt: excerpt(source, index, value.length),
            });
          }
        }
      }
    }
  }

  const stack = await detectStack(root, files);
  const risks = summarizeRisks(groups);
  const result = {
    target: root,
    stack: classifyStack(stack),
    scannedFiles: files.length,
    generatedAt: new Date().toISOString(),
    groups,
    risks,
  };

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  process.stdout.write(`# UI Refiner Pattern Audit\n\n`);
  process.stdout.write(`Target: ${result.target}\n`);
  process.stdout.write(`Stack: ${result.stack}\n`);
  process.stdout.write(`Scanned files: ${result.scannedFiles}\n\n`);
  process.stdout.write(`## Pattern Counts\n\n`);
  process.stdout.write(`| Severity | Pattern | Count |\n|---|---|---:|\n`);
  for (const group of groups.filter((item) => item.count > 0)) {
    process.stdout.write(`| ${group.severity} | ${group.title} | ${group.count} |\n`);
  }
  if (groups.every((group) => group.count === 0)) {
    process.stdout.write(`| info | No configured patterns found | 0 |\n`);
  }

  process.stdout.write(`\n## Top Evidence\n\n`);
  for (const group of groups.filter((item) => item.count > 0 && item.severity !== 'info')) {
    process.stdout.write(`### ${group.title}\n\n`);
    for (const match of group.matches.slice(0, 5)) {
      process.stdout.write(`- ${match.file}:${match.line} \`${match.match}\` - ${match.excerpt}\n`);
    }
    process.stdout.write(`\n`);
  }

  process.stdout.write(`## Risks\n\n`);
  if (risks.length === 0) {
    process.stdout.write(`- No scanner-level motion/focus risks found. Verify visually.\n`);
  } else {
    for (const risk of risks) {
      process.stdout.write(`- [${risk.severity}] ${risk.title}: ${risk.recommendation}\n`);
    }
  }
}

main().catch((error) => {
  process.stderr.write(`audit-ui-patterns failed: ${error.message}\n`);
  process.exitCode = 1;
});
