# Contributing to Resonate Website

Thank you for your interest in contributing to the **Resonate Website**! We're excited to have you help us improve this landing page for the open-source social voice platform. This guide will help you get started.

## How to Contribute

### 1. **Report Bugs**

If you find a bug, please create an issue on our GitHub repository with:
- A clear, descriptive title
- A detailed description of the issue
- Steps to reproduce the problem
- Expected behavior vs. actual behavior
- Screenshots or error logs (if applicable)
- Your environment details (OS, browser, Node.js version)

### 2. **Suggest Features**

Have an idea to improve the website? Submit a feature request:
- Clearly describe the feature and its benefits
- Explain how it aligns with Resonate's goals
- Provide mockups or examples if possible

### 3. **Submit Code Changes**

Follow these steps to contribute code:

#### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

#### Getting Started

1. **Fork the repository**
   ```md
   # Navigate to the GitHub repo and click the "Fork" button
   ```

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Resonate-Website.git
   cd Resonate-Website
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes
   git checkout -b fix/bug-description
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Make your changes**
   - Edit files as needed
   - Ensure your code follows the existing style
   - Test your changes locally

6. **Run the development server**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`

7. **Test your changes**
   ```bash
   npm test
   ```

8. **Build the project** ( compulsory to test production build)
   ```bash
   npm run build
   ```

### 4. **Commit Your Changes**

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add feature: describe what you added"
```

**Commit message guidelines:**
This project follows Conventional Commits.
All commit messages must conform to the Conventional Commits specification:
https://www.conventionalcommits.org/en/v1.0.0/

### 5. **Push to Your Fork**

```bash
git push origin feature/your-feature-name
```

### 6. **Create a Pull Request**

1. Navigate to the original repository
2. Click "New Pull Request"
3. Select your branch and provide:
   - A clear title describing the changes
   - A detailed description of what was changed and why
   - Reference any related issues (e.g., "Fixes #123")
   - Screenshots for UI changes


### Code Style

- **Component files**: Use PascalCase for component names (e.g., `Hero.js`)
- **CSS files**: Match component names with a `.css` extension
- **Formatting**: Use consistent indentation (2 spaces)
- **React best practices**: Use functional components and hooks
- **Comments**: Add comments for complex logic

### HTML/CSS Standards

- Write semantic HTML
- Use CSS classes for styling (avoid inline styles where possible)
- Keep CSS modular and scoped to components
- Ensure responsive design (mobile-first approach)
- Test across different screen sizes

### JavaScript Standards

- Use ES6+ syntax (arrow functions, const/let, destructuring)
- Keep functions small and focused
- Follow DRY principle (Don't Repeat Yourself)
- Use meaningful variable names
- Avoid console logs in production code

## Technologies Used


This website is built with:
- **React** (v18.2.0): UI library
- **GSAP** (v3.14.0): Animations and interactions
- **Lenis** (v1.3.15): Smooth scrolling
- **React Icons** (v5.5.0): Icon library
- **React Scripts** (v5.0.1): Build tooling



## Pull Request Review Process

When you submit a pull request:

1. The maintainers will review your code
2. You may be asked to make changes or improvements
3. Once approved, your changes will be merged
4. Your contribution will be credited

### What We Look For

- ✅ Clear, descriptive commits
- ✅ Code follows project style guidelines
- ✅ Changes are well-tested
- ✅ Documentation is updated (if needed)
- ✅ No breaking changes (or clearly justified)
- ✅ Responsive design maintained
- ✅ Performance impact considered


### Performance Considerations

- Optimize images and assets
- Use code splitting where appropriate
- Minimize bundle size
- Profile animations with Chrome DevTools

## Documentation

- Update [README.md](README.md) if adding new features
- Keep component documentation up-to-date
- Document any new dependencies and their purpose
- Add inline comments for complex implementations

## Licensing

By contributing to Resonate Website, you agree that your contributions will be licensed under the GNU General Public License v3.0 (GPLv3).

## Questions?

- Check existing issues and discussions
- Create a new issue to ask questions
- Reach out to the AOSSIE community

## Recognition

We appreciate all contributions! Contributors will be recognized in the GitHub contributors list


**Thank you for contributing to Resonate! Together, we're building an amazing open-source platform.** 🎉
