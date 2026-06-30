# Southern Sluggerz - 7U Baseball Team Website

A modern, responsive website for the Southern Sluggerz 7U baseball team, inspired by the main Southern Sluggerz Baseball organization's values and mission.

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Root-Foundry/SouthernSluggerz)

### Deployment Steps:
1. Click the "Deploy to Netlify" button above (or go to [Netlify](https://app.netlify.com))
2. Connect your GitHub account
3. Select this repository: `Root-Foundry/SouthernSluggerz`
4. Click "Deploy site"
5. Once deployed, go to **Site Settings → Forms** to configure email notifications for contact form submissions

Your site will be live at a Netlify URL (e.g., `your-site-name.netlify.app`). You can add a custom domain later.

## Features

- **Home Section**: Auto-rotating image carousel with 5 team photos, manual navigation controls, and smooth transitions
- **About Section**: Mission statement and core values (Player-First Approach, Character Development, Family Environment, Comprehensive Training)
- **Coaches Section**: Horizontal lineup display with circular photos and detailed bios
- **Players Section**: Interactive baseball diamond showing player positions with clickable player cards
- **Apparel Section**: Link to external apparel store
- **Contact Section**: Netlify-powered contact form with spam protection
- **Footer**: Modern multi-column layout with About, Quick Links, Contact Info, and Social Media sections
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## Hero Carousel

The home section features a dynamic image carousel with:
- 5 rotating team photos showcasing the Southern Sluggerz in action
- Auto-advance every 5 seconds
- Previous/Next navigation buttons
- Dot indicators for quick navigation to specific slides
- Pause on hover functionality
- Smooth fade transitions between images
- Fully responsive controls for mobile devices

## Baseball Diamond Layout

The Players section features an interactive baseball diamond with:
- Professional stadium-style background with blue diamond infield (like a real ballpark)
- White baseline outlines forming the diamond shape
- Red/burgundy stadium atmosphere backdrop
- 9 player positions arranged accurately on the field (CF, LF, RF, SS, 2B, 1B, P, 3B, C)
- **Clickable player avatars** - Click any player to see detailed information
- Hover effects that enlarge player avatars
- White circular player photos with orange borders
- Position labels with team colors (orange badges)
- Fully responsive design that scales for mobile devices

### Player Modal Feature
Each player position is clickable and displays a detailed popup modal with:
- Large player photo
- Player name
- Position
- Jersey number
- Age
- Batting hand (Left/Right)
- Throwing hand (Left/Right)
- Favorite MLB team

The baseball field uses `baseball-field.svg` which features a stadium-style design. You can replace it with an actual stadium photo for even more realism.

## Website Philosophy

This website reflects the Southern Sluggerz commitment to developing confident, respectful, and hardworking young men who love baseball. The focus is not just on winning games, but on building character, discipline, and sportsmanship that extends beyond the field.

## Customization Instructions

### 1. Update Coach Information
Edit [index.html](index.html) in the Coaches Section to update the coaching staff:
- Replace coach names in the `<h3>` tags
- Update coach titles (HEAD COACH, ASSISTANT COACH)
- Modify coach bios
- Add coach photos to the `pictures` folder:
  - `coach1.jpg` (Head Coach)
  - `coach2.jpg` (Assistant Coach)
  - `coach3.jpg` (Assistant Coach)

### 2. Update Player Information on Baseball Diamond
Edit [index.html](index.html) in the Players Section. Each player position has multiple data attributes for the clickable modal:

**Player Data to Update:**
- `data-player-name` - Player's full name
- `data-player-age` - Player's age
- `data-player-number` - Jersey number
- `data-player-team` - Favorite MLB team
- `data-player-position` - Full position name (e.g., "Center Field")
- `data-player-bats` - Batting hand (Left/Right/Switch)
- `data-player-throws` - Throwing hand (Left/Right)
- `data-player-photo` - Path to player photo

**Player Photos:** Place images in `pictures` folder with names like:
  - `player-cf.jpg` (Center Field)
  - `player-lf.jpg` (Left Field)
  - `player-rf.jpg` (Right Field)
  - `player-ss.jpg` (Shortstop)
  - `player-2b.jpg` (Second Base)
  - `player-1b.jpg` (First Base)
  - `player-p.jpg` (Pitcher)
  - `player-3b.jpg` (Third Base)
  - `player-c.jpg` (Catcher)

**Update the displayed name on the field:** Replace "PLAYER NAME" in the `<p class="player-name">` tag

Example player entry:
```html
<div class="field-player" data-position="cf"
     data-player-name="John Smith"
     data-player-age="7"
     data-player-number="12"
     data-player-team="Atlanta Braves"
     data-player-position="Center Field"
     data-player-bats="Right"
     data-player-throws="Right"
     data-player-photo="pictures/player-cf.jpg">
    <div class="player-avatar">
        <img src="pictures/player-cf.jpg" alt="Center Field" onerror="this.style.display='none'">
    </div>
    <p class="player-name">JOHN SMITH</p>
    <p class="position-label">CF</p>
</div>
```

When users click on a player's avatar, a modal popup will display all the player's details in a professional card format.

### 3. Connect External Apparel Store
In `index.html`, find the Apparel Section and update the link:
```html
<a href="https://www.example.com/shop" target="_blank" class="apparel-button">Visit Apparel Store</a>
```
Replace `https://www.example.com/shop` with your actual apparel store URL.

### 4. Customize Hero Carousel Images
The hero carousel displays 5 team photos. To change them:

1. Add your images to the `pictures` folder
2. Edit [index.html](index.html) in the hero section
3. Update the `background-image` URLs in each `carousel-slide` div:

```html
<div class="carousel-slide active" style="background-image: url('pictures/your-photo-1.png')"></div>
<div class="carousel-slide" style="background-image: url('pictures/your-photo-2.png')"></div>
<div class="carousel-slide" style="background-image: url('pictures/your-photo-3.png')"></div>
```

**To add more slides:**
1. Add another `<div class="carousel-slide">` in the HTML
2. Add a corresponding `<span class="indicator">` in the indicators section
3. Update the `data-slide` attribute numbers accordingly

**Image recommendations:**
- Landscape orientation (16:9 or 4:3 ratio)
- Minimum 1920x1080px for best quality
- Action shots, team photos, or field images work great

### 5. Update Contact Information
Edit the Contact Section in `index.html`:
```html
<div class="info-item">
    <strong>Location:</strong> Valdosta, Georgia
</div>
<div class="info-item">
    <strong>Email:</strong> info@southernsluggerz.com
</div>
<div class="info-item">
    <strong>Phone:</strong> (555) 123-4567
</div>
```
Update with your actual contact details.

### 6. Configure Contact Form (Netlify Forms)
The contact form is configured to work with **Netlify Forms** automatically when you deploy to Netlify.

**How it works:**
- When deployed to Netlify, form submissions are automatically captured
- You'll receive email notifications for each submission
- Submissions are stored in your Netlify dashboard under Forms

**Setup Steps:**
1. Deploy your site to Netlify (drag & drop or connect to Git)
2. Go to your Netlify site dashboard → Forms
3. Configure email notifications to receive form submissions
4. (Optional) Set up form notifications to Slack, webhooks, etc.

**Success Page:**
The form includes a custom success page (`success.html`) that displays a professional thank-you message after submission. Users are redirected to this page automatically.

**Spam Protection:**
The form includes a honeypot field (`bot-field`) that's hidden from users but catches bots.

**Testing Locally:**
Netlify Forms only work when deployed. For local testing, you can:
- Use Netlify Dev: `netlify dev` command
- Or temporarily add back a preventDefault handler to test the front-end behavior

### 7. Photo Requirements
Place all team photos in the `pictures` folder with these naming conventions:

**Carousel Images:**
- Current carousel uses 5 team action photos (can be customized - see section 4)
- Recommended: 1920x1080px landscape images

**Coach Photos:**
- `coach1.jpg` - Head Coach (180x180px recommended)
- `coach2.jpg` - Assistant Coach
- `coach3.jpg` - Assistant Coach

**Player Photos (by position):**
- `player-cf.jpg` - Center Field
- `player-lf.jpg` - Left Field
- `player-rf.jpg` - Right Field
- `player-ss.jpg` - Shortstop
- `player-2b.jpg` - Second Base
- `player-1b.jpg` - First Base
- `player-p.jpg` - Pitcher
- `player-3b.jpg` - Third Base
- `player-c.jpg` - Catcher

**Other Photos:**
- Hero background image: `732138142_2465667950581924_5065000228664800773_n.png` (1920x1080px recommended)
- Logo: `image.png` (used in navigation)
- Baseball field: `baseball-field.svg` (included) - Can be replaced with a custom field image

If photos are not found, the website displays placeholder icons (baseball emoji for players, person icon for coaches).

### 8. Customizing the Baseball Field (Optional)
The baseball field currently uses `baseball-field.svg` with a stadium-style design. To use your own stadium image:

1. Find or create a baseball stadium image (wide angle, 1200x900px or 4:3 aspect ratio recommended)
2. Save it as `baseball-stadium.jpg` in the root folder
3. Update [index.html](index.html) to point to your image:
   ```html
   <div class="baseball-field" style="background-image: url('baseball-stadium.jpg');">
   ```
   
The SVG file provides a stadium atmosphere with a blue diamond infield, white baselines, and red stadium backdrop - similar to a professional ballpark view.

### 9. Customizing Social Media Links
The footer includes social media icons for Facebook, Instagram, and Twitter. To update these:

1. Edit [index.html](index.html) in the footer section
2. Replace the `#` placeholders with your actual social media URLs:

```html
<a href="https://facebook.com/yourpage" target="_blank" aria-label="Facebook" class="social-icon">
<a href="https://instagram.com/yourhandle" target="_blank" aria-label="Instagram" class="social-icon">
<a href="https://twitter.com/yourhandle" target="_blank" aria-label="Twitter" class="social-icon">
```

To add more social networks (YouTube, TikTok, etc.), copy one of the existing `<a>` tags and replace the SVG icon with the appropriate icon code from [Simple Icons](https://simpleicons.org/).

## Viewing the Website

Simply open `index.html` in a web browser to view the website locally.

## Color Scheme

- Primary Green: #1a472a (dark green)
- Secondary Green: #2d5a3d (medium green)
- Accent Gold: #FFD700 (gold)
- Text: #333 (dark gray)

## Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
