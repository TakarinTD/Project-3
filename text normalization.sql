CREATE SCHEMA `text_normalization` ;

CREATE TABLE `text_normalization`.`xep_hang` (
  `id_rank` INT NOT NULL,
  `van_ban_truoc_chuan_hoa` NVARCHAR(2048) NULL,
  `van_ban_sau_chuan_hoa` NVARCHAR(2048) NULL,
  `phat_am` VARCHAR(2048) NULL,
  `danh_gia` INT NULL,
  PRIMARY KEY (`id_rank`));
  
  CREATE TABLE `text_normalization`.`du_lieu_chuan` (
  `id_data` INT NOT NULL,
  `van_ban_can_chuan_hoa` NVARCHAR(2048) NULL,
  `van_ban_duoc_chuan_hoa` NVARCHAR(2048) NULL,
  `phat_am` VARCHAR(2048) NULL,
  `rank_id` int(11)  NULL,
  PRIMARY KEY (`id_data`),
  FOREIGN KEY (`rank_id`) REFERENCES `text_normalization`.`xep_hang` (`id_rank`)
);