if($add===undefined)var $add={};
if($add.UI===undefined)$add.UI={version:{},helpers:{},auto:{}};
$add.UI.helpers.strFunc=function(str){return"function"==typeof str?str:void 0!==window[str]&&"function"==typeof window[str]?window[str]:function(){eval(str)}};
/* Hash Router */
$add.UI.version.hashRouter = "1.0.3";
(function(){function mkHash(n){return"#"==n.charAt(0)?n:"#"+n}function mkFunc(s){return"function"==typeof s?s:void 0!==window[s]&&"function"==typeof window[s]?window[s]:void 0===s||s===!1?function(){}:function(){eval(s)}}function callH(n,a){var e=!1;if(void 0!==a)for(var r=0;r<handlers.length;r++)handlers[r].hash==n&&handlers[r].name==a&&(handlers[r].handler(n),e=!0);else for(var r=0;r<handlers.length;r++)handlers[r].hash==n&&(handlers[r].handler(n),e=!0);return e}var handlers=[],history=[],disabled=!1,current="";$add.UI.hashRouter={add:function(n,a,e,r){n=mkHash(n),a=mkFunc(a),e=mkFunc(e),handlers.push({hash:n,handler:a,unloadHandler:e,name:r})},get:function(n,a){n=mkHash(n);for(var e=[],r=0;r<handlers.length;r++)handlers[r].hash!=n||void 0!=a&&handlers[r].name!=a||e.push(handlers[r]);return 0==e.length?!1:1==e.length?e[0]:e},remove:function(n,a){n=mkHash(n);for(var e=!1,r=0;r<handlers.length;r++)handlers[r].hash!=n||void 0!=a&&handlers[r].name!=a||(handlers.splice(r,1),r--,e=!0);return e},trigger:function(n){if(!disabled&&(n=mkHash(n),current!==n)){for(var a=0;a<handlers.length;a++)handlers[a].hash==current&&handlers[a].unloadHandler(current,n);return current=n,""!==n&&(window.location.hash=n),callH(n)}},call:function(n,a){return disabled?void 0:(n=mkHash(n),callH(n,a))},disable:function(){disabled=!0},enable:function(){disabled=!1}},window.onhashchange=function(){$add.UI.hashRouter.trigger(location.hash)},window.addEventListener("load",function(){$add.UI.hashRouter.trigger(location.hash)})}());
Math.randInt = function(min, max){
  if(min===undefined)min=0;
  if(max===undefined)max=1000000;
  max+=1;
  return Math.floor( ( Math.random()*(max-min) )+min  );
};
Array.prototype.clone = function () {
  var clone = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i].clone !== undefined) clone.push(this[i].clone());
    else clone.push(this[i]);
  };
  return clone;
};
Array.prototype.shuffle = function(){
  var swaps = Math.randInt(2*this.length, 10*this.length);
  for(var i=0;i<swaps;i++){
    var s1 = Math.randInt(0,this.length-1);
    var s2 = Math.randInt(0,this.length-1);
    var t = this[s1];
    this[s1]=this[s2];
    this[s2]=t;
  }
  return this;
};
Array.prototype.trim = function(){
  var temp = [];
  for(var i=0;i<this.length;i++){
    if(this[i] != "")
      temp.push(this[i]);
  }
  return temp;
};
String.prototype.splitP = function(){
  var s = this.split("<p>");
  s = s.trim();
  s = s.join("</p>");
  s = s.split("</p>");
  s = s.trim();
  return s;
};
String.prototype.snippet = function(chars){
  if(chars===undefined)chars = 256;
  var a = this.splitP();
  var r = "";
  var count = 0;
  var nl = 0;
  for(var i=0;i<a.length && count+nl<chars;i++){
    r+="<p>";
    var w = a[i].split(" ").trim();
    for(var e=0;e<w.length && count+nl<chars;e++){
      nl = w[e].length+1;
      if(e>0)
        r += " ";
      r += w[e];
      count += nl;
    }
    if(e<w.length-1){ // Hit end early
      if(r.charAt(r.length-1)==".")
        r+="..";
      else
        r+="...";
    }
    r+="</p>";
  }
  return r;
};



