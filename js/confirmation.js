const orderid= window.location.search.substring(1);
async function init() {
    const teddies = await getTeddies();
    showfinalprice(teddies);
    showorderid(orderid);
    localStorage.clear();
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

async function showfinalprice(teddies)
{
    let finalprice = 0;
    teddies.forEach((teddy) => {
        for(let i = 0 ; i<localStorage.length;i++)
        {
            if (teddy._id==localStorage.key(i))
            {
                finalprice+= teddy.price*localStorage.getItem(teddy._id)
            } 
        }

    })
    document.getElementById("priceconfirmation").innerText= finalprice/100+"€";
}
async function showorderid(orderid)
{
    document.getElementById("idconfirmation").textContent = orderid ;
}