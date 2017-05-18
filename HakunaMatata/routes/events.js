var mysql = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'HMLog.log' })
	]
});

exports.geekEvents = function(req,res){
	//res.render('products',{validationMessage:'Empty Messgage'});

	//Checks before redirecting whether the session is valid
	/*if(req.session.userid)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		//res.render("homepage",{userid:req.session.userid});
		res.render('geekEvents',{validationMessage:'Empty Messgage'});
	}
	else
	{
		res.redirect('/signin');
	} */
    res.render('geekEvents',{validationMessage:'Empty Messgage'});
};

exports.getGeekEvents = function(req,res){
    console.log("In getGeekEvents.");

    var getGeekEventsQuery = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images from events where Qty>0 and EventType = 'GEEK'";
    console.log("Query:: " + getGeekEventsQuery);
    logger.log('info', "Query:: " + getGeekEventsQuery);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getGeekEventsQuery );
};
// added by Suchi
exports.loverEvents = function(req,res){
    res.render('loverEvents',{validationMessage:'Empty Messgage'});
};

exports.getLoverEvents = function(req,res){
    console.log("In getLoverEvents.");

    var getLoverEventsQuery = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images from events where Qty>0 and EventType = 'LOVER'";
    console.log("Query:: " + getLoverEventsQuery);
    logger.log('info', "Query:: " + getLoverEventsQuery);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getLoverEventsQuery );
};

exports.friendsEvents = function(req,res){
    res.render('friendsEvents',{validationMessage:'Empty Messgage'});
};

exports.getfriendsEvents = function(req,res){
    console.log("In getfriendsEvents.");

    var getfriendsEvents = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images from events where Qty>0 and EventType IN ('GEEK','FREAK','ADVENTURE','FRIENDS')";
    console.log("Query:: " + getfriendsEvents);
    logger.log('info', "Query:: " + getfriendsEvents);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getfriendsEvents );
};
// added by Suchi end

//added By Aashi

exports.freakEvents = function(req,res){
    res.render('freakEvents',{validationMessage:'Empty Messgage'});
};

exports.adventureEvents = function(req,res){
    res.render('adventureEvents',{validationMessage:'Empty Messgage'});
};

exports.getFreakEvents = function(req,res){
    console.log("In getFreakEvents.");

    var getFreakEventsQuery = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,Eventdate,images from events where Qty>0 and EventType = 'FREAK'";
    console.log("Query:: " + getFreakEventsQuery);
    logger.log('info', "Query:: " + getFreakEventsQuery);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getFreakEventsQuery );
};

exports.getAdventureEvents = function(req,res){
    console.log("In getAdventureEvents.");

    var getAdventureEventsQuery = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,Eventdate,images from events where Qty>0 and EventType = 'ADVENTURE'";
    console.log("Query:: " + getAdventureEventsQuery);
    logger.log('info', "Query:: " + getAdventureEventsQuery);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results.Eventdate);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getAdventureEventsQuery );
};
// Added By Aashi end

// Added by Karan
exports.getTempEvents = function(req,res){
    console.log("In GETtempEvents.");

    var getGeekEventsQuery = "select EventId,EventName,EventDescription,EventType,OrganizerId,Price,Qty,EventDate,images from events where Qty>0 and status = 'TEMP'";
    console.log("Query:: " + getGeekEventsQuery);
    logger.log('info', "Query:: " + getGeekEventsQuery);
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error', err);
        }
        else {
            if(results.length > 0) {
                logger.log('info', 'Results are loaded for user : '+req.session.userid);
                json_responses = {"statusCode" : 200,
                    "results" : results};
                console.log("GOT THE DATA");
                console.log(results);
                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', 'No items to display for user : '+req.session.userid);
                json_responses = {"statusCode" : 401};
                res.send(json_responses);
            }
        }
    }, getGeekEventsQuery );
};
exports.approveEvent = function(req,res){
    console.log("In approveEvent method.");

    var ItemId = req.param("ItemId");
    //  var UserId =  req.session.userid;

    //console.log("Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);
    //   logger.log('info', "Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);


    var approveEvents = "UPDATE events SET status = 'PERM' WHERE EventId = "+ItemId;
    console.log("Query:: " + approveEvents);
    logger.log('info', "Query:: " + approveEvents);

    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
            logger.log('error', "Error:: " + err);
        }
        else {
            if (results.length > 0) {
                logger.log('info', 'Items loaded in the cart of user' );
                json_responses = {
                    "statusCode": 200,
                    "results": results
                };

                res.send(json_responses);
            }
            else {
                console.log("No items to display");
                logger.log('info', "No items to display for usrId" );
                json_responses = {"statusCode": 401};
                res.send(json_responses);
            }
        }
    }, approveEvents);

    /*else {
     var json_responses = {"statusCode": 401};
     res.send(json_responses);
     }*/
};


