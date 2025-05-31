import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBodyBoosterTables1748700000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Catálogo de estados de cuenta
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_account_status (
                status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de ciclos de facturación
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_billing_cycles (
                cycle_id INT NOT NULL AUTO_INCREMENT,
                cycle_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (cycle_id),
                UNIQUE INDEX cycle_code (cycle_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de categorías
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_categories (
                category_id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                description TEXT NULL DEFAULT NULL,
                actve TINYINT NULL DEFAULT NULL,
                created_at DATETIME NULL,
                updated_at DATETIME NULL,
                categoriescol VARCHAR(45) NULL,
                PRIMARY KEY (category_id),
                UNIQUE INDEX idx_name (name ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de trabajador
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_worker_status (
                wroker_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                active TINYINT NULL,
                created_at DATETIME NULL,
                updated_at DATETIME NULL,
                PRIMARY KEY (wroker_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de tipos de contenido
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_content_types (
                content_type_id INT NOT NULL AUTO_INCREMENT,
                type_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (content_type_id),
                UNIQUE INDEX type_code (type_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de niveles de dificultad
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_difficulty_levels (
                level_id INT NOT NULL AUTO_INCREMENT,
                level_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                active TINYINT NULL,
                updated_at DATETIME NULL,
                created_at DATETIME NULL,
                PRIMARY KEY (level_id),
                UNIQUE INDEX level_code (level_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de géneros
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_genders (
                gender_id INT NOT NULL AUTO_INCREMENT,
                gender_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (gender_id),
                UNIQUE INDEX gender_code (gender_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de tipos de ubicación
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_location_types (
                location_type_id INT NOT NULL AUTO_INCREMENT,
                type_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (location_type_id),
                UNIQUE INDEX type_code (type_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de mensaje
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS message_status (
                message_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (message_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de tipos de usuario
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_user_types (
                user_type_id INT NOT NULL AUTO_INCREMENT,
                type_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (user_type_id),
                UNIQUE INDEX type_code (type_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de usuarios
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT NOT NULL AUTO_INCREMENT,
                user_type_id INT NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                gender_id INT NULL DEFAULT NULL,
                registration_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                stripe_account_id VARCHAR(255) NULL DEFAULT NULL,
                profile_color VARCHAR(7) NULL DEFAULT NULL,
                bio TEXT NULL DEFAULT NULL,
                account_status_id INT NULL DEFAULT '1',
                profile_picture_url VARCHAR(255) NULL DEFAULT NULL,
                last_login DATETIME NULL DEFAULT NULL,
                updated_at DATETIME NULL,
                deleted_at VARCHAR(45) NULL,
                PRIMARY KEY (user_id),
                UNIQUE INDEX email (email ASC),
                INDEX user_type_id (user_type_id ASC),
                INDEX gender_id (gender_id ASC),
                INDEX account_status_id (account_status_id ASC),
                INDEX idx_email (email ASC),
                INDEX idx_stripe (stripe_account_id ASC),
                CONSTRAINT users_ibfk_1 FOREIGN KEY (user_type_id) REFERENCES cat_user_types (user_type_id),
                CONSTRAINT users_ibfk_2 FOREIGN KEY (gender_id) REFERENCES cat_genders (gender_id),
                CONSTRAINT users_ibfk_3 FOREIGN KEY (account_status_id) REFERENCES cat_account_status (status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de mensajes
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS messages (
                message_id INT NOT NULL AUTO_INCREMENT,
                sender_id INT NOT NULL,
                receiver_id INT NOT NULL,
                content TEXT NOT NULL,
                sent_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                message_status_id INT NULL DEFAULT '1',
                conversation_id VARCHAR(100) NULL DEFAULT NULL,
                PRIMARY KEY (message_id),
                INDEX status_id (message_status_id ASC),
                INDEX idx_sender (sender_id ASC),
                INDEX idx_receiver (receiver_id ASC),
                INDEX idx_conversation (conversation_id ASC),
                CONSTRAINT messages_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT messages_ibfk_2 FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT messages_ibfk_3 FOREIGN KEY (message_status_id) REFERENCES message_status (message_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de notificación
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS notification_status (
                notification_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (notification_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de tipos de notificación
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS notification_types (
                notification_type_id INT NOT NULL AUTO_INCREMENT,
                type_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (notification_type_id),
                UNIQUE INDEX type_code (type_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de notificaciones
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS notifications (
                notification_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                notification_type_id INT NOT NULL,
                sent_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                notification_status_id INT NULL DEFAULT '1',
                related_entity_id INT NULL DEFAULT NULL,
                related_entity_type VARCHAR(50) NULL DEFAULT NULL,
                PRIMARY KEY (notification_id),
                INDEX idx_user (user_id ASC),
                INDEX idx_read_status (notification_status_id ASC),
                INDEX idx_type (notification_type_id ASC),
                CONSTRAINT notifications_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT notifications_ibfk_2 FOREIGN KEY (notification_type_id) REFERENCES notification_types (notification_type_id),
                CONSTRAINT notifications_ibfk_3 FOREIGN KEY (notification_status_id) REFERENCES notification_status (notification_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de suscripción
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_subscription_status (
                subscription_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (subscription_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de suscripciones
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS subscriptions (
                subscription_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                creator_id INT NOT NULL,
                start_date DATETIME NOT NULL,
                end_date DATETIME NULL DEFAULT NULL,
                billing_cycle_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                subscription_status_id INT NULL DEFAULT '1',
                last_payment_date DATETIME NULL DEFAULT NULL,
                next_payment_date DATETIME NULL DEFAULT NULL,
                stripe_subscription_id VARCHAR(255) NULL DEFAULT NULL,
                PRIMARY KEY (subscription_id),
                INDEX billing_cycle_id (billing_cycle_id ASC),
                INDEX idx_user (user_id ASC),
                INDEX idx_creator (creator_id ASC),
                INDEX idx_status (subscription_status_id ASC),
                INDEX idx_end_date (end_date ASC),
                CONSTRAINT subscriptions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT subscriptions_ibfk_2 FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT subscriptions_ibfk_3 FOREIGN KEY (billing_cycle_id) REFERENCES cat_billing_cycles (cycle_id),
                CONSTRAINT subscriptions_ibfk_4 FOREIGN KEY (subscription_status_id) REFERENCES cat_subscription_status (subscription_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de transacción
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_transaction_status (
                transaction_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (transaction_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de transacciones de pago
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS payment_transactions (
                transaction_id INT NOT NULL AUTO_INCREMENT,
                subscription_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                transaction_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                transaction_status_id INT NOT NULL,
                stripe_payment_id VARCHAR(255) NULL DEFAULT NULL,
                platform_fee DECIMAL(10,2) NOT NULL,
                creator_payout DECIMAL(10,2) NOT NULL,
                PRIMARY KEY (transaction_id),
                INDEX idx_subscription (subscription_id ASC),
                INDEX idx_status (transaction_status_id ASC),
                INDEX idx_date (transaction_date ASC),
                CONSTRAINT payment_transactions_ibfk_1 FOREIGN KEY (subscription_id) REFERENCES subscriptions (subscription_id) ON DELETE CASCADE,
                CONSTRAINT payment_transactions_ibfk_2 FOREIGN KEY (transaction_status_id) REFERENCES cat_transaction_status (transaction_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de workouts
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS workouts (
                workout_id INT NOT NULL AUTO_INCREMENT,
                creator_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NULL DEFAULT NULL,
                duration_minutes INT NULL DEFAULT NULL,
                creation_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                content_type_id INT NOT NULL,
                content_url VARCHAR(255) NOT NULL,
                worker_status_id INT NULL DEFAULT '1',
                thumbnail_url VARCHAR(255) NULL DEFAULT NULL,
                PRIMARY KEY (workout_id),
                INDEX content_type_id (content_type_id ASC),
                INDEX idx_creator (creator_id ASC),
                INDEX idx_status (worker_status_id ASC),
                CONSTRAINT workouts_ibfk_1 FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT workouts_ibfk_5 FOREIGN KEY (content_type_id) REFERENCES cat_content_types (content_type_id),
                CONSTRAINT workouts_ibfk_6 FOREIGN KEY (worker_status_id) REFERENCES cat_worker_status (wroker_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de premium_content
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS premium_content (
                premium_content_id INT NOT NULL AUTO_INCREMENT,
                workout_id INT NOT NULL,
                subscription_id INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                purchase_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (premium_content_id),
                INDEX idx_workout (workout_id ASC),
                INDEX idx_subscription (subscription_id ASC),
                CONSTRAINT premium_content_ibfk_1 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE CASCADE,
                CONSTRAINT premium_content_ibfk_2 FOREIGN KEY (subscription_id) REFERENCES subscriptions (subscription_id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de ratings
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                rating_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                creator_id INT NOT NULL,
                workout_id INT NULL DEFAULT NULL,
                score TINYINT NOT NULL,
                comment TEXT NULL DEFAULT NULL,
                rating_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (rating_id),
                INDEX idx_creator (creator_id ASC),
                INDEX idx_user (user_id ASC),
                INDEX idx_workout (workout_id ASC),
                CONSTRAINT ratings_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT ratings_ibfk_2 FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT ratings_ibfk_3 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de estados de ticket
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_ticket_status (
                ticket_status_id INT NOT NULL AUTO_INCREMENT,
                status_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                PRIMARY KEY (ticket_status_id),
                UNIQUE INDEX status_code (status_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de tickets de soporte
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS support_tickets (
                ticket_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                subject VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                ticket_status_id INT NULL DEFAULT '1',
                creation_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                resolution_date DATETIME NULL DEFAULT NULL,
                PRIMARY KEY (ticket_id),
                INDEX idx_user (user_id ASC),
                INDEX idx_status (ticket_status_id ASC),
                INDEX idx_creation_date (creation_date ASC),
                CONSTRAINT support_tickets_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT support_tickets_ibfk_2 FOREIGN KEY (ticket_status_id) REFERENCES cat_ticket_status (ticket_status_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de tags
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_tags (
                tag_id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                description TEXT NULL DEFAULT NULL,
                active TINYINT NULL,
                created_at DATETIME NULL,
                updated_at DATETIME NULL,
                cat_tagscol VARCHAR(45) NULL,
                PRIMARY KEY (tag_id),
                UNIQUE INDEX idx_name (name ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de user_categories
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_categories (
                user_categories VARCHAR(45) NOT NULL,
                user_id INT NULL,
                category_id INT NULL,
                created_at DATETIME NULL,
                PRIMARY KEY (user_categories),
                INDEX category_id (category_id ASC),
                CONSTRAINT user_categories_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
                CONSTRAINT user_categories_ibfk_2 FOREIGN KEY (category_id) REFERENCES cat_categories (category_id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Catálogo de objetivos de entrenamiento
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cat_workout_goals (
                goal_id INT NOT NULL AUTO_INCREMENT,
                goal_code VARCHAR(50) NOT NULL,
                description VARCHAR(100) NOT NULL,
                active TINYINT NULL,
                PRIMARY KEY (goal_id),
                UNIQUE INDEX goal_code (goal_code ASC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de workout_tags
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS workout_tags (
                workout_tags_id INT NOT NULL,
                workout_id INT NOT NULL,
                tag_id INT NOT NULL,
                PRIMARY KEY (workout_tags_id),
                INDEX fk_workout_tags_workouts1_idx (workout_id ASC),
                INDEX fk_workout_tags_cat_tags1_idx (tag_id ASC),
                CONSTRAINT fk_workout_tags_workouts1 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT fk_workout_tags_cat_tags1 FOREIGN KEY (tag_id) REFERENCES cat_tags (tag_id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        // Tabla de workouts_goals
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS workouts_goals (
                workouts_goals_id INT NOT NULL,
                created_at DATETIME NULL,
                workout_id INT NOT NULL,
                goal_id INT NOT NULL,
                PRIMARY KEY (workouts_goals_id),
                INDEX fk_workouts_goals_workouts1_idx (workout_id ASC),
                INDEX fk_workouts_goals_cat_workout_goals1_idx (goal_id ASC),
                CONSTRAINT fk_workouts_goals_workouts1 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT fk_workouts_goals_cat_workout_goals1 FOREIGN KEY (goal_id) REFERENCES cat_workout_goals (goal_id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB;
        `);
        // Tabla de workouts_difficulty_level
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS workouts_difficulty_level (
                workouts_difficulty_level_id INT NOT NULL,
                created_at DATETIME NULL,
                workout_id INT NOT NULL,
                level_id INT NOT NULL,
                PRIMARY KEY (workouts_difficulty_level_id),
                INDEX fk_workouts_difficulty_level_workouts1_idx (workout_id ASC),
                INDEX fk_workouts_difficulty_level_cat_difficulty_levels1_idx (level_id ASC),
                CONSTRAINT fk_workouts_difficulty_level_workouts1 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT fk_workouts_difficulty_level_cat_difficulty_levels1 FOREIGN KEY (level_id) REFERENCES cat_difficulty_levels (level_id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB;
        `);
        // Tabla de workouts_location
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS workouts_location (
                workouts_location_id INT NOT NULL,
                activa TINYINT NULL,
                created_at DATETIME NULL,
                updated_at DATETIME NULL,
                location_type_id INT NOT NULL,
                workout_id INT NOT NULL,
                PRIMARY KEY (workouts_location_id),
                INDEX fk_workouts_location_cat_location_types1_idx (location_type_id ASC),
                INDEX fk_workouts_location_workouts1_idx (workout_id ASC),
                CONSTRAINT fk_workouts_location_cat_location_types1 FOREIGN KEY (location_type_id) REFERENCES cat_location_types (location_type_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT fk_workouts_location_workouts1 FOREIGN KEY (workout_id) REFERENCES workouts (workout_id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Elimina las tablas en orden inverso para evitar conflictos de claves foráneas
        await queryRunner.query('DROP TABLE IF EXISTS workouts_location');
        await queryRunner.query('DROP TABLE IF EXISTS workouts_difficulty_level');
        await queryRunner.query('DROP TABLE IF EXISTS workouts_goals');
        await queryRunner.query('DROP TABLE IF EXISTS workout_tags');
        await queryRunner.query('DROP TABLE IF EXISTS cat_workout_goals');
        await queryRunner.query('DROP TABLE IF EXISTS user_categories');
        await queryRunner.query('DROP TABLE IF EXISTS cat_tags');
        await queryRunner.query('DROP TABLE IF EXISTS support_tickets');
        await queryRunner.query('DROP TABLE IF EXISTS cat_ticket_status');
        await queryRunner.query('DROP TABLE IF EXISTS ratings');
        await queryRunner.query('DROP TABLE IF EXISTS premium_content');
        await queryRunner.query('DROP TABLE IF EXISTS workouts');
        await queryRunner.query('DROP TABLE IF EXISTS payment_transactions');
        await queryRunner.query('DROP TABLE IF EXISTS cat_transaction_status');
        await queryRunner.query('DROP TABLE IF EXISTS subscriptions');
        await queryRunner.query('DROP TABLE IF EXISTS cat_subscription_status');
        await queryRunner.query('DROP TABLE IF EXISTS notifications');
        await queryRunner.query('DROP TABLE IF EXISTS notification_types');
        await queryRunner.query('DROP TABLE IF EXISTS notification_status');
        await queryRunner.query('DROP TABLE IF EXISTS messages');
        await queryRunner.query('DROP TABLE IF EXISTS users');
        await queryRunner.query('DROP TABLE IF EXISTS cat_user_types');
        await queryRunner.query('DROP TABLE IF EXISTS message_status');
        await queryRunner.query('DROP TABLE IF EXISTS cat_location_types');
        await queryRunner.query('DROP TABLE IF EXISTS cat_genders');
        await queryRunner.query('DROP TABLE IF EXISTS cat_difficulty_levels');
        await queryRunner.query('DROP TABLE IF EXISTS cat_content_types');
        await queryRunner.query('DROP TABLE IF EXISTS cat_worker_status');
        await queryRunner.query('DROP TABLE IF EXISTS cat_categories');
        await queryRunner.query('DROP TABLE IF EXISTS cat_billing_cycles');
        await queryRunner.query('DROP TABLE IF EXISTS cat_account_status');
    }
}
