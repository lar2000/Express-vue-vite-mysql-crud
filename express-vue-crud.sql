/*
 Navicat Premium Dump SQL

 Source Server         : XAMPP
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : express-vue-crud

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 04/12/2024 10:52:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gan
-- ----------------------------
DROP TABLE IF EXISTS `gan`;
CREATE TABLE `gan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gan
-- ----------------------------
INSERT INTO `gan` VALUES (1, 'ເຄື່ອງດື່ມ', 'ທາດເຫຼົ້າ');
INSERT INTO `gan` VALUES (3, 'ຍຳ', 'ປາເຊວມ່ອນ');
INSERT INTO `gan` VALUES (5, 'ໄຂ່', 'ໂປຕິນ');
INSERT INTO `gan` VALUES (6, 'ເບຍ', 'ທາດເຫຼົ້າ');

SET FOREIGN_KEY_CHECKS = 1;
