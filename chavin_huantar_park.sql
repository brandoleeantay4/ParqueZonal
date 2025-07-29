-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-07-2025 a las 00:12:05
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chavin_huantar_park`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animals`
--

DROP TABLE IF EXISTS `animals`;
CREATE TABLE IF NOT EXISTS `animals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `scientificName` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `animals`
--

INSERT INTO `animals` (`id`, `name`, `scientificName`, `description`, `image`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Leon', 'Leonitis', 'Es un leon que dice miau pero fuerte y grave, cuidao que parece muy tierno pero si te acercas mucho pipipi', '/uploads/1751609954872.jpg', 1, '2025-07-04 06:19:42', '2025-07-04 06:19:42'),
(2, 'Pato rabioso', 'Patini Rabiosini', 'No te confies de lo bello que es este patito, cuando menos te lo esperes ya te quedaras muerto', '/uploads/1751610167545.jpg', 1, '2025-07-04 06:23:13', '2025-07-04 06:23:13'),
(3, 'Pato amable', 'Patiini Amablisini', 'El patito amable, tiene el mismo aspecto que su familiar el patiini enojadini', '/uploads/1751610203673.jpg', 1, '2025-07-04 06:24:09', '2025-07-04 06:24:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groupimages`
--

DROP TABLE IF EXISTS `groupimages`;
CREATE TABLE IF NOT EXISTS `groupimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `caption` text,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `groupimages`
--

INSERT INTO `groupimages` (`id`, `image`, `caption`, `active`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1751610317340.jpg', 'Un buen lugar para pasar con la familia', 1, '2025-07-04 06:25:25', '2025-07-04 06:25:25'),
(2, '/uploads/1751610341660.jpg', 'Que esperas para venir y gozar junto a la familia', 1, '2025-07-04 06:25:54', '2025-07-04 06:25:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `heroslides`
--

DROP TABLE IF EXISTS `heroslides`;
CREATE TABLE IF NOT EXISTS `heroslides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `heroslides`
--

INSERT INTO `heroslides` (`id`, `image`, `subtitle`, `title`, `description`, `active`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1751592815555.jpg', 'LAGOS', 'UN GRAN LAGO', 'ven a disfrutar de un lago tan bonito a la cercania de tu hogar', 1, '2025-07-04 01:34:07', '2025-07-05 07:19:29'),
(2, '/uploads/1751592891391.jpg', 'MONTAÑAS', 'UNAS GRANDES MONTAÑAS', 'Unas gran montañas que puedes presenciar a la cercania de tu hogar', 1, '2025-07-04 01:34:52', '2025-07-04 01:34:52'),
(3, '/uploads/1751592919011.jpg', 'PLANTAS', 'PLANTAS MUY BONITAS QUE PODES DISFRUTAR', 'Mira que plantas tan bellas que te ofrecemos, son tan hermoshas', 1, '2025-07-04 01:35:49', '2025-07-04 01:35:49'),
(4, '/uploads/1751613563174.jpg', 'ZIMBA', 'VISTA A ZIMBA, MIRA QUE BONITO', 'El sitio donde simba nacio, un lugar muy bonito veni que esperas', 1, '2025-07-04 07:19:52', '2025-07-04 07:19:52'),
(5, '/uploads/1751619797846.jpg', 'OHHHH', 'MIRA QUE COSO MAS BONITO', 'Mira esto es una preciosura, admiralooo', 1, '2025-07-04 09:03:19', '2025-07-04 09:03:19'),
(6, '/uploads/1751712905528.jpg', 'MONTAÑAS', 'Aqui va algo', 'Lorem ipsum dsks uijnuf frunif dsvr vrv r vrvr vrvsvsrvsrvsv sfdvsdsf ', 1, '2025-07-05 10:55:34', '2025-07-05 10:55:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapdata`
--

DROP TABLE IF EXISTS `mapdata`;
CREATE TABLE IF NOT EXISTS `mapdata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mapdata`
--

INSERT INTO `mapdata` (`id`, `image`, `active`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/1751610762031.jpg', 1, '2025-07-04 01:05:24', '2025-07-04 06:33:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `priceoptions`
--

DROP TABLE IF EXISTS `priceoptions`;
CREATE TABLE IF NOT EXISTS `priceoptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `category` varchar(255) NOT NULL,
  `ageRange` varchar(255) DEFAULT NULL,
  `description` text,
  `color` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `priceoptions`
--

INSERT INTO `priceoptions` (`id`, `price`, `category`, `ageRange`, `description`, `color`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 10, 'Adultos', '18 a 60 años', 'Entrada para adultos', '#054986', 1, '2025-07-05 09:19:03', '2025-07-24 00:08:31'),
(2, 10, 'Piscina Adultos', '18 a 60 años', 'Entrada para piscina adultos', '#f29200', 1, '2025-07-05 09:19:27', '2025-07-05 10:53:49'),
(3, 5, 'Niños', '4 a 15 años', 'Entrada para niños', '#059669', 1, '2025-07-05 09:23:02', '2025-07-05 10:53:49'),
(4, 5, 'Piscina Niños', '4 a 15 años', 'Entrada para piscina niños', '#7c3aed', 1, '2025-07-05 09:23:24', '2025-07-05 10:53:49'),
(5, 0, 'Tercera Edad', 'Mayor de 60 años', 'Entrada para tercera edad', '#059669', 1, '2025-07-05 09:24:21', '2025-07-05 10:53:49'),
(6, 5, 'Discapacitados', 'Todas las edades', 'Entrada para discapacitados', '#054986', 1, '2025-07-05 09:25:33', '2025-07-05 10:53:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$PY5sb78YlJismZymtGkI3Ol9JNpwq.fj1JcLobNXgBV/RgGqAIgBW', 'admin@parque.com', 'admin', '2025-07-04 01:15:35', '2025-07-04 01:15:35'),
(2, 'nuevo_usuario', '$2y$10$b/z4hcFhxtORJgB.NRBX/.PhQkW43xnemFu8YsAeX7w.XiKJstgFq', 'nuevo@example.com', 'admin', '2025-07-07 16:39:54', '2025-07-07 16:39:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wonders`
--

DROP TABLE IF EXISTS `wonders`;
CREATE TABLE IF NOT EXISTS `wonders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fullDescription` text,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `wonders`
--

INSERT INTO `wonders` (`id`, `name`, `image`, `description`, `fullDescription`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Machu Picchu', '/uploads/1751592977442.jpg', 'Réplica de', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum', 1, '2025-07-04 01:37:04', '2025-07-04 01:37:04'),
(2, 'Cristo Redentor', '/uploads/1751609835414.jpg', 'Réplica de', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33', 1, '2025-07-04 06:17:23', '2025-07-04 06:17:23'),
(3, 'Piramides de Egipto', '/uploads/1751613624473.jpg', 'Réplica de las', 'Mira que piramides tan bellas, nadie sabe como fueron creadas', 1, '2025-07-04 07:20:52', '2025-07-04 07:20:52'),
(4, 'Tag Mahal', '/uploads/1751699997544.jpg', 'Réplica de', 'Esta replica del Tag Mahal es tan perfecta que nadie se imagina como es posible que sea replica', 1, '2025-07-05 07:20:33', '2025-07-05 07:20:33'),
(5, 'Nueva Maravilla Actualizada', '/uploads/nueva_maravilla_actualizada.jpg', 'Descripción corta - actualizada', 'Descripción completa de la maravilla - actualizada', 1, '2025-07-07 17:11:56', '2025-07-07 17:13:21');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
