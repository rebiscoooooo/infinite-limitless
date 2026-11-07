-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: infinite_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_user` varchar(255) NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `device_type` varchar(255) NOT NULL,
  `os_browser` varchar(255) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Success',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_logs_created_at_index` (`created_at`),
  KEY `activity_logs_admin_user_index` (`admin_user`),
  KEY `activity_logs_archived_at_index` (`archived_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_logs`
--

DROP TABLE IF EXISTS `admin_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_user` varchar(255) DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `action_details` text DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_logs`
--

LOCK TABLES `admin_logs` WRITE;
/*!40000 ALTER TABLE `admin_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'Admin',
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `last_login` datetime DEFAULT NULL,
  `last_ip` varchar(255) DEFAULT NULL,
  `last_device` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_username_unique` (`username`),
  KEY `admin_users_status_index` (`status`),
  KEY `admin_users_archived_at_index` (`archived_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'System Administrator','admin','admin@infinite-limitless.com','$2y$12$R.wq8mzJJYyxddq8voKfoOeddIshgs8ca2bArC8Ml1ymeae12x/U2','Super Admin','Active','2026-11-08 02:39:46','127.0.0.1','Desktop PC (Windows)',NULL,'2026-11-07 18:39:46','2026-11-07 18:39:46',NULL),(2,'Infinite Executive Admin','infinite_admin','infinitelimitless123@gmail.com','$2y$12$eBwUZRs.9EpRAHNCgM7PGukFGYaD/LZhg2n9j6HgzKK1r4j4i6Fpm','Super Admin','Active','2026-11-08 02:39:46','127.0.0.1','Desktop PC (Windows)',NULL,'2026-11-07 18:39:46','2026-11-07 18:39:46',NULL);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inquiries_is_read_index` (`is_read`),
  KEY `inquiries_created_at_index` (`created_at`),
  KEY `inquiries_archived_at_index` (`archived_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketing_campaigns`
--

DROP TABLE IF EXISTS `marketing_campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marketing_campaigns` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `sent_date` date NOT NULL,
  `recipients_count` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'Sent',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `marketing_campaigns_sent_date_index` (`sent_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketing_campaigns`
--

LOCK TABLES `marketing_campaigns` WRITE;
/*!40000 ALTER TABLE `marketing_campaigns` DISABLE KEYS */;
/*!40000 ALTER TABLE `marketing_campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketing_unsubscribes`
--

DROP TABLE IF EXISTS `marketing_unsubscribes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marketing_unsubscribes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `marketing_unsubscribes_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketing_unsubscribes`
--

