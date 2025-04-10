#!/bin/bash
# IsyliumBOT Installer - Termux Version
# With confirmation prompts for all deletions

echo -e "\e[1;33m[imperazim]:\e[0m Iniciando instalação no Termux..."
echo
echo -e "\e[1;33m[imperazim]:\e[0m Verificando dependências..."
pkg install git nodejs -y

# Clone main repository
echo -e "\e[1;33m[imperazim]:\e[0m Baixando IsyliumBOT..."
git clone https://github.com/ImperaZim/IsyliumBOT.git --quiet

# Move files
cp -r IsyliumBOT/* ./

# Clean previous versions
echo
read -p "[imperazim] Deseja remover instalações anteriores? [S/n]: " confirm_clean
if [[ $confirm_clean =~ ^[Ss]$ ]] || [[ -z $confirm_clean ]]; then
    echo -e "\e[1;33m[imperazim]:\e[0m Limpando instalações anteriores..."
    rm -rf @imperazim
else
    echo -e "\e[1;33m[imperazim]:\e[0m Pulando limpeza de versões anteriores..."
fi

# Install submodules
echo
echo -e "\e[1;33m[imperazim]:\e[0m Instalando sub-módulos..."
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --quiet
mkdir -p @imperazim
cp -r EasyNTSUtils/@imperazim/* @imperazim/
cp EasyNTSUtils/tsconfig.json ./

# Cleanup temp files
echo
read -p "[imperazim] Remover arquivos temporários de instalação? [S/n]: " confirm_temp
if [[ $confirm_temp =~ ^[Ss]$ ]] || [[ -z $confirm_temp ]]; then
    echo -e "\e[1;33m[imperazim]:\e[0m Removendo arquivos temporários..."
    rm -rf EasyNTSUtils
    rm -rf IsyliumBOT
else
    echo -e "\e[1;33m[imperazim]:\e[0m Mantendo arquivos temporários..."
fi

# Install packages
echo
echo -e "\e[1;33m[imperazim]:\e[0m Instalando dependências..."
npm install colorette fs --silent
npm install --silent
npm run installModules

# Instructions
echo
echo -e "\e[1;32m[imperazim]: INSTALAÇÃO CONCLUÍDA COM SUCESSO!\e[0m"
echo
echo "PRÓXIMOS PASSOS:"
echo "1. Configure seu arquivo .env com suas credenciais"
echo "2. Para iniciar o bot, execute:"
echo "   npm run start"
echo "3. Para desenvolvimento, use:"
echo "   npm run dev"
echo
echo -e "\e[1;33m[imperazim]:\e[0m Obrigado por usar IsyliumBOT!"

# Self-delete
echo
read -p "[imperazim] Deseja remover o instalador automaticamente? [S/n]: " confirm_delete
if [[ $confirm_delete =~ ^[Ss]$ ]] || [[ -z $confirm_delete ]]; then
    echo -e "\e[1;33m[imperazim]:\e[0m Removendo instalador..."
    rm -- "$0"
else
    echo -e "\e[1;33m[imperazim]:\e[0m O instalador foi mantido no sistema."
fi
