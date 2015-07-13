<?php
  header('Content-Type: application/json');
  include("../addStore.php");
  include("../stripe/init.php");
  Cart::fromArray(json_decode($_REQUEST['cart']));
  loadStore($_REQUEST['path_to_store']);
 loadSecureSettings($_REQUEST['path_to_src']);
  
  $r_subtotal = round(floatval($_REQUEST['subtotal']), 2);
  $r_shipping = round(floatval($_REQUEST['shipping']), 2);
  $r_total = round(floatval($_REQUEST['total']), 2);

  $subtotal = round(Cart::subtotal(), 2);
  $shipping = round(Cart::shippingCost(), 2);
  $total = round(Cart::total(), 2);

  R::attach("calculated_subtotal", $subtotal);
  R::attach("calculated_shipping", $shipping);
  R::attach("calculated_total", $total);

  R::attach("requested_subtotal", $r_subtotal);
  R::attach("requested_shipping", $r_shipping);
  R::attach("requested_total", $r_total);

  if(
    $r_subtotal == $subtotal &&
    $r_shipping == $shipping &&
    $r_total == $total
  ) {
    R::attach("valid", true);
  } else {
    R::attach("valid", false);
    R::error(10, "Cart totals not valid.");
    R::send();
  }
  $description = Cart::toString();
  R::attach("description", $description);

  \Stripe\Stripe::setApiKey($secure_settings->stripe);
  $token = $_GET['stripeToken'];
  try {
    $charge = \Stripe\Charge::create(array(
      "amount" => ($total*100),
      "currency" => "usd",
      "source" => $token,
      "description" => $description
    ));
  } catch(\Stripe\Error\Card $e) {
    R::error(5, "Card Declined");
    R::attach("stripe_error", $e);
  }
  R::send();
  
 