#!/bin/bash
#
# The tmux session manager script enables intelligent session creation.  It
# works by presenting a list of directories using fzf to choose from.  Upon
# making a selection, tmux will be opened and the session made active.  If
# a session already exists, a new one will not be created.  If tmux is in a
# detached state, it will be used.
#

SOURCE_DIRECTORY="$HOME/projects/git"

# Selected project directory
project_directory=$(
	fd . "$SOURCE_DIRECTORY" \
		--min-depth 1 \
		--max-depth 1 \
		--type directory \
		--type symlink |
		fzf --height 20
)
if [ -z "$project_directory" ]; then
	exit 1
fi

# Parse session name from project directory
project_name=$(basename "$project_directory" | tr . _)

#
# There's several scenarios we must consider.
#
#   1. no instance of tmux exists
#   2. tmux is in an attached state
#   3. tmux is in a detached state
#
# Scenario 1:
#   Create a new tmux session
#
# Scenario 2 and 3:
#   Check if a matching session already exists.  If not, create
#   it in a detached state, attach and switch to the session.
#

# If a tmux instance doesn't exist, create it.
if ! pgrep tmux >/dev/null 2>&1; then
	tmux new-session -s "$project_name" -c "$project_directory"
	exit 0
fi

# With tmux running, create the new session in a detached state if one
# doesn't exist.
if ! tmux has-session -t "$project_name" >/dev/null 2>&1; then
	tmux new-session -s "$project_name" -c "$project_directory" -d
fi

# A session exists at this point.  Switch to it if tmux is running.
if [ -n "$TMUX" ]; then
	tmux switch-client -t "$project_name"
	exit 0
fi

# tmux is in a detached state, so we need to attach to it.
tmux attach -t "$project_name"
