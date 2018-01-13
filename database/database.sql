-- CREATE DATABASE `shadok_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cosmogole` int(11) NOT NULL DEFAULT '0',
  `is_recruter` tinyint(1) NOT NULL DEFAULT '0',
  `is_plan_construction` tinyint(1) NOT NULL DEFAULT '0',
  `is_transfert_connaissance` tinyint(1) NOT NULL DEFAULT '0',
  `is_universite` tinyint(1) NOT NULL DEFAULT '0',
  `recruter_prix` int(11) NOT NULL,
  `timer_interval` int(11) NOT NULL DEFAULT '2000',
  `producteur_interval` int(11) NOT NULL DEFAULT '10000',
  `producteur_count` int(11) NOT NULL DEFAULT '1',
  `producteur_prix` int(11) NOT NULL,
  `plan_construction_prix` int(11) NOT NULL,
  `coefficient` double NOT NULL,
  `transfert_connaissance_prix` int(11) NOT NULL,
  `constructeur_count` int(11) NOT NULL DEFAULT '1',
  `constructeur_prix` int(11) NOT NULL,
  `constructeur_interval` int(11) NOT NULL DEFAULT '10000',
  `last_update` datetime NOT NULL,
  `universite_count` int(11) NOT NULL DEFAULT '1',
  `universite_prix` int(11) NOT NULL,
  `universite_interval` int(11) NOT NULL DEFAULT '10000',
  `universite_shadok_prix` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
INSERT INTO `users` (`id`,`username`,`password`,`cosmogole`,`is_recruter`,`is_plan_construction`,`is_transfert_connaissance`,`is_universite`,`recruter_prix`,`timer_interval`,`producteur_interval`,`producteur_count`,`producteur_prix`,`plan_construction_prix`,`coefficient`,`transfert_connaissance_prix`,`constructeur_count`,`constructeur_prix`,`constructeur_interval`,`last_update`,`universite_count`,`universite_prix`,`universite_interval`,`universite_shadok_prix`) VALUES (1,'houssem','$2a$10$3ULrYpAly8zjsWXoxGUKs.TyKJp0/wKwCVWMUEW2luJj3UIkBCy6S',342657669,1,1,1,1,20,2000,10000,8234743,153904428,20,1.4,20,27247,422313752,10000,'2018-01-13 01:55:48',53,827734955,10000,20);
INSERT INTO `users` (`id`,`username`,`password`,`cosmogole`,`is_recruter`,`is_plan_construction`,`is_transfert_connaissance`,`is_universite`,`recruter_prix`,`timer_interval`,`producteur_interval`,`producteur_count`,`producteur_prix`,`plan_construction_prix`,`coefficient`,`transfert_connaissance_prix`,`constructeur_count`,`constructeur_prix`,`constructeur_interval`,`last_update`,`universite_count`,`universite_prix`,`universite_interval`,`universite_shadok_prix`) VALUES (3,'test','$2a$10$ISDFL/fBBDmq7e.PYed7/uEWqk0xjVU.v0P1Bko3k7I/bCCNtkaV2',1029744,1,1,1,0,20,2000,10000,1154,1181,20,1.4,20,1,20,10000,'2018-01-12 12:03:02',1,20,10000,20);
INSERT INTO `users` (`id`,`username`,`password`,`cosmogole`,`is_recruter`,`is_plan_construction`,`is_transfert_connaissance`,`is_universite`,`recruter_prix`,`timer_interval`,`producteur_interval`,`producteur_count`,`producteur_prix`,`plan_construction_prix`,`coefficient`,`transfert_connaissance_prix`,`constructeur_count`,`constructeur_prix`,`constructeur_interval`,`last_update`,`universite_count`,`universite_prix`,`universite_interval`,`universite_shadok_prix`) VALUES (4,'coucou','$2a$10$/R2YG4CSZweDcekU30pGNOSh1w9Mp7TICbWW06k95a0islIkDKGWG',29,1,1,0,0,20,2000,10000,2,28,20,1.4,20,1,20,10000,'2018-01-11 23:02:00',1,20,10000,20);
