## Suggested Commands for Portfolio Website Development

### Windows File System Navigation Commands:
- `dir` - List files and directories
- `cd [directory_name]` - Change directory
- `cd ..` - Go up one directory level
- `mkdir [directory_name]` - Create a new directory
- `type [filename]` - Display file contents (equivalent to cat in Unix)
- `copy [source] [destination]` - Copy files
- `move [source] [destination]` - Move files
- `del [filename]` - Delete files
- `rmdir [directory_name]` - Remove directory

### File Search Commands:
- `findstr "text" [filename]` - Search for text in files (Windows grep)
- `dir /s [filename]` - Search for files recursively

### Git Commands:
- `git init` - Initialize a new Git repository
- `git status` - Check status of files
- `git add .` - Add all changes to staging
- `git commit -m "message"` - Commit changes with message
- `git push` - Push changes to remote repository
- `git pull` - Pull latest changes

### Web Development Commands:
- `start index.html` - Open HTML file in default browser
- `code .` - Open current directory in VS Code (if installed)

### Local Server (if needed):
- Install a simple HTTP server: `npm install -g http-server`
- Run server: `http-server`

### Validation Tools:
- Use W3C Validator for HTML: https://validator.w3.org/
- Use W3C CSS Validator: https://jigsaw.w3.org/css-validator/

### Image Optimization:
- `npx imagemin-cli [input] [output]` (requires Node.js)
