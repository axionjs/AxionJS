# AxionJS CLI

A command-line tool to add components and utilities to your project.

## Installation

```sh
npm install axionjs-ui
```

## Usage

```sh
axionjs-ui <command> [options]
```

### Common Commands

- `axionjs-ui add <component>` – Add a component to your project
- `axionjs-ui init` – Initialize AxionJS in your project

### Options

- `-y, --yes` : Skip confirmation prompt. (default: false)
- `-d, --defaults` : Use default configuration. (default: false)
- `-f, --force` : Force overwrite of existing configuration. (default: false)
- `-c, --cwd <cwd>` : The working directory. Defaults to the current directory.
- `-s, --silent` : Mute output. (default: false)
- `--src-dir` : Use the `src` directory when creating a new project. (default: false)
- `--no-src-dir` : Do not use the `src` directory when creating a new project.
- `--css-variables` : Use CSS variables for theming. (default: true)
- `--no-css-variables` : Do not use CSS variables for theming.
- `-h, --help` : Display help for command.

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

[MIT](./LICENSE)
