-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2023 at 07:49 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diskopbe_desktop`
--

-- --------------------------------------------------------

--
-- Table structure for table `buy_price`
--

CREATE TABLE `buy_price` (
  `id` varchar(50) NOT NULL,
  `conversionId` varchar(50) NOT NULL,
  `storeId` varchar(50) NOT NULL,
  `ownerId` varchar(50) NOT NULL,
  `price` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_price`
--

INSERT INTO `buy_price` (`id`, `conversionId`, `storeId`, `ownerId`, `price`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('8b2855ce-21d5-4cbf-b638-7f118fc288e7', '75e75f6b-35e8-4501-b4d7-858e4b2882eb', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '6000.0000', NULL, NULL, NULL, NULL),
('adbf448f-2931-48e1-82e4-41e3d2aa4231', '75e75f6b-35e8-4501-b4d7-858e4b2882eb', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '6000.0000', NULL, NULL, NULL, NULL),
('67e9a6c1-d8bb-4362-808e-95c50869ae15', '89b296d3-db13-4c8a-9168-91d73cffe7f8', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '8000.0000', NULL, NULL, NULL, NULL),
('225ff9fd-49ba-4c2c-a24f-16058710570a', '89b296d3-db13-4c8a-9168-91d73cffe7f8', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '8000.0000', NULL, NULL, NULL, NULL),
('1e16f02e-c9e2-4e44-b484-48d55c2e2327', '493e93ad-0835-4d95-bb50-eb011f46e079', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2000.0000', NULL, NULL, NULL, NULL),
('634c5936-8da5-47f5-99c6-a8e79f5930c1', '493e93ad-0835-4d95-bb50-eb011f46e079', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2000.0000', NULL, NULL, NULL, NULL),
('3a6f0f91-70b7-4d21-ab5c-a199964a8060', '35f31c89-2556-4845-bd41-7632feb11550', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '12000.0000', NULL, NULL, NULL, NULL),
('ffecf884-ded4-48f6-abb8-8b623d666278', '35f31c89-2556-4845-bd41-7632feb11550', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '12000.0000', NULL, NULL, NULL, NULL),
('977b6943-b130-4cea-8ae4-789d063fee43', '0f1d420d-9374-4697-962a-e0df93e05c8a', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '13000.0000', NULL, NULL, NULL, NULL),
('564b92d9-6c19-487d-be7c-0426684bafcb', '0f1d420d-9374-4697-962a-e0df93e05c8a', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '13000.0000', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_checkout`
--

CREATE TABLE `data_checkout` (
  `id_checkout` varchar(50) NOT NULL,
  `id_pemesanan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`id_pemesanan`)),
  `total` decimal(15,4) DEFAULT 0.0000,
  `user_create` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_checkout`
--

INSERT INTO `data_checkout` (`id_checkout`, `id_pemesanan`, `total`, `user_create`, `createdAt`, `updatedAt`) VALUES
('55cb9d5f-7eba-4644-b6a9-fcc1a7878bf5', '[\"c6ae7e51-bb42-4f1e-ad5f-bec4fb2cd91a\",\"fc46e484-8f5a-4f81-b041-ad49fc8ea5bd\"]', '250000.0000', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-10 15:51:34', '2023-04-10 15:51:34'),
('55cb9d5f-7eba-4644-b6a9-fcc1a7878bg5', '[\"ada54ae7-c138-4b9a-bb7f-27b0082bb82d\",\"ada54ae7-c138-4b9a-bb7f-27b0082bb85w\"]', '110000.0000', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-10 15:51:34', '2023-04-10 08:51:34');

-- --------------------------------------------------------

--
-- Table structure for table `data_customer`
--

CREATE TABLE `data_customer` (
  `id` varchar(50) NOT NULL,
  `id_meja` varchar(50) DEFAULT NULL,
  `id_pemesanan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`id_pemesanan`)),
  `nama_customer` varchar(100) NOT NULL,
  `user_create` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_customer`
--

INSERT INTO `data_customer` (`id`, `id_meja`, `id_pemesanan`, `nama_customer`, `user_create`, `createdAt`, `updatedAt`) VALUES
('0d8c892f-8cc4-470c-97f8-178683cb3b46', 'b3844742-c686-4d07-8311-810027e5731f', NULL, 'Ahmad Dani', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-08 22:35:12', '2023-04-08 22:35:12'),
('1bde9f78-6980-4d34-9c0c-4a49f4d9c7eb', NULL, NULL, 'Iko Uwais', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-08 22:36:08', '2023-04-08 22:36:08'),
('b7bf7530-e6e6-4f73-a4b5-0ae041a29f48', 'b3844742-c686-4d07-8311-810027e5731f', NULL, 'Luna Maya', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-08 22:35:33', '2023-04-08 22:35:33');

-- --------------------------------------------------------

--
-- Table structure for table `data_meja`
--

CREATE TABLE `data_meja` (
  `id_meja` varchar(50) NOT NULL,
  `nama_meja` varchar(50) NOT NULL,
  `user_create` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_meja`
--

