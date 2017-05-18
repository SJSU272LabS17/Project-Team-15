
DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `EventId` int(20) NOT NULL AUTO_INCREMENT,
  `EventName` varchar(500) DEFAULT NULL,
  `EventDescription` varchar(1000) DEFAULT NULL,
  `EventType` varchar(20) DEFAULT NULL,
  `OrganizerId` int(11) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Qty` int(11) DEFAULT NULL,
  `EventDate` varchar(50) DEFAULT NULL,
  `images` varchar(500) DEFAULT NULL,
  `status` varchar(50) DEFAULT "TEMP", PRIMARY KEY (`EventId`),
  KEY `FkOrganizerId_idx` (`OrganizerId`),
  CONSTRAINT `FkOrganizerId` FOREIGN KEY (`OrganizerId`) REFERENCES `user` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;







-- Dump completed on 2016-10-16 23:36:17


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('Forum on the Road','Forum on the Road is back for a second series of live broadcasts across the Bay Area. During Forums two-hour program at the Computer History Museum, KQED host Michael Krasny will discuss technology and issues facing Silicon Valley.','GEEK',12, 15.0, 10, '2017-10-24 10:00:00','historyMMeusium.png','PERM');




-- for Couple Events page


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status)
values ('Splatter Date for Two with Chocolates, Champagne, and More at Pinspiration',
'The Splatter Date includes one large canvas or two small canvases, chocolates, and two glasses of champagne.',
'LOVER',12, 71.0, 10, '2017-10-25 10:00:00','SplatterDate.PNG','PERM');






insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status)
values ('Romantic Couples dinner on the Beach',
'Fall in love again with our private dinner on our beautiful beach.For the ultimate in romantic evenings, allow our talented culinary team to create an unforgettable private candle-lit meal for you under the stars—complete with Couples private label wine,
three delectable courses of Caribbean—inspired cuisine and the soothing sounds of the waves lapping onto the beach.',
'LOVER',12, 120.0, 15, '2017-10-28 10:00:00','Romantic-coupledinneronbeach.PNG','PERM');



insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status)
values ('Delicious Duet (or Couples) Spa Package',
'Kiss your stress goodbye with this tasty package! Start out by spending quality time detoxifying in our infrared sauna.
You will then be whisked away to receive a Full Body Dry Brush Exfoliation treatment, a delicious 60 minute Swedish massage
using Viva’s very own Oh So Coconut-Vanilla Whipped Body Butter, and a hot steam towel treatment.',
'LOVER',12, 15.0, 10, '2017-09-18 10:00:00','spaCouple.jpg','PERM');



insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status)
values ('Monte Carlo Resort and Casino',
'Monte Carlo Resort and Casino surrounds guests with style on the Las Vegas Strip. The sprawling resort is home to multiple bars and restaurants catering to a host of international tastes. Their welcoming BLVD Plaza is reminiscent of Italian piazzas and makes for an excellent place to shop and mingle. At the end of the day,
retire to your room, which is outfitted with an Italian-marble entry and bathroom plus a 40-inch LCD TV.',
'FRIENDS',12, 39.0, 10, '2017-06-9 10:00:00','Monte_Freek.jpg','PERM');



insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status)
values ('Google I/O conference from 17th May-19th May,2017',
'I/O is an outdoor developer festival with hands-on learning, technical talks, and
Googlers on-hand to share their insights, Google I/O is returning for the second year at Shoreline Amphitheatre..',
'GEEK',12, 39.0, 10, '2017-05-17 10:00:00','GoogleIO.jpg','PERM');


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('BOLLYWOOD NIGHT','Bollywood Night Fun filled night of excitement with a dance floor that will definitely make you stay all night long. Join Party – Hearty. Let’s Dance whole Night’ it’s going to be biggest party in town','FREAK',12, 15.0, 20, '2017-10-24','party1.jpg','PERM');


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('MIDNIGHT CRUISE ','Take a 3 Hour Cruise aboard the Fume Blanc of Commodore Cruises a 4 million dollar, 340 passanger, luxury vessel. It is a Hudson Steamboat Replica with 3 floors, 2 DJs, and amazing views of the Bay Bridge, Golden Gate Bridge, Nob Hill, Alcatraz, and the Spectacular San Francisco Skyline.','FREAK',12, 25.00, 340, '2017-07-20','cruise.jpg','PERM');


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('MASQUERADE BALL ','If you have been to our Masquerade Balls, you know how much fun they are. Join us for the night of glamour, music, and dancing as we celebrate at The REDWOOD ROOM inside the iconic San Francisco CLIFT HOTEL!','FREAK',12, 20.00, 25, '2017-08-10','Mask.jpg','PERM');



insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('TREKKING','Jog your way from the crashing surf of Ocean Beach through wooded Land’s End, catching stunning views of the Bay and its iconic sights.','ADVENTURE',12, 15.0, 20, '2017-10-24','trekk.jpg','PERM');


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('SNORKELING ','Set sail from the white shores of Sayulita on a guided snorkeling adventure around the Marietas Islands. Dive into the pristine waters to uncover the amazing world that lies below.','ADVENTURE',12, 20.00, 5, '2017-08-10','snork.jpg','PERM');


insert into events(EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images,status) values ('RIVER RAFTING ','Have a blast on this two-part tour that combines some wild river rafting with a tour of the Hoover Dam. Paddle down the Colorado River as you work your way toward Willow Beach before wandering through the Hoover Dam on a guide tour.','ADVENTURE',12, 25.0, 30, '2017-07-20','rafting.png','PERM');