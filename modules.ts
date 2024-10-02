import * as fs from "fs";

const filePath = './tsconfig.json';

// Definindo os módulos a serem adicionados
const modules = {
  "@main": "./src"
};

// Definindo os includes a serem adicionados
const includes = [
  "src/**/*.ts",
  "src/**/*.d.ts"
];

if (fs.existsSync(filePath)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Verifica se `compilerOptions`, `baseUrl` e `paths` existem, se não, cria-os.
  if (!data.compilerOptions) {
    data.compilerOptions = {};
  }
  if (!data.compilerOptions.paths) {
    data.compilerOptions.paths = {};
  }
  if (!data.compilerOptions.baseUrl) {
    data.compilerOptions.baseUrl = './';
  }

  // Adiciona os módulos dinamicamente
  for (const [alias, path] of Object.entries(modules)) {
    data.compilerOptions.paths[alias] = [path];
  }

  // Verifica se `include` existe, se não, cria-o.
  if (!data.include) {
    data.include = [];
  }

  // Adiciona os includes dinamicamente, evitando duplicatas
  for (const includePath of includes) {
    if (!data.include.includes(includePath)) {
      data.include.push(includePath);
    }
  }

  // Escreve de volta no arquivo `tsconfig.json`
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
