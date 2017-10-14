var lat;
var lng;

$(function(){
  var loc = getUserLoc();
  // Initialize Firebase
  var config = {
  apiKey: "AIzaSyDZpM9AOjqDI2N8Nwbf0cRFNoew1nbCdrU",
  authDomain: "metutu-f579c.firebaseapp.com",
  databaseURL: "https://metutu-f579c.firebaseio.com",
  projectId: "metutu-f579c",
  storageBucket: "metutu-f579c.appspot.com",
  messagingSenderId: "500001567185"
};
firebase.initializeApp(config);
});


//get geo location api
function getUserLoc() {
  if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        console.log("Error accessing location.");
    }
    function savePosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  }
}


//firebase write call
//write to firebase
function writeUserData(name, email,pass,phone, prof, gen,lat, lng) {
  firebase.database().ref('users/' + phone).set({
    username: name,
    email:email,
    password:pass,
    phone: phone,
    profession : prof,
    latitude: lat,
    longitude: lng
  });
}


$(".signUpBox").submit(function(){
  event.preventDefault();
  var name=$("#name").val();
  var email=$("#email").val();
  var pass=$("#pass").val();
  var phone=$("#phone").val();
  var prof=document.getElementById("Teacher");
  if(document.getElementById("Teacher").checked){
    prof=document.getElementById("Teacher").value;
  }
  else{
    prof=document.getElementById("Student").value;
  }
  //gender
  var gen=document.getElementById("male");
  if(document.getElementById("male").checked){
    gen=document.getElementById("male").value;
  }
  else{
    gen=document.getElementById("female").value;
  }

  console.log(name,email,pass,phone,prof,gen);
  writeUserData(name, email,pass,phone, prof, gen,lat, lng);
  //adding conformation
  alert("Data Saved");

  $(".signUpBox").fadeOut(1000);
  initMap();
  $(".mapView").fadeIn(1000);


});


//init map
function initMap() {
  var pos = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: pos
  });
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}