$add.UI.helpers.slug = function(str){
  if(!str)return str;
  str=str.toLowerCase();
  str=str.replace(/[^a-zA-Z0-9\s ]/g, '');
  str=str.replace(' ', '-');
  return str;
};
$add.UI.helpers.goto = function(id, transition){
    if(transition===undefined)transition===750;
    var dest = 0;
    if($("#"+id).offset().top > $(document).height()-$(window).height()){
        dest=$(document).height()-$(window).height();
    } else {
        dest=$("#"+id).offset().top;
    }
    $("html,body").animate({scrollTop:dest}, transition, 'swing');
};
$add.Store = {
  version: "1.0.0",
  settings: {
    parent: "*[data-addui=store]",
    storeName: "My Store",
    shipping: true,
    stripeKey: "",
    paymentHandler: "addStore.php",
    storeFile: "addStore.json",
    contactEmail: "info@your-site.com",
    checkoutLogo: "images/checkout-logo.png",
    confirmEmail: false,
    thankYouMessage: "You order has been successfully placed and your payment recieved. Please check your email for further information.",
    minimum: 1,
    featuredShuffle: true,
    featuredNumber: 10,
    
    callback: function(){},
    onProductAdd: function(){},
    onProductRemove: function(){},
    onProductRender: function(){},
    onCategoryAdd: function(){},
    onCategoryRemove: function(){},
    onCategoryTempAdd: function(){},
    onCategoryRender: function(){},
    onCartAdd: function(){},
    onCartRemove: function(){},
    onCartChangeQty: function(){},
    onCartRender: function(){},
    onCheckoutRender: function(){},
    onCheckout: function(){}
  },
  render: {},
  categories: [],
  products: [],
  cart: [],
  checkout: {},
  updateSettings: function(s){
    $add.Store.settings = $.extend($add.Store.settings, s);
  },
  load: {}
};
(function(){
  $add.Store.load.fromObj = function(o){
    if(o.version.split(".")[0] !== $add.Store.version.split(".")[0]){
      console.log("Version missmatch: You are currently running addCart "+$add.Store.version+". You are attempting to import store data for version "+o.version+". Check http://github.com/addcms/addcart/ for more information.");
      return false;
    }
    if(o.categories)
      for(var i=0;i<o.categories.length;i++){
        $add.Store.categories.add(o.categories[i]);
      }
    if(o.products)
      for(var i=0;i<o.products.length;i++)
        $add.Store.products.add(o.products[i]);
    $add.Store.cart.load();
    return true;
  };
  $add.Store.load.fromFile = function(file, callback){
    if(callback==undefined)callback=function(){};
    $.ajax({
      url: file,
      success: function(x){
        if(typeof(x)=="string")
          x = JSON.parse(x);
        $add.Store.load.fromObj(x);
        $add.UI.hashRouter.call(location.hash);
        callback();
      },
      fail: callback
    });
  };
  $add.Store.export = function(){
    var store = {version: $add.Store.version, products: [], categories: []};
    store.products = JSON.parse( JSON.stringify( $add.Store.products ) );
    store.categories = JSON.parse( JSON.stringify( $add.Store.categories ) );
    console.log("Exported Store: ");
    console.log(store);
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=urf-8,'+encodeURIComponent(JSON.stringify(store)));
    pom.setAttribute('download', 'store.json');
    pom.click();
  };
  $add.Store.products.add = function(name, price, description, images, categories){
    var p = new Product(name, price, description, images, categories);
    for(var i=0;i<$add.Store.products.length;i++){
      if(p.name.toLowerCase() == $add.Store.products[i].name.toLowerCase())
        return false;
    }
    $add.Store.products.push(p);
    $add.Store.settings.callback("productsAdd", p);
    $add.Store.settings.onProductAdd(p);
    // TODO Check categories of p, create the ones that don't exist as "temp".
    $add.UI.hashRouter.add("#!/product/"+$add.UI.helpers.slug(p.name), function(){
      $($add.Store.settings.parent).html( $add.Store.render.product(p) );
      $("title").html( p.name + " - Product - " + $add.Store.settings.storeName );
      $add.UI.helpers.goto("addstore");
    });
    return true;
  };
  $add.Store.products.remove = function(name){
    name = name.toLowerCase();
    for(var i=0;i<$add.Store.products.length;i++){
     if(name == $add.Store.products[i].name.toLowerCase()){
       var p = $add.Store.products[i];
       $add.Store.products.splice(i, 1);
       $add.Store.settings.onProductRemove(p);
       $add.Store.settings.callback("productRemoved", p);
       return true;
     }
    }
    return false;
  };
  $add.Store.products.get = function(name){
    name = name.toLowerCase();
    for(var i=0; i<$add.Store.products.length;i++){
      var p = $add.Store.products[i];
      if(p.name.toLowerCase() == name)
        return p;
    }
    return false;
  };
  $add.Store.products.getFeatured = function(){
    var t = [];
    for(var i=0;i<$add.Store.products.length;i++){
      if($add.Store.products[i].featured)
        t.push($add.Store.products[i])
    }
    if($add.Store.settings.featuredShuffle)
      t = t.shuffle();
    return t.slice(0, $add.Store.settings.featuredNumber);
  }
  $add.Store.products.swapOptionsImage = function(product_name, option){
    var p = $add.Store.products.get(product_name);
    var o = false;
    for(var i=0;i<p.options.length;i++)
      if(p.options[i].name.toLowerCase()
         == option.toLowerCase())
        o = p.options[i];
    if(o && o.image)
      $(".addstore-product-options-image").html( $add.Store.render.image(o.image) );
    else 
      $(".addstore-product-options-image").html("");
  };
  $add.Store.categories.add = function(name, description, image, parent){
    if(typeof(name)=="string")
      var c = new Category(name, description, image, parent);
    else if(typeof(name)=="object"){
      var c = new Category();
      c.fromObj(name);
    } else return false;
    for(var i=0;i<$add.Store.categories.length;i++){
      if($add.Store.categories[i].name.toLowerCase() == c.name.toLowerCase() && !$add.Store.categories[i].temp)
        return false;
    }
    $add.Store.categories.remove(c.name); // Removes potential "temp" category
    $add.Store.categories.push(c);
    $add.Store.settings.callback("categoryAdd", c);
    $add.Store.settings.onCategoryAdd(c);
    $add.UI.hashRouter.add("#!/category/"+$add.UI.helpers.slug(c.name), function(){
      $($add.Store.settings.parent).html( $add.Store.render.category(c) );
      $("title").html( c.name + " - Category - " + $add.Store.settings.storeName );
      $add.UI.helpers.goto("addstore");
    });
    return true;
  };
  $add.Store.categories.remove = function(name){
    name = name.toLowerCase();
    for(var i=0;i<$add.Store.categories.length;i++){
      if($add.Store.categories[i].name.toLowerCase() == name){
        var c = $add.Store.categories[i];
        $add.Store.categories.splice(i,1);
        $add.Store.settings.callback("categoryRemove", c);
        $add.Store.settings.onCategoryRemove(c);
        return true;
      }
    }
    return false;
  };
  $add.Store.categories.get = function(name){
    name = name.toLowerCase();
    for(var i=0; i<$add.Store.categories.length;i++){
      var c = $add.Store.categories[i];
      if(c.name.toLowerCase() == name)
        return c;
    }
    return false;
  };
  $add.Store.cart.hasProduct = function(name){
    name = name.toLowerCase();
    for(var i=0;i<$add.Store.cart.length;i++){
      if($add.Store.cart[i].product.toLowerCase() == name)
        return true;
    }
    return false;
  };
  $add.Store.cart.add = function(name, qty, option){
    if(!$add.Store.products.get(name))
      return false;
    if(qty===undefined)
      qty = 1;
    else
      qty = parseInt(qty);
    if(qty<1)
      qty = 1;
    if(option === undefined || option === false){
      var p = $add.Store.products.get(name);
      if(p.options.length === 0)
        option = false;
      else
        option = p.options[0].name;
    }
    var cartItem = $add.Store.cart.get(name, option);
    if(cartItem){
      for(var i=0;i<$add.Store.cart.length;i++){
        if($add.Store.cart[i].product.toLowerCase() == name.toLowerCase()){
          $add.Store.cart[i].qty+=qty;
          $add.Store.settings.callback("cartAdd", name);
          $add.Store.settings.onCartAdd(name);
          $add.Store.cart.save();
          return true;
        }
      }
    } else {
      $add.Store.cart.push({product: name, qty:qty, option: option});
      $add.Store.settings.callback("cartAdd", name);
      $add.Store.settings.onCartAdd(name);
      $add.Store.cart.save();
      return true;
    }
  };
  $add.Store.cart.get = function(name, option){
    name = name.toLowerCase();
    if(option === undefined || option === false){
      var p = $add.Store.products.get(name);
      if(p.options && p.options.length==0)
        option = false;
      else {
        option = p.options[0].name;
      }
    } else
      option = option.toLowerCase();
    for(var i=0;i<$add.Store.cart.length;i++){
      var item = $add.Store.cart[i];
      if(typeof(item.option)=="string")
        item.option = item.option.toLowerCase();
      if(
        item.product.toLowerCase() == name &&
        item.option == option
      ){
        return $add.Store.products.get( item.product );
      }
    }
    return false;
  };
  $add.Store.cart.remove = function(name){
    name = name.toLowerCase();
    if(!$add.Store.cart.hasProduct(name))
      return false;
    for(var i=0;i<$add.Store.cart.length;i++){
      if($add.Store.cart[i].product.toLowerCase()==name){
        $add.Store.cart.splice(i,1);
        $add.Store.settings.callback("cartRemove", name);
        $add.Store.settings.onCartRemove(name);
        $add.Store.cart.save();
        return true;
      }
    }
  };
  $add.Store.cart.changeQty = function(name, new_qty){
    name = name.toLowerCase();
    if(!$add.Store.cart.hasProduct(name))
      return false;
    for(var i=0;i<$add.Store.cart.length;i++){
      if($add.Store.cart[i].product.toLowerCase()==name){
        $add.Store.cart[i].qty = new_qty;
        $add.Store.settings.callback("cartChangeQty", name, new_qty);
        $add.Store.settings.onCartChangeQty(name, new_qty);
        $add.Store.cart.save();
        return true;
      }
    }
  };
  $add.Store.cart.getProducts = function(){
    var products = [];
    for(var i=0;i<$add.Store.cart.length;i++){
      var item = $add.Store.cart[i];
      var p = $add.Store.products.get( item.product );
      products.push( {product: p, qty: item.qty, option: item.option} );
    };
    return products;
  };
  $add.Store.cart.total = function(){
    var total = 0;
    for(var i=0;i<$add.Store.cart.length;i++){
      var item = $add.Store.cart[i];
      var product = $add.Store.products.get( item.product );
      total += item.qty*product.price;
    };
    return total;
  };
  $add.Store.cart.itemCount = function(){
    var count = 0;
    for(var i=0;i<$add.Store.cart.length;i++){
      count += $add.Store.cart[i].qty;
    };
    return count;
  };
  $add.Store.cart.update = function(){
    for(var i=0;i<$add.Store.cart.length;i++){
      var new_qty = parseInt($("#addstore-cartitem-"+$add.UI.helpers.slug($add.Store.cart[i].product)).val());
      if(new_qty>0){
        $add.Store.cart[i].qty = new_qty;
      } else {
        $add.Store.cart.remove( $add.Store.cart[i].product );
      }
    }
    $add.Store.cart.save();
    $add.UI.hashRouter.call("#!/cart");
  };
  $add.Store.cart.empty = function(){
    $add.Store.cart.splice(0, 999999999999);
    $add.Store.cart.save();
  };
  $add.Store.cart.save = function(){
    var json = JSON.stringify($add.Store.cart);
    localStorage.cart = json;
  };
  $add.Store.cart.load = function(){
    var cart = JSON.parse( localStorage.cart );
    for(var i=0;i<cart.length;i++){
      var found = false;
      for(var e=0;e<$add.Store.cart.length && !found;e++){
        if($add.Store.cart.get(cart[i].product, cart[i].option))
          found = true;
      }
      if(!found)
        $add.Store.cart.push( cart[i] );
    }
  };
  
  $add.Store.alert = function(str){
    if($add.UI.error){ // addPrompt sub plugin
      $add.UI.error(str);
    } else if($add.UI.toast){
      $add.UI.toast(str, false, {addClass: "error large", position: "top center", closeBtn: true});
    } else {
      alert(str);
    }
  };
  $add.Store.checkout = function(){
    var c = $add.Store.cart.itemCount();
    if(c==0){
      $add.Store.alert("There are no items in your cart");
      return;
    }
    var description = c + " Items";
    if(c==1)
      description = "1 Item";
    var total = $add.Store.cart.total();
    if(total<$add.Store.settings.minimum){
      $add.Store.alert("A $"+$add.Store.settings.minimum.toFixed(2)+" minimum is required to place an order.");
      return false;
    }
    total *= 100;
    var handler = StripeCheckout.configure({
      key: $add.Store.settings.stripeKey,
      image: $add.Store.settings.checkoutLogo,
      token: function(token) {
        var cart = JSON.stringify($add.Store.cart.getProducts());
        /* */
        total = $add.Store.cart.total();
        token_json = JSON.stringify(token);
        $.ajax({
          url: $add.Store.settings.paymentHandler,
          type: "POST",
          data: {
            token: token_json,
            storeFile: $add.Store.settings.storeFile,
            cart: cart,
            total: total,
            storeName: $add.Store.settings.storeName
          },
          success: function(x){
           if(x.success){
             $add.Store.cart.empty();
             $add.Store.cart.save();
             $add.UI.hashRouter.trigger("#!/thank-you");
           } else {
             if(x.error.number == 1){
               // Config Error
               var e = "There was a configuration error, please try again, if the problem persists please contact our support"
               if($add.Store.settings.contactEmail)
                 s+= " at "+$add.Store.settings.contactEmail;
               e += ".";
               $add.Store.alert(e);
             } else if(x.error.number == 2){
               var e = "There was a missmatch between given cart price and the calculated cart price. Please refresh the page and try again.";
               if($add.Store.settings.contactEmail)
                 s+= " If the problem persists please contact our support at "+$add.Store.settings.contactEmail+".";
               $add.Store.alert(e);
             } else if(x.error.number == 3){
               $add.Store.alert("You card was declined, please try again.");
             }
           }
          }
        });
      }
    });
    handler.open({
      name: $add.Store.settings.storeName,
      description: description,
      amount: total,
      address: $add.Store.settings.shipping
    });
    $(window).on('popstate', function() {
      handler.close();
    });
  };
  
  function cloneObj(obj){
    if(obj == null || typeof(obj) != 'object')
      return obj;
    var temp = obj.constructor();
    for(var key in obj)
      if(obj.hasOwnProperty(key))
        temp[key] = cloneObj(obj[key]);
    return temp;
  };
  function Image(src, thumb, caption){
    this.src = "";
    this.thumb = "";
    this.caption = "";
    this.clone = function(){
      return new Image(this.src, this.thumb, this.caption);
    };
    this.fromArray = function(a){
      var temp = [];
      for(var i=0;i<a.length;i++)
        temp.push(new Image(a[i]));
      return temp;
    };
    this.fromObj = function(o){
      if(o.src)
        this.src = o.src;
      if(o.thumb)
        this.thumb = o.thumb;
      if(this.thumb.length==0)
        this.thumb = this.src;
      if(o.caption)
        this.caption = o.caption;
    };
    this.init = function(src, thumb, caption){
      if(src && typeof(src)=="object"){
        this.fromObj(src);
        return;
      }
      if(src)
        this.src = src;
      if(thumb)
        this.thumb = thumb;
      if(this.thumb.length==0)
        this.thumb = this.src;
      if(caption)
        this.caption = caption;
    };
    this.init(src, thumb, caption);
    return this;
  };
  function Product(name, price, description, images, categories, featured, options){
    this.name = "";
    this.price = 0;
    this.description = "";
    this.images = [];
    this.categories = [];
    this.featured = false;
    this.options = [];

    this.hasCategory = function(category){
      for(var i=0;i<this.categories.length;i++)
        if(this.categories[i].toLowerCase() == category.toLowerCase())
          return true;
      return false;
    };
    this.clone = function(){
      return new Product(this.name, this.price, this.description, this.images.clone(), this.categories.clone(), this.options.clone());
    };
    this.fromArray = function(a){
      var t = [];
      for(var i=0;i<a.length;a++)
        t.push(new Product(a[i]));
      return t;
    };
    this.fromObj = function(o){
      if(o.name)
        this.name = o.name;
      if(o.price)
        this.price = o.price;
      if(o.description)
        this.description = o.description;
      if(o.images)
        this.images = Image().fromArray(o.images);
      if(o.categories)
        this.categories = o.categories;
      if(o.featured)
        this.featured = true;
      if(o.options)
        this.options = ProductOption().fromArray(o.options);
    };
    this.init = function(name, price, description, images, categories, featured, options){
      if(name && typeof(name)=="object"){
        this.fromObj(name);
        return;
      }
      if(name)
        this.name = name;
      if(price)
        this.price = price;
      if(description)
        this.description = description;
      if(images)
        this.images = Image().fromArray(images);
      if(categories)
        this.categories = categories;
      if(featured)
        this.featured = true;
      if(options)
        this.options = ProductOption().fromArray(options);
    };
    this.init(name, price, description, images, categories, featured, options);
    return this;
  };
  function ProductOption(name, image){
    this.name = "";
    this.image = false;
    
    this.clone = function(){
      return new ProductOption(this.name, this.descriptions, this.image);
    };
    this.fromArray = function(a){
      var t = [];
      for(var i=0;i<a.length;i++){
        var o = new ProductOption();
        o.fromObj(a[i]);
        t.push( o )
      }
      return t;
    };
    this.fromObj = function(o){
      if(o.name)
        this.name = o.name;
      if(o.image)
        this.image = new Image(o.image);
    };
    this.init = function(name, description, image){
      if(typeof(name)=="object"){
        this.fromObj(name);
        return;
      }
      if(name)
        this.name = name;
      if(image)
        this.image = new Image(image);
    };
    this.init(name, image);
    return this;
  };
  function Category(name, description, image, parent){
    this.name = "";
    this.description = "";
    this.image = false;
    this.parent = false;
    this.getLine = function(){
      var parents = [];
      if(this.parent){
        var p = $add.Store.categories.get( this.parent );
        var parents = p.getLine();
      }
      parents.push(this.name);
      return parents;
    };
    this.getProducts = function(){
      var products = [];
      for(var i=0;i<$add.Store.products.length;i++){
        var p = $add.Store.products[i];
        if(p.hasCategory(this.name))
          products.push(p);
      }
      return products;
    };
    this.getSubCategories = function(){
      var subs = [];
      var n = this.name.toLowerCase();
      for(var i=0;i<$add.Store.categories.length;i++){
        if($add.Store.categories[i].parent && $add.Store.categories[i].parent.toLowerCase() == n){
          subs.push($add.Store.categories[i].name);
        }
      }
      return subs;
    };
    this.clone = function(){
      return new Category(this.name, this.description, this.image, this.parent);
    }
    this.fromObj = function(o){
      if(o.name)
        this.name = o.name;
      if(o.description)
        this.description = o.description;
      if(o.image)
        this.image = new Image(o.image);
      if(o.parent)
        this.parent = o.parent;
    };
    this.fromArray = function(a){
      var t = [];
      for(var i=0;i<a.length;i++)
        t.push( new Category(a[i]) );
      return t;
    };
    this.init = function(name, description, image, parent){
      if(name && typeof(name)=="object"){
        this.fromObj(name);
        return;
      }
      if(name)
        this.name = name;
      if(description)
        this.description = description;
      if(image)
        this.image = new Image(image);
      if(parent)
        this.parent = parent;
    };
    this.init(name, description, image, parent);
    return this;
  };
  
  $add.UI.hashRouter.add("", function(){location.hash = "#!/store"});
  $add.UI.hashRouter.add("#!/store", function(){
    $($add.Store.settings.parent).html( $add.Store.render.front() );
    $("title").html( $add.Store.settings.storeName );
    $add.UI.helpers.goto("addstore");
  });
  $add.UI.hashRouter.add("#!/cart", function(){
    $($add.Store.settings.parent).html( $add.Store.render.cart() );
    $("title").html( "Shopping Cart - " + $add.Store.settings.storeName );
    $add.UI.helpers.goto("addstore");
  });
  $add.UI.hashRouter.add("#!/thank-you", function(){
    $($add.Store.settings.parent).html( $add.Store.render.thankYou() );
    $("title").html( "Thank You - " + $add.Store.settings.storeName );
    $add.UI.helpers.goto("addstore");
  });
  
  $add.Store.render.front = function(){
    var s = "<div class='addstore-navbar'>"+$add.Store.render.minCart()+"</div>";
    s += "<div class='addstore-leftpane'>"+$add.Store.render.categoryTree()+"</div>";
    s += "<div class='addstore-rightpane'>";
    s += "<div class='addstore-box'><h2 class='addstore-name'>"+$add.Store.settings.storeName+"</h2>";
    
      if($add.Store.categories.length > 0){
        s += "<h3>Categories:</h3><div class='addstore-front-categories'>";
        for(var i=0;i<$add.Store.categories.length;i++){
          if($add.Store.categories[i].parent === false){
            s += $add.Store.render.categorySnippet($add.Store.categories[i]);
          }
        }
        s+= "</div>";
      }
      var products = $add.Store.products.getFeatured();
      if(products.length>0){
        s += "<hr><h3>Featured Products:</h3><div class='addstore-front-products'>";
        for(var i=0;i<10 && i<products.length;i++)
          s += $add.Store.render.productSnippet(products[i]);
        s+="</div>";
      }
    s+="</div></div>"; // .addstore-rightpane
    
    return s;
  };
  $add.Store.render.minCart = function(){
    var count = $add.Store.cart.itemCount();
    var s = "<a class='addstore-minicart addstore-btn' href='#!/cart'><i class='fa fa-shopping-cart'></i><span class='addstore-minicart-count'>"+count+" Item";
    if(count!==1)
      s += "s";
    s += "</span>";
    var t = $add.Store.cart.total();
    if(t>0){
      s += "<span class='addstore-divider'></span><span class='addstore-minicart-total'>$"+t.toFixed(2)+"</span>";
    }
    s += "</a>";
    return s;
  };
  $add.Store.render.categoryTree = function(c){
    if(c===false || c=== undefined){
      var s = "<ul class='addstore-categorytree addstore-box'>";
      s += "<li class='addstore-categorytree-title'><a href='#!/store'>Categories</a></li>";
      for(var i=0;i<$add.Store.categories.length;i++){
        var c = $add.Store.categories[i];
        if(c.parent == false){
          s += $add.Store.render.categoryTree(c);
        }
      }
      s += "</ul>";
      return s;
    } else {
      var s = "<li class='addstore-categorytree-category'><a href='#!/category/"+$add.UI.helpers.slug(c.name)+"'>"+c.name+"</a>";
      var subs = c.getSubCategories();
      if(subs.length>0){
        s += "<ul>";
        for(var i=0;i<subs.length;i++){
          s += $add.Store.render.categoryTree( $add.Store.categories.get(subs[i])  );
        }
        s += "</ul>";
      }
      s+="</li>";
      return s;
    }
  };
  $add.Store.render.categorySnippet = function(c){
    var s = "<a href='#!/category/"+$add.UI.helpers.slug(c.name)+"' class='addstore-categorysnippet'>";
      if(c.image)
        s+="<div class='addstore-categorysnippet-image'>"+$add.Store.render.thumb(c.image)+"</div>";
      s += "<div class='addstore-categorysnippet-info'>";
        s += "<div class='addstore-categorysnippet-name'>"+c.name+"</div>";
        s += "<div class='addstore-categorysnippet-description'>"+c.description+"</div>";
      s += "</div>";
    s += "</a>";
    return s;
  };
  $add.Store.render.categoryLine = function(c){
    var s = "";
    var line = c.getLine();
    s += "<div class='addstore-category-line'>";
      s += "<a href='#!/store' class='addstore-category-line-item'>"+$add.Store.settings.storeName+"</a>";
      for(var i=0;i<line.length;i++){
        s += "<a href='#!/category/"+$add.UI.helpers.slug( line[i] )+"' class='addstore-category-line-item'>"+line[i]+"</a>";
      };
    s += "</div>";
    return s;
  };
  $add.Store.render.category = function(c){
    var s = "<div class='addstore-navbar'><a href='#!/store' class='addstore-btn'><i class='fa fa-home'></i> "+$add.Store.settings.storeName+"</a>"+$add.Store.render.minCart()+"</div>";
    s += "<div class='addstore-leftpane'>";
      s += $add.Store.render.categoryTree();
    s += "</div>";
    s += "<div class='addstore-rightpane'><div class='addstore-box'>";
    s += "<h2>"+c.name+"</h2>";
    s += $add.Store.render.categoryLine(c);
    
    s += "<div class='addstore-category-image'>"+$add.Store.render.image(c.image)+"</div>";
    s += "<div class='addstore-category-description'>"+c.description+"</div>";
    s += "<hr>";
    var sc = c.getSubCategories();
    if(sc.length>0){
      s += "<div class='addstore-category-subcategories'><h3>Sub Categories:</h3>";
      for(var i=0;i<sc.length;i++)
        s += $add.Store.render.categorySnippet( $add.Store.categories.get( sc[i] ) );
      s += "</div>";
    }
    var p = c.getProducts();
    if(sc.length>0 && p.length>0)
      s+= "<hr>";
    if(p.length>0){
      s += "<div class='addstore-category-products'><h3>Products:</h3>";
      for(var i=0;i<p.length;i++)
        s += $add.Store.render.productSnippet(p[i]);
      s += "</div>";
    }
    s += "</div></div>";
    return s;
  };
  $add.Store.render.productSnippet = function(p){
    var slug = $add.UI.helpers.slug(p.name);
    var s = "<div class='addstore-productsnippet'>";
    if(p.images.length>0)
      s += "<a class='addstore-productsnippet-thumb' href='#!/product/"+slug+"'>"+$add.Store.render.thumb(p.images[0])+"</a>";
    s += "<a href='#!/product/"+slug+"' class='addstore-productsnippet-info'>";
    s += "<div class='addstore-productsnippet-name'>"+p.name+"</div>";
    s += "<div class='addstore-productsnippet-price'>$"+p.price.toFixed(2)+"</div>";
    s += "<div class='addstore-productsnippet-description'>"+p.description.snippet(140)+"</div>";
    s += "</a><a href='#!/cart' class='addstore-btn addstore-primary addstore-productsnippet-addtocart' onclick='$add.Store.cart.add(\""+p.name+"\");'>Add to Cart <i class='fa fa-arrow-circle-right'></i></a></div>";
    return s;
  };
  $add.Store.render.image = function(i){
    return "<div class='addstore-image'><img src='"+i.src+"' alt='"+i.caption+"' data-thumb='"+i.thumb+"' /></div>";
  };
  $add.Store.render.thumb = function(i){
    return "<div class='thumb' style='background-image: url("+i.src+");'></div>";
  };
  $add.Store.render.cartItem = function(p){
    var price = p.product.price;
    var slug = $add.UI.helpers.slug(p.product.name);
    var total = p.qty*price;
    s = "<div class='addstore-cartitem";
    if(!p.product.images || p.product.images.length==0)
      s+= " addstore-cartitem-noimage";
    s += "'>";
    if(p.product.images && p.product.images.length>0)
      s += $add.Store.render.thumb(p.product.images[0]);
    
    
    
      s += "<div class='addstore-cartitem-info'>";
        s += "<a href='#!/product/"+slug+"' class='addstore-cartitem-name'>"+p.product.name;
        if(p.option)
          s += " ("+p.option+")";
        s += "</a>";
        s += "<div class='addstore-cartitem-description'>"+p.product.description.snippet(140)+"</div>";
      s += "</div>";
      s += "<div class='addstore-cartitem-qty'><input type='number' min='1' value='"+p.qty+"' id='addstore-cartitem-"+slug+"' placeholder='Quantity' onchange='$add.Store.cart.update()' /></div>";
      s += "<div class='addstore-cartitem-price'>";
      if(p.qty > 1)
        s += "<span class='addstore-cartitem-price-unit'>("+p.qty+" x $"+price.toFixed(2)+")</span>";
      s += "<span class='addstore-cartitem-price-total'>$"+total.toFixed(2)+"</span>";
      s += "</div>";
      
      
      s += "<button class='addstore-cartitem-remove' onclick='$add.Store.cart.remove(\""+p.product.name+"\");$add.Store.cart.update();'><i class='fa fa-times-circle'></i></button>";
    s += "</div>";
    return s;
  };
  $add.Store.render.cart = function(){
    var s = "<div class='addstore-navbar'><a href='#!/store' class='addstore-btn'><i class='fa fa-arrow-circle-left'></i> Continue Shopping</a><button id='addstore-checkout-btn' class='addstore-btn' onclick='$add.Store.checkout();'>Checkout <i class='fa fa-arrow-circle-right'></i></button></div>";
    s += "<div class='addstore-rightpane'><div class='addstore-box'><h2>Shopping Cart</h2>";
    var items = $add.Store.cart.getProducts();
    for(var i=0;i<items.length;i++){
      s += $add.Store.render.cartItem(items[i]);
    };
      
    s += "</div></div><div class='addstore-leftpane'>";
      s += "<div class='addstore-cart-controls addstore-box'>";
        s += "<div class='addstore-cart-itemCountLabel'>Items:</div>";
        s += "<div class='addstore-cart-itemCount'>"+$add.Store.cart.itemCount()+"</div>";
        s += "<div class='addstore-cart-totalLabel'>Total:</div>";
        s += "<div class='addstore-cart-total'>$"+$add.Store.cart.total().toFixed(2)+"</div>";
        s += "<button id='addstore-checkout-btn' class='addstore-btn addstore-primary' onclick='$add.Store.checkout();'>Checkout <i class='fa fa-arrow-circle-right'></i></button>";
        s += "<a href='#!/store' class='addstore-btn'><i class='fa fa-arrow-circle-left'></i> Continue Shopping</a>";
        s += "<a href='#!/store' class='addstore-btn' onclick='$add.Store.cart.empty();'><i class='fa fa-ban'></i> Empty Cart</a>";
        
      s += "</div>";
    s += "</div>";
    return s;
  }
  $add.Store.render.product = function(p){
    var slug = $add.UI.helpers.slug(p.name);
    var s = "<div class='addstore-navbar'><a href='#!/store' class='addstore-btn'><i class='fa fa-home'></i> "+$add.Store.settings.storeName+"</a>"+$add.Store.render.minCart()+"</div>";
    s += "<div class='addstore-rightpane'><div class='addstore-box'>"
    s += "<h2>"+p.name+"</h2>";
    s += "<div class='addstore-product-images'>";
    for(var i=0;i<p.images.length;i++)
      s += $add.Store.render.image(p.images[i]);
    s += "</div>"; // product-images
    s += "<h3>Details:</h3><div class='addstore-product-details'>"+p.description+"</div>";
    s += "</div></div>"; // rightpane
    s += "<div class='addstore-leftpane'>";
      if(p.options.length>0){
        s += "<div class='addstore-product-options addstore-box'><div class='addstore-product-options-label'>Options</div><select id='addstore-product-options-"+slug+"' onchange='$add.Store.products.swapOptionsImage(\""+p.name+"\",$(\"#addstore-product-options-"+slug+"\").val());'>";
        for(var i=0;i<p.options.length;i++){
          s += "<option>"+p.options[i].name+"</option>"; 
        }
        s += "</select><div class='addstore-product-options-image'>";
        if(p.options[0].image)
          s += $add.Store.render.image(p.options[0].image);
        s += "</div></div>";
      }
      s += "<div class='addstore-product-controls addstore-box'>";
        s += "<div class='addstore-product-priceLabel'>Price:</div>";
        s += "<div class='addstore-product-price'>$"+p.price.toFixed(2)+"</div>";
        s += "<div class='addstore-product-qtyLabel'>Quantity:</div>";
        s += "<input type='number' id='addstore-product-qty-"+$add.UI.helpers.slug(p.name)+"' min='1' value='1' class='addstore-product-qty' />";
        s += "<a href='#!/cart' class='addstore-btn addstore-primary' onclick='$add.Store.cart.add(\""+p.name+"\", $(\"#addstore-product-qty-"+slug+"\").val(), $(\"#addstore-product-options-"+slug+"\").val());'>Add to Cart <i class='fa fa-arrow-circle-right'></i></a>";
      s += "</div>";
      s += $add.Store.render.categoryTree();
    s += "</div>";
    if($add.UI.gallery){
      s+="<script>$add.UI.gallery('.addstore-product-images', {download: false});</script>"; 
    }
    return s;
  };
  $add.Store.render.thankYou = function(){
    var s = "<div class='addstore-box'><h2>Thank You</h2><div class='addstore-thankyou-message'>"+$add.Store.settings.thankYouMessage+"</div><div class='addstore-thankyou-continue'><a href='#!/store' class='addstore-btn addstore-primary'><i class='fa fa-home'></i> Continue Shopping</a></div></div>";
    return s;
  };
  $(function(){
    $("*[data-addui=store]").addClass("addstore").attr("id", "addstore");
  });
}());






















