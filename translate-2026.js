export const meta = {
  name: 'translate-2026',
  description: 'Translate 2026 blogs and release notes to Chinese',
  phases: [
    { title: 'Discover', detail: 'List files' },
    { title: 'Translate', detail: 'Translate all files' },
  ],
}

var SRC = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-source'
var TGT = 'C:/Users/zhong/OneDrive/AI/vscode/download_documents/vscode-docs-zh'

phase('Discover')

// Get blog files
var blogs = await agent('Run "find ' + SRC + '/blogs/2026 -name \'*.md\' | sort" via Bash and return all paths.', {
  schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string' } } }, required: ['files'] }
})

// Get release notes
var rns = await agent('Run "find ' + SRC + '/release-notes -name \'*.md\' | sort" via Bash and return all paths.', {
  schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string' } } }, required: ['files'] }
})

var all = (blogs.files || []).concat(rns.files || [])
log('Files: ' + all.length + ' (' + (blogs.files||[]).length + ' blogs + ' + (rns.files||[]).length + ' release notes)')

if (!all || all.length === 0) return { error: 'no files' }

phase('Translate')

var ok = 0
var fail = 0

for (var i = 0; i < all.length; i += 6) {
  var batch = all.slice(i, i + 6)
  log('Batch ' + (Math.floor(i/6)+1) + '/' + Math.ceil(all.length/6))

  var results = await parallel(batch.map(function(fp) {
    return function() {
      var rel = fp.substring(SRC.length + 1)
      var outPath = TGT + '/' + rel
      var label = rel.substring(0, 60).replace(/[\/\\]/g, '-')
      return agent(
        'You are a professional technical translator. Translate this VS Code doc to Simplified Chinese.\n' +
        'SOURCE: ' + fp + '\n' +
        'OUTPUT: ' + outPath + '\n' +
        'STEPS:\n' +
        '1. Read SOURCE with Read tool on: "' + fp + '"\n' +
        '2. Read TARGET with Read tool on: "' + outPath + '" (currently EMPTY)\n' +
        '3. Translate ALL visible text to Simplified Chinese\n' +
        'RULES:\n' +
        '  - Keep Markdown formatting (headings, bold, lists, tables, links)\n' +
        '  - Keep YAML frontmatter, translate only human values\n' +
        '  - Keep code blocks and inline code EXACTLY as-is\n' +
        '  - Keep URLs, file paths, image paths, config values unchanged\n' +
        '  - Keep HTML tags unchanged\n' +
        'TERMS: debug=调试, extension=扩展, setting=设置, workspace=工作区,\n' +
        'folder=文件夹, file=文件, command=命令, terminal=终端, editor=编辑器\n' +
        'configuration=配置, default=默认, preview=预览, enable=启用\n' +
        '4. Write translation to OUTPUT using Write tool\n' +
        '   You Read the target in step 2, so Write will work.\n' +
        'Return: OK (filename) or ERROR (details)',
        { label: label, phase: 'Translate' }
      )
    }
  }))

  for (var j = 0; j < results.length; j++) {
    if (results[j] && results[j].indexOf('OK') >= 0) ok++
    else fail++
  }
}

log('DONE: ' + ok + ' OK, ' + fail + ' failed / ' + all.length)
return { total: all.length, succeeded: ok, failed: fail, blogsDir: TGT + '/blogs', rnDir: TGT + '/release-notes' }
