dataLayer = [{'pageType' : 'listingPage'}];

function getImpressionVar(){

  var product_list = document.getElementsByClassName("products-list");
  var item = product_list[0].getElementsByClassName("item");
 
  var i;
  var impressions = [];  	
  
  for (i = 0; i < item.length; i++){
    
    var product_data = item[i].getElementsByClassName("product_data");
  
            var notspelled = item[i].getElementsByTagName("div");
            var desc = notspelled[0].getElementsByTagName("p");
            var text = desc[0].innerHTML;
            var nameSplit = text.split(":");
            var nameTrim = nameSplit[1];
            var returnName = nameTrim.trim();
            var findTag = returnName.substr(1, returnName.length);
            var splitTag = findTag.split(">");
            var returnSplit = splitTag[1];
            var name = returnSplit.substr(2,returnSplit.length);
    
            var findCat = name.split(" -");
            var cat = findCat[0];      
    
            var product_sku = notspelled[0].getElementsByClassName("product-sku");  
	          var sku_text = product_sku[0].innerHTML;
	          var split_textsku = sku_text.split(":");
	          var trim_textsku = split_textsku[1];
	          var sku = trim_textsku.trim();
               
	  var plist = product_data[0].getElementsByClassName("plist-price");  
           var price_box = plist[0].getElementsByClassName("price-box");  
           var price_class = price_box[0].getElementsByClassName("regular-price");  
           var gtPrice = price_class[0].getElementsByClassName("price"); 
           var price_text = gtPrice[0].innerHTML;
           var split_price = price_text.split("$"); 
           var return_price = split_price[1];
           var price = parseFloat(return_price);
     
     var impressionFieldObjects = {
        'name' : name,
        'id' : sku,
        'price' : price,
        'category' : cat,
        'list' : 'Search Results',
        'position' : i
    };
    impressions.push(impressionFieldObjects);  
  }
  return impressions; 
}

function getimpressEcomm(){
  var ecommerce = {
    'currencyCode' : 'USD',
    'impressions' : getImpressionVar()
  };
  return ecommerce;
}
dataLayer.push({'ecommerce':getimpressEcomm()});
