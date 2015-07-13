<?php
function array_compare($a1, $a2){
  $smaller = count($a1);
  if(count($a2)<$smaller)
    $smaller = count($a2);
  for($i=0;$i<$smaller;$i++){
    if($a1[$i] < $a2[$i])
      return -1;
    if($a1[$i] > $a2[$i])
      return 1;
  }
  if(count($a1)<count($a2))
    return -1;
  if(count($a1)>count($a2))
    return 1;
  return 0;
};

class R {
  static public
    $errors = array(),
    $logs = array(),
    $data = array(),
    $debug = false,
    $pauseErrors = false;
  public static function error($num, $string){
    if(self::$pauseErrors)return;
    $e = array(
      "number"=>$num,
      "message"=>$string
    );
    array_push(self::$errors, $e);
  }
  public static function log($string){
    array_push(self::$logs, $string);
  }
  public static function send($success = NULL){
    if($success===NULL){
      if(count(self::$errors)>0)
        $success=false;
      else
        $success=true;
    }
    $R = array("success"=>$success);
    if(count(self::$errors)>0)
      $R['errors']=self::$errors;
    if(self::$debug)
      $R['logs']=self::$logs;
    foreach(self::$data as $k => $v){
      $R[$k]=$v;
    }
    if(self::$debug)
      $json = json_encode($R, JSON_PRETTY_PRINT);
    else
      $json = json_encode($R);
    die($json);
  }
  public static function attach($key, $value){
    self::$data[$key] = $value;
  }
}

class Option {
  public
    $name = false,
    $price_adjustment = 0;
  public function __construct($o = false){
    if($o !== false)
      $this->fromObj($o);
  }
  public function fromObj($o){
    if(is_object($o)){
      if(isset($o->name))
        $this->name = $o->name;
      if(isset($o->price_adjustment))
        $this->price_adjustment = $o->price_adjustment;
    } else if(is_string($o)){
      $this->name = $o;
    }
  }
  public function eq($o){
    $o = new Option($o);
    if($this->name > $o->name)
      return 1;
    if($this->name < $o->name)
      return -1;
    return 0;
  }
};
class OptionList {
  public
    $list = [];
  public function __construct($a = false){
    if($a !== false)
      $this->fromArray($a);
  }
  public function fromArray($a){
    foreach($a as $o)
      array_push($this->list, new Option($o));
  }
  public function get($o){
    foreach($this->list as $t){
      $eq = $t->eq($o);
      if($eq == 0){
        return $t;
      }
    }
    return false;
  }
  public function add($o){
    if($this->get($o) === false)
      array_push(new Option($o));
  }
};
class Price {
  public
    $min_qty = false,
    $max_qty = false,
    $value = 0;
  public function __construct($o = false){
    if($o !== false)
      $this->fromObj($o);
  }
  public function fromObj($o){
    if(isset($o)){
      if(isset($o->min_qty))
        $this->min_qty = $o->min_qty;
      if(isset($o->max_qty))
        $this->max_qty = $o->max_qty;
      if(isset($o->value))
        $this->value = $o->value;
    }
  }
  public function inRange($qty){
    if(
      ( $this->min_qty === false || $this->min_qty <= $qty ) &&
      ( $this->max_qty === false || $this->max_qty >= $qty )
    ) return true;
    return false;
  }
};
class PriceList {
  public
    $list = [];
  public function __construct($a = false){
    if($a !== false)
      $this->fromArray($a);
  }
  public function add($o){
    $o = new Price($o);
    array_push($this->list, $o);
  }
  public function fromArray($a){
    foreach($a as $o)
      $this->add($o);
  }
  public function val($qty){
    foreach($this->list as $p){
      if($p->inRange($qty)){
        return $p->value;
      }
    }
  }
};
class Product {
  public
    $name = false,
    $slug = false,
    $prices = false,
    $options = [],
    $mix_match = false,
    $shipping = false;
  public function __construct($o = false){
    $this->prices = new PriceList();
    if($o !== false)
      $this->fromObj($o);
  }
  public function fromObj($o){
    if(is_string($o))
      $this->slug = $o;
    if(isset($o->name))
      $this->name = $o->name;
    if(isset($o->slug))
      $this->slug = $o->slug;
    if(isset($o->prices) && is_array($o->prices))
      foreach($o->prices as $p)
        $this->prices->add($p);
    if(isset($o->options) && is_array($o->options))
      foreach($o->options as $t)
        array_push($this->options, new OptionList($t));
    if(isset($o->mix_match) && $o->mix_match)
      $this->mix_match = true;
    if(isset($o->shipping)){
      if(is_object($o->shipping))
        $this->shipping = $o->shipping;
      else {
        $this->shipping = new stdClass();
        $this->shipping->type = "each";
        $this->shipping->value = $o->shipping;
      }
    }
  }
  public function val($qty, $options){
    $v = $this->prices->val($qty);
    for($i=0;$i < count($this->options);$i++){
      $ol = $this->options[$i];
      $to = $options[$i];
      $o = $ol->get($to);
      $pa = $o->price_adjustment;
      if($pa === false)
        $pa = 0;
      $v += $pa;
    }
    return $v;
  }
  public function subtotal($qty, $options){
    $v = $this->val($qty, $options)*$qty;
    return $v;
  }
  public function shippingCost($qty){
    if($this->shipping === false || $qty === 0)
      return 0;
    if($this->shipping->type == "each")
      return $this->shipping->value * $qty;
    else if($this->shipping->type == "box"){
      return ceil( $qty / $this->shipping->size)*$this->shipping->value;
    }
  }
  public function total($qty, $options){
    return $this->subtotal($qty, $options) + $this->shippingCost($qty);
  }
};
class Item {
  public
    $product_slug = false,
    $qty = 0,
    $options = [];
  public function __construct($o = false){
    if($o !== false)
      $this->fromObj($o);
  }
  public function fromObj($o){
    if(isset($o->product_slug))
      $this->product_slug = $o->product_slug;
    if(isset($o->qty))
      $this->qty = $o->qty;
    if(isset($o->options))
      $this->options = $o->options;
  }
  public function eq($o){
    $o = new Item($o);
    if($o->product_slug > $this->product_slug) return -1;
    else if($this->product_slug > $o->product_slug) return 1;
    return array_compare($this->options, $o->options);
  }
  public function countItems(){
    return $Cart->countItem($this->product_slug);
  }
  public function subtotal(){
    $p = Products::get($this->product_slug);
    if($p === false)return false;
    $t = $p->subtotal($this->qty, $this->options);
    return $t;
  }
  public function shippingCost(){
    $p = Products::get($this->product_slug);
    if($p === false)return false;
    return $p->shippingCost($this->qty);
  }
  public function total(){
    $p = Products::get($this->product_slug);
    if($p === false)return false;
    return $p->total($this->qty, $this->options);
  }
  public function toString(){
    $p = Products::get($this->product_slug);
    $s = $p->name." ";
    foreach($this->options as $o){
      $s .= "(".$o.") ";
    }
    if($this->qty > 1)
      $s .= " @ $".$p->val($this->qty, $this->options)." x".$this->qty." ";
    $s .= "= $".$this->subtotal()."\n";
    $shipping = $this->shippingCost();
    if($shipping > 0)
      $s .= "+ $".$shipping." shipping\n";
    return $s;
  }
};

