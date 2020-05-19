dataLayer = [{'pageType' : 'orderPage'}];  // Goes into the <head></head> above GA snippet

function cartProducts(){  // Create productFieldObjects
    var review_table = document.getElementById("checkout-review-table");
    var tbody = review_table.getElementsByTagName("tbody");
    var tr = tbody[1].getElementsByTagName("tr");

    var products = [];
    var i;

    for (i = 0; i < tr.length; i++){
        var product_name = tr[i].getElementsByClassName("product-name")[0].innerHTML;
        var split_id = product_name.split("<br");
        var bringback_id = split_id[0];
        var alphanum = /\w/;
        var find_an = bringback_id.match(alphanum);
        var an_index = bringback_id.indexOf(find_an);
        var id = bringback_id.substr(an_index, bringback_id.length-1);
        
        var findname = tr[i].getElementsByTagName("small")[0].innerHTML;
        var name = findname.substr(1, findname.length-1);

        var findcat = name.split(" - ");
        var category = findcat[0];
  
        var findprice = tr[i].getElementsByClassName("cart-price")[0];
        var getPrice = findprice.getElementsByClassName("price")[0].innerHTML;
        var split_price = getPrice.split("$");
        var return_price = split_price[1];
        var price = parseFloat(return_price);
      
        var quant = tr[i].getElementsByTagName("input")[0].value;
        var quantity = parseFloat(quant);

        var product = {
            'name' : name,
            'id' : id,
            'price' : price,
            'category' : category,
            'quantity' : quantity
        };
      
        products.push(product);
    }
    return products;
}

function getRevenuebd(){  //  Create actionField
    var shipping;

    var getTotal = document.getElementById("checkout-review-table");
    var tfoot = getTotal.getElementsByTagName("tfoot")[0].lastElementChild;
    var lastTd = tfoot.getElementsByClassName("a-right last")[0];
    var findTotal = lastTd.getElementsByClassName("price")[0].innerHTML;
    var cleanTotal = findTotal.split("$");
    var total = cleanTotal[1];
    var revenue;
        if (total.length > 6){
            var comma = total.split(",");
            var combine = comma[0] + comma[1];
            revenue = parseFloat(combine);
        }else{
            revenue = parseFloat(total);
        }
  
     var findTax = getTotal.getElementsByTagName("tfoot")[0];
     var tr = findTax.getElementsByTagName("tr");  
    
     var tax;
     var coupon;
     if (tr.length < 5){
         var getTaxWOD = tr[2];
         var pullTaxWOD = getTaxWOD.getElementsByClassName("price")[0].innerHTML;
         var split_pullTaxWOD = pullTaxWOD.split("$");
         var taxWOD_text = split_pullTaxWOD[1];
         tax = parseFloat(taxWOD_text);
         coupon = "none";

         var pullShippingWOD = tr[1];
         var getShippingWOD = pullShippingWOD.getElementsByClassName("a-right last")[0];
         var searchShippingWOD = getShippingWOD.getElementsByClassName("price")[0].innerHTML;
         var shippingWOD_text = searchShippingWOD.split("$");
         var after_shippingWOD_split = shippingWOD_text[1];
         shipping = parseFloat(after_shippingWOD_split);
     }else{

         var getTax = tr[3];
         var pullTax = getTax.getElementsByClassName("price")[0].innerHTML;
         var split_pullTax = pullTax.split("$");
         var tax_text = split_pullTax[1];
         tax = parseFloat(tax_text);

         coupon = document.getElementById("coupon_code_onestepcheckout").value;
        
         var pullShipping = tr[2];
         var getShipping = pullShipping.getElementsByClassName("a-right last")[0];
         var searchShipping = getShipping.getElementsByClassName("price")[0].innerHTML;
         var shipping_text = searchShipping.split("$");
         var after_shipping_split = shipping_text[1];
         shipping = parseFloat(after_shipping_split);
     }

     var actionField = {  // Missing transaction id
         'revenue' : revenue,
         'tax' : tax,
         'shipping' : shipping,
         'coupon' : coupon
     };
     
     return actionField;
}

function getPurchase(){
    var productFieldObjects = cartProducts();
    var purchase = {
         'actionField' : getRevenuebd(),
         'products' : productFieldObjects
    };  

    var ecommerce = {
         'purchase' : purchase
    };

    localStorage.setItem("ecomm", JSON.stringify(ecommerce));  // Save incomplete ecommerce object to local storage
}

function attachPush(){
    var order = document.getElementById("onestepcheckout-button-place-order");
    order.setAttribute("onfocus", "getPurchase()");
}
