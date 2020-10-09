Hello! Thank you for choosing to help contribute to one of the Twilio SendGrid open source libraries. There are many ways you can contribute and help is always welcome.  We simply ask that you follow the following contribution policies.

**All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.**
- [Feature Request](#feature-request)
- [Submit a Bug Report](#submit-a-bug-report)
  - [Please use our Bug Report Template](#please-use-our-bug-report-template)
- [Improvements to the Codebase](#improvements-to-the-codebase)
  - [Development Environment](#development-environment)
    - [Install and Run Locally](#install-and-run-locally)
      - [Prerequisites](#prerequisites)
      - [Initial setup:](#initial-setup)
- [Environment Variables](#environment-variables)
      - [Execute:](#execute)
- [Understanding the Code Base](#understanding-the-code-base)
- [Codebase Overview](#codebase-overview)
    - [Package List](#package-list)
- [Testing](#testing)
- [Style Guidelines & Naming Conventions](#style-guidelines--naming-conventions)
- [Creating a Pull Request<a name="creating-a-pull-request"></a>](#creating-a-pull-requesta-name%22creating-a-pull-request%22a)
- [Code Reviews](#code-reviews)

There are a few ways to contribute, which we'll enumerate below:

<a name="feature-request"></a>
## Feature Request

If you'd like to make a feature request, please read this section.

The GitHub [issue tracker](https://github.com/sendgrid/sendgrid-nodejs/issues) is the preferred channel for library feature requests, but please respect the following restrictions:

- Please [**search for existing issues**](https://github.com/search?utf8=%E2%9C%93&q=repo%3Asendgrid%2Fsendgrid-nodejs&type=Issues) to ensure we don't have duplicate bugs/feature requests.
- Please be respectful and considerate of others when commenting on issues

<a name="submit-a-bug-report"></a>
## Submit a Bug Report

Note: DO NOT include your credentials in ANY code examples, descriptions, or media you make public.

A software bug is a demonstrable issue in the code base. For us to diagnose the issue and respond as quickly as possible, please add as much detail as possible into your bug report.

Before you decide to create a new issue, please try the following:

1. [Check the GitHub issues tab](https://github.com/sendgrid/sendgrid-nodejs/issues) if the identified issue has already been reported, if so, please add a +1 to the existing post.
2. Update to the latest version of this code and check if the issue has already been fixed
3. Copy and fill in the Bug Report Template we have provided below

### Please use our Bug Report Template

In order to make the process easier, we've included a [sample bug report template](ISSUE_TEMPLATE.md).

<a name="improvements-to-the-codebase"></a>
## Improvements to the Codebase

We welcome direct contributions to the sendgrid-nodejs code base. Thank you!

### Development Environment ###

#### Install and Run Locally ####

##### Prerequisites #####

- Node.js version 6, 8 or >=10
- Please see [package.json](package.json)

##### Initial setup: #####

```bash
git clone https://github.com/sendgrid/sendgrid-nodejs.git
cd sendgrid-nodejs
npm install
```

## Environment Variables

First, get your free Twilio SendGrid account [here](https://sendgrid.com/free?source=sendgrid-nodejs).

You will need to setup the following environment to use the Twilio SendGrid examples in the [README](README.md), [USAGE](USAGE.md) and [USE_CASES](use-cases/README.md) files:

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

##### Execute: #####

To run an example:

```bash
touch example.js
```

Copy the desired code into `example.js`. For this example, I'm assuming you create this file in the root of this project.

Change the path to the Twilio SendGrid library to the relative path, for example: `./packages/mail/mail`.

```bash
node example.js
```

<a name="understanding-the-codebase"></a>
## Understanding the Code Base

This repo is organized as a monorepo with the packages residing in the `./packages` directory. Please see the root [README.md](README.md) for details.

<a name="codebase-overview"></a>
## Codebase Overview

This repo is subdivided into 6 main [packages](packages). Each package has its dependencies (internal or external) and its source code in the `src` folder. Each package also has its isolated README files, use cases, and usage.md files.

To install a particular packages' dependencies.
```bash
cd packages/{NAME}
npm install or yarn install
```
#### Package List

**1. Client**
This is a  wrapper written on top of the ```request``` module to suite the Twilio SendGrid module. All requests made to the Twilio SendGrid API are invoked by the `request` function in the `client.js`.

Type declarations: client.d.ts
Test Cases: client.spec.js

**2. Mail**
This module exposes the `send` function which sends mail via the sdk. This module can be a good starting point to read the source code.

Type declarations: mail.d.ts
Test Cases: mail.spec.js

**3. Helpers**
These are a set of utility functions which all the modules use. Some of them are very basic functions and can be an easy starting point for reading the source code.

<a name="testing"></a>
## Testing

All PRs require passing tests before the PR will be reviewed.

The integration tests require a Twilio SendGrid mock API in order to execute. We've simplified setting this up using Docker to run the tests. You will just need [Docker Desktop](https://docs.docker.com/get-docker/) and `make`.

Once these are available, simply execute the Docker test target to run all tests: `make test-docker`. This command can also be used to open an interactive shell into the container where this library is installed. To start a *bash* shell for example, use this command: `command=bash make test-docker`.

<a name="style-guidelines-and-naming-conventions"></a>
## Style Guidelines & Naming Conventions

Generally, we follow the style guidelines as suggested by the official language. However, we ask that you conform to the styles that already exist in the library. If you wish to deviate, please explain your reasoning.

- [Unofficial Style Guide](https://github.com/felixge/node-style-guide)

Please run your code through:

- [ESLint](http://eslint.org/) with the standard style guide.
  ```bash
  yarn lint
  ```
- [ESDoc](https://esdoc.org/) to check the documentation coverage of your added code.
  ```bash
  yarn doc
  ```

## Creating a Pull Request<a name="creating-a-pull-request"></a>

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/sendgrid/sendgrid-nodejs

   # Navigate to the newly cloned directory
   cd sendgrid-nodejs

   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/sendgrid/sendgrid-nodejs
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely to be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

   4a. Create tests.

   4b. Create or update the example code that demonstrates the functionality of this change to the code.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream development
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `development` branch. All tests must be passing before we will review the PR.

<a name="code-reviews"></a>
## Code Reviews

If you can, please look at open PRs and review them. Give feedback and help us merge these PRs much faster! If you don't know how GitHub has some [great information on how to review a Pull Request](https://help.github.com/articles/about-pull-request-reviews/).
