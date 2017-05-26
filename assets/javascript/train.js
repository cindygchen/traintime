 // Initialize Firebase
var config = {
    apiKey: "AIzaSyDahriMDwjAVaBMMsxKNJbLkLSIADw1sqI",
    authDomain: "tacoflaco-50a75.firebaseapp.com",
    databaseURL: "https://tacoflaco-50a75.firebaseio.com",
    projectId: "tacoflaco-50a75",
    storageBucket: "tacoflaco-50a75.appspot.com",
    messagingSenderId: "580344505658"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var frequency = "";
var nextArrival = "";

$("#addTrain").on("click", function(event) {
	event.preventDefault();
	
	name = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	frequency = $("#frequency").val().trim();
	nextArrival = moment($("#firstTrainTime").val().trim(), "HH:mm").format("X");

	var newTrain = {
		name: name,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
	};

	database.ref().push(newTrain);



	$("#trainName").val("");
	$("#destination").val("");
	$("#frequency").val("");
	$("#firstTrainTime").val("");
});



database.ref().on("child_added", function(snapshot) {

	var trainDetails = $("#trainDetails")
	var tr = $("<tr/>");

	var tdName = $("<td/>");
	tdName.text(snapshot.val().name);

	var tdDestination = $("<td/>");
	tdDestination.text(snapshot.val().destination);

	var tdFrequency = $("<td/>");
	tdFrequency.text(snapshot.val().frequency);
	
	//maybe it should be next arrival?
	var tdnextArrivalUnix = snapshot.val().nextArrival;

	var tdnextArrival = $("<td/>");
	tdnextArrival.text(moment.unix(tdnextArrivalUnix).format("HH:mm"));

	var minutes = moment().diff(moment.unix(tdnextArrivalUnix, "X"), "minutes");
	if (minutes < 0) {
		minutes = minutes *-1;
	}

	var tdminutesAway = $("<td/>");
	tdminutesAway.text(minutes);


	tr.append(tdName).append(tdDestination).append(tdFrequency).append(tdnextArrival).append(tdminutesAway);
	trainDetails.append(tr);

});




