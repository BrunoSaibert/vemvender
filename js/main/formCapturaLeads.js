// Initialize Firebase
var config = {
  apiKey: "AIzaSyA3OqJEt5oxJCSOwuWehwZ_Dv6d32x1UHg",
  authDomain: "formulario-e0ffc.firebaseapp.com",
  databaseURL: "https://formulario-e0ffc.firebaseio.com",
  projectId: "formulario-e0ffc",
  storageBucket: "formulario-e0ffc.appspot.com",
  messagingSenderId: "220448685518"
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
  var ipuser = getIp(function (ip) {
   return ip;
  });

  // Save message
  saveMessage(name, email, dataHora, ipuser);

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
function saveMessage(name, email, dataHora, ipuser) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    dataHora: dataHora,
    ipuser: ipuser
  });
}