/* Static Classes */
class Products {
  public static
    $list = [];
  public static function fromArray($a){
    foreach($a as $p)
      if(!self::hasProduct($p))
        array_push(self::$list, new Product($p));
  }
  public static function hasProduct($o){
    $o = new Product($o);
    foreach(self::$list as $p)
      if($p->slug == $o->slug)
        return true;
    return false;
  }
  public static function get($o){
    $o = new Product($o);
    foreach(self::$list as $p)
      if($p->slug == $o->slug)
        return $p;
    return false;
  }
};
class Cart {
  public static
    $list = [];
  public static function hasItem($o){
    foreach(self::$list as $I)
      if($I->eq($o) === 0)
        return true;
    return false;
  }
  public static function add($o){
    if(!self::hasItem($o))
      array_push(self::$list, new Item($o));
  }
  public static function fromArray($a){
    foreach($a as $o)
      self::add($o);
  }
  public static function countItem($o){
    $o = new Item($o);
    $count = 0;
    foreach(self::$list as $I){
      if($o->product_slug == $I->product_slug)
        $count += $I->qty;
    }
    return $count;
  }
  public static function subtotal(){
    $total = 0;
    foreach(self::$list as $I){
      $t = $I->subtotal();
      $total += $t;
    }
    return $total;
  }
  public static function shippingCost(){
    $total = 0;
    foreach(self::$list as $I)
      $total += $I->shippingCost();
    return $total;
  }
  public static function total(){
    $total = 0;
    foreach(self::$list as $I)
      $total += $I->total();
    return $total;
  }
  public static function toString(){
    $s = "";
    foreach(self::$list as $I){
      $s .= $I->toString();
    }
    return $s;
  }
};

$public_settings;
$secure_settings;
function loadStore($path_to_store){
  $path = dirname($_SERVER['HTTP_REFERER'])."/";
  $file = file_get_contents($path.$path_to_store);
  $file = json_decode($file);
  $GLOBALS['public_settings'] = $file->settings;
  Products::fromArray($file->products);
}
function loadSecureSettings($path_to_src){
  $path = dirname($_SERVER['HTTP_REFERER'])."/".$path_to_src;
  $file = file_get_contents($path."secure/settings.json");
  $GLOBALS['secure_settings'] = json_decode($file);
}

