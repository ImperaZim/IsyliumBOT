rm -rf ./*

echo -e "\e[1;33m[imperazim]:\e[0m \e[1;37mInstalando IsyliumBOT...";
git clone https://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@github.com/ImperaZim/IsyliumBOT.git --quiet

mv ./IsyliumBOT/* ./
rm -rf ./IsyliumBOT/

curl -sSL https://raw.githubusercontent.com/ImperaZim/EasyNTSUtils/install/installer.sh | bash

npm install --silent

npm run installModules
npm run start