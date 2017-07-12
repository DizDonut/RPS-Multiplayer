// Initialize Firebase
var config = {
  apiKey: "AIzaSyBQ4fXRxfV-xyR31xqidNHOUoyrAsWlD9w",
  authDomain: "mbdb-70557.firebaseapp.com",
  databaseURL: "https://mbdb-70557.firebaseio.com",
  projectId: "mbdb-70557",
  storageBucket: "mbdb-70557.appspot.com",
  messagingSenderId: "723085559213"
};

firebase.initializeApp(config);

// Create a reference to the database
var database = firebase.database();

// connectionsRef references a specific location in the database
// all of the connections will be stored in this directory
var connectionsRef = database.ref("/connections");

// create reference to the .info/connected location in the database
// that is updated each time the client's connection state changes
var connectedRef = database.ref(".info/connected");

//When the client's connection state changes
connectedRef.on("value", function(snap){

  //if they are connected...
  if(snap.val()){

    //add user to connections list
    var con = connectionsRef.push(true);
    //remove user from list when they disconnect
    con.onDisconnect().remove();
  }

}); //end client change on value function

//when first loarded or when the connections list changes...
connectionsRef.on("value", function(snap){

  //display view count to the document
  $("#watchers").html(snap.numChildren());

});

//delcare variables and set initial values
var game = {
  selections: ["Rock", "Paper", "Scissors"],
  user1: "",
  user2: "",
  user1Choice: "",
  user2Choice: "",
  gameStart: false,
  user1Wins: 0,
  user1Losses: 0,
  user2Wins: 0,
  user2Losses: 0,
  numViewers: "",
  acceptNewPlayers: true
};
