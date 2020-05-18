dataLayer = [{'pageType' : 'listingPage'}];

function productO(){
  
  var productFieldObjects = [];
  var i;
  
  var names = [];
  var ids = [];
  var prices = [];
  var categories = [];
  var brands = [];
  
  var pro_list = document.getElementsByClassName("products-list")[0];
  var item = pro_list.getElementsByClassName("item");
  
  for (i = 0; i < item.length; i++){
  
  var getP = item[i].getElementsByTagName("P")[0].innerHTML;
  var p_name = getP.split(":");
  var return_p = p_name[1];
  var sec_split = return_p.split(">");
  var return_sec = sec_split[1];
  var findLet = /[A-Z]/;
  var matchLet = return_sec.match(findLet);
  var letterIn = return_sec.indexOf(matchLet);
  var find_name = return_sec.substr(letterIn, return_sec.length);
  var lastCharSearch = find_name.split("   ");
  var split_again = lastCharSearch[0];
  var name = split_again.substr(0, split_again.length-1);
  names.push(name);   
  
  var pro_sku = item[i].getElementsByClassName("product-sku")[0].innerHTML;
  var id_split = pro_sku.split(":");
  var some_id = id_split[1];
  var findL = /[A-Z]/;
  var search = some_id.match(findL);
  var getIn = some_id.indexOf(search);
  var startL = some_id.substr(getIn, some_id.length);
  var split_space = startL.split(" ");
  var id = split_space[0];
  ids.push(id);   
  
  var findPrice = item[i].getElementsByClassName("price")[0].innerHTML;
  var splitDollar = findPrice.split("$");
  var return_price = splitDollar[1];
  var price = parseFloat(return_price).toFixed(2);
  prices.push(price);
       
  var findCat = name.split(" - ");
  var category = findCat[0];
  categories.push(category);
    
   var product_data = item[i].getElementsByClassName("product_data");                                 
   var tspecs_avl = product_data[0].getElementsByClassName("product_dec");
   var brandtype;
  
   if (tspecs_avl[0].className == "product_dec notechspecs-avlble")
             {
                 brandtype = "unavailable";
             }
    else
            {
    if (tspecs_avl[0].querySelector("div").className == "tofit-div tofitavailable"){
                  brandtype = "unavailable";
             }
     else
             {
  var tspecs = tspecs_avl[0].getElementsByClassName("tech-specs"); 
  var specCount = tspecs_avl[0].getElementsByClassName("tech-specs")[0].childElementCount;
                          var label = tspecs[0].getElementsByClassName("label_value");   
                          var objetivo = label[specCount-1].innerHTML;   
                          var brand = label[specCount-1].getElementsByTagName("h4");    
                          var brand_text = brand[0].innerHTML;
  
                          if ((brand_text == "Brand:") || (brand_text == "Type:"))
                          {
                               var colon = objetivo.split(":");
                               var bringback = colon[1];
                               var arrow = bringback.split(">");
                               var newstring = arrow[1];
                               var nospace = "[A-z]";
                               var find = newstring.search(nospace);
                               var space = newstring.substr(find, newstring.length);
                               var fin = space.split(" ");
                               brandtype = fin[0]; 
            
                           }
                           else
                           {
                               brandtype = "unavailable";
                           }
                  }
           }
    brands.push(brandtype);
    
    var productFieldObject = {
      name: names[i],
      id: ids[i],
      price: prices[i],
      brand: brands[i],
      category: categories[i],
      position: i     
    };    
  productFieldObjects.push(productFieldObject);
  }
 return productFieldObjects;
}

function getAnchor(){
  var productList = document.getElementsByClassName("products-list");
  var item = productList[0].getElementsByClassName("item");
  var i;
  var urls = [];

  for (i = 0; i < item.length; i++){
    var col_xs = item[i].getElementsByClassName("col-xs-6");
    var anch = col_xs[0].getElementsByTagName("a")[0];
    if (anch.focus() == true){
      var j = parseInt(i);
    return j;
    }
  }
}

function productClick(productObj) {
 productObj = productO();
 
 var i = getAnchor();
    var clickEvent = {
        'actionField' : {'list' : 'Search Results'},
        'products' : productObj[i]
    }; 
    
    var ecommObj = {
          'click' : clickEvent
      };
      return ecommObj;
}

function product(){
var i = getAnchor();
 dataLayer.push({
    'event' : 'productClick',
    'ecommerce' :  productClick(productObj),
    'eventCallBack' : function() {
      document.location = productObj[i].url
    }
  });
}   

function getButton(){
  var productList = document.getElementsByClassName("products-list");
  var item = productList[0].getElementsByClassName("item");
  var i;
  var urls = [];

  for (i = 0; i < item.length; i++){
    var col_xs = item[0].getElementsByClassName("col-xs-6");
    var getAnch = col_xs[0].getElementsByTagName("a")[0];
    var getButton = getAnch.getElementsByTagName("BUTTON")[0];
    getButton.addEventListener("click", product);
  }
}
