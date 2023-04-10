-- Database Section
-- ________________ 

create database onePiece;
use onePiece;


-- Tables Section
-- _____________ 

create table ACCOUNT (
     idUser int not null auto_increment,
     nome varchar(50) not null,
     cognome varchar(50) not null,
     email varchar(50) not null,
     telefono varchar(50) not null,
     dataNascita date not null,
     password varchar(250) not null,
     nickname varchar(50) not null,
     IdPersonaggio int not null,
     constraint IDACCOUNT_ID primary key (idUser));

create table AMICIZIA (
     followed int not null,
     follower int not null,
     constraint GRAMICIZIA primary key (followed, follower));

create table COMMENTO (
     idCommento int not null auto_increment,
     idPost int,
     idUser int,
     Contenuto varchar(250) not null,
     dataCommento datetime not null,
     constraint IDCOMMENTO primary key (idCommento));

create table NOTIFICA (
     idNotifica int not null auto_increment,
     idTipo int not null,
     dataNotifica datetime not null,
     notificaAperta boolean not null,
     idFollower int not null,
     idUser int not null,
     constraint IDNOTIFICA primary key (idNotifica));

create table TipoNotifica (
     idTipo int not null auto_increment,
     Testo varchar(500) not null,
     constraint IDTipoNotifica_ID primary key (idTipo));

create table MIPIACE (
     idLike int not null auto_increment,
     idUser int not null,
     idPost int not null,
     constraint IDLIKE primary key (idLike));

create table PERSONAGGI (
     idPersonaggio int not null auto_increment,
     nome varchar(50) not null,
     linkImmagine varchar(100) not null,
     constraint IDPERSONAGGI primary key (idPersonaggio));

create table POST (
     idPost int not null auto_increment,
     Titolo varchar(200) not null,
     Testo varchar(700) not null,
     idUser int not null,
     dataPost datetime not null,
     immaginePost varchar(100) not null,
     constraint IDPOST_ID primary key (idPost));


-- Constraints Section
-- ___________________ 



alter table ACCOUNT add constraint FKR
     foreign key (IdPersonaggio)
     references PERSONAGGI (idPersonaggio);

alter table AMICIZIA add constraint FKfollower
     foreign key (follower)
     references ACCOUNT (idUser);

alter table AMICIZIA add constraint FKfollowed
     foreign key (followed)
     references ACCOUNT (idUser);


alter table NOTIFICA add constraint FKR_1_FK
     foreign key (idTipo)
     references TipoNotifica (idTipo);

alter table MIPIACE add constraint FKR1
     foreign key (idUser)
     references ACCOUNT (idUser);

alter table MIPIACE add constraint FKR_2
     foreign key (idPost)
     references POST (idPost);

-- inserimento personaggi
INSERT INTO personaggi (IdPersonaggio, nome, linkImmagine)
VALUES (1, 'Monkey D. Rufy', 'Lufy'),
 (2, 'Roronoa Zoro', 'Zoro'),
 (3, 'Nami', 'Nami'),
 (4, 'Usop', 'Usop'),
 (5, 'Nico Robin', 'Robin'),
 (6, 'TonyTony Chopper', 'Chopper'),
 (7, 'Vinsmoke Sanji', 'Sanji'),
 (8, 'Jinbe', 'Jimbe'),
 (9, 'Shanks il Rosso', 'Shanks');

-- inserimento descrizione tipo notifiche
INSERT INTO TipoNotifica (idTipo, testo)
VALUES (1, 'ha iniziato a seguirti'),
 (2, 'ha commentato un tuo articolo'),
 (3, 'adora un tuo articolo');

-- inserimento account
INSERT INTO `account`(`idUser`, `nome`, `cognome`, `email`, `telefono`, `dataNascita`, `password`, `nickname`, `IdPersonaggio`)
VALUES (1,'Simone','Bollini','simone.bollini@studio.unibo.it','0541678899','1988-05-22','Progetto88','bollo',6),
(2,'Giulia','Ceccoli','giulia.ceccoli@prova.it','0541678899','1990-05-22','Prova1','cecca',1),
(3,'Mario','Rossi','rosso@prova.it','0541678899','1990-03-22','Rosso1','rosso',3),
(4,'Gino','Pino','gino@prova.it','054167882','1993-03-22','Gino1','Pino',6);

-- inserimento amicizie

INSERT INTO `amicizia`(`followed`, `follower`)
VALUES (1,2),(1,3),(1,4),(2,1),(2,4),(3,1),(4,3);

