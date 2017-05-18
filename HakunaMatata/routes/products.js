var mysql = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'HMLog.log' })
	]
});

exports.getProductsPage = function(req,res){
	//res.render('products',{validationMessage:'Empty Messgage'});

	//Checks before redirecting whether the session is valid
	if(req.session.userid)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		//res.render("homepage",{userid:req.session.userid});
		res.render('products',{validationMessage:'Empty Messgage'});
	}
	else
	{
		res.redirect('/signin');
	}

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

exports.userAddToCart = function(req,res){
	console.log("In userAddToCart method.");
	
	var ItemId = req.param("ItemId");
	var Qty = 	 req.param("Qty");
	var UserId =  req.session.userid;
	
	console.log("Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);
	logger.log('info', "Add to cart for: "+UserId+" itemId: "+ItemId+" Qty:"+Qty);

	if(UserId != undefined ) {
		var userAddToCartQuery = "INSERT INTO usercart(`UserId`,`ItemId`,`Qty`)VALUES(" + UserId + "," + ItemId + "," + Qty + ");";
		console.log("Query:: " + userAddToCartQuery);
		logger.log('info', "Query:: " + userAddToCartQuery);

		mysql.fetchData(function (err, results) {
			if (err) {
				throw err;
				logger.log('error', "Error:: " + err);
			}
			else {
				if (results.length > 0) {
					logger.log('info', 'Items loaded in the cart of user' + UserId);
					json_responses = {
						"statusCode": 200,
						"results": results
					};

					res.send(json_responses);
				}
				else {
					console.log("No items to display");
					logger.log('info', "No items to display for usrId" + UserId);
					json_responses = {"statusCode": 401};
					res.send(json_responses);
				}
			}
		}, userAddToCartQuery);
	}
	/*else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}*/
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