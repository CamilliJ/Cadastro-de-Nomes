window.addEventListener("load", start);

var globalNames = [];
var inputName = null;
var isEditing = false;
var currentIndex = null;

//Função que vai chamar na hora que carregar a página.
function start() {
  //pegando o input e colocando em uma variável
  inputName = document.querySelector("#inputName");
  preventFormSubmit();
  activateInput();
  render();
}


function preventFormSubmit() {
  //função dentro de outra funcção para não ter um carregamento desnecessário da página
  function handleFormSubmit(event) {
    // enviar os dados para a mesma página, tratando eles.
    event.preventDefault();
  }
  // pegando a tag form 
  var form = document.querySelector("form");
  // enviando os dados do formulário 
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  // montar um vetor com os nomes
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  function handleTyping(event) {
    // console.log(event)
    if (event.key === "Enter" && inputName.value!=' ') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        //   console.log('Enter')
        // console.log(event)
        //           console.log(event.target.value)
        //var typeName=event.target.value;
        //globalNames.push(typeName);
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }
  inputName.focus();
  inputName.addEventListener("keyup", handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement("button");
    button.classList.add("deleteButton"); 
    button.textContent = "X";
    button.addEventListener("click", deleteName);
    return button;
  }
  function createSpan(currentName, index) {
    function editItem() {
      inputName.value = currentName;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement("span");
    //span editável
    span.classList.add("clickable"); //muda pointe

    span.textContent = currentName;

    span.addEventListener("click", editItem);

    return span;
  }
  var divNames = document.querySelector("#names");
  divNames.innerHTML = ""; //não repetir o conteuro
  //   divNames.innerHTML='<ul><li>Nome1</li><li>Nome2</li></ul>'
  //criar ul
  //fazer n li´s conforme tamanho do vetor
  var ul = document.createElement("ul");
  /*var li1= document.createElement('li');
 var li2=document.createElement('li');

 li1.textContent='Primeiro';
 li2.textContent='Segundo';
 ul.appendChild(li1);
 ul.appendChild(li2);*/
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);
    // li.textContent=currentName;
    ul.appendChild(li);
  }
  divNames.appendChild(ul);

  clearInput();
}

function clearInput() {
  inputName.value = " ";
  inputName.focus();
}
