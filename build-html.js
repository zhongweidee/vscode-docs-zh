const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-zh/docs';
const SRC_ALL = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-zh';
const OUT = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents';
const DOCS_ROOT = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-source/docs';
const TOC_REPO = 'C:/Users/zhong/AppData/Local/Temp/vscode-docs';

// Simple markdown to HTML converter
function mdToHtml(md, filePath) {
  let html = '';
  const lines = md.split('\n');
  let inCode = false, inFrontmatter = false, codeContent = [], codeLang = '', inTable = false, tableHtml = '';
  let listStack = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0 && line.trim() === '---') { inFrontmatter = true; continue; }
    if (inFrontmatter) { if (line.trim() === '---') inFrontmatter = false; continue; }

    if (line.trim().startsWith('```')) {
      if (inCode) { html += '<pre><code' + (codeLang ? ' class="language-' + codeLang + '"' : '') + '>' + esc(codeContent.join('\n')) + '</code></pre>\n'; codeContent = []; codeLang = ''; inCode = false; }
      else { inCode = true; codeLang = line.trim().slice(3).trim(); }
      continue;
    }
    if (inCode) { codeContent.push(line); continue; }
    if (line.trim() === '' && !inTable) { html += '\n'; continue; }

    // Table
    if (line.trim().startsWith('|')) {
      if (!inTable) { inTable = true; tableHtml = '<table>\n'; }
      const cells = line.split('|').filter(c => c !== undefined).map(c => c.trim());
      if (cells.every(c => /^[-:\s]+$/.test(c))) continue;
      if (!tableHtml.includes('<tr>')) tableHtml += '  <thead><tr>' + cells.map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead>\n<tbody>\n';
      else tableHtml += '  <tr>' + cells.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>\n';
      continue;
    } else if (inTable) { tableHtml += '</tbody>\n</table>\n'; html += tableHtml; tableHtml = ''; inTable = false; if (line.trim() === '') continue; }

    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) { html += '<h' + hMatch[1].length + '>' + inline(hMatch[2]) + '</h' + hMatch[1].length + '>\n'; continue; }
    if (/^[-*_]{3,}\s*$/.test(line.trim())) { html += '<hr>\n'; continue; }
    if (line.trim().startsWith('> ')) { html += '<blockquote>' + inline(line.trim().slice(2)) + '</blockquote>\n'; continue; }

    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)/);
    if (ulMatch) { const indent = Math.floor(ulMatch[1].length / 2); while (listStack.length > indent + 1) { html += '</li>\n</ul>\n'; listStack.pop(); } if (listStack.length <= indent) { if (listStack.length > indent) { html += '</li>\n'; listStack.pop(); } html += '<ul>\n'; listStack.push('ul'); } else { html += '</li>\n'; } html += '<li>' + inline(ulMatch[2]); continue; }

    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)/);
    if (olMatch) { const indent = Math.floor(olMatch[1].length / 2); while (listStack.length > indent + 1) { html += '</li>\n</ol>\n'; listStack.pop(); } if (listStack.length <= indent) { if (listStack.length > indent) { html += '</li>\n'; listStack.pop(); } html += '<ol>\n'; listStack.push('ol'); } else { html += '</li>\n'; } html += '<li>' + inline(olMatch[2]); continue; }

    while (listStack.length > 0) { const t = listStack.pop(); html += '</li>\n</' + t + '>\n'; }
    html += '<p>' + inline(line) + '</p>\n';
  }
  if (inCode) html += '<pre><code>' + esc(codeContent.join('\n')) + '</code></pre>\n';
  if (inTable) { tableHtml += '</tbody>\n</table>\n'; html += tableHtml; }
  while (listStack.length > 0) { const t = listStack.pop(); html += '</li>\n</' + t + '>\n'; }
  return html;

  function inline(text) {
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(m, alt, u) { u = resolveLink(u, filePath); return '<img src="' + u + '" alt="' + alt + '">'; });
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, t, u) { u = resolveLink(u, filePath); return '<a href="' + u + '">' + t + '</a>'; });
    text = text.replace(/`kb\(([^)]+)\)`/g, '<kbd>$1</kbd>');
    text = text.replace(/`setting\(([^)]+)\)`/g, '<code class="setting">$1</code>');
    return text;
  }
  function resolveLink(url, fromFile) {
    if (url.startsWith('http') || url.startsWith('#') || url.startsWith('data:')) return url;
    if (url.startsWith('/')) {
      // Absolute path relative to site root, e.g. /docs/agents/overview.md or /docs/agents/overview.md#section
      // Calculate how many ../ levels needed to reach root from this file's depth
      var _rel = path.relative(SRC, fromFile).replace(/\\/g, '/');
      var _depth = _rel.split('/').length;
      return '../'.repeat(_depth) + url.slice(1).replace(/\.md(#.*)?$/, '.html$1');
    }
    const mdDir = path.dirname(fromFile);
    const resolved = path.resolve(mdDir, url);
    const rel = path.relative(mdDir, resolved).replace(/\\/g, '/');
    // Video: link via jsDelivr CDN (proper Content-Type: video/mp4)
    if (url.match(/\.(mp4|webm)$/i)) {
      var abs = path.relative(SRC, resolved).replace(/\\/g, '/');
      return 'https://media.githubusercontent.com/media/microsoft/vscode-docs/main/' + abs;
    }
    // Image: keep path relative to markdown (HTML at same relative path)
    if (url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) return rel;
    if (url.match(/\.webp$/i)) return rel;
    // Markdown link: convert to .html, keep relative
    return rel.replace(/\.md(#.*)?$/, '.html$1');
  }
  function esc(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
}

const CSS = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif; color:#333; line-height:1.6; background:#f5f5f5; }
.layout { display:flex; min-height:100vh; }
.sidebar { width:280px; background:#2c2c32; color:#ccc; padding:0 0 20px 0; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; flex-shrink:0; }
.sidebar-header { padding:16px 20px 8px; border-bottom:1px solid #444; margin-bottom:8px; }
.sidebar-header h2 { color:#fff; font-size:16px; display:inline; }
.sidebar-header a { color:#fff; text-decoration:none; }
.sidebar-tools { display:inline; float:right; }
.sidebar-tools button { background:none; border:1px solid #555; color:#aaa; cursor:pointer; padding:0 7px; margin-left:3px; border-radius:3px; font-size:16px; font-weight:700; line-height:1.3; font-family:monospace; }
.sidebar-tools button:hover { background:#3a3a42; color:#fff; border-color:#888; }
.sidebar-section { border-bottom:1px solid #3a3a42; }
.sidebar-section-title { color:#e0e0e0; font-weight:600; font-size:12.5px; padding:8px 20px; cursor:pointer; user-select:none; display:flex; justify-content:space-between; align-items:center; text-transform:uppercase; letter-spacing:0.5px; }
.sidebar-section-title:hover { background:#3a3a42; }
.sidebar-section-title .toggle { color:#888; font-size:10px; transition:transform 0.2s; }
.sidebar-section-title.collapsed .toggle { transform:rotate(-90deg); }
.sidebar-section-content { overflow:hidden; transition:max-height 0.2s ease; }
.sidebar-section-content.collapsed { max-height:0 !important; }
.sidebar a { color:#9ba3b4; text-decoration:none; font-size:12.5px; display:block; padding:3px 20px 3px 28px; }
.sidebar a:hover { color:#fff; background:#3a3a42; }
.sidebar a.active { color:#fff; font-weight:500; background:#3a3a42; }
.sidebar-group-label { color:#888; font-size:11px; padding:6px 20px 2px 24px; text-transform:uppercase; letter-spacing:0.3px; }
.sidebar-sub-title { color:#bbb; font-size:12px; padding:5px 20px 5px 24px; cursor:pointer; user-select:none; }
.sidebar-sub-title:hover { color:#fff; }
.sidebar-sub-title .toggle { font-size:8px; margin-right:4px; transition:transform 0.2s; display:inline-block; }
.sidebar-sub-title.collapsed .toggle { transform:rotate(-90deg); }
.sidebar-sub-content { overflow:hidden; transition:max-height 0.2s ease; }
.sidebar-sub-content.collapsed { max-height:0 !important; }
.content { margin-left:280px; flex:1; max-width:960px; padding:40px 60px; background:#fff; min-height:100vh; }
.content h1 { font-size:32px; font-weight:700; margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid #eee; color:#1a1a1a; }
.content h2 { font-size:24px; font-weight:600; margin:32px 0 12px; color:#1a1a1a; }
.content h3 { font-size:20px; font-weight:600; margin:24px 0 10px; color:#2a2a2a; }
.content h4 { font-size:16px; font-weight:600; margin:20px 0 8px; }
.content p { margin:0 0 14px; font-size:15px; }
.content a { color:#0078d4; text-decoration:none; }
.content a:hover { text-decoration:underline; }
.content code { font-family:'Cascadia Code','Fira Code','Consolas',monospace; background:#f0f0f0; padding:2px 6px; border-radius:3px; font-size:13px; }
.content pre { background:#1e1e1e; color:#d4d4d4; padding:16px; border-radius:6px; overflow-x:auto; margin:14px 0; }
.content pre code { background:none; padding:0; color:inherit; font-size:13px; line-height:1.5; }
.content table { border-collapse:collapse; margin:14px 0; width:100%; font-size:14px; }
.content th, .content td { border:1px solid #ddd; padding:8px 12px; text-align:left; }
.content th { background:#f8f8f8; font-weight:600; }
.content tr:nth-child(even) td { background:#fafafa; }
.content blockquote { border-left:4px solid #0078d4; padding:8px 16px; margin:14px 0; background:#f0f7ff; border-radius:0 4px 4px 0; }
.content blockquote p { margin:0; }
.content img { max-width:100%; border-radius:4px; margin:14px 0; border:1px solid #e0e0e0; }
.content hr { border:none; border-top:1px solid #eee; margin:24px 0; }
.content ul, .content ol { margin:0 0 14px; padding-left:24px; font-size:15px; }
.content li { margin-bottom:4px; }
.content kbd { background:#f0f0f0; border:1px solid #ccc; border-radius:3px; padding:1px 5px; font-size:12px; font-family:monospace; }
.content .setting { color:#c7254e; background:#f9f2f4; }
.breadcrumb { font-size:13px; color:#888; margin-bottom:16px; }
.breadcrumb a { color:#0078d4; }
@media (max-width:768px) { .sidebar { display:none; } .content { margin-left:0; padding:20px; } }
.status-card { background:#f0f7ff; border:1px solid #0078d4; border-radius:8px; padding:20px; margin:20px 0; }
.status-card h3 { margin:0 0 12px; color:#0078d4; }
.status-item { display:flex; align-items:center; margin:6px 0; font-size:14px; }
.status-dot { width:10px; height:10px; border-radius:50%; margin-right:10px; flex-shrink:0; }
.status-dot.done { background:#28a745; }
.status-dot.pending { background:#dc3545; }
`;

// TOC-based sidebar
function loadJson(fp) {
  var raw = fs.readFileSync(fp, 'utf-8');
  raw = raw.replace(/\/\/.*$/gm, '').replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(raw);
}

function tocPath(p) {
  // Keep docs/ prefix so links are relative to site root
  var r = p.replace(/^\/docs\//, 'docs/');
  if (!r.match(/\.[a-z]+$/i)) return r + '.html';
  return r.replace(/\.md$/, '.html');
}

function loadToc(arr) {
  var n = [];
  if (!arr || !arr.length) return n;
  arr.forEach(function(e) {
    // Sub-toc section object format: {name, topics: [...]}
    if (e && e.name && e.topics) {
      var children = loadToc(e.topics);
      // Section with its own name becomes a grouping header
      n.push({ type: 'group', name: e.name, children: children });
    }
    // Inline subsection format: ["", "", {name, topics}]
    else if (Array.isArray(e) && e.length === 3 && typeof e[2] === 'object') {
      n.push({ type: 'sub', name: e[2].name, children: loadToc(e[2].topics || []) });
    }
    // Inline link format: ["title", "path"]
    else if (Array.isArray(e) && e.length >= 2 && e[0] && e[1]) {
      n.push({ type: 'link', name: e[0], href: tocPath(e[1]) });
    }
  });
  return n;
}

function loadSection(s) {
  var n = [];
  if (s.toc) { var f = path.join(TOC_REPO, 'docs', s.toc); if (fs.existsSync(f)) n = loadToc(loadJson(f)); }
  if (s.topics && s.topics.length > 0) n = n.concat(loadToc(s.topics));
  return { name: s.name, nodes: n };
}

function buildSidebar() {
  return loadJson(path.join(TOC_REPO, 'docs', 'toc.json')).map(function(s) { return loadSection(s); }).filter(function(s) { return s.nodes.length > 0; });
}

function renderNodes(nodes, act, prefix) {
  var h = '';
  prefix = prefix || '';
  nodes.forEach(function(n) {
    if (n.type === 'link') {
      h += '<a href="' + prefix + n.href + '" class="' + (n.href === act ? 'active' : '') + '">' + n.name + '</a>\n';
    } else if (n.type === 'group') {
      h += '<div class="sidebar-group-label">' + n.name + '</div>\n';
      h += renderNodes(n.children, act, prefix);
    } else if (n.type === 'sub') {
      var id = 'sub-' + n.name.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
      h += '<div class="sidebar-subsection"><div class="sidebar-sub-title" onclick="ts(\'' + id + '\')"><span class="toggle">▶</span> ' + n.name + '</div><div id="' + id + '" class="sidebar-sub-content">' + renderNodes(n.children, act, prefix) + '</div></div>\n';
    }
  });
  return h;
}

function sidebarHtml(secs, act, depth) {
  var p = ''; for (var d = 0; d < depth; d++) p += '../';
  var h = '<div class="sidebar-header"><h2><a href="' + p + 'index.html">📖 VS Code 中文文档</a></h2>\n';
  h += '<div class="sidebar-tools"><button onclick="toggleAll(true)" title="全部展开">+</button><button onclick="toggleAll(false)" title="全部折叠">−</button></div></div>\n';
  secs.forEach(function(s) {
    var id = 's-' + s.name.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
    var has = false;
    (function check(ns) { ns.forEach(function(x) { if (x.type === 'link' && x.href === act) has = true; if (x.children) check(x.children); }); })(s.nodes);
    h += '<div class="sidebar-section"><div class="sidebar-section-title" onclick="ts(\'' + id + '\')"><span>' + s.name + '</span><span class="toggle">▼</span></div><div id="' + id + '" class="sidebar-section-content">' + renderNodes(s.nodes, act, p) + '</div></div>\n';
  });
  return h;
}

function genIndex(secs) {
  var sb = sidebarHtml(secs, '', 0);
  function tocItems(ns) {
    var h = '';
    ns.forEach(function(n) {
      if (n.type === 'link') h += '<li><a href="' + n.href + '">' + n.name + '</a></li>\n';
      else if (n.type === 'sub') { h += '<li>' + n.name + '<ul>' + tocItems(n.children) + '</ul></li>\n'; }
      else if (n.type === 'group') { h += tocItems(n.children); }
    });
    return h;
  }
  var toc = '';
  secs.forEach(function(s) { toc += '<li><strong>' + s.name + '</strong><ul>' + tocItems(s.nodes) + '</ul></li>\n'; });
  return '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>VS Code 中文文档</title>\n<style>' + CSS + '</style>\n</head>\n<body>\n<div class="layout">\n  <div class="sidebar">' + sb + '</div>\n  <div class="content">\n    <h1>VS Code 中文文档</h1>\n    <p>Visual Studio Code <strong>1.124</strong> 文档的简体中文翻译版本。</p>\n    <p>源文档：<a href="https://github.com/microsoft/vscode-docs">microsoft/vscode-docs</a> main 分支（2026-06-12）</p>\n    <p>翻译于 2026-06-14，使用 DeepSeek V4 Flash 多智能体并行翻译。</p>\n    <div class="status-card">\n      <h3>📋 翻译进度</h3>\n      <div class="status-item"><span class="status-dot done"></span> docs/ 核心用户文档 345/348 ✅</div>\n      <div class="status-item"><span class="status-dot pending"></span> release-notes/ 版本发布说明 137 个文件未翻译</div>\n      <div class="status-item"><span class="status-dot pending"></span> api/ 扩展 API 文档 76 个文件未翻译</div>\n      <div class="status-item"><span class="status-dot pending"></span> blogs/ 官方博客 115 个文件未翻译</div>\n    </div>\n    <hr>\n    <h2>文档目录</h2>\n    <ul>\n' + toc + '</ul>\n  </div>\n</div>\n<script>function ts(id){var e=document.getElementById(id),t=e.previousElementSibling;e.classList.contains("collapsed")?(e.classList.remove("collapsed"),t.classList.remove("collapsed")):(e.classList.add("collapsed"),t.classList.add("collapsed"))}function toggleAll(v){document.querySelectorAll(".sidebar-section-content,.sidebar-sub-content").forEach(function(e){v?e.classList.remove("collapsed"):e.classList.add("collapsed")});document.querySelectorAll(".sidebar-section-title,.sidebar-sub-title").forEach(function(e){v?e.classList.remove("collapsed"):e.classList.add("collapsed")})}<\/script>\n</body>\n</html>';
}

// Main
console.log('Building HTML docs...\n');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
var sections = buildSidebar();
// Add blogs section
sections.push({ name: 'Blogs (2026)', nodes: [
  { type: 'link', name: 'Building docfind', href: 'blogs/2026/01/15/docfind.html' },
  { type: 'link', name: 'MCP Apps Support', href: 'blogs/2026/01/26/mcp-apps-support.html' },
  { type: 'link', name: 'Multi-Agent Development', href: 'blogs/2026/02/05/multi-agent-development.html' },
  { type: 'link', name: 'Long Distance NES', href: 'blogs/2026/02/26/long-distance-nes.html' },
  { type: 'link', name: 'Making Agents Practical', href: 'blogs/2026/03/05/making-agents-practical-for-real-world-development.html' },
  { type: 'link', name: 'How VS Code Builds with AI', href: 'blogs/2026/03/13/how-VS-Code-Builds-with-AI.html' },
  { type: 'link', name: 'Agent Harnesses', href: 'blogs/2026/05/15/agent-harnesses-github-copilot-vscode.html' },
]});
// Add release notes section
var rnNodes = [];
for (var v = 125; v >= 110; v--) {
  rnNodes.push({ type: 'link', name: 'v1.' + v, href: 'release-notes/v1_' + v + '.html' });
}
sections.push({ name: 'Release Notes', nodes: rnNodes });
console.log('Sections: ' + sections.length);

// Index
fs.writeFileSync(path.join(OUT, 'index.html'), genIndex(sections), 'utf-8');
console.log('Index done');

// Convert files from all source directories
var SOURCE_DIRS = [
  { src: SRC, base: 'docs' },
  { src: SRC_ALL + '/blogs', base: 'blogs' },
  { src: SRC_ALL + '/release-notes', base: 'release-notes' }
];
var t = 0, d = 0;
SOURCE_DIRS.forEach(function(sd) {
  if (!fs.existsSync(sd.src)) return;
  (function walk(dir, base) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function(e) {
    var fp = path.join(dir, e.name), rp = base ? base + '/' + e.name : e.name;
    if (e.isDirectory()) { walk(fp, rp); return; }
    if (!e.name.endsWith('.md')) return;
    t++;
    var op = path.join(OUT, rp.replace(/\.md$/, '.html'));
    if (!fs.existsSync(path.dirname(op))) fs.mkdirSync(path.dirname(op), { recursive: true });
    try {
      var c = fs.readFileSync(fp, 'utf-8');
      var bc = c;
      if (c.startsWith('---')) { var end = c.indexOf('---', 3); if (end > 0) bc = c.slice(end + 3).trim(); }
      var fm = {};
      if (c.startsWith('---')) { var blk = c.slice(3, c.indexOf('---', 3)); blk.split('\n').forEach(function(l) { var i = l.indexOf(':'); if (i > 0) fm[l.slice(0,i).trim()] = l.slice(i+1).trim().replace(/^["\']|["\']$/g,''); }); }
      var title = fm.PageTitle || fm.MetaDescription || e.name.replace(/\.md$/, '');
      var body = mdToHtml(bc, fp);
      // Rewrite video sources to upstream GitHub raw URLs
      body = body.replace(/src="([^"]+\.(mp4|webm))"/gi, function(m, src) {
        if (src.indexOf('http') === 0) return m;
        var resolved = path.join(path.dirname(rp), src).replace(/\\/g, '/');
        return 'src="https://media.githubusercontent.com/media/microsoft/vscode-docs/main/' + resolved + '"';
      });
      // Rewrite webp images to upstream GitHub raw (GitHub Pages doesn't serve .webp)
      body = body.replace(/src="([^"]+\.webp)"/gi, function(m, src) {
        if (src.indexOf('http') === 0) return m;
        var resolved = path.join(path.dirname(rp), src).replace(/\\/g, '/');
        return 'src="https://raw.githubusercontent.com/microsoft/vscode-docs/main/' + resolved + '"';
      });
      var depth = base ? base.split('/').length : 0;
      // Rewrite raw HTML <a> tags with /docs/ paths (markdown raw HTML bypasses resolveLink)
      var _p = '../'.repeat(depth);
      body = body.replace(/href="\/docs\/([^"]*\.md(#[^"]*)?)"/gi, function(m, pathPart) {
        return 'href="' + _p + 'docs/' + pathPart.replace(/\.md(#.*)?$/, '.html$1') + '"';
      });
      var sb = sidebarHtml(sections, rp.replace(/\.md$/, '.html'), depth);
      var htm = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + title.replace(/</g,'&lt;') + ' - VS Code 中文文档</title>\n<style>' + CSS + '</style>\n</head>\n<body>\n<div class="layout">\n  <div class="sidebar">' + sb + '</div>\n  <div class="content">\n    <div class="breadcrumb"><a href="' + '../'.repeat(depth) + 'index.html">首页</a> / ' + (base||'') + ' / ' + e.name.replace(/\.md$/,'') + '</div>\n' + body + '\n  </div>\n</div>\n<script>function ts(id){var e=document.getElementById(id),t=e.previousElementSibling;e.classList.contains("collapsed")?(e.classList.remove("collapsed"),t.classList.remove("collapsed")):(e.classList.add("collapsed"),t.classList.add("collapsed"))}function toggleAll(v){document.querySelectorAll(".sidebar-section-content,.sidebar-sub-content").forEach(function(e){v?e.classList.remove("collapsed"):e.classList.add("collapsed")});document.querySelectorAll(".sidebar-section-title,.sidebar-sub-title").forEach(function(e){v?e.classList.remove("collapsed"):e.classList.add("collapsed")})}<\/script>\n</body>\n</html>';
      fs.writeFileSync(op, htm, 'utf-8');
      d++;
      process.stdout.write('.');
    } catch(e) { console.error('\nError: ' + fp + ': ' + e.message); }
  });
  })(sd.src, sd.base);
});
console.log('\n\nDone! ' + d + '/' + t + ' files.');
console.log('Output: ' + path.resolve(OUT));
