const idteddy= window.location.search.substring(1);
async function init() {
    const teddies = await getTeddies();
    showTeddy(teddies);
    document.getElementById("btnTeddy").addEventListener("click",addtocart); // Au click sur le bouton ajouter au panier l’élement doit s’ajouter au panier
  }
init();


// Effectue une requête Fetch de type GET à l’API permettant de récupérer l'id des produits
async function getTeddies (){
return fetch("http://localhost:3000/api/teddies/"+idteddy)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then((teddies)=>teddies)
.catch(function(err) {
    console.log(err);
});

}

// Permet d’afficher sur la page le produit passé par cette fonction
function showTeddy(teddy) {
    const elt = document.getElementById('productsmodel');

    const dupNode = document.importNode(elt.content,true);

    dupNode.getElementById('imgTeddy').src= teddy.imageUrl;
    dupNode.getElementById("nameTeddy").textContent= teddy.name;
    dupNode.getElementById("priceTeddy").textContent= teddy.price/100+"€";
    dupNode.getElementById("descriptionTeddy").textContent= teddy.description;
    dupNode.getElementById("btnTeddy").href= "cart.html?"+teddy._id;
    document.getElementById("productteddies").appendChild(dupNode);
    console.log(teddy.colors);
    teddy.colors.forEach((color) => {
        console.log(color);

        console.log(dupNode);

        const colors = document.getElementById('colorsmodel');
        const dupColors = document.importNode(colors.content,true);
        dupColors.getElementById("colordiv").textContent=color;
        document.getElementById("colors").appendChild(dupColors);
    })

  }

  // Permet d'ajouter au localstorage le produit qui est affiché et d'indenter son nombre si il est deja present dans le localstorage
  function addtocart(){
    if (localStorage.getItem(idteddy))
    {
        let nbitem= parseInt(localStorage.getItem(idteddy),10) +1
        localStorage.setItem(idteddy,nbitem);
    } 
    else
    {
        localStorage.setItem(idteddy,1);
    }
}
  
