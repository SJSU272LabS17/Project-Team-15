-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: ebay
-- ------------------------------------------------------
-- Server version	5.7.15-log

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
-- Table structure for table `auctionwinners`
--

DROP TABLE IF EXISTS `auctionwinners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auctionwinners` (
  `AuctionWinnerId` int(11) NOT NULL AUTO_INCREMENT,
  `WinnerId` int(11) DEFAULT NULL,
  `ItemId` int(11) DEFAULT NULL,
  `PaymentByCard` varchar(45) DEFAULT NULL,
  `PaymentDate` datetime DEFAULT NULL,
  `IsPaymentDone` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`AuctionWinnerId`),
  KEY `Fk_WinnerId_idx` (`WinnerId`),
  KEY `Fk_ItemId_idx` (`ItemId`),
  CONSTRAINT `Fk_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `item` (`ItemId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Fk_WinnerId` FOREIGN KEY (`WinnerId`) REFERENCES `user` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctionwinners`
--

LOCK TABLES `auctionwinners` WRITE;
/*!40000 ALTER TABLE `auctionwinners` DISABLE KEYS */;
INSERT INTO `auctionwinners` VALUES (5,11,11,'1234567890123456','2016-10-16 03:15:49',1),(6,11,9,NULL,NULL,0);
/*!40000 ALTER TABLE `auctionwinners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-16 23:36:17
