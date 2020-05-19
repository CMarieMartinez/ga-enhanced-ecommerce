dataLayer = [{'pageType' : 'productPage'}]; // Goes into the <head></head> above GA snippet

function getitemObject(){  // Create productFieldObjects

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
  
  var productFieldObject = {
    'name' : name,
    'id' : sku,  // Optionally, id can be pushed into the dataLayer as a variable to be used for building
    'price' : price,  // Google Ads lists for dynamic remarketing campaigns
    'brand' : brand,
    'category' : category
  };  
  productFieldObjects.push(productFieldObject);
  return productFieldObjects;   
  }

function createDetail(){
   var productFieldObjects = getitemObject();
    var detail = {
    'actionField' : { 'list' : 'Product Views'},
    'products' : productFieldObjects
    };
  
    var ecomm = {
   'detail' : detail
    };
    
    return ecomm;
}

var ecommerce = createDetail();

dataLayer.push({'ecommerce' : ecommerce});
