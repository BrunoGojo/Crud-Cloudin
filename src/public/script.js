const url = "https://a84d486f-b3f6-4154-9fa8-e5d22b3a0b89-00-fq4vcoy8y7i3.picard.replit.dev/restaurante";

const formPrato = document.querySelector("form");
formPrato.style.display = "none";

formPrato.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formPrato);
    const data = Object.fromEntries(formData);
    const statusButton = document.getElementById("salvarPrato").innerText.trim();
    if (formPrato.checkValidity() == false) {
        swal({
            title: "Existem campos vazios",
            text: "Preencha os campos vazios e tente novamente",
            icon: "warning",
            dangerMode: true,
        });
        return;
    }

    if (statusButton == 'Salvar') {
        salvarPrato(data);
    } else {
        atualizarPrato(data);
    }
});

function mostrarForm(status) {
    if (status == 'Salvar') {
        document.getElementById("salvarPrato").innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar`;
    } else {
        document.getElementById("salvarPrato").innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Atualizar`;
    }
    formPrato.style.display = "block";
    document.getElementById('tableRestaurante').style.display = "none";
}

function mostrarTable() {
    formPrato.style.display = "none";
    document.getElementById('tableRestaurante').style.display = "block";
    document.getElementById("idPrato").value = "";
}

async function salvarPrato(dados) {
    try {
        delete dados.id;

        const response = await fetch('https://a84d486f-b3f6-4154-9fa8-e5d22b3a0b89-00-fq4vcoy8y7i3.picard.replit.dev/restaurante', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const pratoSalvo = await response.json();

        console.log(pratoSalvo);
        formPrato.reset();
        mostrarTable();
        pegarPratos();

        swal({
            title: 'Cadastro com sucesso',
            text: `O prato ${pratoSalvo.nomeDoPrato} foi adicionado com sucesso`,
            icon: 'success'
        });
    } catch (error) {
         console.error('Erro ao cadastrar o prato:', error);
        swal({
            title: 'Erro ao cadastrar',
            text: 'Não foi possível cadastrar o prato. Por favor, tente novamente mais tarde.',
            icon: 'error'
        });
    }
}

async function atualizarPrato(dados) {
    try {
        const response = await fetch("https://a84d486f-b3f6-4154-9fa8-e5d22b3a0b89-00-fq4vcoy8y7i3.picard.replit.dev/restaurante/" + dados.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar o prato');
        }

        const pratoAtualizado = await response.json();
        console.log('Prato atualizado:', pratoAtualizado);

        pegarPratos();

        swal({
            title: "Atualizado com sucesso",
            text: `O prato ${dados.id} foi atualizado com sucesso`, 
            icon: "success"
        });
    } catch (error) {
        console.error('Erro ao atualizar o prato:', error);
        swal({
            title: "Erro ao atualizar",
            text: `Não foi possível atualizar o prato ${dados.id}`,
            icon: "error"
        });
    }
}


async function editarPrato(id) {
    try {
        document.getElementById("salvarPrato").innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Atualizar`;
        console.log("editar", id);

        const response = await fetch(url+"/"+id);

        if (!response.ok) {
            throw new Error('Erro ao carregar dados do prato');
        }

        const prato = await response.json();

        if (!prato) {
            throw new Error('Prato não encontrado');
        }

        document.getElementById("idPrato").value = prato._id;
        document.getElementById("nomeDoPrato").value = prato.nomeDoPrato;
        document.getElementById("tipoCarne").value = prato.tipoCarne;
        document.getElementById("acompanhamentos").value = prato.acompanhamentos;
        document.getElementById("bebidas").value = prato.bebidas;
        document.getElementById("descricaoDoPrato").value = prato.descricaoDoPrato;
        document.getElementById("precoPrato").value = prato.precoPrato;
        mostrarForm('Atualizar');
    } catch (error) {
        console.error('Erro ao editar prato:', error);
        swal({
            title: "Erro ao editar",
            text: `Não foi possível editar o prato ${id}`,
            icon: "error"
        });
    }
}

async function deletarPrato(id) {
    try {
        console.log("excluir", id);
        const response = await fetch(url +"/"+id, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar o prato');
        }
        const pratoDeletado = await response.json();
        console.log('Prato deletado:', pratoDeletado);
        pegarPratos(); // Supondo que esta função atualiza a lista de pratos
        swal({
            title: "Deletado com sucesso",
            text: `O prato ${id} foi deletado com sucesso`,
            icon: "success"
        });
    } catch (error) {
        console.error('Erro:', error);
        swal({
            title: "Erro ao deletar",
            text: `Não foi possível deletar o prato ${id}`,
            icon: "error"
        });
    }
}

async function pegarPratos() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao carregar os pratos');
        }
        const pratos = await response.json();
        let listaPratos = "";
        for (let prato of pratos) {
            
            listaPratos += `
                <tr>
                    <th scope="row">${prato._id}</th>
                    <td>${prato.nomeDoPrato}</td>
                    <td>${prato.tipoCarne}</td>
                    <td>${prato.acompanhamentos}</td>
                    <td>${prato.bebidas}</td>
                    <td>${prato.descricaoDoPrato}</td>
                    <td>${prato.precoPrato}</td>
                    <td>
                        <button onclick="editarPrato('${prato._id}')" class="btn btn-primary"><i class="fa-solid fa-edit"></i></button>
                        <button onclick="deletarPrato('${prato._id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }
        document.querySelector("tbody").innerHTML = listaPratos;
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar os pratos.');
    }
}

async function buscarPratos(termo) {
    try {
        const response = await fetch(url + (termo ? "?search=" + termo : ""));
        if (!response.ok) {
            throw new Error('Erro ao buscar pratos');
        }
        const pratos = await response.json();
        if (!Array.isArray(pratos)) {
            throw new Error('Dados de pratos não estão no formato esperado');
        }
        return pratos;
    } catch (error) {
        console.error('Erro ao buscar pratos:', error);
        throw new Error('Não foi possível buscar os pratos. Por favor, tente novamente mais tarde.');
    }
}

async function limparBusca() {
    document.getElementById("search").value = "";
    pegarPratos();
}
// Chamar a função para testar
pegarPratos();
// async function pegarPratos() {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Erro ao carregar os pratos');
//         }
//         const data = await response.json();
//         console.log('Pratos:', data);
//         // Renderizar os dados no front-end
//         const div = document.getElementById('restaurantes');
//         data.forEach(prato => {
//             const p = document.createElement('p');
//             p.textContent = `Nome: ${prato.nomeDoPrato}, Preço: ${prato.precoPrato}`;
//             div.appendChild(p);
//         });
//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Não foi possível carregar os pratos.');
//     }
// }

// // Chamar a função para testar
// pegarPratos()