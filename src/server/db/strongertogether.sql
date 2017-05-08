-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2017 a las 17:11:03
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `strongertogether`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(10) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `temas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `orden`, `descripcion`, `temas`) VALUES
(1, 'Test', 1, 'categoria de prueba', 35),
(2, 'Avances en Medicina', 5, 'Categoria sobre Avances en el campo de la medicina', 0),
(3, 'Alimentación', 2, 'Categoria sobre comida saludable', 0),
(4, 'Enfermedades', 3, 'Categoria sobre enfermedades ', 0),
(5, 'Off Topic', 4, 'Categoria para hablar sobre lo que quieras', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `autor` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `contenido` longtext COLLATE utf8_spanish_ci NOT NULL,
  `tema` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  `specialty` varchar(45) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hospitals`
--

INSERT INTO `hospitals` (`id`, `name`, `specialty`, `city`, `country`, `description`, `latitude`, `longitude`) VALUES
(0, 'Hospital Antiguo Hospital Militar de Valencia', '', 'C/ Dolores Ibárruri, 3 (Mislata-46920)', '', 'src/client/images/hospitals/hospital1.jpg', '38.8202367', '-0.4264736'),
(1, 'Hospital Arnau de Vilanova', '', 'C/ San Clemente, 12 (Valencia-46015)', '', '', '39.4904147', '-0.4058221'),
(2, 'Hospital Clínico Universitario', '', 'Av Blasco Ibañez, 17 (Valencia-46010)', '', '', '39.4788801', '-0.3634141'),
(3, 'Hospital Consorcio Hospital Gª Universitario', '', 'Av. Tres Cruces, s/n (Valencia-46014)', '', '', '39.46822', '-0.412154'),
(4, 'Hospital Doctor Moliner', '', 'C/ Portaceli, s/n (Serra-46118)', '', '', '39.6561685', '-0.4763146'),
(5, 'Hospital Doctor Peset', '', 'Av. Gaspar Aguilar, 90 (Valencia-46017)', '', '', '39.4524937', '-0.395889'),
(6, 'Hospital Gandia \"Francesc de Borja\"', '', 'Paseo Germanías, 71 (Gandia-46702)', '', '', '38.9634424', '-0.1717632'),
(7, 'Hospital General d\'Ontinyent', '', ' C/ Francisco Cerdá, 3 (Ontinyent-46870)', '', '', '38.8202605', '-0.6052335'),
(8, 'Hospital La Malvarrosa', '', 'C/ Isabel de Villena, 2 (Valencia-46011)', '', '', '39.4752721', '-0.3275614'),
(9, 'Hospital La Ribera de Alzira', '', 'Ctra. Corbera, km 1 (Alzira-46600)', '', '', '39.1601816', '-0.4189617'),
(10, 'Hospital L\'Horta Manises', '', 'Av. Generalitat Valenciana, 50 (Manises-46940)', '', '', '39.4858953', '-0.4544896'),
(11, 'Hospital Pare Jofré', '', 'C/ San Lázaro, s/n (Valencia-46017)', '', '', '39.4534327', '-0.396124'),
(12, 'Hospital Requena', '', 'Paraje Casablanca, s/n (Requena-46340)', '', '', '39.4879285', '-1.0927107'),
(13, 'Hospital Sagunto', '', 'Av. Ramón y Cajal,s/n (Sagunt/Sagunto-46520)', '', '', '39.6743614', '-0.2334218'),
(14, 'Hospital Universitari i Politècnic La Fe', '', 'Bulevar Sur, s/n (Valencia-46026)', '', '', '39.4433313', '-0.3776066'),
(15, 'Hospital Universitario La Fe', '', 'Av. Campanar, 21 (Valencia-46009)', '', '', '39.4433313', '-0.3776066'),
(16, 'Hospital Xàtiva \"Lluís Alcanyís\"', '', '', '', '', '39.0066209', '-0.5119719');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tema`
--

CREATE TABLE `tema` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `contenido` longtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `autor` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `votos` int(11) DEFAULT NULL,
  `comentarios` int(11) NOT NULL,
  `categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tema`
--

INSERT INTO `tema` (`id`, `titulo`, `contenido`, `autor`, `votos`, `comentarios`, `categoria`) VALUES
(11, 'test', '\'<p>test crear tema&nbsp;<img src=\"./src/server/uploads/images/file-1494228484919.jpg\" style=\"width: 1846px;\"></p>\'', 'lluismat', 0, 0, 1),
(12, 'test2', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(13, 'test3', '\'<p>test crear tema&nbsp;<img src=\"./src/server/uploads/images/file-1494228484919.jpg\" style=\"width: 1846px;\"></p>\'', 'lluismat', 0, 0, 1),
(14, 'test4', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(15, 'test5', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(16, 'test6', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(17, 'test7', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(18, 'test8', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(19, 'test9', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(20, 'test10', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(21, 'test11', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(22, 'test12', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(23, 'test13', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(24, 'test14', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(25, 'test15', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(26, 'test16', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(27, 'test17', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(28, 'test18', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(29, 'test19', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(30, 'test20', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(31, 'test21', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(32, 'test22', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(33, 'test23', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(34, 'test24', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(35, 'test25', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(36, 'test26', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(37, 'test27', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(38, 'test28', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(39, 'test29', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(40, 'test30', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(41, 'test31', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(42, 'test32', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(43, 'test33', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(44, 'test34', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(45, 'test35', '\'<p>test crear tema 2</p>\'', 'lluismat', 0, 0, 1),
(56, 'Ola Off Topic', '\'<p>ola</p>\'', 'lluismat', 0, 0, 5),
(63, 'Ola Off Topic 2', '\'<p>olaasdadasd</p>\'', 'lluismat', NULL, 0, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `surname` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `birthday` varchar(45) DEFAULT NULL,
  `country` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `surname`, `email`, `password`, `token`, `tipo`, `birthday`, `country`, `city`, `description`, `avatar`, `activo`) VALUES
(42, 'lluismat', 'Lluis', 'Mataix', 'mataix.lluis@gmail.com', '$2a$10$pzGopBN34WinnV01LPKaYeExVBAkLo.EjysgqRtCVhjqImwMMXmau', 'Autentificado', 'usuario', NULL, 'ES', 'Bocairent', 'Ola k ase', 'lluismat.jpg', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orden` (`orden`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`tema`);

--
-- Indices de la tabla `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tema`
--
ALTER TABLE `tema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tema`
--
ALTER TABLE `tema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `id` FOREIGN KEY (`tema`) REFERENCES `tema` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tema`
--
ALTER TABLE `tema`
  ADD CONSTRAINT `tema_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
