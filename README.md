
# 📈 FakeStore Task
Product management console:

- Built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

- Deployed on [AWS EC2](https://aws.amazon.com/) EC2 instance using a [Docker](https://www.docker.com/) container with [nginx](https://www.nginx.com/) reverse proxy to expose the app.

- CI/CD using [GitHub Actions](https://github.com/features/actions) workflow

<br/>


## 🛠️ Installation


All commands are defined in the [package](./package.json). This repository uses [yarn](https://yarnpkg.com/) as a package manager.

To get started with developing on this project, follow these steps:

1. Install [NodeJS](https://nodejs.org/en).
1. Install [yarn](https://yarnpkg.com/)
1. Run ```yarn```
1. Use ```yarn dev``` to start developing

<br />

## 📦 Third-Party Packages

Important packages contained in this repository:


* [vite](https://vitejs.dev/) - Super fast build tool and bundler

* [Zod](https://zod.dev/) - TypeScript-first schema validation library with static type inference. In this project it is used mainly for form data validation and API call response type inference.

* [daisyUI](https://daisyui.com/) - Lightweight, tailwind based component library

<br />

## 🚀 CI/CD Pipeline

Setup for the continuous integration and development can be found in [.github](./.github/workflows/) with [CI](./.github/workflows/ci.yml) and [CD](./.github/workflows/cd.yml) respectively.

The process steps are as follows:

Integration
1. Triggered by - push to ```master```
1. Spin up an ubuntu server on GitHub
2. Login to DockerHub
3. Build the new image from the latest commit
4. Push the new image to DockerHub

Deployment
1. Initiate the GitHub runner on the remote EC2 instance
2. Prune all unused Docker containers and images
3. Pull latest version of image from DockerHub
4. Delete old version of container
5. Spin up fresh container from the updated imag

<br/>


## 🪂 Deployment
🛑 All development work on this project should be done on separate branches named with the ticket number and then merged into the ```release``` branch upon completion!

<br />

Deployment pipeline is as follows:

1. Merge ```release``` into ```dev```

2. Merge ```dev``` into ```preview```

2. Send a pull request and add at least one reviewer for merging ```preview``` into ```master``` which will auto-deploy changes to production