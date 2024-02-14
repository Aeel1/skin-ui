const container = document.querySelector(".container");
const containerSkins = document.querySelector(".container-skins");
const buttonClose = document.querySelector("#button-close");

const arraySkins = [];
// função para criar os itens no html
function CreateSkin(img, name, id) {
    const divE = document.createElement("div");
    divE.classList = "skin";
    const imageE = document.createElement("img");
    imageE.src = `./img/${img}`;
    divE.appendChild(imageE);
    const pE = document.createElement("p");
    pE.innerText = name;
    divE.appendChild(pE);
    containerSkins.appendChild(divE);
    const bE = document.createElement("button");
    bE.id = id;
    bE.innerText = "Selecionar";
    bE.addEventListener("click", (e) => {
        fetch(`https://${GetParentResourceName()}/setskin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            id: e.target.id,
        }),
        }).then((resp) => {
            resp.json()
        });
        })
    divE.appendChild(bE);

}

// evento para puxar dados e abrir painel
window.addEventListener('message', (event) => {
    // puxando dados
    // console.log("feito");
    if(event.data.img && event.data.name && event.data.id){
        let obj = {
        img: event.data.img,
        name: event.data.name,
        id: event.data.id,
        }
        arraySkins.push(obj);
        console.log(arraySkins);
    }

    //condicao para abrir painel
    if (event.data.open) {
        container.style.display = "block";
    }else{
        container.style.display = "none";
    }
});
// tempo de carregamento de cada item do array
setTimeout(() => {
    arraySkins.forEach((item)=>{
    CreateSkin(item.img, item.name, item.id);
});
}, 2000);
// filtro para pesquisar
function filterSkins() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const skins = document.querySelectorAll('.skin');
    
    skins.forEach(skin => {
      const name = skin.querySelector('p').innerText.toUpperCase();
      if (name.includes(input)) {
        skin.classList.remove('hidden');
      } else {
        skin.classList.add('hidden');
      }
    });
  }
// filtro para mostrar lista 
function filterClear() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const skins = document.querySelectorAll('.skin');
    
    skins.forEach(skin => {
      const name = skin.querySelector('p').innerText.toUpperCase();
      if (input.trim() === "") {
        skin.classList.remove('hidden');
      } 
    });
  }
// botao de fechar
buttonClose.addEventListener("click",()=>{
    fetch(`https://${GetParentResourceName()}/buttonclose`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
        panel: false,
    }),
    }).then((resp) => {
        resp.json()
    });
    container.style.display = "none";
})