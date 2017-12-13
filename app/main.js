let name, email, photoUrl, uid, emailVerified, providerId;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    const user = firebase.auth().currentUser;
    
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    providerId = user.providerId;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use firebase.User.prototype.getIdToken instead.
    // User is signed in.
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('logOut').style.display = 'block';
    document.getElementsByClassName('inbox')[0].style.display = 'block';
    document.getElementById('userName').innerHTML = name;

    var database = firebase.database();

    /* function writeUserData(userId, name, email){
      console.log(userId);
      firebase.database().ref('lists/' + userId).set({
        title: 'Testing from phone user',
        content: 'My phone content'
      })
    };*/
    firebase.database().ref('lists/'+uid).once('value').then(function(item) {
      console.log(item.val())
    });

    //writeUserData(uid, name, email);

  } else {
    console.log("NO HAY USER");
    // No user is signed in.
  }
});

function logOut() {
  firebase.auth().signOut().then(function() {
    document.getElementById('logIn').style.display = 'block';
    document.getElementById('logOut').style.display = 'none';
    document.getElementsByClassName('inbox')[0].style.display = 'none';
    document.getElementById('userName').innerHTML = '';
  }).catch(function(error) {
    // An error happened.
  });
  
}

function enableBtn(input) {
  console.log("ENABLE");
  if(input.value != "") {
    input.parentNode.querySelector('button').disabled =  false;
  } else {
    input.parentNode.querySelector('button').disabled =  true;
  }
}

document.querySelector("input[type='text'").addEventListener("keyup", (function(){enableBtn(this)}));

function createNew() {
  var div = document.createElement("div");
  div.classList.add("item", "new");
  var input = document.createElement("input");
  input.type = "checkbox";
  input.name = "item-";
  div.appendChild(input);
  input = document.createElement("input");
  input.type = "text";
  input.placeholder = "New Item";
  input.addEventListener("keyup", (function () { enableBtn(this) }));
  div.appendChild(input);
  var btn = document.createElement("button");
  btn.classList.add("addNew");
  btn.innerHTML = "Add";
  btn.setAttribute("onclick","createNew()");
  btn.setAttribute("disabled","disabled");
  div.appendChild(btn);
  document.querySelector("div.inbox").appendChild(div);

  //document.querySelectorAll("button.addNew");
}