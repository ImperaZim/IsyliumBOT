#!/bin/bash
# Global Installer for IsyliumBOT
# Detects platform or lets user choose

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${YELLOW}"
echo "  _____           _       _ _               ____  _____ _____ "
echo " |_   _|         | |     (_) |             |  _ \|_   _|  __ \\"
echo "   | |  _ __  ___| |_   _ _| |_ _   _      | |_) | | | | |__) |"
echo "   | | | '_ \\/ __| | | | | | __| | | |     |  _ <  | | |  ___/ "
echo "  _| |_| | | \\__ \\ | |_| | | |_| |_| |     | |_) |_| |_| |     "
echo " |_____|_| |_|___/_|\\__,_|_|\\__|\\__, |     |____/|_____|_|     "
echo "                                  __/ |                         "
echo "                                 |___/                          "
echo -e "${NC}"

# Platform detection
detect_platform() {
    case "$(uname -s)" in
        Linux*)     
            if [ -f /data/data/com.termux/files/usr/bin/termux-info ]; then
                echo "termux"
            else
                echo "linux"
            fi
            ;;
        Darwin*)    echo "macos";;
        CYGWIN*|MINGW32*|MSYS*|MINGW*) echo "windows";;
        *)          echo "unknown"
    esac
}

# Installation options
show_menu() {
    echo -e "${YELLOW}[Platform Detection]: ${GREEN}$(detect_platform)${NC}"
    echo
    echo -e "${BLUE}Select installation type:${NC}"
    echo -e "1) Linux (auto-detected)"
    echo -e "2) Termux (Android)"
    echo -e "3) Windows"
    echo -e "4) Exit"
    echo
    read -p "Enter your choice [1-4]: " choice
}

# Download and execute specific installer
run_installer() {
    local installer_url="https://raw.githubusercontent.com/ImperaZim/IsyliumBOT/installers/installer_$1"
    local temp_file="/tmp/isylium_installer_$1"
    
    echo -e "${YELLOW}Downloading $1 installer...${NC}"
    if curl -sSL "$installer_url" -o "$temp_file"; then
        chmod +x "$temp_file"
        echo -e "${GREEN}Starting $1 installation...${NC}"
        echo
        
        if [ "$1" = "windows" ]; then
            # For Windows, we need to handle differently if running under WSL
            if grep -q Microsoft /proc/version; then
                echo -e "${YELLOW}Warning: Detected WSL environment${NC}"
                read -p "Continue with Windows installer in WSL? [y/N]: " wsl_confirm
                if [[ ! $wsl_confirm =~ ^[Yy]$ ]]; then
                    rm "$temp_file"
                    exit 1
                fi
            fi
            cmd.exe /c start "" "$temp_file"
        else
            exec "$temp_file"
        fi
    else
        echo -e "${RED}Failed to download $1 installer!${NC}"
        exit 1
    fi
}

# Main logic
platform=$(detect_platform)
if [ "$platform" != "unknown" ]; then
    show_menu
else
    echo -e "${RED}Could not detect your platform automatically${NC}"
    show_menu
fi

case $choice in
    1) run_installer "linux.sh";;
    2) run_installer "termux.sh";;
    3) run_installer "windows.bat";;
    4) echo -e "${GREEN}Installation canceled.${NC}"; exit 0;;
    *) echo -e "${RED}Invalid option!${NC}"; exit 1;;
esac
