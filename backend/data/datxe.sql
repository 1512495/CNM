-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 20, 2018 at 04:54 PM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datxe`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
CREATE TABLE IF NOT EXISTS `accounttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `note` varchar(200) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `reserve_geocode_address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `name`, `phone`, `address`, `note`, `status`, `latitude`, `longitude`, `driver_id`, `reserve_geocode_address`) VALUES
(1, 'Phan Văn Tấn', '0338082216', '457 CMT8', 'ghi chú', 1, NULL, NULL, NULL, NULL),
(2, 'Phan Văn Tấn', '0338082216', 'Tòa nhà Waseco, số 10 Phổ Quang', 'Gần ngã 5 chuồng chó', 1, NULL, NULL, NULL, NULL),
(3, 'Nguyễn Thành Tâm', '023478243', '34 Dương Bá Trạc', 'Beat vk', 1, NULL, NULL, NULL, NULL),
(4, 'Nguyễn Xuân Tân', '456789', '34 Huỳnh Tấn Phong', 'bond bond', 1, NULL, NULL, NULL, NULL),
(5, 'Đại Tài', '483758942023', '45 Nguyễn Văn Linh', 'kk', 1, 16.0608, 108.221, NULL, NULL),
(6, 's', 's', 's', 's', 1, 37.0902, -95.7129, NULL, NULL),
(7, 'Hữu Tâm', '01836984', '43 Lạc Long Quân', 'nhà giàu', 1, 21.0527, 105.808, NULL, NULL),
(8, 'Phan Văn Tấn', '23ưewewe', 'Tòa nhà Waseco, số 10 Phổ Quang', '', 1, 10.8054, 106.666, NULL, NULL),
(9, 'Trần Nhật Tâm', '3435535345', '23 Nguyễn Văn Trỗi', 'Không gấp', 0, NULL, NULL, NULL, NULL),
(10, 'Thiện Tâm', '2343543534', '12 Lê Lai', 'ok', 0, NULL, NULL, NULL, NULL),
(11, 'An Sơn', '32456767', '234', '', 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `sex` varchar(7) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `accountType_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accountType_id` (`accountType_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `phone`, `sex`, `accountType_id`, `status`) VALUES
(1, '1512495', '123', 'Phan Văn Tấn', '338082216', 'Male', 1, 0),
(2, 'tanphan0805', 'c20ad4d76fe97759aa27a0c99bff6710', '', '1627787960', 'Female', 1, 0),
(3, 'tanphan0805', 'c20ad4d76fe97759aa27a0c99bff6710', '', '1627787960', 'Female', 1, 0),
(4, 'tanphan0805', 'c20ad4d76fe97759aa27a0c99bff6710', '', '1627787960', 'Female', 1, 0),
(5, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(6, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(7, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(8, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(9, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(10, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(11, '1651006', 'c4ca4238a0b923820dcc509a6f75849b', '', '', 'Male', 1, 0),
(12, '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', 'Male', 1, 0),
(13, '', 'c81e728d9d4c2f636f067f89cc14862c', '', '', 'Male', 1, 0),
(14, '', 'c81e728d9d4c2f636f067f89cc14862c', '', '', 'Male', 1, 0),
(15, '', 'c20ad4d76fe97759aa27a0c99bff6710', '', '', 'Male', 1, 0),
(16, '1651006', '202cb962ac59075b964b07152d234b70', 'Đại Tài', '1627787960', 'Male', 1, 0),
(17, '', '7a56e1b89d87981a30a0368f5e96d109', '', '', 'Male', 1, 0),
(18, 'ok', 'ed73f6b46391b95e1d03c6818a73b8b9', 'ko', 'ok', 'Male', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userrefreshtokenext`
--

DROP TABLE IF EXISTS `userrefreshtokenext`;
CREATE TABLE IF NOT EXISTS `userrefreshtokenext` (
  `user_id` varchar(200) NOT NULL,
  `refresh_token` varchar(200) NOT NULL,
  `rdt` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounttype`
--
ALTER TABLE `accounttype`
  ADD CONSTRAINT `accounttype_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`accountType_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
