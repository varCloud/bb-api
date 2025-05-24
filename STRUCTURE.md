# Estructura de Carpetas del Proyecto

Este documento describe la estructura de carpetas del proyecto y el propósito de cada directorio y archivo.

## Raíz del Proyecto
```
.
├── eslint.config.mjs         # Configuración de ESLint para el proyecto
├── nest-cli.json             # Configuración específica de NestJS
├── package.json              # Dependencias y scripts del proyecto
├── pnpm-lock.yaml            # Archivo de bloqueo de dependencias para pnpm
├── README.md                 # Documentación general del proyecto
├── tsconfig.build.json       # Configuración de TypeScript para la construcción
├── tsconfig.json             # Configuración principal de TypeScript
```

## Directorios Principales

### `src/`
Contiene el código fuente principal del proyecto.

#### `src/api/v1/`
Contiene la capa de presentación de la API para la versión 1.
```
api/v1/
├── user/
│   ├── controllers/          # Controladores para manejar las solicitudes HTTP
│   │   └── user.controller.ts
│   ├── dtos/                 # Data Transfer Objects para la validación de datos
│   │   └── create-user.dto.ts
│   ├── routes/               # Definición de rutas específicas del módulo
│   │   └── user.routes.ts
│   ├── validations/          # Validaciones específicas del módulo
│       └── user.validation.ts
```

#### `src/modules/`
Contiene la lógica de negocio y las implementaciones específicas de cada módulo.
```
modules/
├── user/
│   ├── entities/             # Definición de entidades del dominio
│   │   └── user.entity.ts
│   ├── mappers/              # Mapeadores para transformar datos entre capas
│   │   └── user.mapper.ts
│   ├── repositories/         # Interfaces y clases para acceso a datos
│   │   └── user.repository.ts
│   ├── services/             # Servicios que contienen la lógica de negocio
│   │   └── user.service.ts
│   ├── use-cases/            # Casos de uso específicos del módulo
│       └── find-all-users.use-case.ts
```

### `test/`
Contiene las pruebas unitarias e integrales del proyecto.
```
test/
├── app.e2e-spec.ts           # Pruebas end-to-end para la aplicación
├── jest-e2e.json             # Configuración de Jest para pruebas e2e
├── integration/              # Pruebas de integración
│   └── user/
│       └── user.controller.spec.ts
├── unit/                     # Pruebas unitarias
│   └── user/
│       └── user.service.spec.ts
```

### `coverage/`
Contiene los reportes de cobertura generados por las pruebas.
```
coverage/
├── clover.xml
├── coverage-final.json
├── lcov.info
├── lcov-report/              # Reporte HTML de cobertura
│   ├── index.html
│   └── ...
```

### `shared/`
Contiene recursos compartidos que pueden ser utilizados por múltiples módulos o capas del proyecto.
```
shared/
├── config/                  # Configuraciones generales
│   ├── database.config.ts   # Configuración de la base de datos
│   └── environment.config.ts # Configuración de variables de entorno
├── constants/               # Constantes globales
├── exceptions/              # Excepciones comunes
├── infrastructure/          # Infraestructura compartida
│   ├── database/            # Configuración de bases de datos
│   │   └── typeorm/         # Configuración específica para TypeORM
│   ├── third-party/         # Integraciones con servicios de terceros
│   └── config/              # Configuraciones generales
├── utils/                   # Utilidades generales
```

## Propósito de Cada Carpeta

### `api/v1/`
- **`controllers/`**: Define los controladores que manejan las solicitudes HTTP y delegan la lógica a los servicios o casos de uso.
- **`dtos/`**: Contiene los objetos de transferencia de datos (DTOs) que validan y estructuran los datos de entrada y salida.
- **`routes/`**: Define las rutas específicas del módulo para la API.
- **`validations/`**: Contiene las validaciones específicas del módulo.

### `modules/`
- **`entities/`**: Define las entidades del dominio que representan los objetos principales del negocio.
- **`mappers/`**: Contiene los mapeadores para transformar datos entre entidades y DTOs.
- **`repositories/`**: Define las interfaces y clases para el acceso a datos.
- **`services/`**: Contiene la lógica de negocio principal del módulo.
- **`use-cases/`**: Define los casos de uso específicos del módulo.

### `test/`
- **`integration/`**: Contiene pruebas de integración para verificar la interacción entre diferentes partes del sistema.
- **`unit/`**: Contiene pruebas unitarias para verificar la funcionalidad de componentes individuales.

### `shared/`
- **`config/`**: Contiene las configuraciones generales del proyecto, incluyendo la configuración de la base de datos y de servicios de terceros.
- **`constants/`**: Contiene constantes globales utilizadas en todo el proyecto.
- **`exceptions/`**: Define excepciones comunes que pueden ser utilizadas en diferentes partes del proyecto.
- **`infrastructure/`**: Contiene la configuración y los servicios para la conexión a bases de datos y servicios de terceros.
  - **`database/`**: Configuración y servicios para la conexión a bases de datos, incluyendo TypeORM.
  - **`third-party/`**: Contiene las integraciones con servicios de terceros, como servicios de correo y de pagos.
  - **`config/`**: Configuraciones generales compartidas.
- **`utils/`**: Contiene utilidades generales que pueden ser utilizadas en diferentes partes del proyecto.

---

Esta estructura sigue los principios de modularidad y separación de responsabilidades, facilitando la escalabilidad y el mantenimiento del proyecto.
