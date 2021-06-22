async function init() {

    const teddies = await getTeddies();
    coverPage(teddies);
    refreshfinalprice()
    removefromcart();
    refreshquantity();
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
    for (var i = 0; i < localStorage.length; i++) {

        teddies.forEach((teddy) => {
            if ((localStorage.key(i))==teddy._id)
            {
                console.log(teddy);
                showTeddy(teddy);
            }
        })

}
function showTeddy(teddy) {
    const elt = document.getElementById('modelcart');

    const dupNode = document.importNode(elt.content,true);
    console.log(teddy);

    dupNode.getElementById('cartimg').src= teddy.imageUrl;
    dupNode.getElementById("cartname").textContent= teddy.name;
    dupNode.getElementById("cartprice").textContent= teddy.price/100+"€";
    dupNode.getElementById("cartquantity").value= localStorage.getItem(teddy._id);
    dupNode.getElementById("carttotal").textContent= (teddy.price/100)*parseInt(localStorage.getItem(teddy._id))+"€"
    document.getElementById("cartbody").appendChild(dupNode);
    }
  }
  function removefromcart()
  {
    let btn_del = document.querySelectorAll(".btn-danger");
    let cartlines = document.querySelectorAll(".cartline");
    for (let i = 0 ; i< btn_del.length ;i++)
    {
        let id_produit = localStorage.key(i);
        btn_del[i].addEventListener("click",function(){
           
            console.log(id_produit);
            localStorage.removeItem(id_produit);
            cartlines[i].innerHTML= "";
            refreshfinalprice();
        })
    }
  }
  function refreshquantity()
  {
    let quantityinput = document.querySelectorAll(".quantityinput");
    let cartprice = document.querySelectorAll(".prices");
    let carttotal = document.querySelectorAll(".totalprice");
    for (let i = 0 ; i< quantityinput.length ;i++)
    {
        quantityinput[i].addEventListener("change",function(){
            let id_produit = localStorage.key(i);
            localStorage.setItem(id_produit,quantityinput[i].value);
            carttotal[i].textContent = parseInt(cartprice[i].textContent) * quantityinput[i].value+ "€" ; 
            refreshfinalprice();
            
        })
    }
  }
  function refreshfinalprice()
  {
      let finalprice = 0;
      let carttotal = document.querySelectorAll(".totalprice");
      for (let i = 0 ; i<carttotal.length ; i++)
      {
          finalprice += parseInt(carttotal[i].textContent);
      }
      document.getElementById("finalprice").textContent = finalprice+"€";
  }