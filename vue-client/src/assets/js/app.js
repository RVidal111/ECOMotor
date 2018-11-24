// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAgkXmaPQ5PxadbdT2Cg_87z18sqtMA8Ok",
    authDomain: "eco-moto-network-dc652.firebaseapp.com",
    databaseURL: "https://eco-moto-network-dc652.firebaseio.com",
    projectId: "eco-moto-network-dc652",
    storageBucket: "eco-moto-network-dc652.appspot.com",
    messagingSenderId: "719808589426"
})

// Get a Firebase references to the services
var firestore   = firebase.firestore()
var db          = firebase.database()
var auth        = firebase.auth()
var storage     = firebase.storage()

// Set a storage references
var storageRef      = storage.ref()
var documentsRef    = storageRef.child('documents')
var imagesRef       = storageRef.child('images')
var brandsImagesRef = imagesRef.child('brands')
var usersImagesRef  = imagesRef.child('users')

// Changing the window height variable in css file
window.onload = function () {
    windowDimensions(window.innerHeight)
}

window.onresize = function () {
    windowDimensions(window.innerHeight)
}

function windowDimensions (height) {
    var realHeightMenu      = height - 282
    var realHeightContent   = height - 173
    document.documentElement.style.setProperty("--heightMenu", realHeightMenu + "px")
    document.documentElement.style.setProperty("--heightContent", realHeightContent + "px")
}