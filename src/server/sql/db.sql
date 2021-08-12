CREATE DATABASE  IF NOT EXISTS `TreeCoreIDE` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TreeCoreIDE`;
-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: TreeCoreIDE
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TCHomeNews`
--

DROP TABLE IF EXISTS `TCHomeNews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TCHomeNews` (
  `newsId` varchar(50) NOT NULL COMMENT '新闻标识（主键）',
  `newsTitle` varchar(100) DEFAULT NULL COMMENT '新闻标题',
  `newsText` text COMMENT '新闻内容',
  `newsImageUrl` varchar(200) DEFAULT NULL COMMENT '新闻图片地址',
  `newRemoteUrl` varchar(200) DEFAULT NULL COMMENT '新闻远程地址',
  `newCreateDate` varchar(50) DEFAULT NULL COMMENT '新闻创建时间',
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TCLibInfo`
--

DROP TABLE IF EXISTS `TCLibInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TCLibInfo` (
  `libId` varchar(50) NOT NULL COMMENT '库标识（主键）',
  `libName` varchar(200) DEFAULT NULL COMMENT '库名称',
  `libUserId` varchar(50) DEFAULT NULL COMMENT '库作者标识（外键）',
  `libLicense` varchar(50) DEFAULT NULL COMMENT '库协议',
  `libDescription` text COMMENT '库描述',
  `libRemoteUrl` varchar(200) DEFAULT NULL COMMENT '库远程地址',
  `libVersionId` varchar(50) DEFAULT NULL COMMENT '库版本标识（外键）',
  `libType` varchar(50) DEFAULT NULL COMMENT '库类型',
  `libDownloadNum` int(10) DEFAULT '0' COMMENT '库下载次数',
  `libRating` float(5,2) DEFAULT '0.00' COMMENT '库评分高低',
  `libCreateDate` varchar(50) DEFAULT NULL COMMENT '库创建时间',
  PRIMARY KEY (`libId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TCLibVersion`
--

DROP TABLE IF EXISTS `TCLibVersion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TCLibVersion` (
  `libId` varchar(50) NOT NULL COMMENT '库标识（主键）',
  `libVersion` varchar(50) DEFAULT NULL COMMENT '库版本',
  `libUpdateDate` varchar(50) DEFAULT NULL COMMENT '库更新时间',
  `libUpdateText` text COMMENT '库更新内容',
  PRIMARY KEY (`libId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TCUser`
--

DROP TABLE IF EXISTS `TCUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TCUser` (
  `userId` varchar(50) NOT NULL COMMENT '用户标识（主键）',
  `userAccount` varchar(100) DEFAULT NULL COMMENT '用户账号',
  `userPassword` varchar(100) DEFAULT NULL COMMENT '用户密码',
  `userName` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `userEmail` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `userToken` varchar(100) DEFAULT NULL COMMENT '用户密钥',
  `userCreateDate` varchar(50) DEFAULT NULL COMMENT '用户创建时间',
  `userLockStatus` varchar(50) DEFAULT NULL COMMENT '用户锁定状态',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-10 12:50:17
