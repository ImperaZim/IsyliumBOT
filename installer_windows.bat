@echo off
:: IsyliumBOT Installer - Windows Version
:: With confirmation prompts for all deletions

echo [imperazim]: Iniciando instalacao do IsyliumBOT...
echo.

:clone_main
echo [imperazim]: Baixando IsyliumBOT...
git clone https://github.com/ImperaZim/IsyliumBOT.git --quiet

:move_files
xcopy /E /Y /Q IsyliumBOT\*.* .\

:clean_previous
echo.
set /p confirm_clean="[imperazim]: Deseja remover instalacoes anteriores? [S/N]: "
if /i "%confirm_clean%" == "S" (
    echo [imperazim]: Limpando instalacoes anteriores...
    rmdir /s /q @imperazim
) else (
    echo [imperazim]: Pulando limpeza de versoes anteriores...
)

:install_submodules
echo.
echo [imperazim]: Instalando sub-modulos...
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git --quiet
mkdir @imperazim
xcopy /E /Y /Q EasyNTSUtils\@imperazim\*.* @imperazim\
copy /Y EasyNTSUtils\tsconfig.json tsconfig.json

:cleanup_temp
echo.
set /p confirm_temp="[imperazim]: Remover arquivos temporarios de instalacao? [S/N]: "
if /i "%confirm_temp%" == "S" (
    echo [imperazim]: Removendo arquivos temporarios...
    rmdir /s /q EasyNTSUtils
    rmdir /s /q IsyliumBOT
) else (
    echo [imperazim]: Mantendo arquivos temporarios...
)

:install_packages
echo.
echo [imperazim]: Instalando dependencias...
npm i colorette fs --silent
npm install --silent
npm run installModules

:instructions
echo.
echo [imperazim]: INSTALACAO CONCLUIDA COM SUCESSO!
echo.
echo PRÓXIMOS PASSOS:
echo 1. Configure seu arquivo .env com suas credenciais
echo 2. Para iniciar o bot, execute:
echo    npm run start
echo 3. Para desenvolvimento, use:
echo    npm run dev
echo.
echo [imperazim]: Obrigado por usar IsyliumBOT!

:self_delete
echo.
set /p confirm_delete="[imperazim]: Deseja remover o instalador automaticamente? [S/N]: "
if /i "%confirm_delete%" == "S" (
    echo [imperazim]: Removendo instalador...
    del "%~f0" >nul 2>&1
    if exist "%~f0" (
        echo [AVISO]: Nao foi possivel remover o instalador automaticamente.
        echo            Por favor, remova manualmente o arquivo install.bat
    )
) else (
    echo [imperazim]: O instalador foi mantido no sistema.
)
