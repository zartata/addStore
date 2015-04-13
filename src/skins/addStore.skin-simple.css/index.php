<?php
  header("X-Content-Type-Options: nosniff");
  header("Content-Type: text/css");
  require_once("../Convert.php");

  $width = "100%";
  $bg = "#f9f9f9;";
  $border = "#d3d3d3;";
  $radius = 3;
  $primary = "#3366ff";
  $hover = false;
  $secondary = "#eeeeee";
  $text = "#000000";
  $shover = false;
  $textDark = false;
  $textLight = false;
  $shadow = false;
  $pshadow = false;
if(
  isset($_GET['theme']) &&
  strtolower($_GET['theme']) == "dark"
){
  $bg = "#202020;";
  $border = "#292929;";
  $primary = "#003399";
  $text = "#ffffff";
}
extract($_GET);
$bggv = Format::css2grayValue($bg);
$tgv = Format::css2grayValue($text);
$pgv = Format::css2grayValue($primary);
if(!$textDark){
  if($tgv < 45)
    $textDark = $text;
  else
    $textDark = "#000000";
}
if(!$textLight){
  if($tgv >= 45)
    $textLight = $text;
  else
    $textLight = "#ffffff";
}
if(!$shadow){
  $shadow = Format::css2rgba($border);
  $shadow = Adjust::rgbaAlpha($shadow, -0.3);
  $shadow = Format::rgba2css($shadow);
}
if(!$pshadow){
  $pshadow = Format::css2rgba( Adjust::cssBrightness($primary, -20) );
  $pshadow = Adjust::rgbaAlpha($pshadow, -0.3);
  $pshadow = Format::rgba2css($pshadow);
}
if($hover === false){
  if($bggv>45)
    $hover = Adjust::cssBrightness($primary, -8);
  else
    $hover = Adjust::cssBrightness($primary, 8);
}
if($shover === false){
  if($bggv>45)
    $shover = Adjust::cssBrightness($secondary, -8);
  else
    $shover = Adjust::cssBrightness($secondary, 8);
}
$sgv = Format::css2grayValue($secondary);
$shgv = Format::css2grayValue($shover);
$hgv = Format::css2grayValue($hover);
?>
@import url(http://fonts.googleapis.com/css?family=Cabin:400,700,400italic|Roboto:400,700,400italic);
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css);
/*
  General Styles
*/
.addstore {
  display: block;
  width: 100%;
  position: relative;
  padding: 0;
  padding-top: 64px;
  color: <?php
    if($bggv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
  font-family: 'Cabin', sans-serif !important;
  font-size: 16px;
  line-height: normal;
}
.addstore a {
  color: inherit;
}
.addstore-btn {
  display: inline-block;
  height: 38px;
  padding: 8px;
  text-decoration: none;
  font-family: Roboto;
  font-size: 18px;
  background-color: <?php echo $secondary; ?>;
  border: 1px solid <?php echo $border; ?>;
  border-radius: <?php echo psize($radius); ?>;
  box-shadow: 0 1px 2px <?php echo $shadow; ?>;
  margin: 4px;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: center;
  transition: color 0.3s, background 0.3s;
  color: <?php
    if($sgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
}
.addstore-btn:hover {
  background-color: <?php echo $shover; ?>;
  color: <?php
    if($shgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
}
.addstore-btn .fa {
  padding: 0 4px;
}
.addstore-btn.addstore-primary {
  background-color: <?php echo $primary; ?>;
  color: <?php
    if($pgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
  border: 1px solid <?php echo $primary; ?>;
  box-shadow: 0 1px 2px <?php echo $pshadow; ?>;
}
.addstore-btn.addstore-primary:hover {
  background-color: <?php echo $hover; ?>;
  color: <?php
    if($hgv > 45)
      echo $textDark;
    else
      echo $textLight;
  ?>;
}
.addstore-box {
  background-color: <?php echo $bg; ?>;
  border: 1px solid <?php echo $border; ?>;
  border-radius: <?php echo psize($radius); ?>;
  box-shadow: 0 1px 2px <?php echo $shadow; ?>;
  padding: 8px;
  margin: 0 8px 16px 8px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.addstore .thumb {
  display: inline-block;
  margin: 8px;
  height: 100px;
  width: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.addstore h2 {
  display: block;
  text-align: center;
  border-bottom: 1px solid <?php echo $border; ?>;
  margin: 0;
  padding: 0;
  padding-top: 16px;
  padding-bottom: 4px;
  margin-bottom: 16px;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
}
.addstore h3 {
  display: block;
  text-align: left;
  margin: 0;
  padding: 8px 0;
  padding-top: 16px;
  padding-bottom: 4px;
  margin-bottom: 16px;
  font-size: 28px;
  font-family: 'Roboto', sans-serif;
}
.addstore-divider {
  display: inline-block;
  height: 20px;
  width: 1px;
  margin: 0 4px;
  background-color: <?php echo $border; ?>;
  vertical-align: middle;
}
.addstore hr {
  display: block;
  height: 1px;
  background-color: <?php echo $border; ?>;
  border: 0;
}
.addstore input[type=number] {
  display: inline-block;
  width: 75px !important;
  min-width: 75px !important;
  max-width: 75px !important;
  font-size: 20px;
  background-color: <?php echo $bg; ?>;
  border: 1px solid <?php echo $border; ?>;
  border-radius: <?php psize($radius); ?>;
  outline: none;
  text-align: center;
  margin: 8px 0;
  padding: 4px;
}
.addstore input[type=number]:focus {
  border: 1px solid <?php echo $primary; ?>;
  box-shadow: 0 0 2px <?php echo $primary; ?>;
  background-color: white;
}
.addstore-image {
  display: inline-block;
  margin: 8px;
}
.addstore-image img {
  max-width: 100%;
  border-radius: <?php psize($radius); ?>;
  box-shadow: 0 1px 2px <?php echo $shadow; ?>;
}


/*
  Layout
*/
.addstore-navbar {
  display: block;
  position: absolute;
  top: 8px;
  right: 20px;
}
.addstore-leftpane {
  display: inline-block;
  width: 256px;
  vertical-align: top;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.addstore-rightpane {
  display: inline-block;
  width: calc(100% - 256px);
  vertical-align: top;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

/*
  Category Tree
*/
.addstore-categorytree {
  display: block;
  list-style: none;
}
.addstore-product-options-label,
.addstore-categorytree-title {
  text-align: center;
  font-weight: 700;
  border-bottom: 1px solid <?php echo $border; ?>;
  padding-bottom: 8px;
  margin-bottom: 8px;
  font-family: 'Roboto', sans-serif;
}
.addstore-categorytree ul {
  padding: 0;
  margin: 0;
  margin-left: 16px;
  list-style: none;
}
.addstore-categorytree ul li:before {
  content: "\f0da";
  font-family: FontAwesome;
  padding-right: 8px;
}
.addstore-categorytree a {
  text-decoration: none;
}

/*
  Snippets
*/
.addstore-categorysnippet,
.addstore-productsnippet {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid <?php echo $border; ?>;
  text-decoration: none;
}
.addstore-categorysnippet:last-child,
.addstore-productsnippet:last-child {
  border-bottom: 0;
}
.addstore-categorysnippet-image,
.addstore-productsnippet-image {
  display: inline-block;
  width: 100px;
  margin-right: 16px;
  vertical-align: top;
}
.addstore-categorysnippet-info,
.addstore-productsnippet-info {
  display: inline-block;
  width: calc(100% - 116px);
  vertical-align: top;
  padding: 16px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  flex: 4;
  text-decoration: none;
}
.addstore-categorysnippet-name,
.addstore-productsnippet-name {
  display: block;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}
.addstore-productsnippet-addtocart {
  display: inline-block;
  min-width: 137px;
  flex: 1;
}

/*
  Category Line
*/
.addstore-category-line {
  display: block;
  text-align: center;
}
.addstore-category-line-item {
  display: inline-block;
  padding: 4px 8px;
  text-decoration: none;
  font-size: 18px;
}
.addstore-category-line-item:before {
  content: "\f054";
  font-family: FontAwesome;
  padding-right: 8px;
  font-size: 12px;
  line-height: 22px;
}
.addstore-category-line-item:first-child:before {
  content: "";
  padding-right: 0;
}

/*
  Product / Cart
*/
.addstore-cart-controls,
.addstore-product-controls {
  text-align: center;
}
.addstore-product-controls .addstore-btn,
.addstore-cart-controls .addstore-btn {
  display: block;
  width: 100%;
  margin: 8px 0;
}
.addstore-product-images,
.addstore-category-image {
  text-align: center;
  padding: 16px;
}
.addstore-product-qtyLabel,
.addstore-product-priceLabel,
.addstore-cart-itemCountLabel,
.addstore-cart-totalLabel {
  font-size: 20px;
  font-style: italic;
}
.addstore-product-price,
.addstore-cart-itemCount,
.addstore-cart-total {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}
.addstore-product-options-image {
  display: block;
  width: 100%;
  text-align: center;
}
.addstore select {
  display: block;
  width: 100%;
  font-size: inherit;
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  background-color: transparent;
  padding: 8px 16px;
  outline: none;
  transition: box-shadow 0.1s;
  margin: 8px 0;
  text-align: center;
  font-family: 'Cabin', sans-serif !important;
}
.addstore select:focus {
  border: 1px solid <?php echo $primary; ?>;
  box-shadow:
    0 0 3px <?php echo $primary; ?>;
}


/*
  Cart Items
*/
.addstore-cartitem {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid <?php echo $border; ?>;
}
.addstore-cartitem:last-child {
  border: 0;
}
.addstore-cartitem .thumb {
  display: inline-block;
  vertical-align: top;
}
.addstore-cartitem-info {
  display: inline-block;
  vertical-align: top;
  flex: 3;
}
.addstore-cartitem-name {
  text-decoration: none;
  font-size: 26px;
  font-weight: 700;
}
.addstore-cartitem-name:hover {
  color: <?php echo $primary; ?>;
}
.addstore-cartitem-description p {
  padding: 4px 0;
  margin: 0;
  font-size: 18px;
}
.addstore-cartitem-price {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  flex: 1;
  text-align: center;
}
.addstore-cartitem-price-unit {
  display: block;
  font-style: italic;
  font-size: 14px;
}
.addstore-cartitem-price-total {
  display: block;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}
.addstore-cartitem-remove {
  display: inline-block;
  width: 50px;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 8px 0;
  font-size: 24px;
  color: inherit;
}
.addstore-cartitem-remove:hover {
  display: inline-block;
  width: 50px;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 8px 0;
  font-size: 24px;
  color: <?php echo $primary; ?>;
}

.addstore-thankyou-continue {
  display: block;
  text-align: center;
}
.addstore-thankyou-message {
  margin: 16px;
}

@media (max-width: 840px){
  .addstore {
    padding: 0;
  }
  .addstore .thumb {
    display: inline-block;
    margin: 8px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .addstore-navbar {
    display: block;
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    text-align: center;
  }
  .addstore-leftpane,
  .addstore-rightpane {
    display: block;
    width: 100%;
  }
  .addstore-category-line-item {
    font-size: 14px;
  }
}
@media (max-width: 600px){
  .addstore-cartitem,
  .addstore-cartitem-info,
  .addstore-productsnippet,
  .addstore-productsnippet-info,
  .addstore-productsnippet-addtocart,
  .addstore-categorysnippet,
  .addstore-categorysnippet-info,
  .addstore-categorysnippet-image {
    display: block;
    width: 100%;
  }
  
  .addstore-productsnippet-thumb,
  .addstore-categorysnippet-image {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .addstore-cartitem-info {
    text-align: left;
  }
  .addstore-cartitem-qty {
    display: inline-block;
    width: 50%;
    vertical-align: middle;
  }
  .addstore-cartitem-remove,
  .addstore-cartitem-price {
    display: inline-block;
    width: 25%;
    text-align: center;
    vertical-align: middle;
  }
  .addstore-cartitem {
    padding-bottom: 16px;
  }
}












