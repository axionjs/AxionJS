# Contributing

Thanks for your interest in contributing to *AxionJS* — we’re excited to have you here.

Before submitting your first pull request, please review this guide. Also check for open issues or discussions to see if someone is already working on something similar.

If you have any questions, feel free to open a discussion on the [GitHub repository](https://github.com/axionjs/AxionJS).

---

## About this Repository

This project is a *monorepo* powered by:

- [npm](https://www.npmjs.com/) as the package manager  
- [Turborepo](https://turbo.build/repo) for task orchestration

---

## Project Structure


apps
├── docs        # Documentation website (https://axionjs.com/docs)
└── ...
packages
└── cli         # CLI tool for AxionJS


---

## Getting Started

### 1. Fork and Clone

bash
git clone https://github.com/axionjs/AxionJS.git
cd AxionJS


### 2. Create a New Branch

bash
git checkout -b my-new-feature


---

## Run the Documentation Site Locally

bash
cd apps/docs
npm install --force
npm run dev


This runs the documentation website at [http://localhost:3000](http://localhost:3000).

---

## Run the CLI Locally

To test and develop the CLI locally:

bash
cd packages/cli
npm install
npm run dev


---

## Commit Convention

Use the following format for commit messages:


category(scope): message


Examples:

- feat(components): add new button variant
- fix(cli): resolve path resolution bug
- docs: update installation guide

Commit categories:

- feat: new features
- fix: bug fixes
- refactor: internal code changes
- docs: documentation updates
- chore: project configuration or housekeeping

For more, refer to [Conventional Commits](https://www.conventionalcommits.org/).

---

## Component Requests

Have an idea for a component or feature? [Open a discussion](https://github.com/axionjs/AxionJS/discussions) — we'd love to hear from you.

---

Thanks again for contributing to *AxionJS*!
