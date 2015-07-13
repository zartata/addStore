<?php
  header("X-Content-Type-Options: nosniff");
  header("Content-Type: text/css");
  include("../Convert.php");

  $size = 1;
  $radius = 2;
  $bg = "#f9f9f9";
  $box = "#f0f0f0";
  $boxHover = false;
  $disabled = "#999999";
  $primary = "#3366ff";
  $pHover = false;
  $secondary = "#cccccc";
  $sHover = false;
  $error = "#ff3366";
  $eHover = false;
  $border = "#dddddd";
  $divider = false;
  $text = "#111111";
  $textDark = false;
  $textLight = false;
  extract($_GET);
  $bggv = Format::css2grayValue($bg);
  $pgv = Format::css2grayValue($primary);
  $bgv = Format::css2grayValue($box);
  $sgv = Format::css2grayValue($secondary);
  $egv = Format::css2grayValue($error);
  $dgv = Format::css2grayValue($disabled);
  $tgv = Format::css2grayValue($text);
  if($textDark == false){
    if($tgv > 45)
      $textDark = "#000000";
    else
      $textDark = $text;
  }
  if($textLight == false){
    if($tgv <= 45)
      $textLight = "#ffffff";
    else
      $textLight = $text;
  }
  if($pHover == false){
    if($pgv > 35)
      $pHover = Adjust::cssBrightness($primary, -8);
    else 
      $pHover = Adjust::cssBrightness($primary, 8);
  }
  if($boxHover == false){
    if($bgv > 35)
      $boxHover = Adjust::cssBrightness($box, -8);
    else 
      $boxHover = Adjust::cssBrightness($box, 8);
  }
  if($sHover == false){
    if($sgv > 35)
      $sHover = Adjust::cssBrightness($secondary, -4);
    else 
      $sHover = Adjust::cssBrightness($secondary, 4);
  }
  if($eHover == false){
    if($egv > 35)
      $eHover = Adjust::cssBrightness($error, -8);
    else 
      $eHover = Adjust::cssBrightness($error, 8);
  }
  if($divider == false){
    if($bgv > 45)
      $divider = Adjust::cssBrightness($box, -8);
    else 
      $divider = Adjust::cssBrightness($box, 8);
  }
  $phgv = Format::css2grayValue($pHover);
  $bhgv = Format::css2grayValue($boxHover);
  $shgv = Format::css2grayValue($sHover);
  $ehgv = Format::css2grayValue($eHover);
