// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXZsvtg5Lxx4LLho287lczy_I1OE9-c6M",
  authDomain: "formulario-c8c1c.firebaseapp.com",
  databaseURL: "https://formulario-c8c1c.firebaseio.com",
  projectId: "formulario-c8c1c",
  storageBucket: "formulario-c8c1c.appspot.com",
  messagingSenderId: "845763453847"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('leads');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('nome');
  var email = getInputVal('email');

  moment.locale('pt-BR');
  var dataHora = moment().format('YYYY-MM-DD HH:mm:ss');

  // Save message
  saveMessage(name, email, dataHora);

  // // Show alert
  // document.querySelector('.alert').style.display = 'block';

  // // Hide alert after 3 seconds
  // setTimeout(function(){
  //   document.querySelector('.alert').style.display = 'none';
  // },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, dataHora) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    dataHora: dataHora
  });
}