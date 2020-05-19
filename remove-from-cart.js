dataLayer = [{'pageType' : 'cartPage'}];  // Goes into the <head></head> above GA snippet

function findPos() {  // Locate product position in array of products in cart
    var i;

    var cartList = document.getElementById("shopping-cart-table");
    var cartItem = cartList.getElementsByClassName("product-cart-list");

    for (i = 0; i < cartItem.length; i++) {
        var cart_links = cartItem[i].getElementsByClassName("cart-links")[0];
        var del = cart_links.getElementsByTagName("A")[1];
        var act = document.activeElement;

        if (del.href === act.attributes[0].value) {
            return i;
        } else {
            console.log("no");
        }
    }
}

var pos = findPos();

function cartObjs(pos) {  // Create productFieldObjects
    var posi = parseInt(pos);

    var cartList = document.getElementById("shopping-cart-table");
    var cartItem = cartList.getElementsByClassName("product-cart-list");
    var productFieldObjects = [];
    var i;

    for (i = 0; i < cartItem.length; i++) {
        var findSku = cartItem[i].getElementsByClassName("product-name");
        var id = findSku[0].getElementsByTagName("A")[0].innerHTML;

        var findName = cartItem[i].getElementsByClassName("product-cart-sku")[0].innerHTML;
        var splitName = findName.split("-->");
        var returnSplit = splitName[1];
        var frontSpace = returnSplit.substr(1, returnSplit.length);
        var splitOffAgain = frontSpace.split("<");
        var clipOff = splitOffAgain[0];
        var splitSpace = clipOff.split("   ");
        var name = splitSpace[0];

        var findCat = name.split("-");
        var category = findCat[0];

        var searchPrice = cartItem[i].getElementsByClassName("product-cart-price");
        var cartPrice = searchPrice[0].getElementsByClassName("cart-price");
        var priceCheck = cartPrice[0].getElementsByClassName("price")[0].innerHTML;
        var splitPrice = priceCheck.split("$");
        var endSplit = splitPrice[1];
        var price = parseFloat(endSplit);

        var product_actions = cartItem[i].getElementsByClassName("product-cart-actions")[0];
        var findquantity = product_actions.getElementsByClassName("input-text qty")[0].value;
        var quantity = parseFloat(findquantity);

        var product = {
            'name': name,
            'id': id,
            'price': price,
            'category': category,
            'quantity': quantity
        };
        productFieldObjects.push(product);
    }
    return productFieldObjects[posi];
}

function dlPush() {
    var productFieldObjects = findPos();

    var actionFieldObject = {
        'products': cartObjs(productFieldObjects);
    };

    var rem = {
        'remove': actionFieldObject;
    };

    dataLayer.push({
        'event': 'removeFromCart',  // Triggers remove from cart tag
        'ecommerce': rem
    });
}
