#!/bin/zsh

# Script to add //@ts-nocheck to the top of all TypeScript files
# Run this from the project root directory

for file in $(find app -name "*.tsx"); do
  # Check if the file already has ts-nocheck
  if ! grep -q "\/\/@ts-nocheck" "$file"; then
    echo "Adding @ts-nocheck to $file"
    sed -i '' '1s/^/\/\/@ts-nocheck\n/' "$file"
  fi
done

echo "Completed adding @ts-nocheck to all TSX files in the app directory"
