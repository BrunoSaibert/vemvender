// Chave do Firebase
var config = {
  apiKey: "AIzaSyA3OqJEt5oxJCSOwuWehwZ_Dv6d32x1UHg",
  authDomain: "formulario-e0ffc.firebaseapp.com",
  databaseURL: "https://formulario-e0ffc.firebaseio.com",
  projectId: "formulario-e0ffc",
  storageBucket: "formulario-e0ffc.appspot.com",
  messagingSenderId: "220448685518"
};
firebase.initializeApp(config);

// Pegar o submit do form
$('.introForm').on('submit', function (e) {
  e.preventDefault();

  // Pega os dados do formulario
  var origem = $(this).find('#origemInput').val();
  var nome = $(this).find('#nomeInput').val();
  var email = $(this).find('#emailInput').val();
  var ipUsuario = $(this).find('.ipUsuario').val();

  // Pega a data e hora
  moment.locale('pt-BR');
  var dataHora = moment().format('YYYY-MM-DD HH:mm:ss');

  // Encaminhar dados para o Firebase
  var newMessageRef = firebase.database().ref('leads').push();
  newMessageRef.set({
    origem: origem,
    nome: nome,
    email: email,
    dataHora: dataHora,
    ipUsuario: ipUsuario
  });

  // Seta a mensagem de sucesso;
  $(this).find('.form_sucesso').removeClass('d-none');
  $(this).find('.form_conteudo').addClass('d-none');
  setTimeout(() => {
    $(this).find('.form_conteudo').removeClass('d-none');
    $(this).find('.form_sucesso').addClass('d-none');

    // Limpa o formulário
    $(this).find('#nomeInput').val('');
    $(this).find('#emailInput').val('');
  }, 5000);
});