INSERT INTO `data_meja` (`id_meja`, `nama_meja`, `user_create`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('b3844742-c686-4d07-8311-810027e5731f', 'No 1', NULL, '2023-03-28 20:57:28', '2023-03-30 04:55:47', '2023-03-28 20:57:28'),
('b3844742-c686-4d07-8311-810027e5733d', 'No 2', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_pemesanan`
--

CREATE TABLE `data_pemesanan` (
  `id` varchar(50) NOT NULL,
  `id_product` varchar(50) NOT NULL,
  `id_customer` varchar(50) DEFAULT NULL,
  `invoice` varchar(50) DEFAULT NULL,
  `harga` decimal(15,4) DEFAULT 0.0000,
  `deskripsi` longtext DEFAULT NULL,
  `jumlah_pemesanan` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `user_create` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pemesanan`
--

INSERT INTO `data_pemesanan` (`id`, `id_product`, `id_customer`, `invoice`, `harga`, `deskripsi`, `jumlah_pemesanan`, `status`, `user_create`, `createdAt`, `updatedAt`) VALUES
('ada54ae7-c138-4b9a-bb7f-27b0082bb82d', '361c9e36-33c3-43ef-a809-20d86d384de0', '0d8c892f-8cc4-470c-97f8-178683cb3b46', NULL, '60000.0000', '', 2, 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-09 17:25:59', '2023-04-09 17:25:59'),
('ada54ae7-c138-4b9a-bb7f-27b0082bb85w', 'afbce702-c548-44a3-b70c-6add502b7f78', '0d8c892f-8cc4-470c-97f8-178683cb3b46', NULL, '50000.0000', '', 2, 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-09 17:25:59', '2023-04-09 17:25:59'),
('c6ae7e51-bb42-4f1e-ad5f-bec4fb2cd91a', '85076de5-d326-4fa00-b73d-b670fcd7ca1b', '1bde9f78-6980-4d34-9c0c-4a49f4d9c7eb', NULL, '200000.0000', 'pesan yang pedas 4, yang biasa selebihnya', 20, 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-09 20:58:49', '2023-04-11 15:21:13'),
('fc46e484-8f5a-4f81-b041-ad49fc8ea5bd', '361c9e36-33c3-43ef-a809-20d86d384de0', '1bde9f78-6980-4d34-9c0c-4a49f4d9c7eb', NULL, '150000.0000', '', 5, 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-09 17:51:25', '2023-04-09 17:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` varchar(50) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `receivableLimit` decimal(15,4) DEFAULT NULL,
  `tempoPiece` int(11) DEFAULT NULL,
  `typePiece` varchar(100) DEFAULT NULL,
  `accountNumber` varchar(100) DEFAULT NULL,
  `accountName` varchar(255) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `memberLevel` varchar(50) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `serialNumber` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `code`, `name`, `address`, `city`, `province`, `country`, `postalCode`, `receivableLimit`, `tempoPiece`, `typePiece`, `accountNumber`, `accountName`, `bankName`, `memberLevel`, `phoneNumber`, `email`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`, `serialNumber`) VALUES
('1ffcd94a-be94-42ea-a01d-2825052e0738', '123', 'Pelanggan Umum', 'Pekanbaru Kota', 'Pekanbaru', 'Riau', 'Indonesia', '12121', '0.0000', 0, '', '', '', '', '841683bb-9ebc-4be4-a5ff-2747c95b0459', '0823 3466 3421', 'eko@gmail.com', '0025874a-f7f1-4859-8a40-25160b4770cf', NULL, NULL, NULL, 1),
('2c652172-f059-4314-a196-a28390099f6e', '123123', 'Eko Saputra  ', 'Pekanbaru', 'asdas', 'asda', '', '', '0.0000', 0, '', '', '', '', '7a113f74-7cab-47f8-a284-a53344b170d4', '', '', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, NULL, NULL, 1),
('4a713486-3fcd-4cae-aec7-5b1462df68be', 'PEL/2', 'Grosir', '', '', '', '', '', '0.0000', 0, '', '', '', '', '7a113f74-7cab-47f8-a284-a53344b170d4', '', '', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan_product`
--

CREATE TABLE `pemesanan_product` (
  `id` varchar(50) NOT NULL,
  `id_pemesanan` varchar(50) DEFAULT NULL,
  `id_product` varchar(50) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `subTotal` decimal(15,4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(50) NOT NULL,
  `ownerId` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT '',
  `barcode` varchar(100) DEFAULT '',
  `name` varchar(100) NOT NULL,
  `brandId` varchar(50) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `typeId` varchar(50) DEFAULT NULL,
  `price` decimal(15,4) DEFAULT 0.0000,
  `minimumStock` int(11) NOT NULL DEFAULT 1,
  `rack` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `hppType` varchar(15) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  `serialNumber` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `ownerId`, `code`, `barcode`, `name`, `brandId`, `type`, `typeId`, `price`, `minimumStock`, `rack`, `description`, `image`, `hppType`, `status`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`, `serialNumber`) VALUES
('361c9e36-33c3-43ef-a809-20d86d384de0', NULL, 'ITM-3', '', 'Aqua Botol 300 ml', 'f72153a2-3210-4ee2-91b1-d1a1d8619414', 'product', '20d2c405-c07c-4dcc-bed6-6eefba0b930e', '30000.0000', 1, '', '', '1681374804796-download(10).jpg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:01:44', '2023-04-13 08:33:24', NULL, 3),
('361c9e36-33c3-43ef-a809-20d86d389rw8', NULL, 'ITM-11', '', 'Cleo 300 ml', 'f72153a2-3210-4ee2-91b1-d1a1d8619414', 'product', '20d2c405-c07c-4dcc-bed6-6eefba0b930e', '5000.0000', 1, '', 'Minuman mineral merek cleo', '1681374804796-download(10).jpg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:01:44', '2023-04-13 08:33:24', NULL, 3),
('85076de5-d326-4fa00-b73d-b670fcd7ca1b', NULL, 'ITM-1', '', 'mi goreng indomie, telur mata sapi', NULL, 'product', '48145f46-974d-4db9-8212-423d37982063', '10000.0000', 1, '', 'satu porsi indomi goreng plus telur mata sapi', '1681374917915-duplikat-indomie-goreng_43.jpeg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:00:51', '2023-04-13 08:35:17', NULL, 1),
('afbce702-c548-44a3-b70c-6add502b7f78', NULL, 'ITM-8', '', 'Es Pisang Ijo', 'uhuhh73u-hu7y-t6gy-y7huu8r4', NULL, '29bd5ba2-b889-4e6e-8010-58056792ab51', '15000.0000', 1, NULL, 'Makanan Penutup khas Makassar, dibuat dari pisang, santan, mutiara sagu dan kental manis', 'resep-es-pisang-ijo.jpg', NULL, 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-30 05:24:39', '2023-04-22 23:47:20', '2023-03-30 05:24:39', 0),
('ba3df4df-bf85-427d-962e-4e8bb77b67cc', NULL, 'ITM 9', '', 'Es Laksamana Mengamuk', NULL, NULL, '29bd5ba2-b889-4e6e-8010-58056792ab51', '1500.0000', 0, NULL, 'Minuman Khas Kab Bengkalis, dari santan, kental manis dan kueni', 'es-laksamana-mengamuk-khas-riau-foto-resep-utama.jpeg', NULL, 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-04-13 06:27:24', '2023-04-22 23:41:26', '2023-04-13 06:27:24', 0),
('cc39c736-6bae-4708-83ce-6343fe8899d0', NULL, 'ITM-4', '', 'Ayam Penyet', 'uhuhh73u-hu7y-t6gy-y7huu8r4', 'product', '48145f46-974d-4db9-8212-423d37982063', '23000.0000', 1, '', '', '1681375025927-download(11).jpg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:02:22', '2023-04-13 08:37:05', NULL, 4),
('d17972a6-7e8b-4dc0-bfc1-66be33a2a17d', NULL, 'ITM 10', '', 'ayam goreng pentung', NULL, NULL, NULL, '17000.0000', 1, NULL, 'ayam goreng paket lengkap dengan nasi dan teh es', '1681375080346-download(12).jpg', NULL, 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-28 20:45:23', '2023-04-22 23:41:47', '2023-03-28 20:45:23', 0),
('d281614c-9e65-47af-bcf3-887db331912b', NULL, 'ITM-5', '', 'ayam bakar bumbu rujak', NULL, 'product', '48145f46-974d-4db9-8212-423d37982063', '35000.0000', 1, '', 'ayam bakar khas riau', '1681373011043-Ayam-Bakar-Bumbu-Rujak.jpg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:02:55', '2023-04-13 08:03:31', NULL, 5),
('d4f4bc41-4a0d-4220-a651-3726e1545206', NULL, 'ITM-2', '', 'Mie Rebus', NULL, 'product', '48145f46-974d-4db9-8212-423d37982063', '15000.0000', 1, '', '', '1681375216135-mie-.jpg', '', 1, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', '2023-03-02 11:01:15', '2023-04-13 08:40:16', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `product_brands`
--

CREATE TABLE `product_brands` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ownerId` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_brands`
--

INSERT INTO `product_brands` (`id`, `name`, `ownerId`, `description`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('f72153a2-3210-4ee2-91b1-d1a1d8619414', 'Aqua', '', 'Air Minum Mineral 400 ml', NULL, NULL, NULL, NULL),
('uhuhh73u-hu7y-t6gy-y7huu8r4', 'wardah', 'b86adfc5-0f3e-4e3c-8506-05b63fae1415', 'merek kosmetik id', 'b86adfc5-0f3e-4e3c-8506-05b63fae1415', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` varchar(50) NOT NULL,
  `ownerId` varchar(50) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `ownerId`, `name`, `description`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('20d2c405-c07c-4dcc-bed6-6eefba0b930e', '', 'Minuman', 'Minuman', NULL, NULL, NULL, NULL),
('29bd5ba2-b889-4e6e-8005-58056792a932', NULL, 'ATK', 'Alut Tulis Kantor', NULL, NULL, NULL, NULL),
('29bd5ba2-b889-4e6e-8010-58056792ab51', NULL, 'Dessert', NULL, NULL, NULL, NULL, NULL),
('400422df-a5bd-4b83-8876-8v4d46319ccd', NULL, 'Kosmetik', 'Kosmetik wajah wanita dan pria ', NULL, NULL, '2023-03-30 06:02:57', NULL),
('48145f46-974d-4db9-8212-423d37982063', '', 'Makanan', 'Makanan', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sales_order`
--

CREATE TABLE `sales_order` (
  `id` varchar(50) NOT NULL,
  `invoice` varchar(50) DEFAULT NULL,
  `serialNumber` int(11) DEFAULT NULL,
  `warehouseId` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `deliveryDate` date DEFAULT NULL,
  `memberId` varchar(50) DEFAULT NULL,
  `cashId` varchar(50) DEFAULT NULL,
  `salesId` varchar(50) DEFAULT NULL,
  `taxType` varchar(15) DEFAULT NULL,
  `productTotal` int(11) DEFAULT NULL,
  `productTotalRecive` int(11) DEFAULT NULL,
  `quantityOrder` int(11) DEFAULT NULL,
  `quantityAccepted` int(11) DEFAULT NULL,
  `percentTax` decimal(5,2) DEFAULT NULL,
  `nominalTax` decimal(15,4) DEFAULT NULL,
  `subTotal` decimal(15,4) DEFAULT NULL,
  `nominalDiscount` decimal(15,4) DEFAULT NULL,
  `percentDiscount` decimal(15,4) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `additionalCosts` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,4) DEFAULT NULL,
  `pay` decimal(10,0) DEFAULT NULL,
  `remainder` decimal(15,4) DEFAULT NULL,
  `accountDpSoId` varchar(50) DEFAULT NULL,
  `accountCashDpSoId` varchar(50) DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales_order_details`
--

CREATE TABLE `sales_order_details` (
  `id` varchar(50) NOT NULL,
  `salesOrderId` varchar(50) DEFAULT NULL,
  `productId` varchar(50) NOT NULL,
  `conversionId` varchar(50) NOT NULL,
  `quantityOrder` int(11) NOT NULL,
  `quantityAccepted` int(11) DEFAULT NULL,
  `price` decimal(15,4) DEFAULT NULL,
  `percentDiscount` decimal(6,2) DEFAULT NULL,
  `nominalDiscount` decimal(15,4) DEFAULT NULL,
  `subTotal` decimal(15,4) DEFAULT NULL,
  `percentTax` decimal(6,2) DEFAULT NULL,
  `nominalTax` decimal(15,4) DEFAULT NULL,
  `expiredDate` date DEFAULT NULL,
  `total` decimal(15,4) NOT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sell_price`
--

CREATE TABLE `sell_price` (
  `id` varchar(50) NOT NULL,
  `conversionId` varchar(50) NOT NULL DEFAULT '1',
  `storeId` varchar(50) NOT NULL,
  `ownerId` varchar(50) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `price` decimal(15,4) DEFAULT 0.0000,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sell_price`
--

INSERT INTO `sell_price` (`id`, `conversionId`, `storeId`, `ownerId`, `level`, `price`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('3a492539-9644-4404-8c0d-560683bbf860', '493e93ad-0835-4d95-bb50-eb011f46e079', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '3000.0000', NULL, NULL, NULL, NULL),
('3c586f42-5428-481c-9c69-78b70ec0e940', '35f31c89-2556-4845-bd41-7632feb11550', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '20000.0000', NULL, NULL, NULL, NULL),
('3ecfdbd8-428f-43c2-9a86-ba3787704da9', '493e93ad-0835-4d95-bb50-eb011f46e079', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '3000.0000', NULL, NULL, NULL, NULL),
('6392b303-9426-4b56-90c3-f7902c8a2b4c', '75e75f6b-35e8-4501-b4d7-858e4b2882eb', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '15000.0000', NULL, NULL, NULL, NULL),
('6fbac978-aea3-458c-8b7d-d338c39a5e16', '89b296d3-db13-4c8a-9168-91d73cffe7f8', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '18000.0000', NULL, NULL, NULL, NULL),
('84ad67e7-e538-4049-8cb6-36ca99a65895', '75e75f6b-35e8-4501-b4d7-858e4b2882eb', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '15000.0000', NULL, NULL, NULL, NULL),
('a530d2e5-398b-4c11-8f29-08a3a040cb60', '0f1d420d-9374-4697-962a-e0df93e05c8a', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '25000.0000', NULL, NULL, NULL, NULL),
('adc01c94-ab7a-4bf3-b885-029e80ec3ef5', '0f1d420d-9374-4697-962a-e0df93e05c8a', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '25000.0000', NULL, NULL, NULL, NULL),
('b9a6ba3d-3f45-4ec7-ae95-c83bace29db1', '89b296d3-db13-4c8a-9168-91d73cffe7f8', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '18000.0000', NULL, NULL, NULL, NULL),
('e9258b86-b230-4762-92f5-0f825ac40416', '35f31c89-2556-4845-bd41-7632feb11550', '49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 1, '20000.0000', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` varchar(50) NOT NULL,
  `warehouseId` varchar(50) DEFAULT NULL,
  `productId` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `warehouseId`, `productId`, `quantity`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('3ddd7fae-d9fc-4586-8c66-dc2408b7756b', NULL, '85076de5-d326-4f00-b73d-b670fcd7ca1b', 50, NULL, '2023-03-27 14:09:24', '2023-03-27 14:09:24', NULL),
('48f72d7b-5380-40c7-85dc-3ff634960785', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', 'c2c09c7e-82b6-47c9-8205-b705580fb135', 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, '2023-03-01 10:01:09', NULL),
('63cbcdb6-9391-47e9-9ecf-70bbbafb2811', NULL, '361c9e36-33c3-43ef-a809-20d86d384de0', 10, NULL, '2023-03-27 14:09:24', '2023-03-27 14:09:24', NULL),
('6d27e9a0-599a-42c9-8940-8198023dd7ea', NULL, '85076de5-d326-4fa00-b73d-b670fcd7ca1b', 13, NULL, '2023-03-30 05:50:09', '2023-03-30 05:50:09', NULL),
('85b9555a-5356-467e-a422-8523300b4364', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', 'b7bda417-a85b-4350-a507-f4b5a7f73374', 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, '2023-03-01 10:01:09', NULL),
('c55a25b9-4183-4bfd-ad20-c91e61128e11', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '4fe91bc1-ab10-4461-9ecb-581fed1702c8', 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, '2023-03-01 15:07:25', NULL),
('cb1587e2-a57e-4938-8af7-d865ae36fd4b', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '28dda42a-ea6e-4b85-8913-47ea82159f79', 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, '2023-03-01 15:06:54', NULL),
('d8ccaf9c-f2ab-4539-a6cd-e5c45222e3a3', NULL, 'cc39c736-6bae-4708-83ce-6343fe8899d0', 11, NULL, '2023-03-30 05:50:09', '2023-03-30 05:50:09', NULL),
('f2ca73a9-26ca-4ab9-a2c2-eccbc80076b4', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '91cb85bc-0dd0-484f-8a67-6c41063df09a', 0, '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, '2023-03-01 10:01:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_number`
--

CREATE TABLE `transaction_number` (
  `id` varchar(50) NOT NULL,
  `storeId` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `transactionModule` varchar(50) NOT NULL,
  `format` varchar(100) NOT NULL,
  `numberDigit` int(11) NOT NULL DEFAULT 4,
  `resetType` enum('year','month','none') NOT NULL DEFAULT 'month',
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_number`
--

INSERT INTO `transaction_number` (`id`, `storeId`, `name`, `type`, `transactionModule`, `format`, `numberDigit`, `resetType`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('', NULL, '', '', '', '', 4, 'month', NULL, NULL, NULL, NULL),
('145ce233-eb40-46f4-a2a8-ceef4cf9498d', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Saldo Awal Item', 'supply', 'item-beginning-balance', 'nomor|/|SLDIT|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('16004c0d-f0b7-4c10-bba7-0142e1f1a1e5', 'c117db61-f110-40ab-b2e6-6ad9538a83ef', 'Member', 'master', 'member', 'PEL|/|nomor', 4, 'none', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('2cb0fc32-cee7-4a0f-8445-78e7a9d6d603', 'c117db61-f110-40ab-b2e6-6ad9538a83ef', 'Barang', 'master', 'item', 'ITM|-|nomor', 4, 'none', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('2feabf47-304b-4669-950a-b7f8b63d549e', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Retur Pembelian', 'purchase', 'purchase-return', 'nomor|/|RTBL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('3c720648-6d9d-4d1d-b03f-86728d894011', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', 'Kas Transfer', 'Accountancy', 'cash-transfer', 'nomor|/|RTBL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('3c99de28-8f47-4d78-81d8-d7b1d0df1cd0', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Pembayaran piutang', 'sale', 'debt-payment-member', 'nomor|/|BPT|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('521c9a39-5e13-4e7b-94ad-3abfe35a369b', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Pembelian', 'purchase', 'purchase', 'nomor|/|BELI|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('6424b5d1-1006-479a-bff7-855cd77e92c2', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Pesanan Pembelian', 'purchase', 'purchase-order', 'nomor|/|POBL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('77a25313-850d-49b2-8c01-fdcce53dc618', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Pesanan Penjualan', 'sale', 'sales-order', 'nomor|/|POJL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('839f87ec-29a5-4d4c-83bc-18de1d9c0e81', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Stok Opname', 'supply', 'stock-opname', 'nomor|/|OPNAME|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('890593c0-7044-4cb8-9862-8a3c3cebc40f', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Penjualan Kasir', 'sale', 'sale-cashier', 'nomor|/|KSR|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('930d31ed-c071-472b-a070-dbe4fc970d92', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Retur Penjualan', 'sale', 'sale-return', 'nomor|/|RTJL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('a02aa539-fcee-4419-b492-bce1a8082e77', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Item Masuk', 'supply', 'item-get-in', 'nomor|/|ITMSK|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('b11c4010-6bf3-487e-ad7e-602e116baed4', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Penjualan', 'sale', 'sale', 'nomor|/|JL|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('b1881869-0dda-4869-968b-97924d7c269c', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Pembayaran Hutang', 'purchase', 'debt-payment', 'nomor|/|BHT|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('b55c60cc-146e-4e86-841a-4a3f007e2d17', 'c117db61-f110-40ab-b2e6-6ad9538a83ef', 'Supplier', 'master', 'supplier', 'SUP|/|nomor', 4, 'none', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('b72b6434-ecd0-46b2-9eb9-c31bf80fd9a0', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Item Keluar', 'supply', 'item-out', 'nomor|/|ITKLR|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('c54dd521-e3e3-458b-a9cd-e626b3e3a784', 'c117db61-f110-40ab-b2e6-6ad9538a83ef', 'Item Transfer', 'supply', 'item-transfer', 'nomor|/|TRF|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('d67d63e1-1d84-4c24-a5ef-afced9fa2caf', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', 'Kas Masuk', 'Accountancy', 'cash-in', 'nomor|/|CTRF|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL),
('f60514a9-37c8-4da3-8de7-a18f7f0f04b5', '1ebb19d8-1c62-4db1-878c-8edf8c92fed6', 'Akuntansi', 'accountancy', 'journal', 'nomor|/|JOUR|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2023-02-24 16:21:57', '2023-02-24 16:22:00', NULL),
('f81cdde7-82f9-40a8-a1c1-fcf4d5256bdb', 'f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', 'Kas Keluar', 'Accountancy', 'cash-out', 'nomor|/|COUT|/|STORE|/|MM|/|YYYY', 4, 'month', NULL, '2022-04-27 09:58:25', '2022-04-27 09:58:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` varchar(50) NOT NULL,
  `ownerId` varchar(50) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `description` text DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `ownerId`, `name`, `description`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('d609117c-f7c3-443a-b867-5f03a516b091', '', 'PCS', 'PCS', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, NULL, NULL),
('fc26fd0d-c209-4641-934d-aa9ff36e251b', '', 'KOTAK', 'KOTAK', '786a1598-d98a-43d3-8a9f-dbfced0d7c2a', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unit_conversions`
--

CREATE TABLE `unit_conversions` (
  `id` varchar(50) NOT NULL,
  `productId` varchar(50) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `unitId` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `status` tinyint(1) DEFAULT 1,
  `conversion_default` tinyint(1) NOT NULL DEFAULT 1,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit_conversions`
--

INSERT INTO `unit_conversions` (`id`, `productId`, `barcode`, `unitId`, `quantity`, `status`, `conversion_default`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('0f1d420d-9374-4697-962a-e0df93e05c8a', 'd281614c-9e65-47af-bcf3-887db331912b', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('1afba63a-f963-432b-9bb7-7f72a5ec5cd3', '07164743-2d55-49a3-924a-5ecaacef6a40', '123124', '91974a61-fc62-48f5-93d4-e5fba9c6e9cd', 10, 1, 0, NULL, NULL, NULL, NULL),
('29814820-d07f-4aee-9ac1-7842946e8e98', '8cdd1a41-00ae-4ebe-9279-065784514386', '', 'e8632aa2-698a-4743-9103-8b126198b4e9', 1, 1, 1, NULL, NULL, NULL, NULL),
('2a14d80c-f5c3-4db3-b2a4-f5a7b25c75d8', '0b9ef988-10dd-4cab-9c6b-9f0b612b8f51', '435435', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('2cb6abbd-65fc-4624-8164-bcd1395c054c', 'c2c09c7e-82b6-47c9-8205-b705580fb135', '123', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('317a56b2-bd23-49d8-a382-fde0b4c53491', '1e93a09d-fd41-4f37-bfdd-4ef3ec4ab3e1', 'RRR', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('35f31c89-2556-4845-bd41-7632feb11550', 'cc39c736-6bae-4708-83ce-6343fe8899d0', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('3e060db4-6056-467a-98aa-3f80eb3faf05', 'e921e092-c592-4069-b56e-1e33b35e22f8', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('3eadf6c5-75ac-4395-8cd0-bd8253739bba', 'd287c05f-c344-4b88-b8c5-15327fa41086', 'rere', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('3f9bebb9-4ce6-41a5-956a-d873c38cd112', '62290542-4cab-46b5-b573-283ca45d01d7', '43e434', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('40b619af-6a3b-47c7-9f19-82f4b2025cb3', '874cba2f-6e16-484f-b876-4f0d88e03cb9', '12423', '5e2a0957-3d10-4ba9-8dd8-02bc4069de80', 1, 1, 1, NULL, NULL, NULL, NULL),
('493e93ad-0835-4d95-bb50-eb011f46e079', '361c9e36-33c3-43ef-a809-20d86d384de0', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('49d5eb28-8792-4bcf-bd62-00804bf43d24', 'dae902e6-52b7-479b-8f2b-379221f81b23', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('49f3f3d1-edab-4c0a-a407-f1c95d2ced51', '807a4949-c61e-4001-a1e4-c84ce8235549', '431', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('565cd776-3d9e-40e7-b687-63027936cd3f', 'b432db64-042d-433d-944a-2bddcaaede29', '123', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('66d58450-4bee-414d-b2ac-1af3c4feed7c', '0c697d8f-8ab5-4b25-a5f8-73a9bc22a37f', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('71fdb83f-afb6-4d00-abce-3cfee29286e6', 'ef4e0112-1ce0-4211-9655-08f1aa221f49', '2412', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('72605e71-c94b-4db0-a36a-eaf1de3c5866', 'b1ed0d12-5fbd-480d-a586-28d6de9cdd71', '434345', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('75e75f6b-35e8-4501-b4d7-858e4b2882eb', '85076de5-d326-4f00-b73d-b670fcd7ca1b', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('78db408e-2c24-40f2-a8a5-edc83c428af3', 'b7bda417-a85b-4350-a507-f4b5a7f73374', '221', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('79ff0631-33b9-4eda-b8ef-508daf4d8ce3', '91cb85bc-0dd0-484f-8a67-6c41063df09a', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('89b296d3-db13-4c8a-9168-91d73cffe7f8', 'd4f4bc41-4a0d-4220-a651-3726e1545206', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('9611346b-bb1f-4608-8f12-bf858505aea5', 'f5c33141-a568-47d5-b609-60a13e37c8b2', '123', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('97ac8921-3bb0-48e9-aa46-71f2cfacff7d', '2121571b-fb4b-4f22-991e-f918bb4a2b0e', '', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('a03a6ccc-d8da-4551-a93b-e7b4ba8f61ff', 'b75e5014-bb53-4d3b-8773-321b1f11a77f', '123132', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('b120b7f3-5ef1-40dc-9d98-d30984acf3cf', '07164743-2d55-49a3-924a-5ecaacef6a40', '23534653', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('bb120f8f-feb1-417a-8cfc-a120b1e9732c', 'b78d84d8-5a2e-44b9-a724-d4ed249cdd31', '434', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('bbec93e9-643c-445f-84f6-1c7bdd3cbdec', '2e37f214-3cb8-4507-9aa5-58528a1fcc27', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('c409c581-34c4-4ff8-8fb9-98988bf096c3', '91cb85bc-0dd0-484f-8a67-6c41063df09a', '', 'fc26fd0d-c209-4641-934d-aa9ff36e251b', 10, 1, 0, NULL, NULL, NULL, NULL),
('d4147e15-ee2c-4b05-8861-d4d87ce83279', '0b9ef988-10dd-4cab-9c6b-9f0b612b8f51', '123123', '91974a61-fc62-48f5-93d4-e5fba9c6e9cd', 10, 1, 0, NULL, NULL, NULL, NULL),
('d89b5839-0f0f-421b-aa05-ae569a35e3d4', '0b7375e2-a140-4e77-a16d-332407b955f4', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('e03b5ac0-f69d-45ba-a04e-22e169fd80ef', '45a13740-9cb1-4ea6-8b79-9e79286b7315', 'eee', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('e2d02d3b-9691-46cf-acf6-8fb3c0b92fde', 'f00ea92f-2d92-4f3d-b4c6-3ef0b7f007a1', '3234', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('e8acbfa2-1182-4b95-8f79-a812da3ac63a', '4fe91bc1-ab10-4461-9ecb-581fed1702c8', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL),
('eaf4f3bb-5901-463e-bd69-eeffeb208d74', '28dda42a-ea6e-4b85-8913-47ea82159f79', '', 'fc26fd0d-c209-4641-934d-aa9ff36e251b', 1, 1, 1, NULL, NULL, NULL, NULL),
('f2e2b53c-a777-467f-a594-270ff33cba5b', '768ec8f2-86b0-4100-a288-0f6845b15ba7', '123', '0c863275-3998-4ecc-a06b-882446b90575', 1, 1, 1, NULL, NULL, NULL, NULL),
('fcc69d97-9120-45e8-b14c-48a2cc1050a6', 'a2686196-d68b-4a8b-9991-601a6a0be37e', '', 'd609117c-f7c3-443a-b867-5f03a516b091', 1, 1, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nik` varchar(50) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `hp` varchar(15) DEFAULT NULL,
  `pekerjaan` varchar(100) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telp` varchar(14) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `akses_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `user_create` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `nik`, `alamat`, `hp`, `pekerjaan`, `jabatan`, `image`, `tempat_lahir`, `tanggal_lahir`, `email`, `telp`, `username`, `password`, `akses_token`, `refresh_token`, `status`, `user_create`, `created_at`, `updated_at`, `deleted_at`) VALUES
('2d8e17f5-59c7-44a7-9b53-340e2bf69a5d', 'kasir', '123', '', NULL, 'kasir', '03370314-8777-4c45-b271-80d0480e5d40', NULL, 'pekanbaru', '2023-01-20', 'kasir@gmail.com', NULL, 'kasir', '$2b$10$g0VtNirxkqvaV5ehTcaka.zaus3R3zFUQEkshoyUG9x6k8HCM1sFS', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJkOGUxN2Y1LTU5YzctNDRhNy05YjUzLTM0MGUyYmY2OWE1ZCIsInVzZXJuYW1lIjoia2FzaXIiLCJpYXQiOjE2NzUyNjQ2MDksImV4cCI6MTY3NTI2NDYyOX0.uxk1fGTrhlmHOKBlPLwNTsOAecsH-Vzq9sOPp0Xlp3g', 1, '', '2023-01-20 07:00:00', NULL, NULL),
('5143ba19-3f57-4589-ac11-a9259bf1a292', 'waiters', '', '', NULL, '', '', NULL, '', '0000-00-00', '', NULL, 'waiters', '$2b$10$sOitlEy8tvg4YaETvEBlae1I2psvvOeXFexvBTT83rhzTePQpJjuy', '', '', 1, '', '2023-03-02 07:00:00', NULL, NULL),
('786a1598-d98a-43d3-8a9f-dbfced0d7c2a', 'admin', 'admin', 'admin', NULL, 'adsm', '35444cf1-5012-4567-9231-cf8cc740df0c', NULL, NULL, NULL, 'admin@gmail.com', NULL, 'admin', '$2b$10$CgM6QNNEax.K1P1fKdy7n./cUF8rOUo6j5cU.uRBlwvZTCXU6szXm', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NmExNTk4LWQ5OGEtNDNkMy04YTlmLWRiZmNlZDBkN2MyYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2Nzc3Mjg2ODcsImV4cCI6MTY3NzcyODcwN30.07WyjATtOoYDGpav7xmyn6B7tezuwzH9DyKaGstfrOw', 1, NULL, '2022-01-19 03:02:56', '2022-01-19 03:02:56', '2022-01-19 03:02:56'),
('b86adfc5-0f3e-4e3c-8506-05b63fae1415', 'maryatul', '1403089789788989', 'bengkalis', '085200000808', 'kasir', NULL, NULL, NULL, NULL, 'maryatul@gmail.com', NULL, 'maryatul', '$2b$10$Aq5N.og2NBgsn44yAoMMfuf35kWG1xpU/Z18sLgBMm/YjU//zhZi.', NULL, NULL, 1, NULL, NULL, '2023-03-24 11:00:32', '2023-03-24 11:00:32');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `id` varchar(50) NOT NULL,
  `ownerId` varchar(50) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` enum('main','warehouse') NOT NULL DEFAULT 'main',
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `posCode` varchar(10) DEFAULT NULL,
  `fax` varchar(200) DEFAULT NULL,
  `accountCode` varchar(50) DEFAULT NULL,
  `taxValue` decimal(15,4) DEFAULT 0.0000,
  `images` text DEFAULT NULL,
  `userCreate` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`id`, `ownerId`, `name`, `code`, `description`, `type`, `address`, `city`, `province`, `phone`, `posCode`, `fax`, `accountCode`, `taxValue`, `images`, `userCreate`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('49fd5491-2dfd-4913-ba92-eb1a3446d6c4', '', 'Tes Cabang', NULL, '', 'warehouse', '', 'Pekanbaru', '', '', '', '', '', '0.0000', 'image_1676909349138.png', '', NULL, NULL, NULL),
('f6fcdcfd-3618-479d-9fcf-b52fc8506c9e', '', 'GARUDA KASIR', 'UTM', 'asdasdsa', 'main', 'Jl. Hr Subrantas No 188 Pekanbaru', 'Pekanbaru', 'Riau', '123 456 789', '', '', '', '0.0000', 'image_1676902075963.png', '', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buy_price`
--
ALTER TABLE `buy_price`
  ADD KEY `buy_price_ibfk_2` (`conversionId`),
  ADD KEY `buy_price_ibfk_4` (`userCreate`),
  ADD KEY `buy_price_ibfk_5` (`storeId`);

--
-- Indexes for table `data_checkout`
--
ALTER TABLE `data_checkout`
  ADD PRIMARY KEY (`id_checkout`),
  ADD UNIQUE KEY `id_pemesanan` (`id_pemesanan`) USING HASH;

--
-- Indexes for table `data_customer`
--
ALTER TABLE `data_customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMeja` (`id_meja`);

--
-- Indexes for table `data_meja`
--
ALTER TABLE `data_meja`
  ADD PRIMARY KEY (`id_meja`);

--
-- Indexes for table `data_pemesanan`
--
ALTER TABLE `data_pemesanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_create` (`user_create`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_merek` (`brandId`),
  ADD KEY `id_jenis` (`typeId`),
  ADD KEY `id_pengguna` (`ownerId`);

--
-- Indexes for table `product_brands`
--
ALTER TABLE `product_brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_owner` (`ownerId`),
  ADD KEY `user_create` (`userCreate`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_create` (`userCreate`),
  ADD KEY `id_owner` (`ownerId`);

--
-- Indexes for table `sales_order`
--
ALTER TABLE `sales_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `salesId` (`salesId`),
  ADD KEY `userCreate` (`userCreate`);

--
-- Indexes for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salesOrderId` (`salesOrderId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `conversionId` (`conversionId`),
  ADD KEY `userCreate` (`userCreate`);

--
-- Indexes for table `sell_price`
--
ALTER TABLE `sell_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_konversi` (`conversionId`),
  ADD KEY `id_toko` (`storeId`),
  ADD KEY `id_owner` (`ownerId`),
  ADD KEY `user_create` (`userCreate`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouseId` (`warehouseId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userCreate` (`userCreate`);

--
-- Indexes for table `transaction_number`
--
ALTER TABLE `transaction_number`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storeId` (`storeId`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `units_ibfk_1` (`userCreate`);

--
-- Indexes for table `unit_conversions`
--
ALTER TABLE `unit_conversions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_barang` (`productId`),
  ADD KEY `id_satuan` (`unitId`),
  ADD KEY `unit_conversions_ibfk_3` (`userCreate`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_owner` (`ownerId`),
  ADD KEY `user_create` (`userCreate`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_customer`
--
ALTER TABLE `data_customer`
  ADD CONSTRAINT `idMeja` FOREIGN KEY (`id_meja`) REFERENCES `data_meja` (`id_meja`);

--
-- Constraints for table `data_pemesanan`
--
ALTER TABLE `data_pemesanan`
  ADD CONSTRAINT `id_customer` FOREIGN KEY (`id_customer`) REFERENCES `data_customer` (`id`),
  ADD CONSTRAINT `products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `product_types` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`brandId`) REFERENCES `product_brands` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `product_brands`
--
ALTER TABLE `product_brands`
  ADD CONSTRAINT `product_brands_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users` (`id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `warehouse_id` FOREIGN KEY (`warehouseId`) REFERENCES `warehouses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
