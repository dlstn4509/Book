-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        8.0.26 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- book 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `book` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `book`;

-- 테이블 book.books 구조 내보내기
CREATE TABLE IF NOT EXISTS `books` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '도서 제목',
  `writer` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '저자',
  `content` text COLLATE utf8mb4_general_ci COMMENT '도서 요약설명',
  `cover` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '표지사진',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '현재상태 (0: 절판, 1:판매중, 2:발행예정, 3:삭제)',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 book.books:~7 rows (대략적) 내보내기
DELETE FROM `books`;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`idx`, `title`, `writer`, `content`, `cover`, `createdAt`, `status`) VALUES
	(1, '가나다라1', '마바사아', '', NULL, '2021-09-03 09:16:44', '0'),
	(4, 'ddd', 'ddd', '', NULL, '2021-09-03 17:49:31', '1'),
	(5, '111111', '111111', '111111', NULL, '2021-09-06 10:05:18', '1'),
	(18, 'ghj', 'ghj', 'ghj', NULL, '2021-09-06 17:18:03', '3'),
	(26, '77777777', '777777777', '7777777', NULL, '2021-09-07 16:45:42', '3'),
	(31, '집', '집', '집', NULL, '2021-09-09 09:00:01', '1'),
	(32, '테스트b', '테스트bbb', '테스트b', NULL, '2021-09-09 09:40:17', '1'),
	(33, 'vv', 'vv', 'vv', NULL, '2021-09-09 09:55:12', '1'),
	(34, '압축만', '압축만', '압축만', NULL, '2021-09-09 10:17:16', '1'),
	(35, '사진만', '사진만', '사진만', NULL, '2021-09-09 10:17:25', '1'),
	(36, 'ㅡㅡㅡㅡㅡㅡ', 'ㅡㅡㅡㅡㅡㅡㅡㅡㅡ', '', NULL, '2021-09-09 11:19:38', '1'),
	(37, 'ㅠㅠ', 'ㅠㅠ', 'ㅠㅠ', NULL, '2021-09-09 11:20:05', '1'),
	(38, 'ㅠㅍ', '퓨', '퓨', NULL, '2021-09-09 11:20:35', '1');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- 테이블 book.files 구조 내보내기
CREATE TABLE IF NOT EXISTS `files` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned NOT NULL,
  `oriname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `savename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
  `size` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fieldname` enum('C','U') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'U' COMMENT 'C: cover, U:upfile',
  `status` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:삭제, 1:사용',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`),
  CONSTRAINT `FK_files_books` FOREIGN KEY (`fidx`) REFERENCES `books` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 book.files:~0 rows (대략적) 내보내기
DELETE FROM `files`;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` (`idx`, `fidx`, `oriname`, `savename`, `mimetype`, `size`, `createdAt`, `fieldname`, `status`) VALUES
	(3, 31, 'Brain - 85035 - 복사본.zip', '210909_c48a1d67-47c1-4b22-a451-2bb851c0edcb.zip', 'application/x-zip-compressed', 4425359, '2021-09-09 09:00:01', 'U', '1'),
	(4, 32, 'house3.jpg', '210909_47d129b3-1385-4cd2-bc30-075e2a3a7e89.jpg', 'image/jpeg', 14906, '2021-09-09 09:40:17', 'C', '1'),
	(5, 32, 'Brain - 85035 - 복사본.zip', '210909_f917a954-7e46-4760-95d2-6563df45c760.zip', 'application/x-zip-compressed', 4425359, '2021-09-09 09:40:17', 'U', '1'),
	(6, 33, 'bandmember.jpg', '210909_e22f3689-f549-439e-bd92-30e005d762e4.jpg', 'image/jpeg', 9571, '2021-09-09 09:55:12', 'C', '1'),
	(7, 33, 'Brain - 85035 - 복사본.zip', '210909_29a3d740-d3bb-4ee5-9533-b1ebfd1cdbe0.zip', 'application/x-zip-compressed', 4425359, '2021-09-09 09:55:12', 'U', '1'),
	(8, 34, 'Brain - 85035 - 복사본.zip', '210909_6fe99b73-50a2-4f27-b351-6192f318289d.zip', 'application/x-zip-compressed', 4425359, '2021-09-09 10:17:16', 'U', '1'),
	(9, 35, 'house3.jpg', '210909_b9ff2408-ef60-454a-8904-2584b7ccbcb7.jpg', 'image/jpeg', 14906, '2021-09-09 10:17:25', 'C', '1'),
	(10, 36, 'house3.jpg', '210909_bea10f92-f60c-45a5-8897-75c41b792d19.jpg', 'image/jpeg', 14906, '2021-09-09 11:19:38', 'C', '1'),
	(11, 37, 'house3.jpg', '210909_0150e4fb-bf6d-4d1e-82c3-da18a6fec5bb.jpg', 'image/jpeg', 14906, '2021-09-09 11:20:05', 'C', '1'),
	(12, 37, 'Brain - 85035 - 복사본.zip', '210909_fd899d1f-ab66-44b4-9e34-b8a174c4a9b0.zip', 'application/x-zip-compressed', 4425359, '2021-09-09 11:20:05', 'U', '1'),
	(13, 38, 'on.png', '210909_4f5e4bfc-f442-40e6-a7da-b438aeda399b.png', 'image/png', 19456, '2021-09-09 11:20:35', 'C', '1');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
