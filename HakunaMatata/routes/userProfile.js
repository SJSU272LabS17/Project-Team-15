var mysql = require('./mysql');
var winston = require('winston');

//for connection pool
//var mysqlConnetionPoolTest = require('./mysqlForConnectionPool');


var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'HMLog.log' })
	]
});

exports.accountdetails = function(req,res){
	
	//res.render('userProfile',{validationMessage:'Empty Message'});

	//Checks before redirecting whether the session is valid
	if(req.session.userid)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		//res.render("homepage",{userid:req.session.userid});
		res.render('userProfile',{validationMessage:'Empty Messgage'});
	}
	else
	{
		res.redirect('/signin');
	}


};

exports.getUserAccountDetails = function(req,res){
	
	console.log("userId: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined ) {
		var getUserAccountDetailsQuery = "select UserId,FirstName,LastName,EmailId,Password,Address,CreditCardNumber,DateOfBirth,LastLoggedIn from user where UserId= "+ userId+";";
		console.log("Query :: " + getUserAccountDetailsQuery);
		logger.log('info','Query:: ' + getUserAccountDetailsQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the user data");
						console.log("UserId :  " + userId);
						logger.log('info','Successful got the user data  for userId' + userId);

						json_responses = {"UserId" : results[0].UserId
											,"FirstName": results[0].FirstName
											,"LastName": results[0].LastName
											,"EmailId":results[0].EmailId
											,"Address":results[0].Address
											,"CreditCardNumber":results[0].CreditCardNumber
											,"DateOfBirth":results[0].DateOfBirth
											,"LastLoggedIn":results[0].LastLoggedIn
											};
						}
				else{
						res.send(json_responses);
						console.log('No data retrieved for userId' + userId);
						logger.log('info','No data retrieved for userId' + userId);

						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getUserAccountDetailsQuery);

	}
	else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}
};

//Connetion pool test starts

exports.getUserAccountDetailsWithoutConnetionPool = function(req,res){

	//console.log("userId: "+req.session.userid);

	var userId = 1;

	if(userId != undefined ) {
		var getUserAccountDetailsQuery = "select UserId,FirstName,LastName,EmailId,Password,Address,CreditCardNumber,DateOfBirth,LastLoggedIn from user where UserId= "+ userId+";";
		console.log("Query :: " + getUserAccountDetailsQuery);
		logger.log('info','Query:: ' + getUserAccountDetailsQuery);

		mysql.fetchDataWithoutPool(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);
			}
			else {
				if(results.length > 0) {
					console.log("Successful got the user data");
					console.log("UserId :  " + userId);
					logger.log('info','Successful got the user data  for userId' + userId);

					json_responses = {"UserId" : results[0].UserId
						,"FirstName": results[0].FirstName
						,"LastName": results[0].LastName
						,"EmailId":results[0].EmailId
						,"Address":results[0].Address
						,"CreditCardNumber":results[0].CreditCardNumber
						,"DateOfBirth":results[0].DateOfBirth
						,"LastLoggedIn":results[0].LastLoggedIn
					};
				}
				else{
					res.send(json_responses);
					console.log('No data retrieved for userId' + userId);
					logger.log('info','No data retrieved for userId' + userId);

					json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}

		}, getUserAccountDetailsQuery);

	}
	else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}
};


exports.getUserAccountDetailsWithConnetionPool = function(req,res){

	//console.log("userId: "+req.session.userid);

	var userId = 1;

	if(userId != undefined ) {
		var getUserAccountDetailsQuery = "select UserId,FirstName,LastName,EmailId,Password,Address,CreditCardNumber,DateOfBirth,LastLoggedIn from user where UserId= "+ userId+";";
		console.log("Query :: " + getUserAccountDetailsQuery);
		logger.log('info','Query:: ' + getUserAccountDetailsQuery);
		mysqlConnetionPoolTest.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);
			}
			else {
				if(results.length > 0) {
					console.log("Successful got the user data");
					console.log("UserId :  " + userId);
					logger.log('info','Successful got the user data  for userId' + userId);

					json_responses = {"UserId" : results[0].UserId
						,"FirstName": results[0].FirstName
						,"LastName": results[0].LastName
						,"EmailId":results[0].EmailId
						,"Address":results[0].Address
						,"CreditCardNumber":results[0].CreditCardNumber
						,"DateOfBirth":results[0].DateOfBirth
						,"LastLoggedIn":results[0].LastLoggedIn
					};
				}
				else{
					res.send(json_responses);
					console.log('No data retrieved for userId' + userId);
					logger.log('info','No data retrieved for userId' + userId);

					json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}

		}, getUserAccountDetailsQuery);

	}
	else {
		var json_responses = {"statusCode": 401};
		res.send(json_responses);
	}
};


