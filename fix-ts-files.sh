#!/bin/zsh

# Script to fix empty TypeScript files and add //@ts-nocheck to all TypeScript files
# Run this from the project root directory

# Function to fix empty TypeScript files
fix_empty_file() {
  local file=$1
  local basename=$(basename "$file" .tsx)
  
  # Create a component name from the filename (camelCase for jsx files, PascalCase for tsx files)
  local ext="${file##*.}"
  if [ "$ext" = "tsx" ]; then
    # Convert to PascalCase for React components
    local component_name=$(echo "$basename" | perl -pe 's/(^|_)([a-z])/\U$2/g')
  else
    # Keep camelCase for other files
    local component_name=$(echo "$basename" | perl -pe 's/_([a-z])/\U$1/g')
  fi
  
  # Check if file is empty
  if [ ! -s "$file" ]; then
    echo "Fixing empty file: $file"
    
    if [ "$ext" = "tsx" ]; then
      # For TSX files, add a React component template
      cat > "$file" << EOF
//@ts-nocheck
import React from 'react';

// This is a placeholder component. Add your actual implementation here.
const $component_name: React.FC = () => {
  return (
    <div className="${basename}">
      {/* Add your implementation here */}
    </div>
  );
};

export default $component_name;
EOF
    else
      # For TS files, add a simple export
      cat > "$file" << EOF
//@ts-nocheck
// This is a placeholder file. Add your actual implementation here.

export {};
EOF
    fi
  else
    # Check if the file has any import or export statements
    if ! grep -q -E '(import|export)' "$file"; then
      echo "Adding export to non-empty file without imports/exports: $file"
      echo -e "\nexport {};" >> "$file"
    fi
    
    # Check if file already has ts-nocheck
    if ! grep -q "\/\/@ts-nocheck" "$file"; then
      echo "Adding @ts-nocheck to: $file"
      sed -i '' '1s/^/\/\/@ts-nocheck\n/' "$file"
    fi
  fi
}

# Process all TypeScript files
find app components mui services -name "*.ts" -o -name "*.tsx" | while read file; do
  fix_empty_file "$file"
done

echo "Completed fixing TypeScript files"