// Added by Karan end
exports.getBagPackEvents = function(req,res){
    console.log("inside get All Products from cart for user: "+req.session.userid);

    var userId = req.session.userid;

    if(userId != undefined) {

        var getUserCartItemsQuery = "select uc.UserCartId, uc.EventId, i.EventName, i.EventDescription, i.images, i.EventType ,i.Price from usercart uc join events i on uc.EventId =  i.EventId where uc.UserId = '" + userId +"'";
		console.log("Query:: " + getUserCartItemsQuery);
        logger.log('info','Query:: ' + getUserCartItemsQuery);
        mysql.fetchData(function(err,results) {
            if(err) {
                throw err;
                logger.log('error',err);

            }
            else {
                if(results.length > 0) {
                    console.log("Successful got the user cart data");
                    logger.log('info','Successful got the user cart data' + userId);
                    json_responses = {"statusCode" : 200,
                        "results" : results};
                }
                else{
                    res.send(json_responses);
                    console.log("Invalid string.");
                    logger.log('info','No items in cart' + userId);
                    json_responses = {"statusCode" : 401, "Message":  "No items in cart"};
                }
                res.send(json_responses);
            }

        }, getUserCartItemsQuery);
    }

	/*else {
	 var json_responses = {"statusCode": 401};
	 res.send(json_responses);
	 }*/
};

exports.getAllProducts = function(req,res){
	console.log("In getAllProducts.");
		
		var getAllProductQuery = "select ItemId, ItemName,ItemDescription,ItemTypeId,SellerId,Price,Qty,DateAdded,IsBidItem, sold from item where IsBidItem=0 and Qty>0";
		console.log("Query:: " + getAllProductQuery);
		logger.log('info', "Query:: " + getAllProductQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error', err);
			}
			else {
				if(results.length > 0) {
					logger.log('info', 'Results are loaded for user : '+req.session.userid);
						json_responses = {"statusCode" : 200,
											"results" : results};
						
						res.send(json_responses);
				}
				else {
					console.log("No items to display");
					logger.log('info', 'No items to display for user : '+req.session.userid);
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			}
		}, getAllProductQuery );
};

exports.getAllProductsForAuction = function(req,res){
	console.log("In getAllProductsForAuction.");

		var getAllProductForAuctionQuery = "select i.ItemId, i.ItemName,i.ItemDescription,i.ItemTypeId,i.SellerId,i.Price,i.Qty,i.DateAdded,i.AuctionEndDate,i.IsBidItem,i.sold, max(b.BidAmount) as MaxBidAmount from item as i left join bidderList as b on i.ItemId = b.ItemId  where i.IsBidItem=1 and i.AuctionEndDate > NOW() group by i.ItemId, i.ItemName,i.ItemDescription,i.ItemTypeId,i.SellerId,i.Price,i.Qty,i.DateAdded,i.AuctionEndDate,i.IsBidItem, i.sold";
		console.log("Query:: " + getAllProductForAuctionQuery);
		logger.log('info', "Query:: " + getAllProductForAuctionQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error', err);
			}
			else {
				if(results.length > 0) {
					logger.log('info', 'Results are loaded for user (auction): '+req.session.userid);
					json_responses = {"statusCode" : 200,
											"results" : results};
						
						res.send(json_responses);
				}
				else {
					console.log("No items to display");
					logger.log('info', 'No results are loaded for user (auction): '+req.session.userid);
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			}
		}, getAllProductForAuctionQuery );
};

