-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `pk_genre_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  PRIMARY KEY (`pk_genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Action'),(2,'Adventure'),(3,'Horror'),(4,'Drama'),(5,'Romance'),(6,'Thriller'),(7,'Comedy'),(8,'Mystery'),(15,'Sci-Fi'),(18,'Fantasy');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `pk_movie_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `year` int NOT NULL,
  `running_time` int NOT NULL,
  `banner_link` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `about` text COLLATE utf8mb4_czech_ci,
  PRIMARY KEY (`pk_movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (9,'Dune',2021,155,'http://localhost:8080/images/dune.jpg','Kultovní sci-fi dílo vypráví o mocenských bojích uvnitř galaktického Impéria, v nichž jde o ovládnutí planety Arrakis: zdroje vzácného koření - melanže, jež poskytuje zvláštní psychické schopnosti, které umožňují cestování vesmírem. Padišáh imperátor svěří správu nad Arrakisem a s ní i komplikovanou těžbu neobyčejné látky vévodovi rodu Atreidů. Celá anabáze je ale součástí spiknutí, z něhož se podaří vyváznout jen vévodovu synovi Paulovi a jeho matce, kteří uprchnou do pouště. Jejich jedinou nadějí jsou nedůvěřiví domorodí obyvatelé fremeni, schopní trvale přežít ve vyprahlé pustině. Mohl by Paul Atreides být spasitelem, na kterého tak dlouho čekají?'),(10,'Venom',2018,112,'http://localhost:8080/images/venom.jpg','Na filmová plátna přichází jedna z nejlepších a nejkomplexnějších comicsových postav společnosti Marvel. Novinář Eddie Brock (Tom Hardy) se stává hostitelem mimozemského symbionta Venoma. Brock se v rámci své práce novináře pokouší již po celé roky odhalit veřejnosti skutečnou tvář známého vědce společnosti Life Foundation Carltona Drakea (Riz Ahmed) – jeho odhodlání se přerodilo v posedlost, která mu zlikvidovala kariéru a zničila vztah s jeho přítelkyní Anne (Michelle Williams). Když do svého těla Eddie vstřebá jeden z Drakeových experimentů – mimozemšťana Venoma – zničehonic zjišťuje, že disponuje novými superschopnostmi a má možnost dělat, cokoliv se mu zachce. Zvrhlý, temný, nepředvídatelný a zuřivý Venom má za následek, že se Eddie zoufale pokouší udržet pod kontrolou své nebezpečné schopnosti, které ho současně velice přitahují a opájejí. Jelikož Eddie a Venom navzájem jeden druhého potřebují k dosažení svých cílů, jejich vzájemné pouto a propojení se prohlubuje – až přestává být jasné, kde vlastně končí Eddie a začíná Venom.'),(11,'Star Wars: Epizoda III - Pomsta Sithů',2005,140,'http://localhost:8080/images/star_wars_3.png','Válka mezi povstalci a Republikou pokračuje. Generálovi Grievousovi se podařilo unést kancléře Palpatinea a rytíři Jedi, Obi-wan Kenobi a Anakin Skywalker se vydávají na palubu Grievousovy lodi kancléře osvobodit. Poté, co vniknou na loď, narazí na hraběte Dooku. Dojde mezi nimi k souboji, ve kterém Anakin Dookua porazí, a chystá se ho zajmout. Ještě svázaný Palpatine však Anakina přemluví, aby Dookua na místě zabil. Je to něco, co by správný Jedi neměl nikdy udělat. Anakin však přemlouvání podlehne. I když rytíři Jedi Palpatina zachránili, jsou vzápětí znovu zajati vojáky generála Grievouse. Ten ale rytíře Jedi podcenil, a tak se situace brzy obrátí a je to právě generál, kdo z lodi, kterou opět ovládli Jediové, musí prchnout v záchranném modulu. Anakin rozpadající se Grievousovu loď přivede bezpečně na letiště a rázem se stane hrdinou a tím, kdo zachránil kancléře. Kancléř zahrnuje Anakina svým přátelstvím a ostatní Jediové cítí, že něco není v pořádku. Anakina pronásledují zlé sny, v nich se mu zdá, jak jeho milovaná Padmé (Amidala) umírá při porodu jejich dětí. Anakin se se svými obavami obrátí na Yodu se žádostí o pomoc. Yodovy rady mu však nepomohou a ještě více posílí Anakinovy pochybnosti ohledně chování Jediů, kteří po něm chtějí, aby jim donášel informace o chování kancléře. Dalším šokem pro Anakina je zjištění, že i Padmé pochybuje o současném fungování Republiky.'),(12,'Pán prstenů: Společenstvo Prstenu',2001,172,'http://localhost:8080/images/lotr_1.png','V dávných dobách byl vykován kouzelný prsten, který vlastnil pán Mordoru Sauron. Jeho moc začal využívat k šíření zla, ale o prsten nakonec v boji přišel, a ten na dlouhá léta zmizel. Nakonec ho našel hobit Bilbo Pytlík, který díky němu přestal stárnout. Na naléhavou žádost čaroděje Gandalfa předá prsten synovci Frodovi. Ten se svými kamarády Samem, Smíškem a Pipinem odcházejí do Hůrky a Gandalf se vydává pro radu za svým učitelem, čarodějem Sarumanem. Ten se však přidal na stranu zla a zajme ho. S pomocí tajemného hraničáře, přezdívaného Chodec, Frodo a jeho kamarádi uniknou jen o vlásek devíti černým jezdcům, kteří vyrazili z Temné věže, aby prsten našli a přinesli svému pánovi Sauronovi. Do Roklinky je svolána velká porada lidí a elfů, která rozhodne, že prsten musí být zničen. To je možné pouze tam, kde byl prsten zrozen, v ohni Hory osudu. Odvážný Frodo se nabídne, že tam prsten odnese. Nebezpečí je však příliš veliké, a tak se mu, jako jeho ochránci, postaví po bok čaroděj Gandalf, trpaslík Gimli, elf Legolas, bojovník Boromir, hobiti Sam, Smíšek a Pipin a také Chodec. Zrodí se Společenstvo Prstenu, které se vydává na nebezpečnou cestu plnou nástrah a nebezpečí.'),(53,'The Matrix',1999,136,'http://localhost:8080/images/matrix_1.png','Za vším hledej Matrix. Zdál se vám někdy sen, který působil naprosto skutečně? Co kdybyste se nemohli probudit? Jak poznáte rozdíl mezi sněním a realitou? Když záhadná kráska Trinity (Carrie-Anne Moss) zavede počítačového hackera jménem Neo (Keanu Reeves) do tajemného paralelního světa, odhalí mu šokující pravdu - svět je podvod, propracovaný klam překroucený všemocnými stroji umělé inteligence, která nás ovládá. Neo se přidává k legendárnímu vůdci odboje Morfeovi (Laurence Fishburne) v bitvě za zničení iluze zotročující lidstvo. Každý pohyb, každá sekunda a každá myšlenka znamená boj o přežití - o únik z Matrixu.');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_has_genre`
--

DROP TABLE IF EXISTS `movie_has_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_has_genre` (
  `pk_fk_movie_id` bigint NOT NULL,
  `pk_fk_genre_id` bigint NOT NULL,
  PRIMARY KEY (`pk_fk_movie_id`,`pk_fk_genre_id`),
  KEY `FKsmtwrwca7l1jaul4p7e8nxp13` (`pk_fk_genre_id`),
  KEY `FK9h6d7q4xsyff2apgea8cvbmmq` (`pk_fk_movie_id`),
  CONSTRAINT `FK9h6d7q4xsyff2apgea8cvbmmq` FOREIGN KEY (`pk_fk_movie_id`) REFERENCES `movie` (`pk_movie_id`),
  CONSTRAINT `FKsmtwrwca7l1jaul4p7e8nxp13` FOREIGN KEY (`pk_fk_genre_id`) REFERENCES `genre` (`pk_genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_has_genre`
--

LOCK TABLES `movie_has_genre` WRITE;
/*!40000 ALTER TABLE `movie_has_genre` DISABLE KEYS */;
INSERT INTO `movie_has_genre` VALUES (9,1),(10,1),(11,1),(12,1),(53,1),(9,2),(11,2),(12,2),(9,4),(10,6),(9,15),(10,15),(11,15),(53,15),(11,18),(12,18);
/*!40000 ALTER TABLE `movie_has_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `pk_review_id` bigint NOT NULL AUTO_INCREMENT,
  `fk_user_id` bigint NOT NULL,
  `fk_movie_id` bigint NOT NULL,
  `text` text COLLATE utf8mb4_czech_ci NOT NULL,
  PRIMARY KEY (`pk_review_id`),
  KEY `FKo0tw35ysf0aojmaa17byiny43` (`fk_movie_id`),
  KEY `FKe6nrxx0ukffydwk2w4lj3xvaa` (`fk_user_id`),
  CONSTRAINT `FKe6nrxx0ukffydwk2w4lj3xvaa` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`pk_user_id`),
  CONSTRAINT `FKo0tw35ysf0aojmaa17byiny43` FOREIGN KEY (`fk_movie_id`) REFERENCES `movie` (`pk_movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (4,1,11,'docela dobry film'),(5,5,10,'this review is coming from postman'),(8,3,9,'It is ok, could be worse'),(9,2,9,'It is bad, could be better'),(13,9,12,'proste delo'),(14,1,9,'this review is coming from angular page'),(15,11,11,'dobry vecer, film je poggers'),(16,1,12,'nejlepsi movie EVER!!!!!!!'),(17,4,12,'nic tohle neporazi, 5/5 hvezdicek');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `pk_user_id` bigint NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `email` varchar(90) COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(130) COLLATE utf8mb4_czech_ci NOT NULL,
  `is_admin` bit(1) NOT NULL,
  PRIMARY KEY (`pk_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'GreenGoblin75','joe.doe@gmail.com','$2a$10$SGwfun/UssJEjSomGCDwNuGqdKJffgSZL1AqJ52byGxIITMW2fL9y',_binary ''),(2,'DocOc1258','peter.small@gmail.com','$2a$10$3t1N726EDSoKStaNYTjbVudx5QBKSTcjBJDQz2ojMwF0i5TJnz0ja',_binary '\0'),(3,'BigKarelPrague','karel@gmail.com','$2a$10$wjvss1/n2yHyGhDQQi0yT.NqkpnQeuerWAN1D8iHKZ4lxKe4NKRie',_binary '\0'),(4,'lucie48','lucie.small@seznam.cz','$2a$10$545ueqSnfxP5AEZpuNeynOveyrUSp.5P0W1PDdCR0xcxEJCE8cUjO',_binary ''),(5,'PostmanCreatedUser','HELLOTHERE@gmail.com','$2a$10$8sgg4Be6SYajYu/MIrXI7eCMhLGYqYo7cKknlJE3c3j6.GHu9UCIC',_binary ''),(9,'willYouRegisterMe','registerMe@gmail.com','$2a$10$DgugMaYYCv4RKTffizv24e/hJLcJU517Dn/wIfS32PqQLNmQCX5V.',_binary '\0'),(10,'blue485','david@hotmail.com','$2a$10$FCLZaahSGdX3KGttCIE4buIrvgDBFP1F6YZSv158mK6qOmLrNDrW2',_binary '\0'),(11,'newAccount85','nice@seznam.cz','$2a$10$2QxfoTGRVX59FNZRP7t/6u0PGiBcmC6TuMCwJ64seEQXLhtn1HUHm',_binary '\0'),(14,'bobbob','bobbob@gmail.com','$2a$10$VMOTZqq7T.PTXAYktquBy.BOQmWZAF9oYYE74ywjMEZLSFET1Zyaq',_binary '\0'),(15,'userAngular','angular@seznam.cz','$2a$10$iCbdc4gNTXMyfoCKfZukcOCM1.reQwrpKGwjbEeJchD8z/4qCZqwO',_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-02 20:27:35
