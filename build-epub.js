const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const TOC_REPO = 'C:/Users/zhong/AppData/Local/Temp/vscode-docs';
const HTML_ROOT = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents';
const OUT = path.join(HTML_ROOT, 'VS-Code-1.124-中文文档.epub');

// Load TOC
function loadJson(fp) {
  var r = fs.readFileSync(fp, 'utf-8').replace(/\/\/.*$/gm, '').replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(r);
}
function tp(p) {
  var r = p.replace(/^\/docs\//, 'docs/');
  if (!r.match(/\.[a-z]+$/i)) return r + '.html';
  return r.replace(/\.md$/, '.html');
}
function lt(arr) {
  if (!arr||!arr.length) return [];
  var n = [];
  arr.forEach(function(e) {
    if (e&&e.name&&e.topics) n.push({type:'t',name:e.name,children:lt(e.topics)});
    else if (Array.isArray(e)&&e.length===3&&typeof e[2]==='object') n.push({type:'t',name:e[2].name,children:lt(e[2].topics||[])});
    else if (Array.isArray(e)&&e.length>=2&&e[0]&&e[1]) n.push({type:'l',name:e[0],href:tp(e[1])});
  });
  return n;
}
function ls(s) {
  var n = [];
  if (s.toc) { var f=path.join(TOC_REPO,'docs',s.toc); if (fs.existsSync(f)) n=lt(loadJson(f)); }
  if (s.topics&&s.topics.length>0) n=n.concat(lt(s.topics));
  return {name:s.name,nodes:n};
}

var secs = loadJson(path.join(TOC_REPO,'docs','toc.json')).map(function(s){return ls(s);}).filter(function(s){return s.nodes.length>0;});
console.log('Sections: ' + secs.length);

// Extract clean HTML content from page
function extractBody(htmlPath) {
  if (!fs.existsSync(htmlPath)) return '<p>(内容未找到)</p>';
  var content = fs.readFileSync(htmlPath, 'utf-8');
  var m = content.match(/<div class="content">([\s\S]*?)<\/div>\s*<\/div>\s*<script>/);
  if (!m) return '<p>(内容解析失败)</p>';
  var html = m[1];
  // Clean up
  html = html.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  // Remove images (keep alt text if any)
  html = html.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, '[$1]');
  html = html.replace(/<img[^>]*>/g, '');
  return html;
}

// Build chapters list
var allChapters = [];
secs.forEach(function(sec) {
  var secItems = [];
  function walk(nodes) {
    nodes.forEach(function(n) {
      if (n.type === 'l') {
        secItems.push({name:n.name, href:n.href});
      } else if (n.type === 't' && n.children) walk(n.children);
    });
  }
  walk(sec.nodes);
  if (secItems.length > 0) {
    allChapters.push({name:'◆ ' + sec.name, href:null, children:secItems});
  }
});

console.log('Chapters: ' + allChapters.reduce(function(a,c){return a+c.children.length;}, 0) + ' in ' + allChapters.length + ' sections');

// Generate EPUB
var zip = new JSZip();

// mimetype file (must be first, uncompressed)
zip.file('mimetype', 'application/epub+zip', {compression:'STORE'});

// META-INF
zip.folder('META-INF').file('container.xml', '<?xml version="1.0"?>' +
  '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">' +
  '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>' +
  '</rootfiles></container>');

var oebps = zip.folder('OEBPS');

// Generate CSS
var css = 'body{font-family:"Noto Sans SC","PingFang SC",sans-serif;line-height:1.8;font-size:14px;color:#333;margin:1em 2em}' +
  'h1{font-size:22px;font-weight:700;margin:20px 0 12px}' +
  'h2{font-size:18px;font-weight:600;margin:18px 0 10px}' +
  'h3{font-size:16px;font-weight:600;margin:14px 0 8px}' +
  'p{margin:0 0 10px;text-indent:0}' +
  'code{background:#f0f0f0;padding:1px 4px;border-radius:3px;font-size:12px;font-family:monospace}' +
  'pre{background:#f7f7f7;padding:10px;border-radius:4px;font-size:12px;margin:10px 0;white-space:pre-wrap}' +
  'pre code{background:none;padding:0}' +
  'table{border-collapse:collapse;margin:10px 0;width:100%;font-size:13px}' +
  'th,td{border:1px solid #ddd;padding:6px 10px}' +
  'th{background:#f8f8f8}' +
  'a{color:#0078d4}' +
  'blockquote{border-left:3px solid #0078d4;padding:6px 12px;margin:10px 0;background:#f0f7ff}';
