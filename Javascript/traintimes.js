
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgBNMjAxNwKfLfp7NfeQnb-fQ7e7YueeI",
    authDomain: "train-scheduler-5a6ff.firebaseapp.com",
    databaseURL: "https://train-scheduler-5a6ff.firebaseio.com",
    projectId: "train-scheduler-5a6ff",
    storageBucket: "",
    messagingSenderId: "37177317913"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding train info
  $("#submit").on("click",function() {
  	

  // Grabs user input
  var newTrainName = $("#train-name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newTrainTime = $("#start-input").val().trim();
  var newFrequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
      name: newTrainName,
      dest: newDestination, 
      first: newTrainTime, 
      freq: newFrequency,
  }

  	database.ref().push(newTrain);
  
	 // Logs everything to console
	  console.log(newTrain.name);
	  console.log(newTrain.dest);
	  console.log(newTrain.first);
	  console.log(newTrain.freq);

  	//clears all of the text boxes
  	$("#train-name-input").val(""); 
    $("#destination-input").val(""); 
    $("#start-input").val(""); 
    $("#rate-input").val("");
   
   	/* return false;*/ 

  }); 

 	//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	console.log(childSnapshot.val());

	//Store everything into a variable
	var newTrainName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var newTrainTime = childSnapshot.val().first;
	var newFrequency = childSnapshot.val().freq;

//train info
	console.log(newTrainName);
	console.log(newDestination);
	console.log(newTrainTime);
	console.log(newFrequency);

	// Current Time
	  var currentTime = moment(); 
	  console.log(moment(currentTime).format("hh:mm")); 

	// First Time (pushed back 1 year to make sure it comes before current time)
	 var firstTimeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");
	
	// Difference between the times 
	  timeDiff = moment().diff(moment(firstTimeConverted), "minutes"); 
  	  console.log("Difference in time: " + timeDiff);

	// Time apart (remainder)
	 var remainder = timeDiff % newFrequency; 
  	console.log("Remainder: ", remainder);

	// Minutes until train
	  var minsUntilTrain = newFrequency - remainder; 
  	console.log("Time Til Train: " + minsUntilTrain); 

	// Next Train
	 var nextTrainTime = moment().add(minsUntilTrain, "minutes"); 
  console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm")); 

  $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newDestination +
   "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm A") + 
   "</td><td>" + minsUntilTrain); 


	});
