# 📐 Naming Conventions – NestJS + Clean Architecture + TypeORM

Esta guía define las convenciones utilizadas para mantener un estilo coherente, legible y profesional en el proyecto, abarcando nombres de archivos, clases, carpetas y columnas de base de datos.

---

## 📁 Estructura general del proyecto

### Carpetas principales

- **Módulos de negocio**: `src/modules/users`, `src/modules/products`
- **API REST**: `src/api/v1/users`, `src/api/v1/products`
- **Infraestructura técnica**: `src/infrastructure/database`, `src/infrastructure/queues`

```txt
src/
├── api/
│   └── v1/
│       └── users/
├── modules/
│   └── users/
├── infrastructure/
│   └── database/
```

---

## 🧱 Nombres de Archivos y Clases

### Archivos

- `snake_case`
- **Singular** cuando representa una entidad, repositorio, servicio, etc.

| Tipo       | Convención                  | Ejemplo                  |
|------------|-----------------------------|--------------------------|
| Archivo    | `snake_case` + singular     | `user.entity.ts`         |
| DTO        | `create_user.dto.ts`        |                          |
| Carpeta    | `plural`                    | `users`, `products`      |

### Clases

- `PascalCase`
- **Singular** para entidades y clases de dominio

| Tipo           | Convención                      | Ejemplo               |
|----------------|----------------------------------|------------------------|
| Entidad        | `PascalCase` + singular         | `User`                 |
| Repositorio    | `PascalCase` + `Repository`     | `UserRepository`       |
| Servicio       | `PascalCase` + `Service`        | `UserService`          |
| DTO            | `PascalCase` + acción + `Dto`   | `CreateUserDto`        |
| Use Case       | `PascalCase` + acción + `UseCase`| `CreateUserUseCase`   |

---

## 🗃️ Convenciones para Base de Datos

### Tablas

- `snake_case`
- **Plural**

```sql
users
order_items
payment_logs
```

### Columnas

- `snake_case`
- **Singular**

```sql
first_name
created_at
total_price
```

### Relaciones

- Campos foráneos también en `snake_case`:

```sql
user_id
order_id
```

### Ejemplo de entidad con convenciones

```ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
```

---

## ✅ Reglas generales

| Elemento             | Convención                    | Ejemplo                 |
|----------------------|-------------------------------|-------------------------|
| Clases y tipos       | `PascalCase`                  | `UserService`           |
| Métodos y propiedades| `camelCase`                   | `findById()`, `userId`  |
| Archivos             | `snake_case` + singular       | `user.entity.ts`        |
| Carpetas             | `plural`                      | `users`, `products`     |
| Tablas               | `snake_case` + plural         | `users`, `order_items`  |
| Columnas             | `snake_case` + singular       | `first_name`, `user_id` |

---

## 🚫 Antipatrones a evitar

| Antipatrón                       | Alternativa correcta             |
|----------------------------------|----------------------------------|
| Clases en plural: `UsersService`| `UserService`                    |
| Columnas en camelCase: `firstName`| `first_name`                    |
| Archivos en PascalCase: `UserEntity.ts`| `user.entity.ts`             |
| Tablas en singular: `user`      | `users`                          |

---

## 🧩 Notas adicionales

- Usa `@Entity('table_name')` para evitar inferencias automáticas de nombres por parte de TypeORM.
- Usa `@Column({ name: 'column_name' })` para mapear columnas con `snake_case` a propiedades en `camelCase`.