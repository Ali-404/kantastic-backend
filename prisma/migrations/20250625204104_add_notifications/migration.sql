-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('INFO', 'ERROR', 'WARNING', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `content` VARCHAR(191) NOT NULL,
    `notifiable_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notifiable_id_fkey` FOREIGN KEY (`notifiable_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
