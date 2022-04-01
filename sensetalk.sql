-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 05, 2022 at 07:51 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sensetalk`
--

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `ast_id` int(11) NOT NULL,
  `ast_nm` varchar(50) NOT NULL,
  `ast_locid` int(11) NOT NULL,
  `ast_stat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`ast_id`, `ast_nm`, `ast_locid`, `ast_stat`) VALUES
(1, 'Ast 1.1', 1, 2),
(2, 'Ast 1.2', 1, 2),
(3, 'Ast 2.1', 2, 2),
(4, 'Ast 2.2', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `astval`
--

CREATE TABLE `astval` (
  `av_id` int(11) NOT NULL,
  `av_astid` int(11) NOT NULL,
  `av_tmp` int(11) NOT NULL DEFAULT 0 COMMENT '0-Disabled / 1-fault / 2-okay / 3-good',
  `av_pow` int(11) NOT NULL DEFAULT 0 COMMENT '0-Disabled / 1-fault / 2-okay / 3-good',
  `av_vib` int(11) NOT NULL DEFAULT 0 COMMENT '0-Disabled / 1-fault / 2-okay / 3-good',
  `av_rpm` int(11) NOT NULL DEFAULT 0 COMMENT '0-Disabled / 1-fault / 2-okay / 3-good',
  `av_lstud` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `astval`
--

INSERT INTO `astval` (`av_id`, `av_astid`, `av_tmp`, `av_pow`, `av_vib`, `av_rpm`, `av_lstud`) VALUES
(1, 1, 2, 2, 2, 2, '2022-03-02 00:16:47'),
(2, 2, 2, 2, 2, 2, '2022-03-02 00:16:47'),
(3, 3, 2, 2, 2, 2, '2022-03-02 00:16:59'),
(4, 4, 2, 2, 2, 2, '2022-03-02 00:16:59');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `loc_id` int(11) NOT NULL,
  `loc_nm` varchar(50) NOT NULL,
  `loc_stat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`loc_id`, `loc_nm`, `loc_stat`) VALUES
(1, 'Loc 1', 2),
(2, 'Loc 2', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`ast_id`);

--
-- Indexes for table `astval`
--
ALTER TABLE `astval`
  ADD PRIMARY KEY (`av_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`loc_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `ast_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `astval`
--
ALTER TABLE `astval`
  MODIFY `av_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `loc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
