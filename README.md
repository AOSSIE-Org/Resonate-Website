# Resonate-Website

[![Figma Design](https://img.shields.io/badge/Figma-Design-%23F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/b3DxpcvL98arH8Pru0hTEa/Resonate-Landing-Page?type=design&node-id=0%3A1&mode=design&t=IzEKsikv4qAp7jV8-1)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Open%20Source-blue?style=for-the-badge)](LICENSE.md)

> **Resonate** - Open Source Real-Time Audio Communication Platform

A modern, responsive landing page for Resonate, showcasing the platform's features and capabilities. Built with React and designed for optimal user experience across all devices.

## Features

- **Modern UI/UX**: Beautiful gradient designs with smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading times and smooth interactions
- **Accessible**: Built with accessibility best practices
- **SEO Friendly**: Proper meta tags and semantic HTML

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Links](#links)
- [Acknowledgments](#Acknowledgments)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```
### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/AOSSIE-Org/Resonate-Website.git
   cd Resonate-Website
   ```
   
2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open your browser**
   The application will automatically open at `http://localhost:3000`

## Usage

### Development Mode

Run the app in development mode with hot-reload:
```bash
npm start
```

The page will reload automatically when you make changes.

### Running Tests

Run the test suite:
```bash
npm test
```
### Building for Production

Create an optimized production build:
```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## Project Structure

```
Resonate-Website/
├── public/
│   ├── index.html          # Main HTML template
│   ├── favicon.ico         # Site favicon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── App.test.js         # Application tests
│   ├── index.js            # Application entry point
│   ├── index.css           # Global styles
│   └── reportWebVitals.js  # Performance monitoring
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── COPYRIGHT.md            # Copyright information
```
## Technologies Used

- **React 18.2.0** - UI library
- **React DOM** - DOM rendering
- **React Scripts** - Build tooling
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **HTML5** - Semantic markup

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

### Code Style

The project uses ESLint with React app configuration. Make sure your code follows the linting rules before committing.

## Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://<your-github-username>.github.io/Resonate-Website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed


## Links

- **Figma Design**: [View Design](https://www.figma.com/file/b3DxpcvL98arH8Pru0hTEa/Resonate-Landing-Page?type=design&node-id=0%3A1&mode=design&t=IzEKsikv4qAp7jV8-1)
- **GitHub Repository**: [View on GitHub](https://github.com/AOSSIE-Org/Resonate-Website)
- **Report Issues**: [Open an Issue](https://github.com/AOSSIE-Org/Resonate-Website/issues)

## Acknowledgments

- Design inspiration from the Figma design file
- React community for excellent documentation and tools
- All contributors who help improve this project
