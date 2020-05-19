dataLayer = [{'pageType' : 'confirmationPage'}]; // Goes into the <head></head> above GA snippet

 function getOrder() {
        var layout_class = document.getElementsByClassName("layout layout-1-col")[0];
        var getDiv = layout_class.getElementsByTagName("div")[0];
        var findA = getDiv.getElementsByTagName("p")[0];
        var transactionId = findA.getElementsByTagName("a")[0].innerHTML;  // Pull transaction id

        var orderObj = localStorage.getItem("ecomm"); // Call incomplete ecommerce object from local storage
        var ecommerce = JSON.parse(orderObj);
        ecommerce.purchase.actionField.id = transactionId; // Add transaction id to complete ecommerce object
        dataLayer.push({ 'ecommerce': ecommerce }); // Push ecommerce object to complete conversion funnel
    } 
