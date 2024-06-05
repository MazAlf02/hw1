-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 05, 2024 alle 20:17
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homework1wb`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `id` int(11) NOT NULL,
  `id_fumetto` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `eventi`
--

CREATE TABLE `eventi` (
  `id` int(11) NOT NULL,
  `immagine` varchar(255) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `descrizione` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `eventi`
--

INSERT INTO `eventi` (`id`, `immagine`, `titolo`, `descrizione`) VALUES
(2, 'Images/cs-generico-cover-1.jpg', 'STAR COMICS CELEBRA L’ARTE DEL MANGA AL SALONE INTERNAZIONALE DEL LIBRO DI TORINO', 'Il programma Star Comics alla più importante manifestazione italiana nel campo dell’editoria'),
(3, 'Images/cs-generico-comicon-cover.jpg', 'STAR COMICS A COMICON NAPOLI 2024', 'Tutti gli ospiti e gli appuntamenti in programma'),
(5, 'Images/fcbd-cover-2023.jpg', 'FREE COMIC BOOK DAY ITALIA 2023', 'Da venerdì 1 a domenica 10 dicembre torna l’appuntamento annuale che celebra l’arte del fumetto'),
(6, 'Images/hiromashima-cover.jpg', 'HIRO MASHIMA PER LA PRIMA VOLTA IN ITALIA, TRA GLI OSPITI DI PUNTA DI LUCCA COMICS & GAMES 2023', 'Durante una diretta live dal quartier generale del festival toscano, è stata annunciata la presenza del Maestro, autore di best seller come Fairy Tail, Rave – The Groove Adventure ed Edens Zero.'),
(7, 'Images/cs-generico-cover.jpg', 'STAR COMICS AL SALONE INTERNAZIONALE DEL LIBRO DI TORINO TRA NOVITÀ, INCONTRI E GRANDI RITORNI', 'Dal 18 al 22 maggio 2023, stand C40-D39, padiglione 1'),
(8, 'Images/cs-comicon-generico-cover-2.jpg', 'STAR COMICS A COMICON 2023 - dal 28 aprile al 1° maggio 2023', 'I panel e le iniziative di Star Comics a Comicon'),
(9, 'Images/star-in-tour-nirvana-beer-social-cover-3.jpg', 'IL MINI TOUR DI FIRMACOPIE DEGLI AUTORI ASTRA', 'NEWS IN AGGIORNAMENTO'),
(11, 'Images/ospite-comicon2023-annuncio-cover.jpg', 'A COMICON 2023 UNA GRANDE AUTRICE INTERNAZIONALE OSPITE DI STAR COMICS', 'Parteciperà alla manifestazione Miki Yoshikawa, autrice della scoppiettante commedia romantica A COUPLE OF CUCKOOS.'),
(12, 'Images/tour-oneira-news-cover.jpg', 'FEDERICA DI MEO IN TOUR PER PRESENTARE ONEIRA', 'La disegnatrice impegnata in una serie di appuntamenti autunnali per promuovere il nuovo manga europeo dark fantasy');

-- --------------------------------------------------------

--
-- Struttura della tabella `fumetti`
--

CREATE TABLE `fumetti` (
  `id` int(11) NOT NULL,
  `immagine` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `prezzo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `fumetti`
--

