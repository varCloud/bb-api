const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node create-entity.js <module-name> <entity-name>');
  process.exit(1);
}

const [moduleName, entityName] = args;
const modulePath = path.join(__dirname, '../src/modules', moduleName.toLowerCase());
const entityPath = path.join(modulePath, 'entities');
const repositoryPath = path.join(modulePath, 'infrastructure', 'database');
const interfacePath = path.join(modulePath, 'repositories');
const moduleInfrastructurePath = path.join(modulePath, 'infrastructure', 'database', 'entities');

if (!fs.existsSync(modulePath)) {
  console.error(`Module ${moduleName} does not exist.`);
  process.exit(1);
}

if (!fs.existsSync(entityPath)) {
  fs.mkdirSync(entityPath, { recursive: true });
}

if (!fs.existsSync(repositoryPath)) {
  fs.mkdirSync(repositoryPath, { recursive: true });
}

if (!fs.existsSync(interfacePath)) {
  fs.mkdirSync(interfacePath, { recursive: true });
}

if (!fs.existsSync(moduleInfrastructurePath)) {
  fs.mkdirSync(moduleInfrastructurePath, { recursive: true });
}

const entityFileName = `${entityName.toLowerCase()}.entity.ts`;
const repositoryFileName = `${entityName.toLowerCase()}.repository.mysql.ts`;
const interfaceFileName = `${entityName.toLowerCase()}.repository.ts`;

const entityTemplate = `import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('${entityName.toLowerCase()}s')
export class ${entityName}Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
`;

const interfaceTemplate = `export interface ${entityName}Repository {
  // Define repository methods here
  findAll(): Promise<${entityName}[]>;
}
`;

const updatedRepositoryTemplate = `import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ${entityName} } from './entities/${entityName.toLowerCase()}.entity';
import { ${entityName}Repository } from '../../repositories/${entityName.toLowerCase()}.repository';

export class ${entityName}RepositoryMysql implements ${entityName}Repository {
  constructor(
    @InjectRepository(${entityName}Entity)
    private readonly userRepository: Repository<${entityName}Entity>,
  ) {}

  // Implement repository methods here
  async findAll(): Promise<${entityName}[]> {
    return this.userRepository.find();
  }
}
`;

fs.writeFileSync(path.join(moduleInfrastructurePath, entityFileName), entityTemplate);
fs.writeFileSync(path.join(interfacePath, interfaceFileName), interfaceTemplate);
fs.writeFileSync(path.join(repositoryPath, repositoryFileName), updatedRepositoryTemplate);

console.log(`Database entity  :  ${path.join(moduleInfrastructurePath, entityFileName)} created successfully.`);
console.log(`Repository      : ${path.join(repositoryPath, repositoryFileName)} created successfully.`);
console.log(`Interface       : ${path.join(interfacePath, interfaceFileName)} created successfully.`);
console.log(`Please update the repository methods in ${repositoryFileName} and ${interfaceFileName} as needed.`);
console.log(`Please update the entity properties in ${entityFileName} as needed.`);
