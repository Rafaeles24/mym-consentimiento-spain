-- CreateTable
CREATE TABLE `Consentimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_consentimiento` ENUM('DEMO_TELECOM', 'ENERGIA_GLOBAL_SPAIN') NOT NULL,
    `dni` VARCHAR(18) NOT NULL,
    `num_telefono` VARCHAR(9) NOT NULL,
    `num_contacto` VARCHAR(9) NOT NULL,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `verificado` BOOLEAN NOT NULL DEFAULT false,
    `direccion_ip` VARCHAR(255) NULL,
    `fecha_consentimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Consentimiento_tipo_consentimiento_idx`(`tipo_consentimiento`),
    UNIQUE INDEX `Consentimiento_dni_tipo_consentimiento_key`(`dni`, `tipo_consentimiento`),
    UNIQUE INDEX `Consentimiento_num_telefono_tipo_consentimiento_key`(`num_telefono`, `tipo_consentimiento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
