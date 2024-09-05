const motorista = document.querySelector('#nomeMotorista');
const caminhao = document.querySelector('#numeroCaminhao');
const lacre = document.querySelector('#lacre');
const destino = document.querySelector('#destino');
const tbody = document.querySelector('tbody');

const registrar = document.querySelector('#registrar');

const getRotasBD = () => JSON.parse(localStorage.getItem('bdRotas')) ??[]
const setRotasBD = (rotas) => localStorage.setItem('bdRotas' , JSON.stringify(rotas))

let rota = getRotasBD();

let id;

function inserirRotas (item,index){

    let tr = document.createElement("tr");

    tr.innerHTML = `

        <td>${item.motorista}</td>
        <td>${item.caminhao}</td>
        <td>${item.lacre}</td>
        <td>${item.destino}</td>
        
        <td class="acao">
            <button id="deletar" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;

    tbody.appendChild(tr);

}


registrar.onclick = (e) => {
    e.preventDefault();

    if(!motorista.value || !caminhao.value || !lacre.value || !destino.value){
        alert("Por favor, preencha todos os campos.");
        return
    }

    

    if(id !==undefined){
        rota[id] = {
        motorista : motorista.value,
        caminhao : caminhao.value,
        lacre : lacre.value,
        destino : destino.value

    };
    }else{
        rota.push({
        motorista : motorista.value,
        caminhao : caminhao.value,
        lacre : lacre.value,
        destino : destino.value
        });
    };

    setRotasBD(rota);
    atualizarTabela();
    
    motorista.value = '';
    caminhao.value = '';
    lacre.value = '';
    destino.value = '';
    id = undefined;


   

}

function atualizarTabela (){
    tbody.innerHTML = '';
    rota.forEach((item ,index) => inserirRotas(item, index));
}

function deleteItem ( index){
    rota.splice(index , 1);
    tbody.innerHTML = '';
    rota.forEach((item ,index) => inserirRotas(item, index));
    setRotasBD(rota);

}

atualizarTabela();
        
    