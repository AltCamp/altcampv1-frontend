# Contributing to AltCamp

## Introduction

We welcome and appreciate any contributions to this React project. Whether it's fixing a bug, improving performance, or adding new features, your help is valuable.

### Development Setup

1. Fork the repository and clone it to your local machine.

```
$ git clone https://github.com/YOUR_GITHUB_USERNAME/altcampv1-frontend.git
```

2. Navigate to the project directory.

```
$ cd altcampv1-frontend
```

3. Install the project dependencies.

```
$ npm install
```

4. Copy the contents of `example.env` to a new file called `.env` and fill in the required environment variables.

```
cp example.env .env
```

5. Start the development server.

```
$ npm run dev
```

## Code of Conduct

We expect all contributors to abide by our code of conduct. Please take a moment to read it before making any contributions.

## How to Contribute

Here are some ways you can contribute to the project:

### Report Bugs

If you find a bug while using the project, please report it by [opening an issue](https://github.com/StudyBuddyv1/studybuddyv1-frontend/issues/new) on GitHub. Make sure to include a clear description of the problem, steps to reproduce it, and the expected behavior.

### Suggest Enhancements

If you have an idea for a new feature or improvement, please [open an issue](https://github.com/StudyBuddyv1/studybuddyv1-frontend/issues/new) on GitHub. Make sure to include a clear description of the problem, steps to reproduce it, and the expected behavior.

## Commit Message Guidelines

We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications to format our commit messages. Please read through the guide and follow the guidelines. If you're new to this format, that's okay. Here's a quick guide to get you started:

> _Commit CheatSheet_

| Type     |                          | Description                                                                                                 |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| feat     | Features                 | A new feature                                                                                               |
| fix      | Bug Fixes                | A bug fix                                                                                                   |
| docs     | Documentation            | Documentation only changes                                                                                  |
| style    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | Performance Improvements | A code change that improves performance                                                                     |
| test     | Tests                    | Adding missing tests or correcting existing tests                                                           |
| build    | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Chores                   | Other changes that don't modify src or test files                                                           |
| revert   | Reverts                  | Reverts a previous commit                                                                                   |

### Other Guidelines

- Please format your **commit messages** appropriately:
  - Use the body to explain what and why vs. how.
  - Be as descriptive as possible in the 72 characters allowed. This helps us _a lot_ when writing release notes and tracking down regressions. Here are some examples:
    - Instead of `Fixing bugs`, consider `fix #1372: negative top/skip values would break odata output`.
    - Instead of `Updating readme`, consider `improve: making build instructions clearer in README`.
    - Instead of `Adding some tests`, consider `test #889: missing test cases for permissions given anonymous user`.
- Please **do not** use the `--amend` flag when committing. This will cause your commit to be overwritten and will cause problems with the commit history.

### Submit a Pull Request

If you're comfortable with Git and would like to contribute code, you can submit a pull request (PR) for review. To do this:

1. [Fork the repository](https://github.com/StudyBuddyv1/studybuddyv1-frontend/fork)
2. Create a new branch for your changes (e.g. `git checkout -b my-new-feature`)
3. Make your changes and test them thoroughly
4. Commit your changes with a clear and descriptive commit message (e.g. `git commit -am 'Add new feature to improve XYZ'`)
5. Push your changes to your fork (e.g. `git push origin my-new-feature`)
6. [Create a new pull request](https://github.com/StudyBuddyv1/studybuddyv1-frontend/compare)

### Styling

Please use vanilla CSS for styling and make sure to follow the [CSS guidelines](https://github.com/StudyBuddyv1/studybuddyv1-frontend/blob/main/CSS-GUIDELINES.md)

### Components

We use a component-based architecture, so please make sure that any new features or improvements are implemented as a new component.

## Review Process

Once your pull request is submitted, it will be reviewed by one or more of the maintainers. We'll do our best to provide feedback and merge your changes as soon as possible.

Thank you for your contributions!

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](https://github.com/StudyBuddyv1/studybuddyv1-frontend/blob/main/LICENSE) file.
