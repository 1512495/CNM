-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 10, 2018 at 04:59 PM
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
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `trang_thai` varchar(30) NOT NULL,
  `kinh_do` double NOT NULL,
  `vi_do` double NOT NULL,
  `dia_chi_don` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(50) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `dia_chi` varchar(100) NOT NULL,
  `ghi_chu` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `ho_ten`, `sdt`, `dia_chi`, `ghi_chu`) VALUES
(1, 'Phan Văn Tấn', '0338082216', '457 CMT8 TPHCM', 'Ở một mình'),
(2, 'Tấn Phan', '0123456789', '337 Nguyễn Tri Phương', 'Cũng ở 1 mình'),
(3, 'undefined', 'undefined', 'undefined', 'undefined'),
(4, 'undefined', 'undefined', 'undefined', 'undefined'),
(5, 'undefined', 'undefined', 'undefined', 'undefined'),
(6, 'undefined', 'undefined', 'undefined', 'undefined'),
(7, 'undefined', 'undefined', 'undefined', 'undefined'),
(8, 'undefined', 'undefined', 'undefined', 'undefined'),
(9, 'undefined', 'undefined', 'undefined', 'undefined'),
(10, 'undefined', 'undefined', 'undefined', 'undefined'),
(11, 'AV', 'AV', 'AV', 'AV'),
(12, 'Fred', '12345678', '102 Trường Chinh', 'Nhanh'),
(13, 'Fred', '12345678', '102 Trường Chinh', 'Nhanh'),
(14, 'Fred', '12345678', '102 Trường Chinh', 'Nhanh'),
(15, 'Sơn', '090909090', '457 CMT8', 'Không sao'),
(16, 'Phan Thị Kim Phương', '090909090', '457 CMT8', ''),
(17, 'Phan Thị Kim Phương', '090909090', '', '');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
