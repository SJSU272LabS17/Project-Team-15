var mysql = require('./mysql');
var bcrypt = require('./bCrypt.js');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'HMLog.log' })
	]
});


//-----------------------------------------
exports.takeMeHome = function(req,res) {
    //Checks before redirecting whether the session is valid
    if(req.session.userid)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        //res.render("homepage",{userid:req.session.userid});
        res.render('myHome',{validationMessage:'Empty Messgage'});
    }
    else
    {
        res.redirect('/myHome');
    }
};
exports.myHome=function (req,res) {
    getAllAuctionResults();
    res.render('myHome', { validationMessage: 'Empty Message'});
};
exports.signupHM=function (req,res) {
    getAllAuctionResults();
    res.render('signupHM', { validationMessage: 'Empty Message'});
};
exports.myBagPack=function (req,res) {
    getAllAuctionResults();
    res.render('myBagPack', { validationMessage: 'Empty Message'});
};
exports.giveBackHM2=function (req,res) {
    getAllAuctionResults();
    res.render('giveBackHM2', { validationMessage: 'Empty Message'});
};
exports.giveBackHM = function(req,res){
    // getAllAuctionResults();
    res.render('giveBackHM',{validationMessage:'Empty Message'});
};
/* exports.sendEmail = function(req,res){
    // getAllAuctionResults();
	console.log("IN SEND EMAIL");
    var mailOptions={
    	to: req.param("emailAddress"),
        text: req.param("message"),
        subject: req.param("subject")
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
}; */
// added by Karan

exports.eventCreationLogin = function(req,res){
    // getAllAuctionResults();
    res.render('eventCreationLogin',{validationMessage:'Empty Message'});
};

exports.thankyou = function(req,res){
    // getAllAuctionResults();
    res.render('thankyou',{validationMessage:'Empty Message'});
};

exports.createEventHM = function(res,res){
    res.render('createEventHM', { validationMessage: 'Empty Message'});
};

exports.afterEventCreation = function(req,res){// load new user data in database
    console.log("In afterEventCreation");

    var eventName = req.param("eventName");
    var description = req.param("description");
    var eventType = req.param("eventType");//not added in database
    var price = req.param("price");
    var contact = req.param("contact");
    var quantity = req.param("quantity");
    //var dateOfEvent = req.param("dateOfEvent");

    console.log("eventName :: " + eventName);
    console.log("description :: " + description);
    console.log("eventType :: " + eventType);
    console.log("price : " + price);
    console.log("contact :: " +contact);
    console.log("quantity : " + quantity);
    //console.log("dateOfEvent :: " +dateOfEvent);

    // var hash = bcrypt.hashSync(password);
    //logger.log('info', "SignUp for new user: Firstname :: " + firstname+ " Lastname :: " + lastname + " email :: " + email+ " password :: " + hash +" contact :: " + contact +" location : " + location+" dateOfBirth :: " +dateOfBirth+" creditCardNumber : " + creditCardNumber);

    var query = "INSERT INTO events (EventName, EventDescription, EventType, Price, Qty) VALUES ('" + eventName + "','" + description + "','" + eventType + "','" + price + "','" + quantity + "')";
    console.log("Query:: " + query);
    logger.log('info', "Query:: " + query);


    mysql.storeData(query, function(err, result){
        //render on success
        if(!err){
            console.log('Valid SignUp!');
            logger.log('info', "Valid Sign up for: ");
            res.send("true");
        }
        //render or error
        else{
            console.log('Invalid SingUp!');
            logger.log('info', "Invalid Sign up for: ");
            res.send("false");
        }
    });
};
exports.approvalPendingHM=function (req,res) {
    getAllAuctionResults();
    res.render('approvalPendingHM', { validationMessage: 'Empty Message'});
};

exports.adminLoginHM = function(req,res){
    // getAllAuctionResults();
    res.render('adminLoginHM',{validationMessage:'Empty Message'});
};

