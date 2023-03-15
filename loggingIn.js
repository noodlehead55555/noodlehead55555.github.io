import $ from "jquery"
var user = null
function hidePassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function login() {
  for (i in accounts) {
    if (accounts[i].name === $("#name").val() || accounts[i].nick === $("#name").val()) {
      user = accounts[i];
    };
  };
  if (user === null) {
     alert("The name is wrong.");
  };
  if (user.password === $("#password").val()) {
     showCode();
  } else {
    alert("The password is wrong.")
    user = null
  }
};
function showCode() {
  $("title").html("Home")
  $("h1").html("Home")
  $("#passwordHelp").html("")
  $("#help").html("")
  $("#nameP").html("")
  $("#passP").html("")
  $("#submitP").html("")
  for (j in possibleCode) {
    if (user.access[possibleCode[j]]) {
      $("#" + possibleCode[j]).html(possibleCode[j])
    }
  }
}
var accounts = [
  {
    name:"lshipley",
    nick:"Lucas",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"gortega",
    nick:"Gio",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"bcrowley",
    nick:"Mrs. Crowley",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"sjohnson",
    nick:"Mr. Johnson",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"trugino",
    nick:"Mrs. Rugino",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"chyde",
    nick:"Mrs. Hyde",
    password:"",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"jdoe",
    nick:"John",
    password:"password",
    access:{
      "Cipher/Decipher":false,
      "Small fun things":false,
      "Math thing":false,
      "Character repeater":false,
      "Scratch":false
    }
  },
  {
    name:"knbolles",
    nick:"Kasey",
    password:"@Ihlyl1@tncl1@",
    access:{
      "Cipher/Decipher":true,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":true
    }
  },
  {
    name:"",
    nick:"",
    password:"",
    access:{
      "Cipher/Decipher":false,
      "Small fun things":true,
      "Math thing":true,
      "Character repeater":true,
      "Scratch":false
    }
  }
];
var possibleCode = [
  "Cipher/Decipher",
  "Small fun things",
  "Math thing",
  "Character repeater",
  "Scratch"
];
//Lets you press the button
document.getElementById("submit").onclick = login;