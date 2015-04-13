<?php
header('Content-Type: application/json');
require_once(dirname(__FILE__). '/stripe/init.php');
class ProductList {
  public $products = Array();
  public function add($name, $price){
    $name = strtolower($name);
    $temp = new stdClass();
    $temp->name = $name;
    $temp->price = $price;
    array_push($this->products, $temp);
  }
  public function get($name){
    $name = strtolower($name);
    foreach($this->products as $p){
      if($name == $p->name){
        return $p;
      }
    }
    return $p;
  }
  public function getPrice($name){
    $p = $this->get($name);
    if($p === false)
      return false;
    else
      return $p->price;
  }
}
$config = json_decode( file_get_contents(dirname(__FILE__)."/config/addStore.json") );
\Stripe\Stripe::setApiKey($config->secret_key);

$token_obj = json_decode($_POST['token']);
$data = new stdClass();
$data->token = $token_obj->id;
$data->email = $token_obj->email;
$data->ip = $token_obj->client_ip;
$data->cart = json_decode($_POST['cart']);
$data->total = $_POST['total'];
$data->storeName = substr($_POST['storeName'], 0 , 22);
if($token_obj->card->name && $token_obj->card->name != $data->email)
  $data->name = $token_obj->card->name;
if($token_obj->card->address_line1)
  $data->address = $token_obj->card->address_line1;
if($token_obj->card->address_city)
  $data->city = $token_obj->card->address_city;
if($token_obj->card->address_state)
  $data->state = $token_obj->card->address_city;
if($token_obj->card->address_zip)
  $data->zip = $token_obj->card->address_city;
if($token_obj->card->address_country)
  $data->country = $token_obj->card->address_country;
if($token_obj->id)
  $data->token = $token_obj->id;
$storeFile = "addStore.json";
if(isset($_REQUEST['storeFile']))
  $storeFile = $_REQUEST['storeFile'];
if(!is_file(dirname(__FILE__)."/".$storeFile)){
  die('{"success":false,"error":{"number": 1, "message":"Error loading store configuration file, please update your $add.Store.settings.store_file"}}'); 
}
$store = json_decode( file_get_contents( dirname(__FILE__)."/".$storeFile ) );
$products = new ProductList();
foreach($store->products as $p){
  $products->add($p->name, $p->price);
}
$real_total = 0;
$description = "";
foreach($data->cart as $item){
  $price = $products->getPrice($item->product->name);
  $real_total += $price*$item->qty;
  $description .= $item->product->name;
  if($item->option !== false)
    $description .= " - ".$item->option;
  $description .= " (".$item->qty;
  if($item->qty>1)
    $description .= " x $".$price;
  $description .= ") = $".($price*$item->qty)." \n\r";
}
if($real_total != $data->total){
  die('{"success":false,"error":{"number": 2, "message":"Your carts total price was miscalculated, please refresh the page and try again.", "calculate_total":'.$real_total.', "recieved_total":'.$data->total.'}}'); 
}
$cent_total = $real_total*100;
try {
  $charge = \Stripe\Charge::create(
    array(
      "amount" => $cent_total,
      "currency" => "usd",
      "source" => $data->token,
      "description" => $description,
      "statement_descriptor" => $data->storeName
    )
  );
} catch(\Stripe\Error\Card $e) {
  $e = json_encode($e);
  die('{"success":false,"error":{"number": 3, "message":"Card Declined.", "stripe_message":"'.json_encode($e).'"}}'); 
}
die('{"success":true}');