#!/bin/bash
# Instalador IsyliumBOT para Termux - Versão Corrigida

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

# Função para tratar erros
handle_error() {
    echo -e "${RED}Erro crítico durante a instalação!${NC}"
    echo -e "${YELLOW}Motivo: $1${NC}"
    exit 1
}

# Configurar repositório Termux primeiro
echo -e "${YELLOW}[imperazim]:${NC} Configurando repositórios..."
termux-change-repo <<< "1\ny\n" || handle_error "Falha ao configurar repositórios"

# Atualizar pacotes
echo -e "${YELLOW}[imperazim]:${NC} Atualizando pacotes..."
pkg update -y && pkg upgrade -y || handle_error "Falha na atualização"

# Instalar dependências
echo -e "${YELLOW}[imperazim]:${NC} Instalando dependências essenciais..."
pkg install -y git nodejs openssl || handle_error "Falha na instalação de dependências"

# Verificar versão do Node.js
NODE_VERSION=$(node --version 2>/dev/null)
if [[ -z "$NODE_VERSION" || "$NODE_VERSION" < "v16.0.0" ]]; then
    echo -e "${YELLOW}[imperazim]:${NC} Instalando Node.js via nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18.14.2 || handle_error "Falha ao instalar Node.js"
fi

# Clone do repositório principal
echo -e "${YELLOW}[imperazim]:${NC} Baixando IsyliumBOT..."
rm -rf IsyliumBOT # Limpeza prévia
git clone https://github.com/ImperaZim/IsyliumBOT.git --depth 1 || handle_error "Falha no clone"

# Mover arquivos
cp -r IsyliumBOT/* ./

# Limpar instalações anteriores (com confirmação)
read -p "[imperazim] Deseja remover instalações anteriores? [S/n]: " confirm_clean
if [[ "$confirm_clean" =~ ^[Ss]$ || -z "$confirm_clean" ]]; then
    echo -e "${YELLOW}[imperazim]:${NC} Limpando instalações anteriores..."
    rm -rf @imperazim node_modules package-lock.json
fi

# Instalar submódulos
echo -e "${YELLOW}[imperazim]:${NC} Instalando componentes..."
mkdir -p @imperazim
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --depth 1 || handle_error "Falha nos submódulos"
cp -r EasyNTSUtils/@imperazim/* @imperazim/
cp EasyNTSUtils/tsconfig.json ./

# Instalar pacotes
echo -e "${YELLOW}[imperazim]:${NC} Instalando dependências..."
npm install --global yarn || handle_error "Falha no Yarn"
yarn install --silent || handle_error "Falha nas dependências"

# Finalização
echo -e "${GREEN}[imperazim]: Instalação concluída com sucesso!${NC}"
echo -e "${YELLOW}Próximos passos:${NC}"
echo "1. Configure o arquivo .env"
echo "2. Execute: yarn start"
echo "3. Para desenvolvimento: yarn dev"

# Limpeza
rm -rf IsyliumBOT EasyNTSUtils
