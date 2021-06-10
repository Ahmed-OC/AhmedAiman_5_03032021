async function init() {
    const products = await getProducts();
    coverPage(products);
  }
  init();
  async function getProducts (){
    return fetch("http://localhost:3000/api/teddies")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products)=>products)
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
  function coverPage(products) {
    products.forEach((product) => {
      displayProduct(product);
    })
  }
    function displayProduct(product) {
      const elt = document.getElementById('covermodel');
      const dupNode = document.importNode(elt.content,true);
      dupNode.getElementById('imgProduct').src= product.imageUrl;
      dupNode.getElementById("nameProduct").textContent= product.name;
      dupNode.getElementById("priceProduct").textContent= product.price/100+"€";
      dupNode.getElementById("descriptionProduct").textContent= product.description;
      dupNode.getElementById("btnProduct").href= "products.html?"+product._id;
      document.getElementById("products").appendChild(dupNode);
    }