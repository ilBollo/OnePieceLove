
CREATE SCHEMA IF NOT EXISTS `naruto` DEFAULT CHARACTER SET utf8 ;
USE `naruto` ;
--
-- Struttura della tabella `account_clienti`
--

CREATE TABLE `account` (
  `NomeCompleto` varchar(50) NOT NULL,
  `NumeroTelefono` varchar(11) DEFAULT NULL,
  `Indirizzo` varchar(70) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;