-- inserimento post
INSERT INTO `post`(`idPost`, `Titolo`, `Testo`, `idUser`, `dataPost`, `immaginePost`)
VALUES (1,'La flotta dei 7','La Flotta dei sette era un un gruppo di sette potenti e temuti pirati che collaboravano con il Governo Mondiale in cambio della sospensione della loro taglia. Era stata costituita per arginare il potere degli imperatori e spaventare i nuovi pirati.',1,'2023-04-10 21:40:25','flottadei7.jpg'),
(2,'Shanks','Da capitano ha sempre indossato una camicia bianca sbottonata, un mantello nero e dei sandali. Durante il suo incontro con Rufy indossava dei pantaloni marroni ed una fascia rossa alla vita, mentre in seguito indossa dei pantaloni con un motivo floreale. Già dalletà di nove anni, portava invece il cappello di paglia che poi donò a Rufy.',1,'2023-04-10 21:42:01','shanks.jpg'),
(3,'Jimbey','Durante il viaggio verso Marineford, Rufy racconta a Jinbe i momenti vissuti con Ace finché non prese il mare tre anni prima di lui. I due fratelli si sono ritrovati nel regno di Alabasta e in quelloccasione Ace gli ha spiegato di essere alla ricerca di un uomo di nome Barbanera. Inoltre prima di separarsi gli ha donato la Vivre Card che ora Rufy sta utilizzando. Jinbe ripensa così a quando, durante la fuga da Impel Down, il gruppo di evasi ha incontrato proprio Teach a la sua ciurma.',2,'2023-04-10 21:46:53','jimbeyArlog.jpg'),
(4,'Skypiea','Skypiea è unisola che si trova nel cielo, sopra alla Rotta Maggiore. Comprende Angel Island, una vera e propria isola di nuvole, e lUpper Yard, composto invece da terreno solido.',2,'2023-04-10 21:49:30','skypiea.jpg'),
(5,'Sogeking','Usop è stato molto dubbioso delle sue potenzialità fino alle vicende di Enies Lobby. Infatti qui, sotto la veste di Sogeking, ha scoperto, anche grazie alle parole di Sanji, che in veste di cecchino risultava fondamentale per la ciurma. Ha un forte attaccamento alla vita, tanto da ammettere di non riuscire minimamente a concepire il codice donore dei samurai, che desiderano la morte, perché bisogna continuare a vivere anche se caduti in disgrazia.',3,'2023-04-10 21:51:31','sogeking.jpg'),
(6,'Capone Bege','Bege è una persona che tiene molto al comportamento e alle convenzioni: rimane infatti molto seccato di fronte a cose come la maleducazione a tavola e la scortesia. Spesso si mostra calmo e fiducioso di sé al punto da sembrare una persona sofisticata, sebbene in realtà certe volte è molto impaziente e di temperamento istintivo, disposto a ferire anche i suoi compagni se osano infastidirlo. Grazie alla sua profonda raffinatezza, Bege tiene molto alla pulizia ed alligiene, al punto da far fare un bagno a coloro che deve incontrare in modo da renderli meglio presentabili. Fa inoltre vestire elegantemente persino i prigionieri nemici se devono incontrarlo.',4,'2023-04-10 22:01:50','badge.jpg');

-- inserimento commenti
INSERT INTO `commento`(`idCommento`, `idPost`, `idUser`, `Contenuto`, `dataCommento`) 
VALUES (1,2,2,'Adoro Shanks','2023-04-10 21:47:30'),
(2,2,3,'anche io adoro Shanks, non vedo lora che Ruffy lo incontri di nuovo','2023-04-10 21:52:25'),
(3,1,3,'Il mio preferito era Don Flamingo!!!','2023-04-10 21:52:59'),
(4,1,4,'Il mio Baggie','2023-04-10 22:02:50'),
(5,3,4,'Che cavaliere!!!','2023-04-10 22:03:31'),
(6,6,1,'Che tipo Capone!','2023-04-10 22:47:30');

-- inserimento mi piace
INSERT INTO `mipiace`(`idLike`, `idUser`, `idPost`)
VALUES (1,2,2),(2,3,2),(3,3,1),(4,4,2),(5,4,3),(6,4,1),(7,1,6),(8,3,6);

-- inserimento notifiche
INSERT INTO `notifica`(`idNotifica`, `idTipo`, `dataNotifica`, `notificaAperta`, `idFollower`, `idUser`) 
VALUES (1,1,'2023-04-10 21:42:32',-1,1,2),
(2,1,'2023-04-10 21:42:32',-1,1,3),
(3,1,'2023-04-10 21:42:32',0,2,1),
(4,3,'2023-04-10 21:42:32',-1,2,1),
(5,2,'2023-04-10 21:42:32',0,2,1),
(6,1,'2023-04-10 21:42:32',-1,3,1),
(7,2,'2023-04-10 21:42:32',-1,3,1),
(8,3,'2023-04-10 21:42:32',-1,3,1),
(9,3,'2023-04-10 21:42:32',-1,3,1),
(10,2,'2023-04-10 21:42:32',0,3,1),
(11,1,'2023-04-10 21:42:32',-1,3,4),
(12,3,'2023-04-10 21:42:32',0,4,1),
(13,1,'2023-04-10 21:42:32',-1,4,2),
(14,1,'2023-04-10 21:42:32',-1,4,1),
(15,2,'2023-04-10 21:42:32',-1,4,1),
(16,3,'2023-04-10 21:42:32',-1,4,2),
(17,2,'2023-04-10 21:42:32',-1,4,2),
(18,3,'2023-04-10 21:42:32',-1,4,1),
(19,3,'2023-04-10 21:42:32',-1,1,4),
(20,2,'2023-04-10 21:42:32',-1,1,4),
(21,3,'2023-04-10 21:42:32',-1,3,4);