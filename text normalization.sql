CREATE SCHEMA `text_normalization` ;

CREATE TABLE `text_normalization`.`xep_hang` (
  `id` INT NOT NULL,
  `van_ban_truoc_chuan_hoa` NVARCHAR(2048) NULL,
  `van_ban_sau_chuan_hoa` NVARCHAR(2048) NULL,
  `phat_am` VARCHAR(2048) NULL,
  `danh_gia` INT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `text_normalization`.`du_lieu_chuan` (
  `id` INT NOT NULL,
  `van_ban_can_chuan_hoa` NVARCHAR(2048) NULL,
  `van_ban_duoc_chuan_hoa` NVARCHAR(2048) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id`
    FOREIGN KEY (`id`)
    REFERENCES `text_normalization`.`xep_hang` (`id`)
    );