exports.checkAdminLogin= function(req,res) {

    console.log("in checkAdminLogin");

    var email = req.param("email");
    var password = req.param("password");

    logger.log('info', 'Signin request from: '+ email);
    console.log("email :: " + email);

    if(email != '') {
        var checkLoginQuery = "select UserId,Password from user where EmailId = '" + email + "';";
        logger.log('info', 'select UserId,Password from user where EmailId = '+email);
        console.log("Query:: " + checkLoginQuery);

        mysql.fetchData(function(err,results) {
            if(err) {
                throw err;
                logger.log('error','Error of user :'+email+ ' Error: '+err);
            }
            else {
                if(results.length >0) {
                    if (bcrypt.compareSync(password, results[0].Password)) {

                        console.log("Successful Login");
                        logger.log('info', 'Successful Login for = ' + email + ' userId: ' + results[0].UserId);
                        console.log("UserId :  " + results[0].UserId);
                        //Assigning the session
                        req.session.email = email;
                        req.session.userid = results[0].UserId;

                        logger.log('info', "Session Initialized with email : " + req.session.email);
                        console.log("Session Initialized with email : " + req.session.email);

                        logger.log('info', "userid :: " + req.session.userid);
                        console.log("userid :: " + req.session.userid);

                        json_responses = {"statusCode": 200};
                        res.send(json_responses);
                    }

                    else {
                        logger.log('error', "Invalid password for email Id: " + email);
                        console.log("Invalid Login");
                        json_responses = {"statusCode": 401};
                        res.send(json_responses);
                    }
                }
                else{
                    logger.log('error', "Invalid Login for email Id: "+email +' user is not registered.');
                    json_responses = {"statusCode": 401};
                    console.log(json_responses);
                    res.send(json_responses);
                }
            }
        }, checkLoginQuery);
    }
};

exports.adminHome=function (req,res) {
    getAllAuctionResults();
    res.render('adminHome', { validationMessage: 'Empty Message'});
};
exports.enterCardDetails=function (req,res) {
    getAllAuctionResults();
    res.render('enterCardDetails', { validationMessage: 'Empty Message'});
};

// Added by Karan end
//-----------------------------------------
exports.redirectToHome = function(req,res) {
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

exports.signup=function (req,res) {
	getAllAuctionResults();
	res.render('signup', { validationMessage: 'Empty Message'});
};

exports.signinHM = function(req,res){
    // getAllAuctionResults();
    res.render('signinHM',{validationMessage:'Empty Message'});
};
exports.signin = function(req,res){
	getAllAuctionResults();
	res.render('signin',{validationMessage:'Empty Message'});
};

exports.checklogin= function(req,res) {

	console.log("in checklogin");

	var email = req.param("email");
	var password = req.param("password");

	logger.log('info', 'Signin request from: '+ email);
	console.log("email :: " + email);

	if(email != '') {
		var checkLoginQuery = "select UserId,Password from user where EmailId = '" + email + "';";
		logger.log('info', 'select UserId,Password from user where EmailId = '+email);
		console.log("Query:: " + checkLoginQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error','Error of user :'+email+ ' Error: '+err);
			}
			else {
				if(results.length >0) {
					if (bcrypt.compareSync(password, results[0].Password)) {

						console.log("Successful Login");
						logger.log('info', 'Successful Login for = ' + email + ' userId: ' + results[0].UserId);
						console.log("UserId :  " + results[0].UserId);
						//Assigning the session
						req.session.email = email;
						req.session.userid = results[0].UserId;

						logger.log('info', "Session Initialized with email : " + req.session.email);
						console.log("Session Initialized with email : " + req.session.email);

						logger.log('info', "userid :: " + req.session.userid);
						console.log("userid :: " + req.session.userid);

						json_responses = {"statusCode": 200};
						res.send(json_responses);
					}

					else {
						logger.log('error', "Invalid password for email Id: " + email);
						console.log("Invalid Login");
						json_responses = {"statusCode": 401};
						res.send(json_responses);
					}
				}
				else{
					logger.log('error', "Invalid Login for email Id: "+email +' user is not registered.');
					json_responses = {"statusCode": 401};
					console.log(json_responses);
					res.send(json_responses);
				}
			}
		}, checkLoginQuery);
	}
};

exports.afterSignup = function(req,res){// load new user data in database
	console.log("In aftersignupppppppp");

	var firstname = req.param("firstname");
	var email = req.param("email");
	var password = req.param("password");
	var contact = req.param("contact");//not added in database
	var location = req.param("location");
	var dateOfBirth = req.param("dateOfBirth");
	
	console.log("firstname :: " + firstname);
	console.log("email :: " + email);
	console.log("password :: " + password);
	console.log("contact :: " + contact);
	console.log("location : " + location);
	console.log("dateOfBirth :: " +dateOfBirth);

	var hash = bcrypt.hashSync(password);
	//logger.log('info', "SignUp for new user: Firstname :: " + firstname+ " Lastname :: " + lastname + " email :: " + email+ " password :: " + hash +" contact :: " + contact +" location : " + location+" dateOfBirth :: " +dateOfBirth+" creditCardNumber : " + creditCardNumber);
	var query = "INSERT INTO user (FirstName, EmailId, Password, Address,DateOfBirth) VALUES ('" + firstname + "','" + email + "','" + hash + "','" + location + "','" + dateOfBirth+"')";
	console.log("Query:: " + query);
	logger.log('info', "Query:: " + query);


	mysql.storeData(query, function(err, result){
		//render on success
		if(!err){
			console.log('Valid SignUp!');
			logger.log('info', "Valid Sign up for: "+ email);
			res.send("true");
		}
		//render or error
		else{
			console.log('Invalid SingUp!');
			logger.log('info', "Invalid Sign up for: "+ email);
			res.send("false");
		}
	});	
};

