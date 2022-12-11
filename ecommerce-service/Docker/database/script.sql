-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: ecommerce-mysql    Database: clean_architecture_example
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `clean_architecture_example`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `clean_architecture_example` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `clean_architecture_example`;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Categoría 1','Descripción'),(2,'Categoría 2','Descripción'),(3,'Categoría 3','Descripción');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `sellerUserId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sellerUserId` (`sellerUserId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`sellerUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Producto 1','descripción producto',3,3,1),(2,'Producto 2','descripción producto',8,3,1),(3,'Producto 3','descripción producto',7,4,2),(4,'Producto 4','descripción producto',9,4,2),(5,'Producto 5','descripción producto',10,5,1),(6,'Producto 6','descripción producto',0,5,2);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionProducts`
--

DROP TABLE IF EXISTS `TransactionProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionProducts` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`transactionId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `TransactionProducts_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `Transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TransactionProducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionProducts`
--

LOCK TABLES `TransactionProducts` WRITE;
/*!40000 ALTER TABLE `TransactionProducts` DISABLE KEYS */;
INSERT INTO `TransactionProducts` VALUES ('2022-12-11 14:56:20','2022-12-11 14:56:20',1,1),('2022-12-11 14:56:20','2022-12-11 14:56:20',1,2),('2022-12-11 14:56:20','2022-12-11 14:56:20',1,3),('2022-12-11 16:04:15','2022-12-11 16:04:15',2,1),('2022-12-11 16:04:15','2022-12-11 16:04:15',2,2),('2022-12-11 16:04:15','2022-12-11 16:04:15',2,3),('2022-12-11 16:04:59','2022-12-11 16:04:59',3,3),('2022-12-11 16:04:59','2022-12-11 16:04:59',3,4);
/*!40000 ALTER TABLE `TransactionProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyerUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyerUserId` (`buyerUserId`),
  CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`buyerUserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES (1,6),(2,7),(3,8);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','admin@gmail.com','sha1$b8236a4f$1$cfb155023f1807002e0abf450bbe7c14999c876f',1),(2,'admin2','admin2@gmail.com','sha1$352e1636$1$7fa46596be571da92bb98697a53cd337f76a6547',1),(3,'seller1','seller1@gmail.com','sha1$46b62a05$1$30a43c2a64264da2f5d74fc3b37ec6514250b5ee',0),(4,'seller2','seller2@gmail.com','sha1$22939bac$1$7d9b80a8b96cb805318684284909156a825a0761',0),(5,'seller3','seller3@gmail.com','sha1$04ce404c$1$2ca4ae3b6cfbb9240d50ce53c23b366997d2a939',0),(6,'buyer1','buyer1@gmail.com','sha1$9daffa8e$1$05a463e7f1d5d245611829518f914d2d157011b0',0),(7,'buyer2','buyer2@gmail.com','sha1$aa6b2a53$1$1e47a05a442f2ab81a8024fda27a338eb270295b',0),(8,'buyer3','buyer3@gmail.com','sha1$5d0b8ef3$1$ad08ad1ed52fa8894045e38240638b15bf84e140',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-11 16:24:03
