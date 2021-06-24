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
  function createcontact()
  {
    const contact = 
    {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    email : document.getElementById('email').value,
    city : document.getElementById('city').value
    }
    console.log(contact);
    return contact;
  }
  function createproducts()
  {
      const products = [];
      for (var i = 0; i < localStorage.length; i++)
      {
        products.push(localStorage.key(i));
      }
      return products;
  }
  
                                                       // Validation Regex du formulaire
// Vérification de l'email
function emailIsValid(value) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

// Vérification d'un texte
function textIsValid(value) {
    const regex = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
    return regex.test(value);
}

// Vérification d'une adresse
function addressIsValid(value) {
    const regex = /^([0-9]{1,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;
    return regex.test(value);
}
function validationform()
{
    let formisvalid= true;
    let lastname = document.getElementById("lastName").value;
    let firstname = document.getElementById("firstName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    if (textIsValid(lastname))
    {
        document.getElementById("errorlname").innerText = "";
    }
    else
    {
        document.getElementById("errorlname").innerText = "Le nom est incorrect"
        formisvalid = false;
    }
    if (textIsValid(firstname))
    {
        document.getElementById("errorfname").innerText = "";
    }
    else
    {
        document.getElementById("errorfname").innerText = "Le prenom est incorrect"
        formisvalid = false;
    }
    if (emailIsValid(email))
    {
        document.getElementById("erroremail").innerText = "";
    }
    else
    {
        document.getElementById("erroremail").innerText = "L'email est incorrect"
        formisvalid = false;
    }
    if (addressIsValid(address))
    {
        document.getElementById("erroraddress").innerText = "";
    }
    else
    {
        document.getElementById("erroraddress").innerText = "L'adresse est incorrecte"
        formisvalid = false;
    }
    if (textIsValid(city))
    {
        document.getElementById("errorcity").innerText = "";
    }
    else
    {
        document.getElementById("errorcity").innerText = "La ville est incorrecte"
        formisvalid = false;
    }
    return formisvalid;
}
const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const order = {
        contact : createcontact()
        ,
        products : createproducts(),
    }
    if(validationform())
    {
        fetch("http://localhost:3000/api/teddies/order", {
        method : "POST",
        body :  JSON.stringify(order),
        headers : {
            "Content-Type": "application/json",
        }
      })
    .then((response) => response.json())
    .then((json) => { 
      document.location.href="confirmation.html?"+json.orderId;
    })
    .catch(() => {
      alert(error)
    })
    }
})
