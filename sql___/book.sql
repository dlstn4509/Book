-- book 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `book` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `book`;

-- 테이블 book.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `passwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1','2','3','4','5','6','7','8','9') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '5' COMMENT '0: 탈퇴, 1: 유휴, 3:인증회원, 5: 회원, 6: VIP, 9: 관리자',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 book.books 구조 내보내기
CREATE TABLE IF NOT EXISTS `books` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `fidx` int unsigned NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '도서 제목',
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '저자',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '도서 요약설명',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '현재상태 (0: 절판, 1:판매중, 2:발행예정, 3:삭제)',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`),
  CONSTRAINT `FK_books_users` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:삭제, 1:사용',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`),
  CONSTRAINT `FK_files_books` FOREIGN KEY (`fidx`) REFERENCES `books` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 book.sessions 구조 내보내기
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 book.users_api 구조 내보내기
CREATE TABLE IF NOT EXISTS `users_api` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned NOT NULL,
  `domain` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '허용 가능 도메인',
  `apikey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'uuid',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '''0'': 사용안함, ''1'': 사용함',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 book.users_sns 구조 내보내기
CREATE TABLE IF NOT EXISTS `users_sns` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유값',
  `fidx` int unsigned NOT NULL COMMENT 'user -> idx',
  `provider` enum('KA','NA') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '''KA'', ''NA''',
  `snsid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'sns id',
  `snsName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'sns 사용자 이름',
  `displayName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'sns 표시이름',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'sns email',
  `profileURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'sns 프로필 경로',
  `accessToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '접근 토큰(Token)',
  `refreshToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '갱신 토큰(Token)',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '접속일',
  `status` enum('0','1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '3' COMMENT '''0:탈퇴'', ''1:유휴'', ''5:사용''',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`),
  CONSTRAINT `FK_users-sns_users` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 book.users_withdrawal 구조 내보내기
CREATE TABLE IF NOT EXISTS `users_withdrawal` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned NOT NULL COMMENT 'users -> idx',
  `msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '탈퇴 사유',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '탈퇴일',
  PRIMARY KEY (`idx`),
  KEY `FK_users_withdrawal_users` (`fidx`),
  CONSTRAINT `FK_users_withdrawal_users` FOREIGN KEY (`fidx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
