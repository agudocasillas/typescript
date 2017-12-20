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
    document.getElementsByClassName('userName')[0].innerHTML = `${name}'s`;
    

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
    document.getElementsByClassName('inbox')[0].style.display = 'none';
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
  //console.log("ENABLE");
  if(input.value != "") {
    input.parentNode.querySelector('button').disabled =  false;
  } else {
    input.parentNode.querySelector('button').disabled =  true;
  }
}

//document.querySelector("input[type='text'").addEventListener("keyup", (function(){enableBtn(this)}));

createNew(createBtn());

var newItem = document.querySelectorAll("div.item").length + 1;

function createNew(addBtn) {
  newItem = document.querySelectorAll("div.item").length + 1;
  var div = createDiv(["item", "new"])
  div.appendChild( createCheckbox("item-", newItem) );
  var input = createText("New Item");
  div.appendChild( input );
  div.appendChild(createLabel("name-", newItem));
  div.appendChild(  addBtn );
  document.querySelector("div.inbox").appendChild(div);
  //convertInput(addBtn, newItem);
}

function convertInput(addBtn, newItem) {
  addBtn.classList.add("hide");
  var input = addBtn.parentNode.querySelector("input[type='text']");
  input.classList.add("hide");
  var label = addBtn.parentNode.querySelector("label");
  addBtn.parentNode.classList.remove("new");
  label.classList.remove("hide");
  label.innerHTML = input.value;
}

function createDiv(classes) {
  var div = document.createElement("div");
  for(var i = 0; i < classes.length; i++) {
    div.classList.add(classes[i]);
  }
  return div;
}

function createCheckbox (name, id) {
  var input = document.createElement("input");
  input.type = "checkbox";
  input.name = name + id;
  return input;
}

function createLabel(name, id){
  var label = document.createElement("label");
  label.setAttribute("for", name + id);
  label.classList.add("hide");
  label.addEventListener("click", (function () { editItem(this) }));
  return label;
}

function createText(place) {
  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = place;
  input.addEventListener("keyup", (function () { enableBtn(this) }));
  input.addEventListener("blur", (function () { changeItem(this) }));
  return input;
}

function createBtn() {
  var btn = document.createElement("button");
  btn.classList.add("addNew");
  btn.innerHTML = "Add";
  btn.setAttribute("onclick", "convertInput(this, newItem); createNew(createBtn()); ");
  btn.setAttribute("disabled", "disabled");
  return btn;
}

function editItem(item) {
  item.classList.add("hide");
  item.parentNode.querySelector("input[type='text']").classList.remove("hide");
  item.parentNode.querySelector("input[type='text']").focus();
  item.parentNode.querySelector("input[type='text']").select();
}

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls+ ' ') > -1;
}

function changeItem(item){
  if(hasClass(item.parentNode, "new")){
    return;
  }else if(item.value != ""){
    console.log("saving");
    convertInput(item.parentNode.querySelector("button"));
    item.classList.add("hide");
    item.parentNode.querySelector("label").classList.remove("hide");
  } else if (!hasClass(item.parentNode, "new")){
    console.log("not saving");
    item.parentNode.remove();
  }
}