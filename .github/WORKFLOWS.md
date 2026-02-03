# GitHub Actions Workflows Summary

This document provides a quick reference for all automated workflows in this repository.

## 🔄 Active Workflows

| Workflow | Trigger | Purpose | Status |
|----------|---------|---------|--------|
| **CI** | PR, Push to main/develop | Code quality, testing, security | Required |
| **Performance** | PR, Push to main | Performance monitoring, bundle analysis | Optional |
| **Deploy** | Push to main | Build and deploy to GitHub Pages | Automated |
| **Dependabot Auto-merge** | Dependabot PRs | Auto-approve minor/patch updates | Automated |
| **Stale** | Daily schedule | Clean up inactive issues/PRs | Automated |

## 📋 Workflow Details

### CI Workflow (`.github/workflows/ci.yaml`)
**Required for merge**

- ✅ Code quality checks (ESLint, Prettier)
- ✅ Unit tests with coverage
- ✅ Multi-version build testing (Node 18, 20, 22)
- ✅ Security audits
- ✅ Dependency review

**Runs on:** Pull requests and pushes to main/develop  
**Duration:** ~5-10 minutes

---

### Performance Workflow (`.github/workflows/performance.yaml`)
**Informational**

- 📊 Lighthouse performance audits
- 📦 Bundle size analysis
- ⏱️ Build performance metrics

**Runs on:** Pull requests and pushes to main  
**Duration:** ~8-12 minutes

---

### Deploy Workflow (`.github/workflows/build-and-deploy.yaml`)
**Automated deployment**

- 🚀 Builds production bundle
- 🧪 Runs tests before deployment
- 📤 Deploys to GitHub Pages
- ✅ Deployment verification

**Runs on:** Push to main, manual trigger  
**Duration:** ~3-5 minutes

---

### Dependabot Auto-merge (`.github/workflows/dependabot-auto-merge.yaml`)
**Dependency automation**

- 🤖 Auto-approves patch/minor updates
- ⚠️ Flags major updates for review
- 🔒 Requires CI to pass first

**Runs on:** Dependabot pull requests  
**Duration:** < 1 minute

---

### Stale Workflow (`.github/workflows/stale.yaml`)
**Repository maintenance**

- 🧹 Marks inactive issues/PRs as stale
- 🔒 Closes stale items after grace period
- 📌 Exempts pinned/security items

**Runs on:** Daily at midnight UTC  
**Duration:** ~1-2 minutes

---

## 🎯 Quick Actions

### For Contributors
```bash
# Run tests locally
npm test

# Check code quality
npm run lint
npm run format:check

# Fix formatting
npm run format
npm run lint:fix

# Check for vulnerabilities
npm run audit
```

### For Maintainers
```bash
# Trigger manual deployment
# Go to Actions → Deploy Landing Page → Run workflow

# Review Dependabot PRs
# Check PRs with "dependencies" label

# View performance reports
# Check Actions → Performance Monitoring → Artifacts
```

---

## 🔔 Notifications

Workflows will notify you via:
- ✅ PR status checks
- 📧 Email notifications (if enabled)
- 🔔 GitHub notifications
- 💬 Comments on PRs (for Dependabot major updates)

---

## 🐛 Troubleshooting

### CI Failing?
1. Check the workflow logs in the Actions tab
2. Run tests locally: `npm test`
3. Run linting: `npm run lint`
4. Check for security issues: `npm audit`

### Deployment Failing?
1. Verify build succeeds locally: `npm run build`
2. Check GitHub Pages settings
3. Review workflow logs for specific errors

### Dependabot Issues?
1. Check if PR has conflicts
2. Verify CI checks are passing
3. Review breaking changes in major updates

---

## 📚 Related Documentation

- [CI/CD Documentation](CI-CD-DOCUMENTATION.md) - Comprehensive guide
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [README](README.md) - Project overview

---

## 🔄 Workflow Status

Check the current status of all workflows:
- Visit the [Actions tab](../../actions)
- View [deployment history](../../deployments)
- Check [Dependabot PRs](../../pulls?q=is%3Apr+author%3Aapp%2Fdependabot)
