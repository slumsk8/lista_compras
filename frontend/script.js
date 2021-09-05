const baseUrl = "http://localhost:3000/";

let tabela = document.getElementById("tabela");
title = document.createElement("tr");
id = document.createElement("th");
description = document.createElement("th");
price = document.createElement("th");
qtd = document.createElement("th");
title.appendChild(id);
title.appendChild(description);
title.appendChild(price);
title.appendChild(qtd);
id.innerHTML = "id";
description.innerHTML = "produto";
price.innerHTML = "preço";
qtd.innerHTML = "qtd.";
tabela.appendChild(title);

function criarLinha(product){
    linha = document.createElement("tr");    
    tdId = document.createElement("td");
    tdDescription = document.createElement("td");
    tdPrice = document.createElement("td");
    tdQtd = document.createElement("td");

    tdId.innerHTML = product.id_product;
    tdDescription.innerHTML = `<a href="#">${product.description}</a>`;
    let price = product.price.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });
    tdPrice.innerHTML = `<a href="#">${price}</a>`    
    tdQtd.innerHTML = `<a href="#">${product.qtd}</a>`;
    
    linha.appendChild(tdId);
    linha.appendChild(tdDescription);
    linha.appendChild(tdPrice);
    linha.appendChild(tdQtd);
    
    return linha;
}

function getApi(url, route){
    let tabela = document.getElementById("tabela");
    fetch(url + route)
        .then(response => response.json())
        .then(data => {                                
            data.forEach(product => {
                console.log(product);
                let linha = criarLinha(product);
                tabela.appendChild(linha);
            })                        
        })
        .catch(error => console.error(error));        
}



function main(){
    getApi(baseUrl,'products');    
}

main();

