# TMUX Session Launcher

TSL is a BASH script that launches a tmux session named after the directory
selected from a list.

## Requirements

- bash
- fd
- fzf
- tmux

## Installation

Copy the `ts` file to a directory in your `PATH`.

## Usage

From a command prompt, type `ts`, select a directory, and press enter. A tmux
process will be created if one doesn't exist. Otherwise, the session will be
attached to the existing instance. If a session already exists, it will be made
active instead of creating a new one.

If `ts` is run from within tmux, a nested session will NOT be created.

`ts` will look for directories (including symbolic links) inside
`$HOME/projects/git` by default. To scan a different location, update the
script:

```bash
# Selected project directory
project_directory=$(
	fd . "$HOME/projects/git" \
		--min-depth 1 \
		--max-depth 1 \
		--type directory \
		--type symlink |
		fzf --height 20
)
```
