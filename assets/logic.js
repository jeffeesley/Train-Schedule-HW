



  var config = {
    apiKey: "AIzaSyAlMXQ6zbGj-yvkiF116OQx7iyHl3SpWz4",
    authDomain: "trainschedule-b57d7.firebaseapp.com",
    databaseURL: "https://trainschedule-b57d7.firebaseio.com",
    projectId: "trainschedule-b57d7",
    storageBucket: "trainschedule-b57d7.appspot.com",
    messagingSenderId: "546907187626"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  	var trainName = " ";
  	var destination = " ";
  	var firstTrainTime = " ";
  	var frequency = 0;

  	// database.ref().push({
  	// 	trainName: trainName,
  	// 	destination: destination,
  	// 	firstTrainTime: firstTrainTime,
  	// 	frequency: frequency
  	// });


  	$("#add-train").on("click", function(event){

  		event.preventDefault();

  		trainName = $("#train-name").val().trim();
  		destination = $("#destination").val().trim();
  		frequency = $("#frequency").val().trim();
  		firstTrainTime = $("#first-train-time").val().trim();

  		database.ref().push({
  			trainName: trainName,
  			destination: destination,
  			frequency: frequency,
  			firstTrainTime: firstTrainTime
  		});

  	});	
  	database.ref().on("child_added", function(childSnapshot){

  		var inputTime = moment(childSnapshot.val().firstTrainTime, "hh:mm");
  		var current = moment();

  		var difference = moment().diff(moment(inputTime), "minutes");
  		var modTime = difference%childSnapshot.val().frequency;
  		var tMinus = childSnapshot.val().frequency - modTime;
  		var nextTrain = moment().add(tMinus, "minutes");

  		$("#trainTable").prepend("<tr><th id = 'addTrain'>" + childSnapshot.val().trainName + 
  		"</th><th id = 'addDestination'>" + childSnapshot.val().destination + 
  		"</th><th id = 'addFrequency'>" + childSnapshot.val().frequency + 
  		"</th><th id = 'addFirstTrain'>" + moment(nextTrain).format("hh:mm A")
  		+ "</th><th id = 'tMinus'> " + tMinus + "</th></tr>");
  	}, function(errorObject){
  		console.log("errors handled: " + errorObject.code);
  	});
  	

   	
  