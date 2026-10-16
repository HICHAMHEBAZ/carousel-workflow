#!/usr/bin/env sh
# Install the skill into ~/.claude/skills (or $1 for a project: ./install.sh .claude/skills)
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
dest="${1:-$HOME/.claude/skills}"
mkdir -p "$dest"
if [ -e "$dest/carousel-workflow" ]; then
  echo "already installed at $dest/carousel-workflow (remove it first to reinstall)" >&2
  exit 1
fi
cp -r "$here/skills/carousel-workflow" "$dest/"
echo "installed to $dest/carousel-workflow - restart Claude Code"