oebps.file('style.css', css);

// Generate XHTML for each chapter
var manifest = [];
var spine = [];
var idCounter = 0;

function addChapter(title, content, isSection) {
  idCounter++;
  var id = 'ch' + idCounter;
  var safeTitle = title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var xhtml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<!DOCTYPE html>' +
    '<html xmlns="http://www.w3.org/1999/xhtml">' +
    '<head><meta charset="utf-8"/><title>' + safeTitle + '</title>' +
    '<link rel="stylesheet" type="text/css" href="style.css"/></head>' +
    '<body>' + content + '</body></html>';
  oebps.file(id + '.xhtml', xhtml);
  manifest.push('<item id="' + id + '" href="' + id + '.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('<itemref idref="' + id + '"/>');
}

// Add chapters
allChapters.forEach(function(sec) {
  // Section header
  addChapter(sec.name, '<h1 style="text-align:center;margin-top:20%">' + sec.name.replace(/&/g,'&amp;') + '</h1>', true);
  // Children
  sec.children.forEach(function(ch) {
    var html = extractBody(path.join(HTML_ROOT, ch.href));
    if (html) {
      var content = '<h1>' + ch.name.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</h1>' + html;
      addChapter(ch.name, content);
    }
  });
});

// Generate content.opf
var opf = '<?xml version="1.0" encoding="utf-8"?>' +
  '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">' +
  '<metadata>' +
  '<dc:identifier id="bookid">urn:uuid:vs-code-docs-zh</dc:identifier>' +
  '<dc:title>VS Code 1.124 中文文档</dc:title>' +
  '<dc:language>zh-CN</dc:language>' +
  '<dc:creator>社区翻译</dc:creator>' +
  '<dc:publisher>github.com/zhongweidee/vscode-docs-zh</dc:publisher>' +
  '<meta property="dcterms:modified">' + new Date().toISOString() + '</meta>' +
  '</metadata>' +
  '<manifest>' +
  '<item id="css" href="style.css" media-type="text/css"/>' +
  manifest.join('') +
  '</manifest>' +
  '<spine>' +
  spine.join('') +
  '</spine>' +
  '</package>';
oebps.file('content.opf', opf);

// Generate toc.ncx
var ncx = '<?xml version="1.0" encoding="utf-8"?>' +
  '<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">' +
  '<head><meta name="dtb:uid" content="urn:uuid:vs-code-docs-zh"/></head>' +
  '<docTitle><text>VS Code 1.124 中文文档</text></docTitle>' +
  '<navMap>';
var navId = 0;
allChapters.forEach(function(sec) {
  navId++;
  ncx += '<navPoint id="nav' + navId + '"><navLabel><text>' + sec.name + '</text></navLabel><content src="ch' + (navId) + '.xhtml"/></navPoint>';
  sec.children.forEach(function(ch) {
    navId++;
    ncx += '<navPoint id="nav' + navId + '"><navLabel><text>' + ch.name + '</text></navLabel><content src="ch' + (navId) + '.xhtml"/></navPoint>';
  });
});
ncx += '</navMap></ncx>';
oebps.file('toc.ncx', ncx);

// Add nav.xhtml for EPUB3
var navItems = '';
navId = 0;
allChapters.forEach(function(sec) {
  navId++;
  navItems += '<li><a href="ch' + navId + '.xhtml">' + sec.name + '</a></li>';
  sec.children.forEach(function(ch) {
    navId++;
    navItems += '<li style="padding-left:1em"><a href="ch' + navId + '.xhtml">' + ch.name + '</a></li>';
  });
});
var navXhtml = '<?xml version="1.0" encoding="utf-8"?>' +
  '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">' +
  '<head><meta charset="utf-8"/><title>导航</title></head>' +
  '<body><nav epub:type="toc"><h1>目录</h1><ol>' + navItems + '</ol></nav></body></html>';
oebps.file('nav.xhtml', navXhtml);

// Generate and save
console.log('Writing EPUB file...');
zip.generateNodeStream({type:'nodebuffer',streamFiles:true,compression:'DEFLATE',compressionOptions:{level:6}})
  .pipe(fs.createWriteStream(OUT))
  .on('finish', function() {
    var stats = fs.statSync(OUT);
    console.log('Done!');
    console.log('Size: ' + (stats.size / 1024 / 1024).toFixed(1) + ' MB');
    console.log('Output: ' + OUT);
  })
  .on('error', function(err) {
    console.error('Error:', err.message);
  });
