# Monkeys Gambling

A password-protected virtual gambling site for friends to play together with no real money involved. This project includes simple casino-style games like dice and roulette.

## Features

- Password protection for private access
- Virtual currency system (no real money)
- Multiplayer games
- Dice game with betting options
- Roulette with color betting
- Player invitations
- Persistent game state using local storage

## How to Deploy to GitHub Pages

### 1. Create a GitHub Account

If you don't already have one, sign up for a GitHub account at [github.com](https://github.com).

### 2. Create a New Repository

1. Click on the '+' icon in the top right corner and select "New repository"
2. Name your repository (e.g., "friends-game-night")
3. Make sure it's set to "Public" (GitHub Pages requires this for free accounts)
4. Click "Create repository"

### 3. Upload Your Files

#### Using GitHub Website (Easiest Method)

1. Navigate to your new repository
2. Click "Add file" > "Upload files"
3. Drag and drop or select all the files from this project:
   - index.html
   - styles.css
   - script.js
   - README.md
4. Click "Commit changes"

#### Using Git (Advanced)

If you're familiar with Git:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
# Copy all files into this directory
git add .
git commit -m "Initial commit"
git push origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for your site to be published
7. GitHub will show you the URL where your site is published

## How to Use the Site

1. Share the GitHub Pages URL with your friends
2. Share the password: "friendsonly2025" (you can change this in the script.js file)
3. Each player creates a username
4. Play games and have fun!

## Customization

You can customize the site by editing:

- The password in `script.js` (look for `const SCHOOL_PASSWORD = "friendsonly2025"`)
- The starting balance in `script.js` (look for `const STARTING_BALANCE = 1000`)
- The colors and styles in `styles.css`
- Add more games by extending the HTML, CSS, and JavaScript

## Important Notes

- This project is for entertainment purposes only
- No real money or valuables are involved
- All data is stored locally in the browser using localStorage
- This is a client-side only application with no backend server

## Privacy and Security

- The password protection is basic and not meant for high security
- Anyone with the password can access the site
- Player data is stored in the browser's localStorage and not on a server
- Each device will have its own separate game state

Enjoy your Friend's Game Night!
