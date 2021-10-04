'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => { 
    clearFields()
    document.getElementById('modal').classList.remove('active')
    
}
const tempClient ={
    nome: "pati",
    email: "pati@gmail.com",
    celular: "11231231",
    cidade: "Sao Paulo"
}
// vai ler do bacno o que já ta la  (JSON.parse=converte para json)
// ?? se tiver vazio envia um array
const pega_local_armazenamento = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const adicionar_local_armazenamento = (dbCliente) => localStorage.setItem('db_cliente', JSON.stringify(dbCliente))


const deletar_cliente = (index) =>{
    const dbCliente = lerCliente()
    dbCliente.splice(index,1)
    adicionar_local_armazenamento(dbCliente)
    

}

// buscar um cliente
const lerCliente=()=> pega_local_armazenamento()

//atualizar o cliente 
const atualiza_cliente=(index, client)=> {
    const dbCliente = lerCliente()
    dbCliente[index]=client
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

const isValidFields= ()=>{
    return document.getElementById('form').reportValidity()
}

const clearFields = ()=> {
    const fields = document.querySelectorAll('.modal-field')
    //vou iterar cada campo e igualar a vazio
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isValidFields()){
        const client = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        cidade: document.getElementById('cidade').value,

        cliente:document.getElementById('cliente').value,
        pedido:document.getElementById('pedido').value,
        data:document.getElementById('data').value,
        entrega:document.getElementById('entrega').value,
        pagamento:document.getElementById('pagamento').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){
            //adiciona um novo cliente com os dados
            createClient(client)
            atualiza_tabela()
            closeModal()
        }else{
            atualiza_cliente(index,client)
            atualiza_tabela()
            closeModal()
            console.log('editando.........')
        }

    }
}
const createRow=(client, index)=>{
    //`` 
    const nova_linha = document.createElement('tr')
    nova_linha.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        
        <td>${client.cliente}</td>
        <td>${client.pedido}</td>
        <td>${client.data}</td>
        <td>${client.entrega}</td>
        <td>${client.pagamento}</td>

        <td>
            <button type="button" class="button green" id="editar-${index}"> editar</button>
            <button type="button" class="button red" id="excluir-${index}">excluir</button>
        </td>

    `
    document.querySelector('#tableClient>tbody').appendChild(nova_linha)

}

const clearTable = () =>{
    const rows =  document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


// primeiro ele manda o elemente e depois o index
const atualiza_tabela = ()=> {
    const dbCliente = lerCliente()
    //peagr cada cliente do banco e fazer algo
    //ler os dados e criar uma linha para cada um deles
    clearTable()
    dbCliente.forEach(createRow)

}

atualiza_tabela()

const fillFields = (cliente) =>{
    document.getElementById('nome').value = cliente.nome
    document.getElementById('email').value = cliente.email
    document.getElementById('celular').value = cliente.celular
    document.getElementById('cidade').value = cliente.cidade
    document.getElementById('nome').dataset.index = cliente.index

}

const editeCliente = (index)=>{
    //pegar apenas o cliente que eu quero editar
    const cliente  = lerCliente()[index]
    cliente.index = index
    fillFields(cliente)
    openModal()

}


const editDelete = (event) => {
    if (event.target.type == 'button'){
        const [action,index] = event.target.id.split('-') 

        if (action == 'editar'){
            editeCliente(index)
            console.log('editando o cliente')
        }else{
        const cliente = lerCliente()[index]    
        
        const response = confirm("Deseja realmente excluir o pedido do cliente " + cliente.nome +" ?")
        console.log(response)

        if (response){
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
    .addEventListener('click',editDelete)