INSERT INTO `fumetti` (`id`, `immagine`, `nome`, `data`, `prezzo`) VALUES
(18, 'Images/witchwatch-6-1200px.jpg', 'WITCH WATCH n.6', '2024-04-02', 5.90),
(19, 'Images/gachiakuta-5-1200px.jpg', 'GACHIAKUTA n.5', '2024-04-02', 5.20),
(20, 'Images/shamanking-thesuperstar-5-1200px.jpg', 'SHAMAN KING THE SUPER STAR n.5', '2024-04-22', 6.50),
(21, 'Images/one-piece-107-1200px.jpg', 'ONE PIECE n.107', '2024-04-12', 5.20),
(22, 'Images/iminlovewiththevillainess-4-1200px.jpg', 'I\'M IN LOVE WITH THE VILLAINES n.4', '2024-04-15', 6.90),
(23, 'Images/shikimorisnotjustacutie-5-1200px.jpg', 'SHIKIMORI\'S NOT JUST A CUTIE n.5', '2024-04-14', 6.50),
(24, 'Images/kaguyasama-24-1200px.jpg', 'KAGUYA-SAMA: LOVE IS WAR n.24', '2024-04-26', 6.50),
(25, 'Images/gigantis-5-1200px.jpg', 'GIGANTIS n.5', '2024-04-20', 6.50),
(26, 'Images/dragonballultimateedition-24-1200px.jpg', 'DRAGON BALL ULTIMATE EDITION n. 24', '2024-12-02', 15.00),
(27, 'Images/shirayukidaicapellirossi-25-1200px.jpg', 'SHIRAYUKI DAI CAPELLI ROSSI n. 25', '2024-12-04', 5.90),
(28, 'Images/magicalgirlrisuka-5-1200px.jpg', 'MAGICAL GIRL RISUKA n.5', '2024-12-12', 5.60),
(29, 'Images/the-boxer-7-1200px.jpg', 'THE BOXER n. 7', '2024-12-15', 6.50),
(30, 'Images/ginka-gluna-2-1200px.jpg', 'GINKA GLUNA n. 2', '2024-12-16', 5.60),
(31, 'Images/fungusandiron-4-1200px.jpg', 'FUNGUS AND IRON n. 4', '2024-12-18', 5.90),
(32, 'Images/vanishingmyfirstlove-9-1200px.jpg', 'VANISHING MY FIRST LOVE n. 9', '2024-12-20', 5.70),
(33, 'Images/sandland-ultimateedition-1-1200px.jpg', 'SANDLAND ULTIMATE EDITION n. 1', '2024-12-22', 12.00),
(34, 'Images/dragonballsuper1-1200px.jpg', 'DRAGON BALL SUPER n.1', '2017-01-02', 5.60),
(35, 'Images/dragonballsuper2-1200px.jpg', 'DRAGON BALL SUPER n.2', '2017-01-22', 5.60),
(36, 'Images/dragonballsuper3-1200px.jpg', 'DRAGON BALL SUPER n.3', '2017-02-22', 5.60),
(39, 'Images/dragonballsuper4-1200px-1.jpg', 'DRAGON BALL SUPER n.4', '2017-03-22', 5.60),
(40, 'Images/dragonballsuper5-1200pix.jpg', 'DRAGON BALL SUPER n.5', '2017-04-24', 5.60);

-- --------------------------------------------------------

--
-- Struttura della tabella `fumettiprossimeuscite`
--

