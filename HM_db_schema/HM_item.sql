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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `ItemId` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(45) DEFAULT NULL,
  `ItemDescription` varchar(1000) DEFAULT NULL,
  `ItemTypeId` int(11) DEFAULT NULL,
  `SellerId` int(11) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Qty` int(11) DEFAULT NULL,
  `DateAdded` datetime DEFAULT NULL,
  `AuctionEndDate` datetime DEFAULT NULL,
  `IsBidItem` tinyint(1) DEFAULT NULL,
  `Sold` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ItemId`),
  KEY `FkSellerId_idx` (`SellerId`),
  KEY `FkItemTypeId_idx` (`ItemTypeId`),
  CONSTRAINT `FkItemTypeId` FOREIGN KEY (`ItemTypeId`) REFERENCES `itemtype` (`ItemTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FkSellerId` FOREIGN KEY (`SellerId`) REFERENCES `user` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Moto G 4','Ram 2 GB, Storage 16GB, Resolution 1080 x 1920 pixels, Android OS, v6.0.1 ',1,1,200.00,1,'2016-12-03 05:45:10','2016-10-06 16:37:12',0,0),(2,'Moto G 3','Ram 1 GB, Storage 8 GB, Resolution 980 x 1920 pixels, Android OS, v4.04 ',1,1,150.00,1,'2016-12-03 05:45:10','2016-10-06 15:34:15',0,0),(3,'Iphone 5','Ram 2 GB, Storage 16GB, Resolution 1080 x 1920 pixels, IOS',1,1,500.00,3,'2016-12-03 05:45:10','2016-12-03 05:45:10',0,0),(4,'BLU R1 HD','Ram 1 GB, Storage 8GB, Resolution 820 x 1520 pixels, Android OS v4.04',1,1,49.00,5,'2016-12-03 05:45:10','2016-12-03 05:45:10',0,0),(5,'Nokia Lumia 635','Ram 0.5 GB, Storage 8GB, 5-Inch display, Windows OS',1,1,200.00,4,'2016-12-03 05:45:10','2016-10-06 15:35:29',0,0),(6,'HTC Desire 626S','Ram 2 GB, Storage 200GB, 5-inch HD display, Android OS v4.04',1,1,500.00,5,'2016-12-03 05:45:10','2016-10-06 19:43:35',0,0),(7,'Sony PlayStation 4 500GB Console','Standard Black Console, Storage 500GB',4,1,349.00,1,'2016-10-16 01:19:34','2016-10-20 01:19:34',1,0),(8,'Xbox One S 2TB Console','17 x 4.5 x 11.5 inches, 500GB HDD',4,1,397.00,1,'2016-10-16 01:19:34','2016-10-20 01:19:34',1,0),(9,'Sony DSCW800/B 20.1 MP','Sony Lens w/ 5x Optical Zoom, Digital Image',2,1,89.99,1,'2016-10-12 01:14:34','2016-10-16 01:14:34',1,1),(10,'MacBook Pro','4GB Ram',3,1,758.00,5,'2016-12-04 05:45:10','2016-12-04 05:45:10',0,0),(11,'MacBook Air','Light weight, RAM 4GB',3,1,859.00,1,'2016-10-16 05:45:10','2016-10-16 02:36:34',1,1),(12,'Fire HD 6 Tablet','6\" HD Display, Wi-Fi, 8 GB - Includes Special Offers, Black',1,4,70.00,1,'2016-10-16 16:03:16','2016-10-20 01:19:34',1,0),(13,'MOto G 1st GEN','4GB RAM, 16 GB storage',1,11,132.00,2,'2016-10-15 01:35:08','2016-10-19 01:35:08',0,0),(14,'Lenovo K810','2GB RAM, 16 GB storage',1,11,169.00,1,'2016-10-16 01:19:34','2016-10-20 01:19:34',1,0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
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
