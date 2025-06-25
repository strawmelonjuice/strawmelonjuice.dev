#!/bin/bash
#check if the cynthiaweb-mini command is already installed
  # check if Bun is installed
    if ! command -v bun &> /dev/null; then
        curl -fsSL https://bun.sh/install | bash
        # Add Bun to the PATH
        export PATH="$HOME/.bun/bin:$PATH"
        echo "Bun installed successfully."
    else
        echo "✓ Bun is already installed."
    fi
if ! command -v cynthiaweb-mini &> /dev/null; then
    echo "cynthiaweb-mini not found, installing..."
  
    
    # download the cynthiaweb-mini package specifically built for this site
    curl -L -o cynthiaweb-mini-weekly.tgz https://github.com/strawmelonjuice/Mini-strawmelonjuice.com/releases/download/weekly-build/cynthiaweb-mini-weekly.tgz
    # extract the package to a temporary folder
    mkdir build
    tar -xzf cynthiaweb-mini-weekly.tgz -C build
    # install the cynthiaweb-mini package by compiling it with Bun
    bun build --compile build/dist/cynthia_websites_mini_server.js --outfile ./cynthiaweb-mini
    # make sure the cynthiaweb-mini command is executable
    chmod +x ./cynthiaweb-mini
    # Remove the downloaded package and extracted folder to save space
    rm cynthiaweb-mini-weekly.tgz
    rm -rf build
    echo "cynthiaweb-mini installed successfully."
else
    echo "✓ cynthiaweb-mini is already installed."
fi

./cynthiaweb-mini preview