CREATE TABLE `fumettiprossimeuscite` (
  `id` int(11) NOT NULL,
  `immagine` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `prezzo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `fumettiprossimeuscite`
--

INSERT INTO `fumettiprossimeuscite` (`id`, `immagine`, `nome`, `data`, `prezzo`) VALUES
(1, 'Images/dragonballultimateedition-24-1200px.jpg', 'DRAGON BALL ULTIMATE EDITION n. 24', '2024-04-12', 15.00),
(2, 'Images/shirayukidaicapellirossi-25-1200px.jpg', 'SHIRAYUKI DAI CAPELLI ROSSI n. 25', '2024-04-12', 5.90),
(3, 'Images/the-boxer-7-1200px.jpg', 'THE BOXER n. 7', '2024-04-18', 6.50),
(4, 'Images/magicalgirlrisuka-5-1200px.jpg', 'MAGICAL GIRL RISUKA n.5', '2024-04-26', 5.60),
(5, 'Images/ginka-gluna-2-1200px.jpg', 'GINKA GLUNA n. 2', '2024-04-16', 5.60),
(6, 'Images/fungusandiron-4-1200px.jpg', 'FUNGUS AND IRON n. 4', '2024-04-18', 5.90),
(7, 'Images/vanishingmyfirstlove-9-1200px.jpg', 'VANISHING MY FIRST LOVE n. 9', '2024-04-20', 5.70),
(8, 'Images/sandland-ultimateedition-1-1200px.jpg', 'SANDLAND ULTIMATE EDITION n. 1', '2024-04-22', 12.00);

-- --------------------------------------------------------

--
-- Struttura della tabella `fumettiultimeuscite`
--

CREATE TABLE `fumettiultimeuscite` (
  `id` int(11) NOT NULL,
  `immagine` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `prezzo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `fumettiultimeuscite`
--

INSERT INTO `fumettiultimeuscite` (`id`, `immagine`, `nome`, `data`, `prezzo`) VALUES
(1, 'Images/witchwatch-6-1200px.jpg', 'WITCH WATCH n.6', '2024-04-02', 5.90),
(2, 'Images/gachiakuta-5-1200px.jpg', 'GACHIAKUTA n.5', '2024-04-02', 5.20),
(3, 'Images/shamanking-thesuperstar-5-1200px.jpg', 'SHAMAN KING THE SUPER STAR n.5', '2024-04-02', 6.50),
(4, 'Images/one-piece-107-1200px.jpg', 'ONE PIECE n.107', '2024-04-02', 5.20),
(6, 'Images/iminlovewiththevillainess-4-1200px.jpg', 'I\'M IN LOVE WITH THE VILLAINES n.4', '2009-04-24', 6.90),
(7, 'Images/shikimorisnotjustacutie-5-1200px.jpg', 'SHIKIMORI\'S NOT JUST A CUTIE n.5', '2009-04-24', 6.50),
(10, 'Images/kaguyasama-24-1200px.jpg', 'KAGUYA-SAMA: LOVE IS WAR n.24', '2009-04-24', 6.50),
(12, 'Images/gigantis-5-1200px.jpg', 'GIGANTIS n.5', '2009-04-24', 6.50);

-- --------------------------------------------------------

--
-- Struttura della tabella `piufamosi`
--

CREATE TABLE `piufamosi` (
  `id` int(11) NOT NULL,
  `immagine1` varchar(255) NOT NULL,
  `immagine2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `piufamosi`
--

INSERT INTO `piufamosi` (`id`, `immagine1`, `immagine2`) VALUES
(1, 'Images/dragonball-super-banner-quad-1.jpg', 'Images/onepiece-banner-quad.jpg'),
(2, 'Images/demonslayer-banner-quad.jpg', 'Images/myheroacademia-banner-quad-2.jpg'),
(3, 'Images/webcomics-banner-quad-3.jpg', 'Images/kaijuno-8-banner-quad-1.jpg'),
(4, 'Images/gachiakuta-banner-quad.jpg', 'Images/300-banner-quad.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `piufamosifinale1`
--

CREATE TABLE `piufamosifinale1` (
  `id` int(11) NOT NULL,
  `immagine` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `piufamosifinale1`
--

INSERT INTO `piufamosifinale1` (`id`, `immagine`) VALUES
(2, 'Images/hereuare-full.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `preferiti`
--

CREATE TABLE `preferiti` (
  `id` int(11) NOT NULL,
  `id_utente` int(11) DEFAULT NULL,
  `id_fumetto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ricerca`
--

CREATE TABLE `ricerca` (
  `nome` varchar(255) NOT NULL,
  `id_utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ricerca`
--

INSERT INTO `ricerca` (`nome`, `id_utente`) VALUES
('Kaguya-sama: Love is War', 2),
('One Piece', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `schermonews`
--

CREATE TABLE `schermonews` (
  `id` int(11) NOT NULL,
  `immaginePrimoPiano` varchar(255) NOT NULL,
  `immagineCover` varchar(255) NOT NULL,
  `overlay` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `schermonews`
--

INSERT INTO `schermonews` (`id`, `immaginePrimoPiano`, `immagineCover`, `overlay`) VALUES
(1, 'Images/portfolio-review-manga-home.jpg', 'Images/portfolio-review-manga-cover.jpg', 'STAR COMICS MANGA PORTFOLIO REVIEW A COMICON 2024'),
(2, 'Images/cs-e-social-door-hanger-home.jpg', 'Images/cs-e-social-door-hanger-cover.jpg', 'STAR COMICS PRESENTA LA DOOR HANGER COLLECTION'),
(3, 'Images/comicon-autore-shibatarian-news-home.jpg', 'Images/comicon-autore-shibatarian-news-cover.jpg', 'LA NUOVA PROMESSA DEL MANGA HORROR KATSUYA IWAMURO SARA OSPITE DI STAR COMICS A COMICON NAPOLI 2024'),
(4, 'Images/aggiornamento-date-home-1.jpg', 'Images/nuovedate-news-cover.jpg', 'SLITTAMENTI RIGUARDANTI ALCUNE FUTURE USCITE'),
(5, 'Images/news-home-pinkheartjam.jpg', 'Images/news-cover-pinkheartjam.jpg', 'PINK HEART JAM ARRIVA FINALMENTE IN ITALIA');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `email`, `username`, `password`) VALUES
(1, 'thebestalfred02@gmail.com', 'maz02', '$2y$10$SqCqyzOtG/BveTU2f7hJuu9rvRMcImSQGMeQZSsGQaCjK28dMdOve'),
(2, 'maz.alf02@gmail.com', 'Santy57', '$2y$10$b7hATQDn.e6TtKGQoNvbdeqNdI4a1L7e63L87g0JDPMEW.Dl8RHX.');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_fumetto` (`id_fumetto`),
  ADD KEY `id_utente` (`id_utente`);

--
-- Indici per le tabelle `eventi`
--
ALTER TABLE `eventi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `fumetti`
--
ALTER TABLE `fumetti`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `fumettiprossimeuscite`
--
ALTER TABLE `fumettiprossimeuscite`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `fumettiultimeuscite`
--
ALTER TABLE `fumettiultimeuscite`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `piufamosi`
--
ALTER TABLE `piufamosi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `piufamosifinale1`
--
ALTER TABLE `piufamosifinale1`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `preferiti`
--
ALTER TABLE `preferiti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utente` (`id_utente`),
  ADD KEY `id_fumetto` (`id_fumetto`);

--
-- Indici per le tabelle `ricerca`
--
ALTER TABLE `ricerca`
  ADD PRIMARY KEY (`nome`);

--
-- Indici per le tabelle `schermonews`
--
ALTER TABLE `schermonews`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `carrello`
--
ALTER TABLE `carrello`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT per la tabella `eventi`
--
ALTER TABLE `eventi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `fumetti`
--
ALTER TABLE `fumetti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT per la tabella `fumettiprossimeuscite`
--
ALTER TABLE `fumettiprossimeuscite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `fumettiultimeuscite`
--
ALTER TABLE `fumettiultimeuscite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `piufamosi`
--
ALTER TABLE `piufamosi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `piufamosifinale1`
--
ALTER TABLE `piufamosifinale1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `preferiti`
--
ALTER TABLE `preferiti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT per la tabella `schermonews`
--
ALTER TABLE `schermonews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `carrello_ibfk_1` FOREIGN KEY (`id_fumetto`) REFERENCES `fumetti` (`id`),
  ADD CONSTRAINT `carrello_ibfk_2` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`);

--
-- Limiti per la tabella `preferiti`
--
ALTER TABLE `preferiti`
  ADD CONSTRAINT `preferiti_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`),
  ADD CONSTRAINT `preferiti_ibfk_2` FOREIGN KEY (`id_fumetto`) REFERENCES `fumetti` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
