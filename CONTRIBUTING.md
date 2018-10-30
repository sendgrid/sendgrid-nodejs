Hello! Thank you for choosing to help contribute to one of the SendGrid open source libraries. There are many ways you can contribute and help is always welcome.  We simply ask that you follow the following contribution policies.

- [CLAs and CCLAs](#cla)
- [Roadmap & Milestones](#roadmap)
- [Feature Request](#feature-request)
- [Submit a Bug Report](#submit-a-bug-report)
- [Improvements to the Codebase](#improvements-to-the-codebase)
- [Understanding the Code Base](#understanding-the-codebase)
- [Codebase Overview](#codebase-overview)
- [Testing](#testing)
- [Style Guidelines & Naming Conventions](#style-guidelines-and-naming-conventions)
- [Creating a Pull Request](#creating-a-pull-request)
- [Code Reviews](#code-reviews)

<a name="roadmap"></a>
We use [Milestones](https://github.com/sendgrid/sendgrid-nodejs/milestones) to help define current roadmaps, please feel free to grab an issue from the current milestone. Please indicate that you have begun work on it to avoid collisions. Once a PR is made, community review, comments, suggestions, and additional PRs are welcomed and encouraged.

<a name="cla"></a>
## CLAs and CCLAs

Before you get started, SendGrid requires that a SendGrid Contributor License Agreement (CLA) be filled out by every contributor to a SendGrid open source project.

Our goal with the CLA is to clarify the rights of our contributors and reduce other risks arising from inappropriate contributions.  The CLA also clarifies the rights SendGrid holds in each contribution and helps to avoid misunderstandings over what rights each contributor is required to grant to SendGrid when contributing.  In this way, the CLA encourages broad participation by our open source community and helps us build strong open source projects, free from any individual contributor withholding or revoking rights to any contribution.

SendGrid does not merge a pull request made against a SendGrid open source project until that pull request is associated with a signed CLA. Copies of the CLA are available [here](https://gist.github.com/SendGridDX/98b42c0a5d500058357b80278fde3be8#file-sendgrid_cla).

When you create a Pull Request, after a few seconds, a comment will appear with a link to the CLA. Click the link and fill out the brief form and then click the "I agree" button and you are all set. You will not be asked to re-sign the CLA unless we make a change.

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

1. [Check the Github issues tab](https://github.com/sendgrid/sendgrid-nodejs/issues) if the identified issue has already been reported, if so, please add a +1 to the existing post.
2. Update to the latest version of this code and check if the issue has already been fixed
3. Copy and fill in the Bug Report Template we have provided below

### Please use our Bug Report Template

To make the process easier, we've included a [sample bug report template](https://github.com/sendgrid/sendgrid-nodejs/blob/master/.github/ISSUE_TEMPLATE) (borrowed from [Ghost](https://github.com/TryGhost/Ghost/)). The template uses [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/) for formatting.

<a name="improvements-to-the-codebase"></a>
## Improvements to the Codebase

We welcome direct contributions to the sendgrid-nodejs code base. Thank you!

### Development Environment ###

#### Install and Run Locally ####

##### Prerequisites #####

- Node.js version 6, 7 or 8
- Please see [package.json](https://github.com/sendgrid/sendgrid-nodejs/tree/master/package.json)

##### Initial setup: #####

```bash
git clone https://github.com/sendgrid/sendgrid-nodejs.git
cd sendgrid-nodejs
npm install
```

## Environment Variables

First, get your free SendGrid account [here](https://sendgrid.com/free?source=sendgrid-nodejs).

You will need to setup the following environment to use the SendGrid examples in the [README](README.md), [USAGE](USAGE.md) and [USE_CASES](use-cases/README.md) files:

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

Change the path to the SendGrid library to the relative path, for example: `./packages/mail/mail`.

```bash
node example.js
```

<a name="understanding-the-codebase"></a>
## Understanding the Code Base

This repo is organized as a monorepo with the packages residing in the `./packages` directory. Please see the root [README.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/README.md) for details.

<a name="codebase-overview"></a>
## Codebase Overview

This repo is subdivided into 6 main [packages](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages). Each package has its dependencies (internal or external) and its source code in the `src` folder. Each package also has its isolated ReadME files, use cases, and usage.md files.

To install a particular packages' dependencies.
```bash
cd packages/{NAME}
npm install or yarn install
```
#### Package List

**1. Client**
This is a  wrapper written on top of the ```request``` module to suite the sendgrid module. All requests made to the sendgrid API are invoked by the `request` function in the `client.js`.

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

To run tests, please install Prism first by either running `yarn prism:install` or manually downloading from [the Prism website](https://stoplight.io/platform/prism/).

Next, start Prism in one console window using `yarn prism`.

Open a new console window and run `lerna bootstrap`.

And finally, run `yarn test`, or specific tests e.g. `yarn test:mail` or `yarn test:client`.

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
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch. All tests must be passing before we will review the PR.

If you have any additional questions, please feel free to [email](mailto:dx@sendgrid.com) us or create an issue in this repo.

<a name="code-reviews"></a>
## Code Reviews

If you can, please look at open PRs and review them. Give feedback and help us merge these PRs much faster! If you don't know how Github has some [great information on how to review a Pull Request](https://help.github.com/articles/about-pull-request-reviews/).