LOCK TABLES `marketing_unsubscribes` WRITE;
/*!40000 ALTER TABLE `marketing_unsubscribes` DISABLE KEYS */;
/*!40000 ALTER TABLE `marketing_unsubscribes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_registration`
--

DROP TABLE IF EXISTS `members_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members_registration` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `sponsor_name` varchar(255) DEFAULT NULL,
  `selected_package` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `package_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `marketing_day` int(11) NOT NULL DEFAULT 0,
  `last_emailed` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_registration`
--

LOCK TABLES `members_registration` WRITE;
/*!40000 ALTER TABLE `members_registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `members_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `sender_type` enum('user','admin') NOT NULL DEFAULT 'user',
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_user_id_foreign` (`user_id`),
  CONSTRAINT `messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_01_01_000002_create_admin_users_table',1),(5,'2024_01_01_000003_create_activity_logs_table',1),(6,'2024_01_01_000004_create_admin_logs_table',1),(7,'2024_01_01_000005_create_inquiries_table',1),(8,'2024_01_01_000006_create_members_registration_table',1),(9,'2024_01_01_000007_create_world_plan_registrations_table',1),(10,'2024_01_01_000008_create_stats_tables',1),(11,'2024_01_01_000009_create_messages_table',1),(12,'2026_11_08_001759_add_registration_details_to_world_plan_registrations_table',1),(13,'2026_11_08_005300_create_products_table',1),(14,'2026_11_08_005307_create_marketing_tables',1),(15,'2026_11_08_005314_add_profile_fields_to_admin_users_table',1),(16,'2026_11_08_005321_add_archived_at_to_manageable_tables',1),(17,'2026_11_08_011000_add_is_coming_soon_to_products_table',1),(18,'2026_11_08_023000_add_performance_indexes_to_core_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_stats`
--

DROP TABLE IF EXISTS `product_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_stats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `clicks` int(11) NOT NULL DEFAULT 0,
  `trend_dir` varchar(10) NOT NULL DEFAULT 'up',
  `trend_text` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Active',
  `status_class` varchar(50) NOT NULL DEFAULT 'bg-teal-500',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_stats`
--

LOCK TABLES `product_stats` WRITE;
/*!40000 ALTER TABLE `product_stats` DISABLE KEYS */;
INSERT INTO `product_stats` VALUES (1,'O\'LAMOUR Premium Set',3120,'up','High Demand','Active','bg-emerald-500','2026-11-07 18:39:47','2026-11-07 18:39:47'),(2,'Infinite Organic Barley',2854,'up','Trending','Active','bg-emerald-500','2026-11-07 18:39:47','2026-11-07 18:39:47'),(3,'Vida Skin Collection',1950,'down','Stabilized','Stocked','bg-sky-500','2026-11-07 18:39:47','2026-11-07 18:39:47'),(4,'White Plus Glutathione',1640,'up','Fast Growing','Active','bg-emerald-500','2026-11-07 18:39:47','2026-11-07 18:39:47'),(5,'Infinite Robustus Black Coffee',1420,'up','Steady Surge','Active','bg-emerald-500','2026-11-07 18:39:47','2026-11-07 18:39:47');
/*!40000 ALTER TABLE `product_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `benefits` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `price_display` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_coming_soon` tinyint(1) NOT NULL DEFAULT 0,
  `archived_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_index` (`category`),
  KEY `products_is_active_index` (`is_active`),
  KEY `products_display_order_index` (`display_order`),
  KEY `products_is_active_display_order_index` (`is_active`,`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Infinite Botox Serum','infinite-botox-serum','skincare','Skincare','INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract.','INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract, and Sakura Extract. This unique formula mimics Botox effects without the needles, smoothing fine lines, wrinkles, and blemishes while deeply hydrating your skin. Perfect for a non-invasive, age- defying solution, it delivers a youthful, radiant glow with every use.',NULL,0.00,NULL,'/assets/image/product/INFINITE_BOTOX_SERUM.png',NULL,1,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(2,'INFINITE Brightening Serum','infinite-brightening-serum','skincare','Skincare','Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract.','Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract. This lightweight, glow-boosting formula hydrates, evens out skin tone, and combats blemishes, leaving your complexion refreshed and radiant. Say goodbye to dullness and hello to a youthful, luminous glow.',NULL,0.00,NULL,'/assets/image/product/INFINITE_Brightening_Serum.png',NULL,2,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(3,'INFINITE White Body Lotion','infinite-white-body-lotion','skincare','Skincare','Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin.','Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin. Infused with AHA, Vitamin C, and Niacinamide, it fades dark spots, hyperpigmentation, and discoloration while promoting a radiant glow. This advanced lotion leaves your skin smoother, brighter, and more youthful, delivering visible results with every use.',NULL,0.00,NULL,'/assets/image/product/INFINITE_White_Body_Lotion.png',NULL,3,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(4,'INFINITE Glow-Up Soap','infinite-glow-up-soap','skincare','Skincare','Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide.','Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide. This powerful trio works together to brighten, even out your skin tone, and reduce dark spots and pigmentation. Perfect for tackling uneven skin tone and hyperpigmentation, it leaves your skin smoother, clearer, and radiant.',NULL,0.00,NULL,'/assets/image/product/INFINITE_Glow_Up_Soap.png',NULL,4,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(5,'INFINITE Deowhite Soap','infinite-deowhite-soap','skincare','Skincare','Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint.','Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint. This all-natural soap cleanses, fights odor, and cools the skin, leaving you feeling fresh and invigorated. Ideal for daily use, it combines antibacterial properties, soothing benefits, and a refreshing sensation to keep you energized all day.',NULL,0.00,NULL,'/assets/image/product/INFINITE_Deowhite_Soap.png',NULL,5,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(6,'Vida Lotus Soothing Toner','vida-lotus-soothing-toner','skincare','Skincare','Vida Skin Lotus Soothing Toner rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin.','Rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin texture with its powerful moisturizing effect.',NULL,0.00,NULL,'/assets/image/product/Vida_Lotus_Soothing_Toner.png',NULL,6,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(7,'Vida Tone-Up Sun Serum','vida-tone-up-sun-serum','skincare','Skincare','Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients.','Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients like niacinamide and glutathione. This serum helps even skin tone while delivering a radiant, glowing finish-perfect for daily wear.',NULL,0.00,NULL,'/assets/image/product/Vida_Tone_Up_Sun Serum.png',NULL,7,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(8,'Vida Doux Cleanser','vida-doux-cleanser','skincare','Skincare','Vida Skin Doux Cleanser\'s fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed.','Vida Skin Doux Cleanser\'s fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed and comfortable, yet not drying with powerful hydrating and calming properties.',NULL,0.00,NULL,'/assets/image/product/Vida_Doux_Cleanser.png',NULL,8,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(9,'Vida Skin Lotus Booster Ampoule','vida-skin-lotus-booster-ampoule','skincare','Skincare','Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening barrier.','Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening the skin barrier creating a firm and healthy skin.',NULL,0.00,NULL,'/assets/image/product/Vida_Skin_Lotus_Booster_Ampoule.png',NULL,9,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(10,'Vida Skin Glow Vita Cream','vida-skin-glow-vita-cream','skincare','Skincare','Vida Skin Glow Vita Cream uses VIDA\'s special formula to balance healthy skin oil and moisture levels, creating healthy skin.','Vida Skin Glow Vita Cream uses VIDA\'s special formula to balance healthy skin oil and moisture levels, creating healthy moisturized and vitalized skin conditions.',NULL,0.00,NULL,'/assets/image/product/Vida_Skin_Glow_Vita_Cream.png',NULL,10,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(11,'Barley Pure Organic Powder','barley-pure-organic-powder','wellness','Wellness','A natural supplement made from 100% organic barley grass, rich in vitamins, minerals, and antioxidants.','A nutrient-rich superfood made from pure, organic young barley grass. Rich in antioxidants and fiber, INFINITE BARLEY supports immune health, aids digestion, promotes detoxification, and helps boost energy levels naturally.',NULL,0.00,NULL,'/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',NULL,11,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(12,'INFINITE Black Coffee with Pure Organic Barley','infinite-black-coffee-pure-organic-barley','wellness','Wellness','INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with stevia.','INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with natural stevia for a guilt-free boost. Designed to energize between flavor and function. Enjoy a cup that satisfies your craving and elevates your daily routine.',NULL,0.00,NULL,'/assets/image/product/INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png',NULL,12,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(13,'White Plus Glutathione','white-plus-glutathione','wellness','Wellness','Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, NAC, Vitamin C, Collagen.','Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, N-Acetylcysteine, Vitamin C, Collagen, and Alpha Lipoic Acid. This potent supplement detoxifies your system, neutralizes free radicals, and supports overall wellness. Boost your health and vitality with every dose for a brighter, more energized you.',NULL,0.00,NULL,'/assets/image/product/White_Plus_Glutathione.png',NULL,13,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(14,'O\'Lamour Facial Essence','olamour-facial-essence','o\'lamour','O\'Lamour','A scientifically advanced multi-function Facial Essence designed to revitalize, and improve skin clarity.','Formulated with BIO E.G.F, it stimulates skin renewal. Hydrolyzed Collagen and Volufiline work in synergy and help to plump, firm and lift-the skin for a youthful complexion.',NULL,0.00,NULL,'/assets/image/product/O_LAMOUR_Facial_Essence.png',NULL,14,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(15,'O\'Lamour Aeterna BB Cream','olamour-aeterna-bb-cream','o\'lamour','O\'Lamour','A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel.','A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel. Formulated with SPF 50 / PA+++ broad-spectrum protection, it shields the skin against UVA and UVB damage while preserving comfort and long-lasting wear throughtout the day.',NULL,0.00,NULL,'/assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png',NULL,15,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(16,'O\'Lamour Quintessence Ampoule','olamour-quintessence-ampoule','o\'lamour','O\'Lamour','A premium multi-function skincare innovation expertly formulated to help reduce the appearance of wrinkles and brighten skin.','A premium multi-function skincare innvation expertly formulated to help reduce the apperance of wrinkles and help brighten the skin. Powered by PDRN (Polydeoxyribonu-cleo-tide) Sodium DNA, a clinically recognized bioactive compound plus 12X plant-based essential extracts, this fast-acting ampoule works at the skin\'s foundational level to reveal a more radiant complexion.',NULL,0.00,NULL,'/assets/image/product/O’LAMOUR_Quintessence_Ampoule.png',NULL,16,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(17,'O\'Lamour Core La Crème','olamour-core-la-creme','o\'lamour','O\'Lamour','An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and EGF for youthful radiance.','An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and Epidermal Growth Factor (EGF) for a youthful radiance. Infused with PDRN Sodium DNA, Niacinamide, Euphorbia Cerifera, and Chamomilla Recutita, it deeply hydrates skin tone for a smoother, brighter complexion.',NULL,0.00,NULL,'/assets/image/product/O’LAMOUR_CoreLaCrème.png',NULL,17,1,1,0,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47'),(18,'O\'Lamour Essence Bar','olamour-essence-bar','o\'lamour','O\'Lamour','An exquisitely crafted cleansing bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin.','An exquisitely crafted cleansin bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin. Glycolic and Lactic Acids refine texture and enhance luminosity, while Salicylic Acid puurifies pores for a smoother,cleaer apperance.',NULL,0.00,NULL,'/assets/image/product/O’LAMOUR_Essence_Bar.png',NULL,18,1,1,1,NULL,'2026-11-07 18:39:47','2026-11-07 18:39:47');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('XI9dE6LvfsK04HPIM26bRKBWlkCiVEudE45B7Tvf',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36 Edg/156.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiblIzbDdMU2xJd2tDRGZHajJTbjI5d2FLSWVLbENjTjhadVdPRlR5WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1794076956);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_stats`
--

DROP TABLE IF EXISTS `site_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_stats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `total_visits` int(11) NOT NULL DEFAULT 0,
  `active_users` int(11) NOT NULL DEFAULT 0,
  `product_clicks` int(11) NOT NULL DEFAULT 0,
  `bounce_rate` varchar(10) NOT NULL DEFAULT '0%',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_stats`
--

LOCK TABLES `site_stats` WRITE;
/*!40000 ALTER TABLE `site_stats` DISABLE KEYS */;
INSERT INTO `site_stats` VALUES (1,12540,312,8432,'45%','2026-11-07 18:39:47','2026-11-07 18:39:47');
/*!40000 ALTER TABLE `site_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `world_plan_registrations`
--

DROP TABLE IF EXISTS `world_plan_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `world_plan_registrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `sponsor` varchar(255) DEFAULT NULL,
  `package_type` varchar(255) NOT NULL,
  `product_set` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `amount_paid` varchar(255) DEFAULT NULL,
  `payment_date` date NOT NULL,
  `payment_proof` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `agreed_terms` varchar(255) NOT NULL DEFAULT 'Yes',
  `agreed_terms_at` timestamp NULL DEFAULT NULL,
  `edit_token` varchar(64) DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `world_plan_registrations_username_unique` (`username`),
  UNIQUE KEY `world_plan_registrations_email_unique` (`email`),
  UNIQUE KEY `world_plan_registrations_edit_token_unique` (`edit_token`),
  KEY `world_plan_registrations_status_index` (`status`),
  KEY `world_plan_registrations_created_at_index` (`created_at`),
  KEY `world_plan_registrations_archived_at_index` (`archived_at`),
  KEY `world_plan_registrations_edit_token_index` (`edit_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `world_plan_registrations`
--

LOCK TABLES `world_plan_registrations` WRITE;
/*!40000 ALTER TABLE `world_plan_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `world_plan_registrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08  2:42:40
