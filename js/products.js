const idteddy= window.location.search.substring(1);
async function init() {
    const teddies = await getTeddies();
    coverPage(teddies);
    document.getElementById("btnTeddy").addEventListener("click",addtocart);
  }
init();
async function getTeddies (){
return fetch("http://localhost:3000/api/teddies")
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then((teddies)=>teddies)
.catch(function(err) {
    // Une erreur est survenue
});

}

function coverPage(teddies) {
    teddies.forEach((teddy) => {
      if (teddy._id==idteddy)
      {
          console.log(teddy)
          showTeddy(teddy)
      }
    })
}
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
        if(color=="Pale brown")
        {
            color="#cb7e49"
        }
        if(color=="Dark brown")
        {
            color="#3f2412"
        }
        const colors = document.getElementById('colorsmodel');
        const dupColors = document.importNode(colors.content,true);
        dupColors.getElementById("colordiv").style.background=color;
        document.getElementById("colors").appendChild(dupColors);
    })

  }
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
  
