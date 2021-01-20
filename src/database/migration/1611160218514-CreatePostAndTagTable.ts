import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePostAndTagTable1611160218514 implements MigrationInterface {
    name = 'CreatePostAndTagTable1611160218514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_6a9775008add570dc3e5a0bab7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `desc` varchar(255) NULL, `alias` varchar(255) NOT NULL, `text` text NOT NULL, `status` enum ('d', 'p') NOT NULL DEFAULT 'd', `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `published_at` datetime NULL, UNIQUE INDEX `UQ_post_alias` (`alias`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post_tags_tag` (`postId` int NOT NULL, `tagId` int NOT NULL, INDEX `IDX_b651178cc41334544a7a9601c4` (`postId`), INDEX `IDX_41e7626b9cc03c5c65812ae55e` (`tagId`), PRIMARY KEY (`postId`, `tagId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `post_tags_tag` ADD CONSTRAINT `FK_b651178cc41334544a7a9601c45` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post_tags_tag` ADD CONSTRAINT `FK_41e7626b9cc03c5c65812ae55e8` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_tags_tag` DROP FOREIGN KEY `FK_41e7626b9cc03c5c65812ae55e8`");
        await queryRunner.query("ALTER TABLE `post_tags_tag` DROP FOREIGN KEY `FK_b651178cc41334544a7a9601c45`");
        await queryRunner.query("DROP INDEX `IDX_41e7626b9cc03c5c65812ae55e` ON `post_tags_tag`");
        await queryRunner.query("DROP INDEX `IDX_b651178cc41334544a7a9601c4` ON `post_tags_tag`");
        await queryRunner.query("DROP TABLE `post_tags_tag`");
        await queryRunner.query("DROP INDEX `UQ_post_alias` ON `post`");
        await queryRunner.query("DROP TABLE `post`");
        await queryRunner.query("DROP INDEX `IDX_6a9775008add570dc3e5a0bab7` ON `tag`");
        await queryRunner.query("DROP TABLE `tag`");
    }

}