exports.checksignup = function(req,res){ //check if email ID is valid or not
	console.log("In check signup .");
	
	//request parameters
	var email = req.param("email");

	if(email!='') {
		//check if email already exists
		var checkEmailQuery =  "select EmailId from user where EmailId = '" + email + "'";
		console.log("Query is :: " + checkEmailQuery);
		logger.log('info', "Query:: " + checkEmailQuery);

		mysql.fetchData(function(err,results) {
			if(err) {
				throw err;
				logger.log('error', err);

			}
			else {
				if(results. length > 0) {
					console.log("Email exists!");
					logger.log('error', "Email exists for id: "+ email);
						res.send("true");
				}
				else {
					console.log("Email Doesn't exists");
					logger.log('info', "New mail for id: "+ email);
					res.send("false");
				}
			}
		}, checkEmailQuery); 
	}
};

function getAllAuctionResults(){
	console.log("In GetAllAuction method.");
	
	var getAllItemsWithCompletedAction =  "select ItemId from item as i where i.IsBidItem =1  and i.AuctionEndDate < now() and sold = 0";
	console.log("Query is :: " + getAllItemsWithCompletedAction);
	logger.log('info', "Query:: " + getAllItemsWithCompletedAction);

	mysql.fetchData(function(err,results) {
		if(err) {
			throw err;
			logger.log('error', err);
		}
		else {
			if(results.length > 0) {
				console.log("Items exists!");
				for(result in results)
				{
					addAuctionWinnerToTheList(results[result].ItemId);	
					itemIsSold(results[result].ItemId);
				}	
			}
			else {
				console.log("Item doesn't exist")
				//res.send("false");
				logger.log('info', "Item doesn't for exist in auction completed list");
			}
		}
	}, getAllItemsWithCompletedAction); 
}

function itemIsSold(ItemId) {

	console.log("Inside itemIsSold flag.");
		
		var updateSoldItemFlagQuery = "update Item set sold = 1 where ItemId = "+ItemId;

		console.log("Query:: " + updateSoldItemFlagQuery);
		logger.log('info', "Query:: " + updateSoldItemFlagQuery);

		mysql.storeData(updateSoldItemFlagQuery, function(err, result){
			//render on success
			if(!err){
				console.log('Sold flag updated for Item:'+ItemId);
			}
			else{
				console.log('ERROR! Insertion not done for auction results.');
				throw err;
			}
		});
};

/*function addAuctionWinnerToTheList(ItemId) {

	console.log("Inside addAuctionWinnerToTheList method.");
	
	var addAuctionWinnerToTheListQuery = "INSERT INTO `hakunamatata`.`auctionwinners`(`WinnerId`,`ItemId`,`IsPaymentDone`)(select b.BidderId, b.ItemId, 0 as IsPaymentDone from bidderlist as b where ItemId = "+ItemId+" and b.BidAmount = (	select max(b.BidAmount)	from bidderlist as b left join item as i	on b.ItemId=i.ItemId	where i.IsBidItem =1  and i.AuctionEndDate < now() and i.ItemId="+ItemId+"));";

	console.log("Query:: " + addAuctionWinnerToTheListQuery);
	logger.log('info', "Query:: " + addAuctionWinnerToTheListQuery);
	mysql.storeData(addAuctionWinnerToTheListQuery, function(err, result){
		//render on success
		if(!err){
			console.log('New bidder successfully added to winners list! for Item:'+ItemId);
			logger.log('info', 'New bidder successfully added to winners list! for Item:'+ItemId);
		}
		else{
			console.log('ERROR! Insertion not done for auction results.');
			logger.log('error','ERROR! Insertion not done for auction results.');
			throw err;
		}
	});
};*/

exports.signout = function(req,res){

	var userId = req.session.userid;

	if(userId!=undefined) {
		logger.log('info','Sign out request for userId: '+userId);
	}
	req.session.destroy();

	json_responses = {"statusCode" : 200};
	res.send(json_responses);


}
