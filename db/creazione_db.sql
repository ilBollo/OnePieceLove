-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema onepiece
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema onepiece
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onepiece` DEFAULT CHARACTER SET utf8 ;
USE `onepiece` ;

-- -----------------------------------------------------
-- Table `onepiece`.`autore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onepiece`.`autore` (
  `idautore` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `attivo` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idautore`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `onepiece`.`articolo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onepiece`.`articolo` (
  `idarticolo` INT NOT NULL AUTO_INCREMENT,
  `titoloarticolo` VARCHAR(100) NOT NULL,
  `testoarticolo` MEDIUMTEXT NOT NULL,
  `dataarticolo` DATE NOT NULL,
  `anteprimaarticolo` TINYTEXT NOT NULL,
  `imgarticolo` VARCHAR(100) NOT NULL,
  `autore` INT NOT NULL,
  PRIMARY KEY (`idarticolo`),
  INDEX `fk_articolo_autore_idx` (`autore` ASC),
  CONSTRAINT `fk_articolo_autore`
    FOREIGN KEY (`autore`)
    REFERENCES `onepiece`.`autore` (`idautore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `onepiece`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onepiece`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nomecategoria` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `onepiece`.`articolo_ha_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onepiece`.`articolo_ha_categoria` (
  `articolo` INT NOT NULL,
  `categoria` INT NOT NULL,
  PRIMARY KEY (`articolo`, `categoria`),
  INDEX `fk_articolo_has_categoria_categoria1_idx` (`categoria` ASC),
  INDEX `fk_articolo_has_categoria_articolo1_idx` (`articolo` ASC),
  CONSTRAINT `fk_articolo_has_categoria_articolo1`
    FOREIGN KEY (`articolo`)
    REFERENCES `onepiece`.`articolo` (`idarticolo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_articolo_has_categoria_categoria1`
    FOREIGN KEY (`categoria`)
    REFERENCES `onepiece`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