?>
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css);
@import url(http://fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic);
.addui-store {
  font-size: 0;
  font-family: 'Roboto', sans-serif;
  color: <?php echo $text; ?>;
}
/*
  General Styles
*/ 
*[class^=addui-store] {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.addui-store a {
  color: inherit;
}

/*
  Buttons and Inputs
*/
.addui-store a.addui-store-minicart,
.addui-store a.addui-store-nav-home,
.addui-store-cart-checkout-back,
.addui-store button {
  display: inline-block;
  background-color: <?php echo $primary; ?>;
  font-size: <?php psize($size, 18); ?>;
  color: <?php
    if($pgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?> !important;
  padding: <?php psize($size, 8); ?> <?php psize($size, 16); ?>;
  text-decoration: none;
  border-radius: <?php psize($radius); ?>;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  margin: <?php psize($size, 4); ?> <?php psize($size, 8); ?>!important;
  border: 0;
  text-align: center;
}
.addui-store-minicart:hover,
.addui-store-nav-home:hover,
.addui-store-cart-checkout-back:hover,
.addui-store button:hover {
  background-color: <?php echo $pHover; ?>;
  color: <?php
    if($phgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
}
.addui-store input,
.addui-store select,
.addui-store textarea {
  display: block;
  font-size: 18px !important;
  margin: 8px 0 !important;
  padding: 8px 16px !important;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 100% !important;
  color: <?php echo $textDark; ?> !important;
  outline: none;
  border: 1px solid <?php echo $border; ?> !important;
  border-radius: <?php psize($radius); ?> !important;
  font-family: inherit;
  background-color: #f9f9f9 !important;
  box-shadow: 0 0 0 black !important;
}
.addui-store input:focus,
.addui-store select:focus,
.addui-store textarea:focus {
  border: 1px solid <?php echo $primary; ?> !important;
  background-color: #ffffff !important;
}
.addui-store input[type=number] {
  text-align: center;
}

.addui-store-thumb {
  display: block;
  width: <?php psize($size, 125); ?>;
  height: <?php psize($size, 125); ?>;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

/*
  Sidebar
*/
.addui-store-product-sidebar,
.addui-store-cart-checkout {
  display: inline-block;
  width: <?php psize($size, 256); ?>;
}

/*
  Nav Bar
*/
.addui-store-nav {
  text-align: right;
  margin-bottom: <?php psize($size, 16); ?>;
}
.addui-store-minicart:before {
  content: "\f07a";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-nav-home:before {
  content: "\f060";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-minicart-divider {
  display: inline-block;
  height: <?php psize($size, 24); ?>;
  width: <?php psize($size); ?>;
  background-color: <?php
    if($phgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
  margin: 0 <?php psize($size, 8); ?>;
  margin-bottom: -<?php psize($size, 6); ?>;
  vertial-align: top;
}

/*
  Category Tree
*/
.addui-store-categoryNav {
  display: inline-block;
  width: <?php psize($size, 256); ?>;
  background-color: <?php echo $box; ?>;
  padding: <?php psize($size, 16); ?>;
  border: <?php psize($size, 1); ?> solid <?php echo $divider; ?>;
  border-radius: <?php psize($radius); ?>;
  vertical-align: top;
}
.addui-store-categoryNav ul,
.addui-store-categoryNav li {
  margin: 0;
  padding: 0;
}
.addui-store-categoryNav li li {
  padding-left: <?php psize($size, 32); ?>;
}
.addui-store-categoryNav li a:before {
  content: "\f0da";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-categoryNav a {
  font-size: <?php psize($size, 18); ?>;
  text-decoration: none;
}
.addui-store-categoryNav a.addui-store-categoryNav-title {
  display: block;
  font-size: <?php psize($size, 24); ?>;
  text-align: center;
}

/*
  Large Section
*/
.addui-store-featured,
.addui-store-product-info,
.addui-store-categoryList,
.addui-store-category,
.addui-store-itemList,
.addui-store-checkout-custom {
  display: inline-block;
  width: calc( 100% -  <?php psize($size, 256); ?>);
  vertical-align: top;
}

/*
  Snippets (Small sections)
*/
.addui-store-productSnippet,
.addui-store-categorySnippet,
.addui-store-optionList,
.addui-store-product-cart,
.addui-store-item,
.addui-store-product-price,
.addui-store-product-shipping,
.addui-store-cart-itemCount,
.addui-store-cart-subtotal,
.addui-store-cart-total,
.addui-store-cart-shipping {
  display: block;
  background-color: <?php echo $box; ?>;
  padding: <?php psize($size, 16); ?>;
  margin: <?php psize($size, 16); ?>;
  margin-top: 0;
  border: <?php psize($size, 1); ?> solid <?php echo $divider; ?>;
  border-radius: <?php psize($radius); ?>;
}

/*
  Product Snippets
*/
.addui-store-productSnippet-image,
.addui-store-categorySnippet-image,
.addui-store-item-image {
  display: inline-block;
  width: <?php psize($size, 125); ?>;
  vertical-align: top;
}
.addui-store-productSnippet-info,
.addui-store-categorySnippet-info,
.addui-store-item-info {
  display: inline-block;
  width: calc(100% - <?php psize($size, 250); ?>);
  padding: 0 <?php psize($size, 16); ?>;
}
.addui-store-productSnippet-cart-price,
.addui-store-productSnippet-cart-shipping,
.addui-store-productSnippet-name,
.addui-store-categorySnippet-name,
.addui-store-item-name {
  font-size: <?php psize($size, 24); ?>;
  text-decoration: none;
  font-weight: 700;
}
.addui-store-productSnippet-description,
.addui-store-categorySnippet-description,
.addui-store-item-description {
  font-size: <?php psize($size, 18); ?>;
}
.addui-store-productSnippet-cart,
.addui-store-item-cart {
  display: inline-block;
  width: <?php psize($size, 125); ?>;
  vertical-align: top;
  text-align: center;
}
.addui-store-productSnippet-cart-shipping:before {
  content: "+";
}
.addui-store-productSnippet-cart-shipping {
  font-size: 14px;
  font-weight: 400;
}
.addui-store-productSnippet-cart-shipping:after {
  content: " shipping";
}
.addui-store-productSnippet-cart button {
  display: block;
  width: 100%;
  margin: 16px 0!important;
  padding: 8px 0;
  font-size: 16px;
}
.addui-store-product-cart button:before,
.addui-store-productSnippet-cart button:before {
  content: "\f217";
  font-family: "fontawesome";
  margin-right: 8px;
}

/*
  Product
*/
.addui-store-product-info {
  padding: <?php psize($size, 16); ?>;
  padding-top: 0;
}
.addui-store-product-name,
.addui-store-category-name {
  display: block;
  font-size: <?php psize($size, 48); ?>;
  text-align: center;
  margin-bottom: <?php psize($size, 32); ?>;
}
.addui-store-imageList {
  display: block;
}
.addui-store-imageList img {
  max-width: 100%;
}
.addui-store-product-description,
.addui-store-category-description {
  font-size: <?php psize($size, 18); ?>;
}
.addui-store-product-images {
  display: inline-block;
  width: 256px;
  vertical-align: top;
}
.addui-store-imageList img {
  max-width: 125px;
}
.addui-store-imageList img:first-child {
  max-width: 100%;
}
.addui-store-product-description {
  display: inline-block;
  width: calc(100% - 256px);
  vertical-align: top;
}
.addui-store-optionList,
.addui-store-product-cart,
.addui-store-product-price,
.addui-store-product-shipping {
  margin: 8px 0;
  font-size: 18px;
  text-align: center;
}
.addui-store-product-shipping:before {
  content: "Shipping:";
  display: block;
  font-size: 14px;
  font-weight: 400;
}
.addui-store-option-priceAdjustment:before {
  content: "Additional Charge:";
  display: block;
  font-size: 16px;
  font-weight: 400;
}
.addui-store-option-priceAdjustment {
  font-weight: 700;
  font-size: 22px;
}
.addui-store-product-cart-qty-label {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
}
.addui-store-product-cart button {
  width: 100%;
  margin: 8px 0;
}
.addui-store-price {
  text-align: left;
}
.addui-store-price-qtyRange {
  display: inline-block;
  font-size: 14px;
}
.addui-store-price-qtyRange:after {
  content: " = ";
  font-size: 14px;
  font-weight: 400;
  margin-right: 8px;
}
.addui-store-price-value {
  display: inline-block;
  font-weight: 700;
}

/*
  Categories
*/
.addui-store-categorySnippet-info {
  width: calc(100% - <?php psize($size, 125); ?>);
}
.addui-store-category-image {
  display: block;
  width: 100%;
  padding: 16px;
  padding-top: 0;
}
.addui-store-category-image img {
  max-width: 100%;
}
.addui-store-category-description {
  padding: 16px;
  padding-top: 0;
}

/*
  Cart
*/
.addui-store-item-cart {
  text-align: center;
}
.addui-store-item-cart-price:before {
  content: " @ ";
}
.addui-store-item-cart-price {
  font-size: 14px;
}
.addui-store-item-cart-price:after {
  content: " each = ";
}
.addui-store-item-cart-subtotal {
  font-size: 26px;
}
.addui-store-item-cart-shipping:before {
  content: "+ ";
}
.addui-store-item-cart-shipping:after {
  content: " shipping";
}
.addui-store-item-cart-shipping {
  font-size: 14px;
}
.addui-store-item-cart-total {
  font-size: 26px;
}
.addui-store-cart-itemCount:before {
  content: "Items:";
  display: block;
  font-size: 14px;
  font-weight: 400;
}
.addui-store-cart-subtotal:before {
  content: "Subtotal:";
  display: block;
  font-size: 14px;
  font-weight: 400;
}
.addui-store-cart-total:before {
  content: "Total:";
  display: block;
  font-size: 14px;
  font-weight: 400;
}
.addui-store-cart-itemCount,
.addui-store-cart-subtotal,
.addui-store-cart-total,
.addui-store-cart-shipping {
  margin: 0;
  margin-bottom: 16px;
  font-size: 26px;
  text-align: center;
  font-weight: 700;
}
.addui-store-cart-shipping {
  font-size: 22px;
  text-align: center;
}
.addui-store-cart-shipping:before {
  content: "Shipping:";
  display: block;
  font-size: 14px;
  font-weight: 400;
}
.addui-store-cart-checkout-continue button,
.addui-store-cart-checkout-back,
.addui-store-cart-checkout-empty button,
.addui-store-checkout-stripe button,
.addui-store-checkout-paypal button {
  width: calc(100% - 4px);
  margin: 0!important;
  margin-bottom: 16px!important;
}
.addui-store-cart-checkout-continue button:before {
  content: "\f00c";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-cart-checkout-back:before {
  content: "\f060";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-cart-checkout-empty button:before {
  content: "\f218";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store button.addui-store-item-cart-remove {
  margin: 8px 0 !important;
} 
.addui-store-item-cart-remove:before {
  content: "\f00d";
  font-family: "fontawesome";
  margin-right: 8px;
}

/*
  Custom Checkout
*/
.addui-store-checkout {
  text-align: center;
}
.addui-store-checkout-custom {
  font-size: 18px;
  text-align: left;
  padding: 16px;
  padding-top: 0;
}
.addui-store-checkout-custom input {
  width: calc(100% - 32px)!important;
  min-width: calc(100% - 32px)!important;
  max-width: calc(100% - 32px)!important;
  margin: 0!important!important;
  margin-bottom: 16px!important;
}
.addui-store-checkout-custom button {
  margin: 0 16px 16px 0 !important;
}
.addui-store-checkout-serives {
  display: inline-block;
  width: 256px;
}
.addui-store-checkout-paypal button:before {
  content: "\f1ed";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-checkout-stripe button:before {
  content: "\f1f5";
  font-family: "fontawesome";
  margin-right: 8px;
}
.addui-store-thankyou {
  font-size: 18px;
}



@media (max-width: 900px){
  .addui-store-categoryNav,
  .addui-store-featured,
  .addui-store-product-sidebar,
  .addui-store-product-info,
  .addui-store-categoryList,
  .addui-store-itemList,
  .addui-store-cart-checkout,
  .addui-store-checkout-custom,
  .addui-store-checkout-serives,
  .addui-store-category,
  .addui-store-category-image {
    width: 100%;
  }
  .addui-store-productSnippet,
  .addui-store-categorySnippet,
  .addui-store-cart-checkout {
    margin: 16px 0;
  }
  .addui-store-category-image {
    text-align: center;
  } 
}
@media (max-width: 600px){
  .addui-store-productSnippet-info {
    width: calc(100% - 125px);
  }
  .addui-store-productSnippet-cart,
  .addui-store-product-images,
  .addui-store-product-description,
  .addui-store-item-cart,
  .addui-store-item-image,
  .addui-store-item-info {
    text-align: center;
    width: 100%;
  }
  .addui-store-productSnippet-cart,
  .addui-store-product-description,
  .addui-store-item-cart {
    margin-top: 16px;
  }
  .addui-store-product-description,
  .addui-store-item-description {
    text-align: left;
  }
  .addui-store-item-cart input {
    max-width: 150px!important;
    min-width: 150px!important;
    width: 150px!important;
    margin: 8px auto!important;
  }
  .addui-store-item-image .addui-store-thumb {
    margin: 8px auto;
  }
  .addui-store-nav {
    text-align: center;
  }
  .addui-store-nav-home,
  .addui-store-minicart {
    width: calc(100% - 16px);
    margin: 8px 0 !important;
  }
}