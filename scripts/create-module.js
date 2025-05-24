const fs = require('fs');
const path = require('path');

const getTemplateController = (moduleName) => {
  return `import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}')
@Controller('${moduleName}s')
export class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller {
  @Get()
  @ApiOperation({ summary: 'Get all ${moduleName} items' })
  @ApiResponse({ status: 200, description: 'Returns all ${moduleName} items.' })
  findAll() {
    return { message: 'This action returns all ${moduleName} items' };
  }
}
`;
}

const getTemplateModule = (moduleName) => {
  const clazzName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
  const clazzNameController = `${clazzName}Controller`

  return `import { Module } from '@nestjs/common';
import { ${clazzNameController} } from 'src/api/v1/${moduleName}/controllers/${moduleName}.controller';

@Module({
  imports: [],
  controllers: [${clazzNameController}],
  providers: [],
})
export class ${clazzName}Module {}
`
}

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
}

function createModule(moduleName) {
  const basePath = path.join(__dirname, '../src');

  // Paths for the module
  const apiPath = path.join(basePath, 'api/v1', moduleName);
  const modulePath = path.join(basePath, 'modules', moduleName);

  // Create API folders and controller
  const controllersPath = path.join(apiPath, 'controllers');
  const moduleFilePath = path.join(modulePath, `${moduleName}.module.ts`)

  createDirectoryIfNotExists(controllersPath);

  const controllerFilePath = path.join(controllersPath, `${moduleName}.controller.ts`);
  const controllerContent = getTemplateController(moduleName);
  const moduleContent = getTemplateModule(moduleName)

  createFileIfNotExists(controllerFilePath, controllerContent);

  const infrastructurePath = path.join(modulePath, 'infrastructure/database/entities');
  const mappersPath = path.join(modulePath, 'mappers');
  const repositoriesPath = path.join(modulePath, 'repositories');
  const useCasesPath = path.join(modulePath, 'use-cases');
  const dtoPath = path.join(modulePath, 'dto');
  const entitiesPath = path.join(modulePath, 'entities');
  const apiDTOPath = path.join(apiPath, 'dtos');

  createDirectoryIfNotExists(infrastructurePath);
  createDirectoryIfNotExists(mappersPath);
  createDirectoryIfNotExists(repositoriesPath);
  createDirectoryIfNotExists(useCasesPath);
  createDirectoryIfNotExists(dtoPath);
  createDirectoryIfNotExists(entitiesPath);
  createFileIfNotExists(moduleFilePath, moduleContent);
  createDirectoryIfNotExists(apiDTOPath);

  console.log(`Module '${moduleName}' created successfully.`);
}

// Get module name from command line arguments
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

createModule(moduleName);
