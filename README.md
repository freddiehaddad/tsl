# TMUX Session Launcher

TSL is a BASH script that launches a tmux session named after the directory
selected from a list. Many projects are organized into directories and jumping
between them is sometimes necessary, for example, when multiple repositories are
used instead of a single mono repo.

## Requirements

- bash
- fd
- fzf
- tmux

## Installation

Copy the `ts` file to a directory in your `PATH`.

## Configuration

`ts` will look for directories (including symbolic links) inside
`$HOME/projects/git` by default. To scan a different location, update the
`SOURCE_DIRECTORY` variable in the `ts` script:

```bash
SOURCE_DIRECTORY="$HOME/projects/git"
```

## Usage

From a command prompt, type `ts`, select a directory, and press enter. A tmux
process will be created if one doesn't exist. Otherwise, the session will be
attached to the existing instance. If a session already exists, it will be made
active instead of creating a new one.

If `ts` is run from within tmux, a nested session will NOT be created.
