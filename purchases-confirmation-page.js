dataLayer = [{'pageType' : 'confirmationPage'}];

 function getOrder() {
        var layout_class = document.getElementsByClassName("layout layout-1-col")[0];
        var getDiv = layout_class.getElementsByTagName("div")[0];
        var findA = getDiv.getElementsByTagName("p")[0];
        var transactionId = findA.getElementsByTagName("a")[0].innerHTML;

        var orderObj = localStorage.getItem("ecomm");
        var ecommerce = JSON.parse(orderObj);
        ecommerce.purchase.actionField.id = transactionId;
        dataLayer.push({ 'ecommerce': ecommerce });
    } 