//connetion pool test ends


exports.getAllProductsInCart = function(req,res){
	console.log("inside get All Products from cart for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined) {

        var getUserCartItemsQuery = "select uc.UserCartId, uc.EventId, i.EventName, i.EventDescription, i.EventType ,i.Price from usercart uc join events i on uc.EventId =  i.EventId where uc.UserId = '" + userId +"'";
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
						json_responses = results;
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

exports.removeItemFromCart = function(req,res){
	console.log("Inside removeItemFromCart for user: "+req.session.userid);
	
	var userId = req.session.userid;
	var itemId = req.param("itemId");
	
	if(userId != undefined) {
		var removeItemFromCartQuery = "delete from usercart where UserId = "+userId+" and ItemId = "+itemId;
		console.log("Query:: " + removeItemFromCartQuery);
		logger.log('info','Query:: ' + removeItemFromCartQuery);
		mysql.deleteData(removeItemFromCartQuery,function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);

			}
			else {
				if(results.affectedRows > 0) {
						console.log("Successful removed item from the cart");
						//logger.log('info','No items in cart' + userId);
						json_responses = {"statusCode" : 200};
				}
				else{
						res.send(json_responses);
						console.log("Invalid string.");
						//logger.log('info','No item to remove for:' + userId);
						json_responses = {"statusCode" : 401, "Message":  "cart is already empty"};
				}
				res.send(json_responses);
			}	
			
		});
	}

};

