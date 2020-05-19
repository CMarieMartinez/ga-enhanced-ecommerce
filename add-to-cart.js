dataLayer = [{'pageType' : 'productPage'}];  // Goes into the <head></head> above GA snippet

function actionaddObject(){  // Create productFieldObjects
  var productFieldObjects = [];
  var product_shop = document.getElementsByClassName("product-shop-details");
  var desc = product_shop[0].getElementsByTagName("p")[0].innerHTML;
  var splitName = desc.split("<br");
  var doneSplit = splitName[1];
  var splitNameTwo = doneSplit.split("> ");
  var finalSplit = splitNameTwo[1];
  var name = finalSplit.substr(0, finalSplit.length-1);
  
  var splitName = name.split(" - ");
  var category = splitName[0];
  
  var skuText = product_shop[0].getElementsByTagName("h4")[0].innerHTML;
  var sku_split = skuText.split("</strong> ");
  var findSku = sku_split[1];
  var sku = findSku.substr(0, findSku.length-1);
  
  var price_block = document.getElementById("price_block_pdp");
  var price_box = price_block.getElementsByClassName("price-box tierprice");
  var regular_price = price_box[0].getElementsByClassName("regular-price");
  var priceText = regular_price[0].getElementsByClassName("price")[0].innerHTML;
  var splitPrice = priceText.split("$");
  var priceString = splitPrice[1];
  var price = parseFloat(priceString).toFixed(2);
     
  var table = document.getElementsByClassName("table");
  var tbod = table[0].getElementsByTagName("tbody")[0].lastElementChild;
  var ifBrand = tbod.getElementsByTagName("td")[0].innerHTML;
  var brand;
  if (ifBrand == "Brand"){
    brand = tbod.lastElementChild.innerHTML;
  }else{
    brand = "Not available";
  }
     
  var findQuantity = document.getElementsByClassName("input-text qty")[0].value;
  var quantity = parseFloat(findQuantity).toFixed(0);
  
  var productFieldObject = {
    'name' : name,
    'id' : sku,
    'price' : price,
    'brand' : brand,
    'category' : category,
    'quantity' : quantity
  };   
 productFieldObjects.push(productFieldObject);
 return productFieldObjects;   
  }

function createAdd(actionFieldObject){
  actionFieldObject = actionaddObject();
  
  var addObject = {
    'products' : actionFieldObject
  };
  
  return addObject;
}

function ecommAdd(){
  var actionFieldObject = actionaddObject();
  var ecommAdd = {
    'currencyCode' : 'USD',
    'add' : createAdd(actionFieldObject)
  };
  dataLayer.push({'event' : 'addToCart', 'ecommerce' : ecommAdd});
}

function buttonAtt(){
    var product_shop = document.getElementsByClassName("product-shop");
    var add_to_box = product_shop[0].getElementsByClassName("add-to-box");
    var add_to_cart = add_to_box[0].getElementsByClassName("add-to-cart");
    var findDiv = add_to_cart[0].getElementsByTagName("DIV");
    var findButton = findDiv[4].getElementsByTagName("BUTTON")[0];
   
    findButton.addEventListener("click", ecommAdd);
}
