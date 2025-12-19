# Portfolio Website

A responsive personal portfolio site built with vanilla HTML, CSS, and JavaScript. It highlights experience, skills, projects, resume, and contact information with smooth scrolling, subtle animations, and a mobile-friendly navigation.

## Features

- Modern hero section with clear call-to-action buttons
- About, skills, projects, resume timeline, and contact sections
- Responsive layout powered by CSS grid and flexbox
- Scroll-triggered reveal animations via Intersection Observer
- Accessible mobile navigation with animated hamburger toggle
- Contact form wired to Formspree (replace with your endpoint)

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser to review the site.
3. Customize the content:
   - Replace placeholder copy with your bio, stats, and project details.
   - Update social links, email address, and Formspree endpoint.
   - Add your resume file to `assets/` and update the download links.
4. Adjust styling or animations in `styles.css` as desired.

## Project Structure

```
portfoliowebsite/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Deployment

- **GitHub Pages**
  1. Push the `portfoliowebsite` folder to a repository.
  2. Enable GitHub Pages from the repository settings, targeting the `main` or `gh-pages` branch.
  3. Visit the published URL and verify everything loads correctly.

- **Netlify**
  1. Drag and drop the folder onto the Netlify dashboard, or connect the Git repository.
  2. Netlify deploys static sites automatically; no build step is required.

## Customization Tips

- Swap the color variables at the top of `styles.css` to theme the site.
- Update typography by changing the Google Fonts import in `index.html`.
- Add or remove sections by following the existing markup patterns and updating navigation anchors.
- Replace Intersection Observer logic in `script.js` with your preferred animation library if needed.

## License

This project is free for personal use. If you plan to publish or redistribute it, make sure to replace the stock text, imagery, and branding with your own content.
