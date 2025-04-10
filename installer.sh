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
    local temp_dir="$HOME/isylium_temp"
    local temp_file="$temp_dir/installer_$1"

    # Cria diretório temporário seguro
    mkdir -p "$temp_dir"
    
    echo -e "${YELLOW}Baixando instalador $1...${NC}"
    
    # Novo sistema de download com verificação
    if curl -sSL "$installer_url" -o "$temp_file" && [ -s "$temp_file" ]; then
        chmod +x "$temp_file"
        echo -e "${GREEN}Iniciando instalação $1...${NC}"
        
        # Execução específica para Termux
        if [ "$1" = "termux.sh" ]; then
            bash "$temp_file"
        else
            exec "$temp_file"
        fi
        
        # Limpeza pós-instalação
        rm -rf "$temp_dir"
    else
        echo -e "${RED}Falha no download! Verifique:${NC}"
        echo -e "1. URL do instalador: $installer_url"
        echo -e "2. Conexão com internet"
        echo -e "3. Permissões de armazenamento"
        rm -rf "$temp_dir"
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