exports.eventAddToCart = function(req,res){
    console.log("In eventAddToCart method.");

    var EventId = req.param("EventId");
    var UserId =  req.session.userid;

    //console.log("Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);
    //logger.log('info', "Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);

    if(UserId != undefined ) {
        var userAddToCartQuery = "INSERT INTO usercart(`UserId`,`EventId`)VALUES(" + UserId + "," + EventId + ");";
        console.log("Query:: " + userAddToCartQuery);
        logger.log('info', "Query:: " + userAddToCartQuery);

        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
                logger.log('error', "Error:: " + err);
            }
            else {
                if (results.length > 0) {
                    logger.log('info', 'Items loaded in the cart of user');
                    json_responses = {
                        "statusCode": 200,
                        "results": results
                    };

                    res.send(json_responses);
                }
                else {
                    console.log("No items to display");
                    logger.log('info', "No items to display for usrId" );
                    json_responses = {"statusCode": 401};
                    res.send(json_responses);
                }
            }
        }, userAddToCartQuery);
    }
	else {
	 var json_responses = {"userId": "notFound"};
	 res.send(json_responses);
	 }
};

exports.addBidOnProduct = function(req,res){
	console.log("In addBidOnProduct method.");
	
	var ItemId = req.param("ItemId");
	var BidAmount = req.param("BidAmount");
	var UserId =  req.session.userid;

	if(UserId != undefined ) {
		var addBidOnProductQuery = "INSERT INTO bidderlist(BidderId,ItemId,BidAmount,BidTime)VALUES(" + UserId + "," + ItemId + "," + BidAmount + ",NOW());";
		console.log("Query:: " + addBidOnProductQuery);
		logger.log('info', "Query:: " + addBidOnProductQuery);
		mysql.fetchData(function (err, results) {
			if (err) {
				throw err;
			}
			else {
				if (results.length > 0) {
					logger.log('info', "Results from addBidOnProductQuery for userId:: " + UserId);
					json_responses = {
						"statusCode": 200,
						"results": results,
						"BidAmount": 0
					};

					res.send(json_responses);
				}
				else {
					console.log("No items to display");
					logger.log('info', "No, Results from addBidOnProductQuery for userId:: " + UserId);
					json_responses = {"statusCode": 401};
					res.send(json_responses);
				}
			}
		}, addBidOnProductQuery);
	}
	/*else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}*/
};

exports.getItemType = function(req,res){
	console.log("Inside getItemType Method.");
	
	var getItemTypeQuery = "SELECT ItemTypeId,ItemType FROM itemtype;";
	console.log("Query:: " + getItemTypeQuery);
	logger.log('info',"Query:: " + getItemTypeQuery);
	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
			logger.log('error',err);
		}
		else {
			if(results.length > 0) {
					console.log("Successful got All the ItemTypes.");
					logger.log('info',"Successful got All the ItemTypes.");

					json_responses = results;
			}
			else{
					res.send(json_responses);
					console.log("Invalid string.");
					logger.log('error', "zero itemsTypes retrived.");
					json_responses = {"statusCode" : 401};
			}
			res.send(json_responses);
		}	
		
	}, getItemTypeQuery);
	
};

exports.addProduct = function(req,res){
	console.log("Inside addProduct.");
	
	var SellerId = req.session.userid;
	
	var ItemName = req.param("ItemName");
	var ItemDescription = req.param("ItemDescription");
	var ItemTypeId = req.param("ItemTypeId");
	var Price = req.param("Price");
	var Qty = req.param("Qty");
	var IsBidItem = req.param("IsBidItem");
	var Sold = 0;

	if(IsBidItem==1)
	{
		Qty=1; // Bid can only happen on one item at a time.
	}
	var insertNewProductQuery = "INSERT INTO item (ItemName,ItemDescription,ItemTypeId,SellerId,Price,Qty,DateAdded,AuctionEndDate,IsBidItem,Sold) VALUES ('"+ItemName+"','"+ItemDescription+"',"+ItemTypeId+","+SellerId+","+Price+","+Qty+",NOW(),date_add(NOW(),INTERVAL 4 DAY),"+IsBidItem+","+Sold+")";

	console.log("Query:: " + insertNewProductQuery);
	logger.log('info',"Query:: " + insertNewProductQuery);

	if(SellerId != undefined ){
		mysql.fetchData(function (err, results) {
			if (err) {
				throw err;
				logger.log('error', err);
			}
			else {
				if (results.length > 0) {
					console.log("Successful added the item to Items table.");
					logger.log('info', 'Successful added the item to Items table for userId: ' + SellerId);
					json_responses = results;
				}
				else {
					res.send(json_responses);
					console.log("Invalid string.");
					logger.log('info', 'Zero items added for userId: ' + SellerId);
					json_responses = {"statusCode": 401};
				}
				res.send(json_responses);
			}

		}, insertNewProductQuery);
	}
	/*else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}*/
};