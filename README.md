# ga-enhanced-ecommerce
An example of pushing variables into the dataLayer for Google Analytics Enhanced Ecommerce

The code pushes ecommerce objects into the dataLayer, providing variables for Google Tag Manager to pass as parameters into the GA constant variable and the Google Ads Remarketing tag.  The ecommerce objects measure user behavior in Google Analytics Enhanced Ecommerce. You can find the Enhanced Ecommerce objects here https://developers.google.com/tag-manager/enhanced-ecommerce.

GA Enhanced Ecommerce measures the sales funnel from search impressions, to product click, product view, add-to-cart, remove-from-cart and, lastly, purchase. Pushing the sales data into the dataLayer provides GTM variables for Google Ads to use in creating lists for dynamic remarketing campaigns and marketing insights to display in GA. For marketers, the dataLayer enables smarter campaigns with increased conversions.

For simplicity, the code does not feature the optional objects for measuring promotions or measuring the checkout steps. The code adds "cart preview" in between the product page behavior and the order page purchase behavior.
