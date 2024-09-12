const motorista = document.querySelector('#nomeMotorista');
const caminhao = document.querySelector('#numeroCaminhao');
const lacre = document.querySelector('#lacre');
const destino = document.querySelector('#destino');
const tbody = document.querySelector('tbody');

const registrar = document.querySelector('#registrar');
const filter = document.querySelector('#pesquisar');
const modal = document.querySelector('.modalConteiner');

const getRotasBD = () => JSON.parse(localStorage.getItem('bdRotas')) ?? [];
const setRotasBD = (rotas) => localStorage.setItem('bdRotas', JSON.stringify(rotas));

let rota = getRotasBD();
let id;

function openModal() {
    modal.style.display = 'flex'; // Exibe o modal
    document.getElementById('modalTbody').innerHTML = ''; // Limpa os resultados anteriores
    filter.value = ''; // Limpa o campo de pesquisa ao abrir o modal
}

function closeModal() {
    modal.style.display = 'none'; // Fecha o modal
    filter.value = ''; // Limpa o campo de pesquisa ao fechar o modal
    document.getElementById('modalTbody').innerHTML = ''; // Limpa os resultados da pesquisa
}

function inserirRotas(item, index) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td data-label="Motorista">${item.motorista}</td>
        <td data-label="Caminhão">${item.caminhao}</td>
        <td data-label="Lacre">${item.lacre}</td>
        <td data-label="Destino">${item.destino}</td>
        <td class="acao">
            <button id="deletar" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

registrar.onclick = (e) => {
    e.preventDefault();
    if (!motorista.value || !caminhao.value || !lacre.value || !destino.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (id !== undefined) {
        rota[id] = {
            motorista: motorista.value,
            caminhao: caminhao.value,
            lacre: lacre.value,
            destino: destino.value
        };
    } else {
        rota.push({
            motorista: motorista.value,
            caminhao: caminhao.value,
            lacre: lacre.value,
            destino: destino.value
        });
    }

    setRotasBD(rota);
    atualizarTabela();

    motorista.value = '';
    caminhao.value = '';
    lacre.value = '';
    destino.value = '';
    id = undefined;
};

function atualizarTabela() {
    tbody.innerHTML = '';
    rota.forEach((item, index) => inserirRotas(item, index));
}

function deleteItem(index) {
    if (confirm("Você tem certeza que deseja excluir esta rota?")) {
        rota.splice(index, 1);
        setRotasBD(rota);
        atualizarTabela();
        alert("Rota excluída com sucesso");
    }
}

document.getElementById('listaMotoristas').addEventListener('click', function () {
    document.querySelector('.conteudoTabela').scrollIntoView({
        behavior: 'smooth'
    });
});

function filterRotas() {
    const filtrar = filter.value.toLowerCase();
    tbody.innerHTML = '';
    rota.filter(item =>
        item.motorista.toLowerCase().includes(filtrar) ||
        item.caminhao.toLowerCase().includes(filtrar) ||
        item.lacre.toLowerCase().includes(filtrar) ||
        item.destino.toLowerCase().includes(filtrar)
    ).forEach((item, index) => {
        inserirRotas(item, index);
    });
}

document.getElementById('addPesquisar').addEventListener('click', function () {
    openModal(); // Abre o modal quando o botão "Pesquisar" é clicado
    atualizarTabela();
});

document.getElementById('fecharModal').addEventListener('click', function () {
    closeModal(); // Fecha o modal
    atualizarTabela();
});

document.getElementById('pesquisar').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const modalTbody = document.getElementById('modalTbody');
    modalTbody.innerHTML = '';
    if (searchValue === '') {
        return;
    }

    const rotasFiltradas = rota.filter(item =>
        item.motorista.toLowerCase().includes(searchValue) ||
        item.caminhao.toLowerCase().includes(searchValue) ||
        item.lacre.toLowerCase().includes(searchValue) ||
        item.destino.toLowerCase().includes(searchValue)
    
    );

    rotasFiltradas.forEach(item => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Motorista">${item.motorista}</td>
            <td data-label="Caminhao">${item.caminhao}</td>
            <td data-label="Lacre">${item.lacre}</td>
            <td data-label="Destino">${item.destino}</td>
        `;
        modalTbody.appendChild(tr);
    });
    atualizarTabela();
    if (searchValue === '') {
        return;
    }
});

// Limpa os resultados do modal quando ele é fechado
document.getElementById('fecharModal').addEventListener('click', closeModal);

filter.addEventListener('input', filterRotas);

atualizarTabela();