exports.buyItemsInCart = function(req,res){
/*
 * 1. Get all items from cart table by userid
 * 2. push the items to sold table.
 * 3. empty cart.
 * 4. Qty -= 1 in items table. 
 */
	
	var userId = req.session.userid;

	var creditCardNumber = req.param("CreditCardNumber");
	
	if(userId != undefined) {
		var getAllCartItemsQuery = "Select UserCartId,UserId,ItemId,Qty from usercart where UserId ="+userId;
		console.log("Query:: " + getAllCartItemsQuery);
		logger.log('info','Query:: ' + getAllCartItemsQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);

			}
			else {
				if(results.length > 0) {
					console.log("Got all the items for userId: "+ userId);
					logger.log('info','Query:: ' + getAllCartItemsQuery);
					for(result in results) {
							AddItemToSoldTable(results[result].ItemId,userId,creditCardNumber);
							updateItemQty(results[result].ItemId);
							removingItemFromCart(userId,results[result].ItemId);
						}						
						json_responses = results;
				}
				else{
						res.send(json_responses);
						console.log("No items in cart.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getAllCartItemsQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/
}


function updateItemQty(ItemId) {

	console.log("Inside updateItemQty method.")
		
	var updateItemQtyQuery = "UPDATE item SET Qty=Qty-1  WHERE ItemId = "+ItemId;
	console.log("Query:: " + updateItemQtyQuery);
	logger.log('info','Query:: ' + updateItemQtyQuery);

	mysql.storeData(updateItemQtyQuery, function(err, result){
		//render on success
		if(!err){
			console.log('Item Qty updated!');
			logger.log('info','Item Qty updated');
				json_responses = {
					"statusCode" : 200
				}
				//res.send(json_responses);
		}
		else{
			console.log('ERROR! Insertion not done');
			logger.log('error',err);
			throw err;
		}
	});
}

function removingItemFromCart(userId,ItemId) {

	console.log("Inside updateItemQty method.")
		
	var RemovingItemFromCartQuery = "delete from usercart where UserId ="+userId+" and ItemId = "+ItemId+";";
	console.log("Query:: " + RemovingItemFromCartQuery);
	logger.log('info','Query:: ' + RemovingItemFromCartQuery);

	mysql.deleteData(RemovingItemFromCartQuery, function(err,results) {
		if(err) {
				console.log("Error in deleteData");
				logger.log('error',err);
				console.log(err);
				throw err;
			}
		else {
			console.log("successfully removed items from the cart");
			console.log(results);
			console.log(results.affectedRows);
			logger.log('info','successfully removed items from the cart for userId:: ' + userId);
			if(results.affectedRows >0) {
				json_responses = {
					"statusCode" : 200,
					"results" : results
				}
				//res.send(json_responses);
			}
			else{
				json_responses = {
					"statusCode" : 401
				}
				//res.send(json_responses);
			}
		}
	});
}

exports.getAllUserDirectBuyingActivities= function(req,res){
	console.log("inside getAllUserDirectBuyingActivities for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined) {
		var getAllUserDirectBuyingActivitiesQuery = "select u.Solddate, u.Qty, i.ItemName, i.ItemDescription,i.Price,seller.FirstName from sold as u left join item as i on u.ItemId=i.ItemId left join user as seller on i.SellerId=seller.UserId where u.BuyerId = "+userId;
		console.log("Query:: " + getAllUserDirectBuyingActivitiesQuery);
		logger.log('info','Query:: ' + getAllUserDirectBuyingActivitiesQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				logger.log('error',err);
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the user activity data");
						logger.log('info','Successful got the user activity data for userId:: ' + userId);
						json_responses = results;
						}
				else{
						
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		}, getAllUserDirectBuyingActivitiesQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/
};

exports.getAllSoldProducts= function(req,res){
	console.log("inside getAllSoldProducts for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined) {
		var getAllSoldProductsQuery = "select i.ItemName, i.ItemDescription,s.Qty,s.SoldDate,u.FirstName as Buyer,i.Price from item as i right join sold as s on i.ItemId=s.ItemId left join user u on s.BuyerId=u.UserId where i.SellerId = "+userId+";";
		console.log("Query:: " + getAllSoldProductsQuery);
		logger.log('info','Query:: ' + getAllSoldProductsQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the sold products.");
					logger.log('info','Successful got the sold product for userId:: ' + userId);
						json_responses = results;
						}
				else{
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		},getAllSoldProductsQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/
};

exports.getAllUserBiddingActivity = function(req,res){
	console.log("inside getAllUserBiddingActivity for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined) {
		var getAllUserBiddingActivityQuery = "select  i.ItemName, i.ItemDescription, i.Price, b.BidAmount,b.BidTime  from bidderList as b left join item as i  on b.ItemId=i.ItemId where BidderId = "+userId+" order by BidTime desc";
		console.log("Query:: " + getAllUserBiddingActivityQuery);
		logger.log('info','Query:: ' + getAllUserBiddingActivityQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				logger.log('error',err);

				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the sold products.");
						logger.log('info','Successful got the sold products for userId:: ' + userId);
						json_responses = results;
						}
				else{
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		},getAllUserBiddingActivityQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/
}

//Select BidderId,max(BidAmount) from bidderList where ItemId = (select (ItemId) from Item where  IsBidItem =1  and AuctionEndDate < now());
/*
exports.updateAuctionWinners = function(req,res){
	console.log("inside updateAuctionWinners");
	
	var getAuctionWinner = "Select BidderId,max(BidAmount) from bidderList where ItemId = (select (ItemId) from Item where  IsBidItem =1  and AuctionEndDate < now()) and IsWinner<>1;";
	console.log("Query:: " + getAuctionWinner);
	logger.log('info','Query:: ' + getAuctionWinner);
	mysql.fetchData(function(err,results) {
		if(err) {
			logger.log('error',err);
			throw err;
		}
		else {
			if(results.length > 0) {
					console.log("Successful got the sold products.");
					logger.log('info','Successful got the sold products for userId:: ' + userId);
					json_responses = results;
					}
			else{
					console.log("Invalid string.");
					json_responses = {"statusCode" : 401};
			}
			res.send(json_responses);
		}	
		
	},getAuctionWinner);
	

	if(userId != '') {
		var getAllUserBiddingActivityQuery = "select  i.ItemName, i.ItemDescription, i.Price, b.BidAmount,b.BidTime  from bidderList as b left join item as i  on b.ItemId=i.ItemId where BidderId = "+userId+" order by BidTime desc";
		console.log("Query:: " + getAllUserBiddingActivityQuery);
		logger.log('info','Query:: ' + getAllUserBiddingActivityQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the sold products.");
						
						json_responses = results;
						}
				else{
						console.log("Invalid string.");
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		},getAllUserBiddingActivityQuery);
	}
}
*/ // Do not  remember why I wrote this.

exports.getAllWonAuctions= function(req,res){
	console.log("inside getAllWonAuctions for user: "+req.session.userid);
	
	var userId = req.session.userid;
	
	if(userId != undefined) {
		var getAllWonAuctionsQuery = "select a.WinnerId, a.ItemId, a.PaymentByCard,a.PaymentDate,a.IsPaymentDone, i.ItemName, i.ItemDescription, i.price, b.BidAmount,b.BidTime from auctionwinners as a left join item as i on a.ItemId = i.ItemId left join bidderList as b on a.winnerId = b.BidderId and a.ItemId= b.ItemId where a.IsPaymentDone=0 and a.WinnerId = "+userId;
		console.log("Query:: " + getAllWonAuctionsQuery);
		logger.log('info','Query:: ' + getAllWonAuctionsQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error',err);
			}
			else {
				if(results.length > 0) {
						console.log("Successful got the winning items.");
						logger.log("info",'Successful got the winning items for userId:'+userId);
						json_responses = results;
						}
				else{
						console.log("Invalid string.");
						logger.log("info",'Invalid string for userId:'+userId);
						json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}	
			
		},getAllWonAuctionsQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/
}

exports.updatePaymentDetailsForAuction= function(req,res){
	console.log("Inside updatePaymentDetailsForAuction method.")
	var userId = req.session.userid;
	var creditCardNumber = req.param("CreditCardNumber");
	var ItemId = req.param("ItemId");

	if(userId != undefined) {
		var updatePaymentDetailsForAuctionQuery = "UPDATE `auctionwinners` SET `PaymentByCard` = " + creditCardNumber + ", `PaymentDate` = now(),`IsPaymentDone` = 1 WHERE `WinnerId` = " + userId + " and IsPaymentDone = 0;";
		console.log("Query:: " + updatePaymentDetailsForAuctionQuery);
		logger.log('info', 'Query:: ' + updatePaymentDetailsForAuctionQuery);
		mysql.storeData(updatePaymentDetailsForAuctionQuery, function (err, result) {
			//render on success
			if (!err) {
				console.log('Auction payment details updated for userId: ' + userId);
				logger.log('info', 'Auction payment details updated for userId: ' + userId);
				UpdateItemStatusToSold(ItemId);
				json_responses = {
					"statusCode": 200
				}

				//res.send(json_responses);
			}
			else {
				console.log('ERROR! Insertion not done');
				logger.log('error', err);
				throw err;

				var json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/

}

function UpdateItemStatusToSold(ItemId) {

	console.log("Inside UpdateItemStatusToSold method.")

	var updateItemStatusToSoldQuery = "UPDATE `hakunamatata`.`item`	SET `Sold` = 1 WHERE `ItemId` = "+ItemId +";";
	console.log("Query:: " + updateItemStatusToSoldQuery);
	logger.log('info','Query:: ' + updateItemStatusToSoldQuery);
	mysql.storeData(updateItemStatusToSoldQuery, function(err, result){
		//render on success
		if(!err){
			console.log('Item is sold!');
			logger.log('info','Item is sold :: ' +ItemId);
			json_responses = {
				"statusCode" : 200
			}
			//res.send(json_responses);
		}
		else{
			console.log('ERROR! Insertion not done');
			logger.log('error',err);

			throw err;
		}
	});
}

exports.getAllAuctionProductHistory= function(req,res){
	console.log("Inside getAllAuctionProductHistory method.")
	var userId = req.session.userid;

	if(userId != undefined) {
		var getAllAuctionProductHistoryQuery = "select a.Paymentdate, i.ItemName, i.ItemDescription,i.Price, u.FirstName as SellerName from auctionWinners as a left join item as i on a.ItemId = i.ItemId left join user as u on i.SellerId = u.UserId where a.WinnerId = "+userId+";";
		console.log("Query:: " + getAllAuctionProductHistoryQuery);
		logger.log('info','Query:: ' + getAllAuctionProductHistoryQuery);
		mysql.fetchData(function(err,results) {
			if(err) {
				logger.log('error',err);

				throw err;
			}
			else {
				if(results.length > 0) {
					console.log("Successful got the user data");
					logger.log("Successfully got the user data for UserId:"+userId);
				    json_responses = results;
				}
				else{
					console.log("Invalid string.");
					json_responses = {"statusCode" : 401};
				}
				res.send(json_responses);
			}

		}, getAllAuctionProductHistoryQuery);
	}
    /*else {
        var json_responses = {"statusCode": 401};
        res.send(json_responses);
    }*/

}


