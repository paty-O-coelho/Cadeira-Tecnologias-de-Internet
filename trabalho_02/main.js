'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')

}
// vai ler do bacno o que já ta la  (JSON.parse=converte para json)
// ?? se tiver vazio envia um array
const pega_local_armazenamento = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const adicionar_local_armazenamento = (dbCliente) => localStorage.setItem('db_cliente', JSON.stringify(dbCliente))


// buscar um cliente
const lerCliente = () => pega_local_armazenamento()


const deletar_cliente = (index) => {
    const dbCliente = lerCliente()
    dbCliente.splice(index, 1)
    adicionar_local_armazenamento(dbCliente)


}

//atualizar o cliente 
const atualiza_cliente = (index, client) => {
    const dbCliente = lerCliente()
    dbCliente[index] = client
    adicionar_local_armazenamento(dbCliente)
}

//recebr um cliente e cadastrar (CRIAR) 
const createClient = (client) => {
    const dbCliente = pega_local_armazenamento()
    //push adiciona um elemento para dentro de um array
    dbCliente.push(client)
    adicionar_local_armazenamento(dbCliente)
    // //enviar os dados e converter para string
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    //vou iterar cada campo e igualar a vazio
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    let bebidas = document.getElementsByName("bebidas");
    let pedidosBebidas = [];

    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].checked)
            pedidosBebidas[i] = bebidas[i].value;
    }

    let salgados = document.getElementsByName("salgados");
    let pedidosSalgados = [];

    for (let i = 0; i < salgados.length; i++) {
        if (salgados[i].checked)
            pedidosSalgados[i] = salgados[i].value;
    }

    let doces = document.getElementsByName("doces");
    let pedidosDoces = [];

    for (let i = 0; i < doces.length; i++) {
        if (salgados[i].checked)
            pedidosDoces[i] = doces[i].value;
    }

    let tipoRetirada = document.getElementsByName("retirada");
    let novoTipoRetirada;

    for (let i = 0; i < tipoRetirada.length; i++) {
        if (tipoRetirada[i].checked) {
            novoTipoRetirada = tipoRetirada[i].value
        }
    }

    let formaPagamento = document.getElementsByName("pagamento");
    let novoFormaPagamento;

    for (let i = 0; i < formaPagamento.length; i++) {
        if (formaPagamento[i].checked) {
            novoFormaPagamento = formaPagamento[i].value
        }
    }

    // let data_corrente_do_pedido = new Date() - document.getElementById("data");
    

    if (isValidFields()) {
        const client = {
            pedido: document.getElementById('pedido').value,
            cliente: document.getElementById('cliente').value,
            data: document.getElementById('data').value,
            bebidas: pedidosBebidas,
            salgados: pedidosSalgados,
            doces: pedidosDoces,
            retirada: novoTipoRetirada,
            pagamento: novoFormaPagamento,
            // tempo: data_corrente_do_pedido,
        }
        const index = document.getElementById('cliente').dataset.index
        if (index == 'new') {
            //adiciona um novo cliente com os dados
            createClient(client)
            atualiza_tabela()
            closeModal()
        } else {
            atualiza_cliente(index, client)
            atualiza_tabela()
            closeModal()
            console.log('editando.........')
        }

    }
}
const createRow = (client, index) => {
    //`` 
    const nova_linha = document.createElement('tr')
    nova_linha.innerHTML = `
        <td>${client.pedido}</td>
        <td>${client.cliente}</td>
        <td>${client.data}</td>
        <td>${client.bebidas}</td>
        <td>${client.salgados}</td>
        <td>${client.doces}</td>
        <td>${client.retirada}</td>
        <td>${client.pagamento}</td>
        // <td>${client.tempo}</td>

        <td>
            <button type="button" class="button green" id="editar-${index}"> editar</button>
            <button type="button" class="button red" id="excluir-${index}">excluir</button>
        </td>

    `
    var aux = document.querySelector('#tableClient>tbody')
    aux.appendChild(nova_linha)

}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


// primeiro ele manda o elemente e depois o index
const atualiza_tabela = () => {
    const dbCliente = lerCliente()
    //peagr cada cliente do banco e fazer algo
    //ler os dados e criar uma linha para cada um deles
    clearTable()
    dbCliente.forEach(createRow)

}

// atualiza_tabela()

const fillFields = (cliente) => {
    document.getElementById('pedido').value = cliente.pedido
    document.getElementById('cliente').value = cliente.cliente
    document.getElementById('data').value = cliente.data
    document.getElementById('cafe').value = cliente.cafe
    document.getElementById('agua').value = cliente.agua
    document.getElementById('refrigerante').value = cliente.refrigerante
    document.getElementById('suco').value = cliente.suco
    document.getElementById('coxinha').value = cliente.coxinha
    document.getElementById('pastel').value = cliente.pastel
    document.getElementById('bolinho').value = cliente.bolinho
    document.getElementById('kibe').value = cliente.kibe
    document.getElementById('pizza').value = cliente.pizza
    document.getElementById('bolo').value = cliente.bolo
    document.getElementById('brigadeiro').value = cliente.brigadeiro
    document.getElementById('cupcake').value = cliente.cupcake
    document.getElementById('palha').value = cliente.palha
    document.getElementById('cookie').value = cliente.cookie
    document.getElementById('loja').value = cliente.loja
    document.getElementById('entrega').value = cliente.entrega
    document.getElementById('retirar').value = cliente.retirar
    document.getElementById('dinheiro').value = cliente.dinheiro
    document.getElementById('credito').value = cliente.credito
    document.getElementById('debito').value = cliente.debito
    document.getElementById('vale').value = cliente.vale
    document.getElementById('cliente').dataset.index = cliente.index

    //inserir o restante dos campos aqui

}

const editeCliente = (index) => {
    //pegar apenas o cliente que eu quero editar
    const cliente = lerCliente()[index]
    cliente.index = index
    fillFields(cliente)
    openModal()

}


const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'editar') {
            editeCliente(index)
            console.log('editando o cliente')
        } else {
            const cliente = lerCliente()[index]

            const response = confirm("Deseja realmente excluir o pedido do cliente " + cliente.cliente + " ?")
            console.log(response)

            if (response) {
                deletar_cliente(index)
                atualiza_tabela()
            }

        }

    }

}

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

//botao salvar
document.getElementById('salvar')
    .addEventListener('click', saveClient)

//botao atualizar 
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)