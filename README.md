# Financial Literacy Game - Setup Guide

A web-based educational game teaching financial literacy concepts.

---

## ⚡ First Time Setup (New Computer)

### 1️⃣ Install Node.js

**If you don't have Node.js installed yet:**

1. Go to https://nodejs.org/
2. Download the **LTS** version (the green button on the left)
3. Double-click the installer and follow the prompts
4. After installation, open your **Terminal** (Mac) or **Command Prompt** (Windows) and type:
   ```bash
   node -v
   ```
   If you see a version number (like `v18.17.0`), you're good! ✅

---

### 2️⃣ Setup Git (First Time Only)

**If you haven't configured Git on your computer yet:**

```bash
# Set your name (use your real name)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify it worked
git config --global --list
```

You only need to do this **once per computer**.

---

### 3️⃣ Clone the Repository

```bash
# Clone the project
git clone https://github.com/yourusername/cse210-group10-game.git

# Enter the project folder
cd cse210-group10-game

# Check that you're on the main branch
git branch
```

You should see `* main` highlighted.

---

### 3️⃣ Install Dependencies

In the project folder, run:

```bash
npm install
```

**This will take a few minutes** to download packages. When you see `added XXX packages`, you're done! ✅

---

### 4️⃣ Start the Game

Run:

```bash
npm run dev
```

When you see this message, it worked:

```
➜  Local:   http://localhost:5173/
```

---

### 5️⃣ Open in Browser

Open Chrome/Edge/Firefox and go to:

```
http://localhost:5173
```

You should see the game start page! 🎉

---

## 🔄 Daily Use (Already Set Up)

Every time you want to run the game:

1. Open Terminal/Command Prompt
2. `cd` to the project folder
3. Run:
   ```bash
   npm run dev
   ```
4. Open browser to `http://localhost:5173`

**To stop the server:** Press `Ctrl + C` in the terminal

---

## � Understanding npm Commands

### What is npm?

`npm` = Node Package Manager. It manages all the code libraries (packages) your project needs.

### Essential npm Commands

#### `npm install`

**What it does:** Downloads all packages listed in `package.json`

**When to use:**

- First time setting up the project
- After pulling new code that added dependencies
- When `node_modules` folder is missing

```bash
npm install
```

**What you'll see:** Progress bars, then `added XXX packages`

---

#### `npm run dev`

**What it does:** Starts the Vite development server

**What happens:**

1. Compiles your React/TypeScript code
2. Starts a local web server on port 5173
3. Watches for file changes
4. Auto-refreshes browser when you save files

```bash
npm run dev
```

**Keep this running** while developing! Don't close the terminal.

---

#### `npm run build`

**What it does:** Checks your code for errors and creates a production build

**When to use:**

- Before committing code (to catch errors)
- To test if everything compiles correctly
- When preparing for deployment

```bash
npm run build
```

**What you'll see:** Either `✓ built in XXXms` (success) or error messages

---

### Adding New Packages

If you need to add a new library:

```bash
# Install and save to package.json
npm install package-name

# Example: adding a date library
npm install date-fns
```

**Important:** After adding a package, tell your team so they can run `npm install`!

---

### Common npm Issues

#### ❌ "Module not found"

```
Error: Cannot find module 'react'
```

**Fix:** Run `npm install` - you're missing dependencies

---

#### ❌ Outdated packages

```
npm WARN deprecated
```

**Fix:** Usually safe to ignore warnings. If needed:

```bash
npm update
```

---

#### ❌ Port already in use

```
Port 5173 is in use
```

**Fix:** Vite automatically uses port 5174. Check terminal for the new URL.

**Or kill the existing process:**

```bash
# Find what's using the port
lsof -ti:5173

# Kill it (Mac/Linux)
kill -9 $(lsof -ti:5173)
```

---

#### ❌ Cache issues

If things are acting weird:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Understanding package.json

`package.json` is like a recipe card for your project.

**Key sections:**

```json
{
  "scripts": {
    "dev": "vite", // npm run dev → runs vite
    "build": "vite build" // npm run build → builds project
  },
  "dependencies": {
    // Packages needed to run
    "react": "^19.2.0"
  },
  "devDependencies": {
    // Packages needed for development
    "vite": "^7.2.4"
  }
}
```

**Don't edit this manually** unless you know what you're doing!

---

### npm Cheat Sheet

| Command                 | Purpose                  |
| ----------------------- | ------------------------ |
| `npm install`           | Install all dependencies |
| `npm install <package>` | Add a new package        |
| `npm run dev`           | Start development server |
| `npm run build`         | Check for errors & build |
| `npm update`            | Update packages          |
| `npm list`              | See installed packages   |

---

## �📁 Project Structure (Simplified)

```
src/
├── pages/              # 3 main pages
│   ├── StartPage/      # Start screen
│   ├── MapPage/        # Level selection map
│   └── MinigamePage/   # Minigame wrapper
└── minigames/          # 4 independent minigames
    ├── minigame1-scholarship/
    ├── minigame2-budgeting/
    ├── minigame3-saving/
    └── minigame4-investing/
```

---

## 🎮 How to Add Your Minigame Content

### Example: Editing Level 1 (Scholarship Game)

1. Open the file: `src/minigames/minigame1-scholarship/index.tsx`

2. You'll see:

   ```tsx
   const Minigame1: React.FC = () => {
     return (
       <div>
         <h1>Hi! I'm Game 1</h1>
         <p>Scholarship Matcher Module Loaded ✓</p>
       </div>
     );
   };
   ```

3. Replace the content between `<div>` and `</div>` with your game!

4. Save the file - the browser will **auto-refresh** with your changes ✅

---

## 🐛 Common Issues

### ❌ Port is already in use

```
Port 5173 is in use
```

**Fix:** Vite will automatically use a different port (like 5174). Check the terminal for the new URL.

---

### ❌ npm command not found

```
npm: command not found
```

**Fix:** Reinstall Node.js (Step 1)

---

### ❌ Dependency installation failed

```
npm ERR!
```

**Fix:**

1. Delete the `node_modules` folder
2. Delete the `package-lock.json` file
3. Run `npm install` again

---

## 🚀 Git Workflow (Quick Reference)

### Daily Git Commands

```bash
# Get latest code
git pull origin main

# Create your branch
git checkout -b feature/yourname-feature

# Save your work
git add .
git commit -m "Description of changes"
git push
```

That's all you need! 🎉

---

## ✅ Testing Your Changes

After editing code, manually test:

1. Open http://localhost:5173
2. Click "Play Game"
3. Click the level you modified
4. Confirm your changes display correctly

---

## 📞 Need Help?

- **Don't understand an error?** Share the error message with the team
- **Code not working?** Run `npm run build` to check for errors
- **Git too confusing?** Use GitHub Desktop (GUI version) - it's easier!

---

## 📚 Useful Commands

| Command         | Purpose                  |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Check for code errors    |
| `npm install`   | Install dependencies     |

---

## 🎯 How the Modular System Works

Each minigame is completely independent:

1. Each level has its own folder in `src/minigames/`
2. When you click a level button, `MinigamePage` loads ONLY that module
3. You can develop your minigame without worrying about others' code
4. The plugin registry (`src/minigames/index.ts`) connects everything

**You only need to edit YOUR minigame file!**

---

**That's it! Start coding!** 🎉
