## API REST Gym App

### Requerimientos:
- Node.js v20.x.x
- MySQL
- TypeORM
- NestJS
- Swagger
- Docker

## Available Scripts

A continuación, se detallan los scripts disponibles en el proyecto:

### Instalación de dependencias
```bash
pnpm install
```

### Compilación y ejecución
```bash
# Modo desarrollo
pnpm run start

# Modo watch (desarrollo continuo)
pnpm run start:dev

# Modo producción
pnpm run start:prod
```

### Pruebas
```bash
# Pruebas unitarias
pnpm run test

# Pruebas de integración (e2e)
pnpm run test:e2e

# Cobertura de pruebas
pnpm run test:cov
```

### Migraciones
```bash
#Levantar la base de datos
pnpm run start:db

# Crear una nueva migración
pnpm run migration:generate --name NombreDeLaMigracion

# Ejecutar migraciones
pnpm run migration:run

# Revertir la última migración
pnpm run migration:revert
```

### Scripts personalizados
```bash
# Crear una nueva entidad
pnpm run create-entity
```

#### Ejemplo de uso del script `create-entity`

El script `create-entity` sigue las siguientes convenciones:
- El nombre del módulo debe estar en **minúsculas**.
- El nombre de la entidad debe estar en **singular** y comenzar con una **letra mayúscula**.

Ejemplo:
```bash
pnpm run create-entity user Car
```
En este caso, se creará una entidad llamada `Car` dentro del módulo `user`.

## Estructura del Proyecto

Para más detalles sobre la estructura del proyecto, consulta el archivo [STRUCTURE.md](./STRUCTURE.md).

## Convenciones de Nombres

Este proyecto sigue convenciones estrictas de nombres para mantener la consistencia. Consulta el archivo [NAMING-CONVENTIONS.md](./NAMING-CONVENTIONS.md) para más información.
