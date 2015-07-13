Math.randInt=function(n,o){return void 0===n&&(n=0),void 0===o&&(o=1e6),o+=1,Math.floor(Math.random()*(o-n)+n)};
Array.prototype.shuffle=function(){for(var t=Math.randInt(2*this.length,10*this.length),h=0;t>h;h++){var n=Math.randInt(0,this.length-1),r=Math.randInt(0,this.length-1),i=this[n];this[n]=this[r],this[r]=i}return this};
Array.prototype.trim = function(){
  var temp = [];
  for(var i=0;i<this.length;i++){
    if(this[i] != "")
      temp.push(this[i]);
  }
  return temp;
};
Array.prototype.eq = function(a){
  var min = this.length;
  if(a.length < min) min = a.length;
  for(var i=0;i<min;i++){
    if(this[i].eq && a[i].eq){
      var eq = this[i].eq(a[i]);
      if(eq != 0) return eq;
    } else {
      if(this[i] > a[i]) return 1;
      else if(this[i] < a[i]) return -1;
    }
  }
  return 0;
};
String.prototype.toSlug = function(){
  var s = this.toLowerCase();
  s=s.replace(/[^a-zA-Z0-9\-\s ]/g, '');
  s=s.replace(/\s/g, '-');
  return s;
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
String.prototype.toFunc = function(){
  if(window[this]!== undefined && typeof(window[this])=="function")return window[this];
  return function(){eval(this)};
};
Function.prototype.toFunc=function(){return this;};
function loadScript(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

if($add==undefined)var $add={};
if($add.UI==undefined)$add.UI={version:{},helpers:{},auto:{dsiable:false}};
/* Hash Router */
$add.UI.version.hashRouter="1.1.0",function(){function mkHash(a){return"#"==a.charAt(0)?a:"#"+a}function mkFunc(s){return"function"==typeof s?s:void 0!==window[s]&&"function"==typeof window[s]?window[s]:void 0===s||s===!1?function(){}:function(){eval(s)}}function callH(a,n){var r=!1;if(void 0!==n){for(var e=0;e<handlers.length;e++)handlers[e].hash==a&&handlers[e].name==n&&(handlers[e].handler(a),r=!0);for(var e=0;e<partials.length;e++)a.indexOf(partials[e].hash)>-1&&partials[e].name==n&&(partials[e].handler(a),r=!0)}else{for(var e=0;e<handlers.length;e++)handlers[e].hash==a&&(handlers[e].handler(a),r=!0);for(var e=0;e<partials.length;e++)a.indexOf(partials[e].hash)>-1&&(partials[e].handler(a),r=!0)}return r}var handlers=[],partials=[],history=[],disabled=!1,current="";$add.UI.hashRouter={add:function(a,n,r,e){a=mkHash(a),n=mkFunc(n),r=mkFunc(r),handlers.push({hash:a,handler:n,unloadHandler:r,name:e})},addPartial:function(a,n,r,e){a=mkHash(a),n=mkFunc(n),r=mkFunc(r),partials.push({hash:a,handler:n,unloadHandler:r,name:e})},get:function(a,n){a=mkHash(a);for(var r=[],e=0;e<handlers.length;e++)handlers[e].hash!=a||void 0!=n&&handlers[e].name!=n||r.push(handlers[e]);return 0==r.length?!1:1==r.length?r[0]:r},getPartial:function(a,n){a=mkHash(a);for(var r=[],e=0;e<partials.length;e++)a.indexOf(partials[e].hash)>-1&&(void 0==n||partials[e].name==n)&&r.push(partials[e]);return 0==r.length?!1:1==r.length?r[0]:r},remove:function(a,n){a=mkHash(a);for(var r=!1,e=0;e<handlers.length;e++)handlers[e].hash!=a||void 0!=n&&handlers[e].name!=n||(handlers.splice(e,1),e--,r=!0);return r},trigger:function(a){if(!disabled&&(a=mkHash(a),current!==a)){for(var n=0;n<handlers.length;n++)handlers[n].hash==current&&handlers[n].unloadHandler(current,a);return current=a,""!==a&&(window.location.hash=a),callH(a)}},call:function(a,n){return disabled?void 0:(a=mkHash(a),callH(a,n))},disable:function(){disabled=!0},enable:function(){disabled=!1}},window.onhashchange=function(){$add.UI.hashRouter.trigger(location.hash)},window.addEventListener("load",function(){$add.UI.hashRouter.trigger(location.hash)})}();

$add.Store = {render:{}};
function Image(o){
  this.src = false;
  this.thumb = false;
  this.caption = "";
  
  this.fromObj = function(o){
    if(typeof(o)=="string"){
      this.src = o;
      this.thumb = o;
    } else {
      if(o.src)this.src = o.src;
      if(o.thumb)this.thumb = o.thumb;
      if(o.caption)this.caption = o.caption;
      if(this.src === false)this.src = this.thumb;
      if(this.thumb === false)this.thumb = this.src;
    }
  };
  this.toObj = function(){
    return {
      src: this.src,
      thumb: this.thumb,
      caption: this.caption
    };
  };
  this.toString = function(){
    return this.src;
  };
  this.render = function(){
    return "<img src='"+this.src+"' alt='"+this.caption+"' class='addui-store-image' />";
  };
  this.renderThumb = function(){
    return "<div class='addui-store-thumb' style='background-image: url("+this.thumb+")'></div>";
  };
  this.clone = function(){
    return new Image(this.toObj());
  };
  this.init = function(o){
    if(o !== undefined) this.fromObj(o);
  };
  this.init(o);
};
function ImageList(a){
  this.list = [];
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Image(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++)
        if(temp.src == this.list[i].src)
          found = true;
      if(found===false)
        this.list.push(temp);   
    }
  };
  this.get = function(index){
    if(typeof(index)=="number"){
      if(index>-1 && index < this.list.length)
        return this.list[index];
      else return false;
    } else {
      for(var i=0;i<this.list.length;i++)
        if(this.list[i].src == index)
          return this.list[i];
      return false;
    }
  };
  this.remove = function(index){
    if(typeof(index)=="number"){
      if(index>-1 && index < this.list.length){
        this.list.splice(index, 1);
        return true;
      }
      else return false;
    } else {
      for(var i=0;i<this.list.length;i++)
        if(this.list[i].src == index){
          this.list.splice(i, 1);
          return true;
        }
      return false;
    }
  };
  this.render = function(){
    var s = "<div class='addui-store-imageList'>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].render();
    s += "</div>";
    return s;
  };
  this.renderThumbs = function(){
    var s = "<div class='addui-store-thumbList'>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].renderThumb();
    s += "</div>";
    return s;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.size = function(){
    return this.list.length;
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push(this.list[i].toObj());
    return a;
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.clone = function(){
    return new ImageList(this.toArray());
  };
  this.init = function(a){
    if(a !== undefined) this.fromArray(a);
  };
  this.init(a);
};
function Option(o){
  this.name = false;
  this.description = false;
  this.price_adjustment = false;
  this.image = false;
  
  this.fromObj = function(o){
    if(typeof(o) == "string"){
      this.name = o;
    } else {
      if(o.name) this.name = o.name;
      if(o.description) this.description = o.description;
      if(o.price_adjustment) this.price_adjustment = o.price_adjustment;
      if(o.image) this.image = new Image(o.image);
    }
  };
  this.toObj = function(){
    var o = {
      name: this.name,
      description: this.description,
      price_adjustment: this.price_adjustment,
      image: false
    };
    if(this.image) o.image = this.image.toObj();
    return o;
  };
  this.toString = function(){
    return this.name;
  };
  this.render = function(){
    var s = "<div class='addui-store-option'>";
      if(this.description)
        s += "<div class='addui-store-option-description'>"+this.description+"</div>";
      if(this.price_adjustment)
        s += "<div class='addui-store-option-priceAdjustment'>$"+this.price_adjustment.toFixed(2)+"</div>";
      if(this.image)
        s += "<div class='addui-store-option-image'>"+this.image.renderThumb()+"</div>";
    s += "</div>";
    return s;
  };
  this.clone = function(){
    return new Option(this.toObj());
  };
  this.init = function(o){
    if(o != undefined) this.fromObj(o);
  };
  this.init(o);
};
function OptionList(a){
  this.list = [];
  
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Option(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++)
        if(temp.name.toSlug()==this.list[i].name.toSlug())
          found = true;
      if(!found) this.list.push(temp);
    }
  };
  this.get = function(index){
    if(typeof(index)=="number"){
      if(index >-1 && index < this.list.length)
        return this.list[index];
      else return false;
    } else {
      for(var i=0;i<this.list.length;i++)
        if(this.list[i].name.toLowerCase() == index.toLowerCase())
          return this.list[i];
      return false;
    }
  };
  this.remove = function(index){
    if(typeof(index)=="number"){
      if(index >-1 && index < this.list.length){
        this.list.splice(index, 1);
        return true;
      }
      else return false;
    } else {
      for(var i=0;i<this.list.length;i++){
        if(this.list[i].name.toLowerCase() == index.toLowerCase()){
          this.list.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  };
  this.render = function(index){
    var s = "<div class='addui-store-optionList'>";
        s += "<select class='addui-store-optionList-select addui-store-optionList-select-"+index+"' onchange='$add.Store.action.updateOption("+index+")'>";
      for(var i=0;i<this.list.length;i++)
        s += "<option value='"+this.list[i].name+"'>"+this.list[i].name+"</option>";
    s += "</select>";
    s += "<div class='addui-store-optionList-info addui-store-optionList-info-"+index+"'>"+this.list[0].render()+"</div>";
    return s+"</div>";
  };
  this.size = function(){
    return this.list.length;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push(this.list[i].toObj());
    return a;
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.clone = function(){
    return new OptionList(this.toArray());
  };
  this.init = function(a){
    if(a != undefined)
      this.fromArray(a);
  };
  this.init(a);
};
function Price(o){
  this.min_qty = false;
  this.max_qty = false;
  this.value = 0;
  
  this.fromObj = function(o){
    if(typeof(o)=="number")
      this.value = o;
    else {
      if(o.min_qty)
        this.min_qty = o.min_qty;
      if(o.max_qty)
        this.max_qty = o.max_qty;
      if(o.value)
        this.value = o.value;
    }
  };
  this.toObj = function(){
    return {
      min_qty: this.min_qty,
      max_qty: this.max_qty,
      value: this.value
    };
  };
  this.render = function(){
    var s = "<div class='addui-store-price'>";
      if(this.min_qty === false && this.max_qty !== false)
        s += "<div class='addui-store-price-qtyRange'>Up to "+this.max_qty+"</div>";
      else if(this.min_qty !== false && this.max_qty !== false)
        s += "<div class='addui-store-price-qtyRange'>From "+this.min_qty+" to "+this.max_qty+"</div>";
      else if(this.min_qty !== false && this.max_qty === false)
        s += "<div class='addui-store-price-qtyRange'>"+this.min_qty+" or more</div>";
      s += "<div class='addui-store-price-value'>$"+this.value.toFixed(2)+"</div>";
    s += "</div>";
    return s;
  };
  this.toString = function(){
    if(this.min_qty !== false && this.max_qty !== false)
      return "From "+this.min_qty+" to "+this.max_qty+" for $"+this.value;
    if(this.min_qty === false && this.max_qty !== false)
      return "Up to "+this.max_qty+" for $"+this.value;
    if(this.min_qty !== false && this.max_qty === false)
      return this.max_qty+" or more for $"+this.value;
    else return "$"+this.value;
  };
  this.clone = function(){
    return new Price( this.toObj() );
  };
  this.isValid = function(qty){
    if(
      (
        this.min_qty === false ||
        this.min_qty <= qty
      ) && (
        this.max_qty === false ||
        this.max_qty >= qty
      )
    ) return true;
    else return false;
  };
  this.val = function(qty){
    if(this.isValid(qty)){
      return this.value;
    } else {
      return false;
    }
  };
  this.eq = function(p){
    if(this.min > p.min) return 1;
    else if(this.min < p.min) return -1;
    else if(this.max > p.max) return 1;
    else if(this.max < p.max) return -1;
    else if(this.value > p.value) return 1;
    else if(this.value < p.value) return -1;
    else return 0;
  };
  this.init = function(o){
    if(o != undefined)
      this.fromObj(o);
  };
  this.init(o);
};
function PriceList(a){
  this.list = [];
  
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Price(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++)
        if(temp.eq(this.list[i])==0)
          found=true;
      if(!found) this.list.push(temp);
    }
  };
  this.get = function(index){
    if(index <= this.list.length && index >= 0)
      return this.list[index];
    else return false;
  };
  this.remove = function(index){
    if(index <= this.list.length && index >= 0){
      this.list.splice(index, 1);
      return true;
    } else return false;
  };
  this.val = function(qty){
    for(var i=0;i<this.list.length;i++){
      var v = this.list[i].val(qty);
      if(v !== false)
        return v;
    }
    return false;
  };
  this.render = function(){
    var s = "<div class='addui-store-priceList'>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].render();
    s += "</div>";
    return s;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.size = function(){
    return this.list.length;
  };
  this.min = function(){
    var m = 9999999999;
    for(var i=0;i<this.list.length;i++){
      if(this.list[i].min_qty !== false && this.list[i].min_qty < m)
        m = this.list[i].min_qty;
      else if(this.list[i].min_qty == false)
        m = 1;
    }
    return m;
  };
  this.max = function(){
    var m = 0;
    for(var i=0;i<this.list.length;i++){
      if(this.list[i].max_qty !== false && this.list[i].max_qty > m)
        m = this.list[i].max_qty;
      if(this.list[i].max_qty == false)
        m = 999999;
    }
    if(m == 999999) return false;
    return m;
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push( this.list[i].toObj() );
    return a;
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.clone = function(){
    return new PriceList( this.toArray() );
  };
  this.init = function(a){
    if(a !== undefined)
      this.fromArray(a);
  };
  this.init(a);
};
function Category(o){
  this.name = false;
  this.slug = false;
  this.description = false;
  this.image = false;
  this.parent = false;
  
  this.fromObj = function(o){
    if(typeof(o) == "string"){
      this.name = o;
      this.slug = o.toSlug();
    } else {
      if(o.name) this.name = o.name;
      if(o.slug) this.slug = o.slug;
      else this.slug = this.name.toSlug();
      if(o.description) this.description = o.description;
      if(o.image) this.image = new Image(o.image);
      if(o.parent) this.parent = o.parent.toSlug();
    }
  };
  this.toObj = function(){
    var o = {
      name: this.name,
      slug: this.slug,
      description: this.description,
      image: false,
      parent: this.parent
    };
    if(this.image !== false)
      o.image = this.image.toObj();
    return o;
  };
  this.toString = function(){
    return this.name;
  };
  this.getProducts = function(){
    var p = new ProductList();
    for(var i=0;i<$add.Store.products.list.length;i++){
      if($add.Store.products.list[i].hasCategory(this.slug)){
        p.list.push($add.Store.products.list[i]);
      }
    }
    return p;
  };
  this.getChildren = function(){
    var cl = new CategoryList();
    for(var i=0;i<$add.Store.categories.list.length;i++)
      if($add.Store.categories.list[i].parent == this.slug)
        cl.list.push($add.Store.categories.list[i]);
    return cl;
  };
  this.render = function(){
    var s = "<div class='addui-store-category addui-store-category-"+this.slug+"'>";
      s += "<div class='addui-store-category-name'>"+this.name+"</div>";
      if(this.description)
        s += "<div class='addui-store-category-description'>"+this.description+"</div>";
      if(this.image)
        s += "<div class='addui-store-category-image'>"+this.image.render()+"</div>";
      
      
      
      // Sub Categories
      var sc = this.getChildren();
      if(sc.list.length>0){
        s += "<div class='addui-store-category-subcategories'>";
        for(var i=0;i<sc.list.length;i++)
          s += sc.list[i].renderSnippet();
        s += "</div>";
      }
      var products = this.getProducts();
      if(products.list.length>0)
        s += "<div class='addui-store-category-products'>"+products.render()+"</div>";
    s += "</div>";
    return s;
  };
  this.renderSnippet = function(){
    var s = "<div class='addui-store-categorySnippet addui-store-categorySnippet-"+this.slug;
    if(this.image === false)
      s += " addui-store-categorySnippet-noimage";
    s += "'>";
      if(this.image !== false)
        s += "<a href='#!/category/"+this.slug+"' class='addui-store-categorySnippet-image'>"+this.image.renderThumb()+"</a>";
      s += "<div class='addui-store-categorySnippet-info'>";
        s += "<a href='#!/category/"+this.slug+"' class='addui-store-categorySnippet-name'>"+this.name+"</a>";
        if(this.description)
          s += "<div class='addui-store-categorySnippet-description'>"+this.description+"</div>";
      s += "</div>";
    s += "</div>";
    return s;
  };
  this.renderTree = function(){
    return "<li><a href='#!/category/"+this.slug+"'>"+this.name+"</a>"+this.getChildren().renderTree()+"</li>";
  };
  this.clone = function(){
    return new Category(this.toObj());
  };
  this.init = function(o){
    if(o !== undefined)
      this.fromObj(o);
  };
  this.init(o);
};
function CategoryList(a){
  this.list = [];
  
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Category(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++)
        if(temp.slug==this.list[i].slug)
          found = true;
      if(!found) this.list.push(temp);
    }
  };
  this.get = function(index){
    if(typeof(index) == "number"){
      if(index >= 0 && index < this.list.length)
        return this.list[index];
      else return false;
    } else {
      index = index.toSlug();
      for(var i=0;i<this.list.length;i++){
        if(this.list[i].slug == index){
          return this.list[i];
        }
      }
      return false;
    }
  };
  this.remove = function(index){
    if(typeof(index) == "number"){
      if(index >= 0 && index < this.list.length){
        this.list.splice(index, 1);
        return true;
      } else return false;
    } else {
      index = index.toSlug();
      for(var i=0;i<this.list.length;i++){
        if(this.list[i].slug == index){
          this.list.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  };
  this.render = function(){
    var s = "<div class='addui-store-categoryList'>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].renderSnippet();
    s += "</div>";
    return s;
  };
  this.renderTree = function(){
    var s = "<ul>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].renderTree();
    s += "</ul>";
    return s;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.size = function(){
    return this.list.length;
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push(this.list[i].toObj());
    return a;
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.clone = function(){
    return new CategoryList( this.toArray() );
  };
  this.init = function(a){
    if(a != undefined)
      this.fromArray(a);
  };
  this.init(a);
};
function Product(o){
  this.name = false;
  this.slug = false;
  this.description = false;
  this.prices = new PriceList();
  this.images = new ImageList();
  this.options = [];
  this.categories = [];
  this.featured = false;
  this.mix_match = false;
  this.shipping = false;
  
  this.fromObj = function(o){
    if(typeof(o)=="string"){
      this.name = o;
      this.slug = o.toSlug();
    } else {
      if(o.name) this.name = o.name;
      if(o.slug) this.slug = o.slug;
      else this.slug = this.name.toSlug();
      if(o.description) this.description = o.description;
      if(o.prices) this.prices.fromArray(o.prices);
      if(o.price) this.prices.add(o.price);
      if(o.images) this.images.fromArray(o.images);
      if(o.image) this.images.add(o.image);
      if(o.options)
        for(var i=0;i<o.options.length;i++)
          this.options.push(new OptionList(o.options[i]));
      if(o.categories)
        for(var i=0;i<o.categories.length;i++)
          this.categories.push(o.categories[i].toSlug());
      if(o.category) this.categories.push(o.category.toSlug());
      if(o.featured) this.featured = true;
      if(o.mix_match) this.mix_match = true;
      if(o.shipping !== false && o.shipping !== undefined){
        if(typeof(o.shipping) == "number"){
          this.shipping = {type: "each", value: o.shipping};
        } else this.shipping = o.shipping;
      }
    }
  };
  this.toObj = function(){
    var o = {
      name:  this.name,
      slug: this.slug,
      description: this.description,
      prices: this.prices.toArray(),
      images: this.images.toArray(),
      options: [],
      categories: this.categories,
      featured: this.featured,
      mix_match: this.mix_match,
      shipping: this.shipping
    };
    for(var i=0;i<this.options.length;i++)
      o.options.push( this.options[i].toArray() );
    return o;
  };
  this.hasCategory = function(cat_slug){
    if(this.categories.indexOf(cat_slug)>-1)return true;
    else return false;
  };
  this.val = function(qty){
    return this.prices.val(qty);
  };
  this.itemCount = function(){
    var count = 0;
    for(var i=0;i<$add.Store.cart.list.length;i++){
      if($add.Store.cart.list[i].product_slug == this.slug)
        count += $add.Store.cart.list[i].qty;
    }
    return count;
  };
  this.toString = function(){
    return this.name;
  };
  this.render = function(){
    var s = "<div class='addui-store-product addui-store-product-"+this.slug+"'>";
      s += "<div class='addui-store-product-info'>";
        s += "<div class='addui-store-product-name'>"+this.name+"</div>";
        if(this.images.list.length>0)
          s += "<div class='addui-store-product-images'>"+this.images.render()+"</div>";
        if(this.description !== false)
          s += "<div class='addui-store-product-description'>"+this.description+"</div>";
      s += "</div>";
      s += "<div class='addui-store-product-sidebar'>";
    
        if(this.options.length>0){
          s += "<div class='addui-store-product-options'>";
            for(var i=0;i<this.options.length;i++)
              s += this.options[i].render(i);
          s += "</div>";
        }
        s += "<div class='addui-store-product-price'>"+this.prices.render()+"</div>";
        if(this.shipping != false){
          s += "<div class='addui-store-product-shipping addui-store-product-shipping-"+this.shipping.type+"'>";
            if(this.shipping.value == 0){
              s += "Free";
            } else if(this.shipping.type == "each"){
              s += this.shipping.value+" each";
            } else if(this.shipping.type == "box"){
              s += this.shipping.value+" per box of "+this.shipping.size;
            }
          s += "</div>";
        }
        s += "<div class='addui-store-product-cart'>";
          s += "<div class='addui-store-product-cart-qty-label'>Quantity:</div>";
          s += "<input type='number' value='"+this.prices.min()+"' class='addui-store-product-cart-qty' min='"+this.prices.min()+"' ";
            var max = this.prices.max();
            if(max) s+= "max='"+max+"' ";
          s += "/>";
          s += "<button onclick='$add.Store.action.addItem(\""+this.slug+"\")'>Add to Cart</button>";
        s += "</div>";
        s += $add.Store.render.categoryNav();
      s += "</div>";
    s += "</div>";
    return s;
  };
  this.renderSnippet = function(){
    var s = "<div class='addui-store-productSnippet addui-store-productSnippet-"+this.slug+" ";
      if(this.images.list.length == 0) s += "addui-store-productSnippet-noimage ";
    s += "'>";
      if(this.images.list.length > 0) s += "<a href='#!/product/"+this.slug+"' class='addui-store-productSnippet-image'>"+this.images.list[0].renderThumb()+"</a>";
      s += "<div class='addui-store-productSnippet-info'>";
        s += "<a href='#!/product/"+this.slug+"' class='addui-store-productSnippet-name'>"+this.name+"</a>";
        if(this.description)
          s += "<div class='addui-store-productSnippet-description'>"+this.description+"</div>";
      s += "</div>";
      s += "<div class='addui-store-productSnippet-cart'><div class='addui-store-productSnippet-cart-price'>$"+this.val(1).toFixed(2)+"</div>";
        if(this.shipping !== false && this.shipping.value != 0){
          s += "<div class='addui-store-productSnippet-cart-shipping'>$"+this.shipping.value+"</div>";
        }
        if(this.options.length==0)
          s += "<button onclick='$add.Store.action.addItem(\""+this.slug+"\");'>Add to Cart</button>";
      s += "</div>";
    s += "</div>";
    return s;
  };
  this.clone = function(){
    return new Product(this.toObj());
  };
  this.init = function(o){
    if(o !== undefined)
      this.fromObj(o);
  };
  this.init(o);
};
function ProductList(a){
  this.list = [];
  
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Product(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++)
        if(temp.slug == this.list[i].slug)
          found = true;
      if(!found)this.list.push(temp);
    }
  };
  this.get = function(index){
    if(typeof(index) == "number"){
      if(index >= 0 && index < this.list.length){
        return this.list[index];
      } else return false;
    } else {
      var temp = new Product(index);
      for(var i=0;i<this.list.length;i++){
        if(temp.slug == this.list[i].slug){
          return this.list[i];
        }
      }
      return false;
    };
  };
  this.getFeatured = function(){
    var pl = new ProductList();
    for(var i=0;i<this.list.length;i++)
      if(this.list[i].featured)
        pl.list.push(this.list[i]);
    if(pl.list.length>0) return pl;
    // If no featured, use 10 random products
    pl = $add.Store.products.clone();
    pl.list.shuffle();
    pl.list = pl.list.splice(0, 10);
    return pl;
  };
  this.remove = function(index){
    if(typeof(index) == "number"){
      if(index >= 0 && index < this.list.length){
        this.list.splice(index, 1);
        return true;
      } else return false;
    } else {
      var temp = new Product(index);
      for(var i=0;i<this.list.length;i++){
        if(temp.slug == this.list[i].slug){
          this.list.splice(i, 1);
          return true;
        }
      }
      return false;
    };
  };
  this.render = function(){
    var s = "<div class='addui-store-productList'>";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].renderSnippet();
    s += "</div>";
    return s;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.size = function(){
    return this.list.length;
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push( this.list[i].toObj() );
    return a;
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.clone = function(){
    return new ProductList(this.toArray());
  };
  this.init = function(a){
    if(a !== undefined)
      this.fromArray(a);
  };
  this.init(a);
};
function Item(o){
  this.product_slug = false;
  this.qty = 0;
  this.options = [];
  
  this.fromObj = function(o){
    if(typeof(o)=="string"){
      this.product_slug = o.toSlug();
      this.qty = 1;
    } else {
      if(o.product_slug) this.product_slug = o.product_slug;
      if(o.qty) this.qty = o.qty;
      else this.qty = 1;
      if(o.options) this.options = o.options;
    }
  };
  this.toObj = function(){
    return {
      product_slug: this.product_slug,
      qty: this.qty,
      options: this.options
    };
  };
  this.val = function(){
    var p = $add.Store.products.get(this.product_slug);
    var v = 0;
    if(p !== false){
      v = p.val(this.qty);
      if(p.mix_match)
        v = p.val(p.itemCount());
      for(var i=0;i<this.options.length;i++){
        v += p.options[i].get(this.options[i]).price_adjustment;
      }
    }
    return v;
  };
  this.subTotal = function(){
    return this.val() * this.qty;
  };
  this.shipping = function(){
    var p = $add.Store.products.get(this.product_slug);
    if(p !== false){
      if(p.shipping.type == "each"){
        return this.qty * p.shipping.value;
      } else if(p.shipping.type == "box"){
        return Math.ceil( this.qty / p.shipping.size ) * p.shipping.value;
      }
    }
    return false;
  };
  this.hasShipping = function(){
    var p = $add.Store.products.get(this.product_slug);
    if(p == false) return false;
    if(p.shipping !== false) return true;
    else return false;
  };
  this.toString = function(){
    // TODO
  };
  this.total = function(){
    return this.subTotal() + this.shipping();
  };
  this.render = function(index){
    var p = $add.Store.products.get(this.product_slug);
    if(p === false) return "";
    var s = "<div class='addui-store-item addui-store-item-"+index;
      if(p.images.list.length == 0) s += " addui-store-item-noimage";
      s += "'>";
      if(p.images.list.length > 0) s += "<a href='#!/product/"+p.slug+"' class='addui-store-item-image'>"+p.images.get(0).renderThumb()+"</a>";
      s += "<div class='addui-store-item-info'>";
        s += "<a href='#!/product/"+p.slug+"' class='addui-store-item-name'>"+p.name;
        for(var i=0;i<this.options.length;i++)
          s += " ("+this.options[i]+")";
        s += "</a>";
        if(p.description) s += "<div class='addui-store-item-description'>"+p.description.snippet()+"</div>";
      s += "</div>";
      s += "<div class='addui-store-item-cart'>";
        s+= "<input type='number' class='addui-store-item-cart-qty addui-store-item-cart-qty-"+index+"' value='"+this.qty+"' min='"+p.prices.min()+"' onchange='$add.Store.action.updateItem("+index+")' />";
        if(this.qty > 1) s += "<div class='addui-store-item-cart-price'>$"+this.val().toFixed(2)+"</div>";
        if(this.hasShipping() && this.shipping()!=0){
          s += "<div class='addui-store-item-cart-subtotal'>$"+this.subTotal().toFixed(2)+"</div>";
          s += "<div class='addui-store-item-cart-shipping'>$"+this.shipping().toFixed(2)+"</div>";
        }
        s += "<div class='addui-store-item-cart-total'>$"+this.total().toFixed(2)+"</div>";
        s += "<button onclick='$add.Store.action.removeItem("+index+");' class='addui-store-item-cart-remove'>Remove</button>";
      s += "</div>";
    s += "</div>";
    return s;
  };
  this.clone = function(){
    return new Item(this.toObj());
  };
  this.eq = function(i){
    if(this.product_slug > i.product_slug) return 1;
    else if(this.product_slug < i.product_slug) return -1;
    return this.options.eq(i.options);
  };
  this.init = function(o){
    if(o !== undefined)
      this.fromObj(o);
  };
  this.init(o);
};
function ItemList(a){
  this.list = [];
  
  this.add = function(){
    for(var a=0;a<arguments.length;a++){
      var temp = new Item(arguments[a]);
      var found = false;
      for(var i=0;i<this.list.length&&!found;i++){
        if(this.list[i].eq(temp) == 0){
          found = true;
          this.list[i].qty += temp.qty;
        }
      }
      if(!found) this.list.push(temp);
    }
    if($add.Store.settings.autosave) $add.Store.saveCart();
  };
  this.get = function(index){
    if(typeof(index)=="number"){
      if(index >= 0 && index < this.list.length){
        return this.list[index];
      } else return false;
    } else {
      var temp = new Item(index);
      for(var i=0;i<this.list.length;i++){
        if(temp.product_slug == this.list[i].product_slug){
          return this.list[i];
        }
      }
      return false;
    }
  };
  this.remove = function(index){
    if(typeof(index)=="number"){
      if(index >= 0 && index < this.list.length){
        this.list.splice(index, 1);
        if($add.Store.settings.autosave) $add.Store.saveCart();
        return true;
      } else return false;
    } else {
      var temp = new Item(index);
      for(var i=0;i<this.list.length;i++){
        if(temp.product_slug == this.list[i].product_slug){
          this.list.splice(i, 1);
          if($add.Store.settings.autosave) $add.Store.saveCart();
          return true;
        }
      }
      return false;
    }
  };
  this.subtotal = function(){
    var t = 0;
    for(var i=0;i<this.list.length;i++)
      t += this.list[i].subTotal();
    return t;
  };
  this.hasShipping = function(){
    for(var i=0;i<this.list.length;i++)
      if($add.Store.products.get(this.list[i].product_slug).shipping !== false)
        return true;
    return false;
  };
  this.shipping = function(){
    var v = 0;
    for(var i=0;i<this.list.length;i++){
      var s = this.list[i].shipping();
      if(s !== false)
        v += s;
    }
    return v;
  };
  this.total = function(){
    return this.subtotal() + this.shipping();
  };
  this.render = function(){
    var s = "<div class='addui-store-itemList'>";
      for(var i=0;i<this.list.length;i++)
        s += this.list[i].render(i);
    s += "</div>";
    return s;
  };
  this.toArray = function(){
    var a = [];
    for(var i=0;i<this.list.length;i++)
      a.push(this.list[i].toObj());
    return a;
  };
  this.fromArray = function(a){
    this.add.apply(this, a);
  };
  this.toString = function(){
    var s = "";
    for(var i=0;i<this.list.length;i++)
      s += this.list[i].toString()+" ";
    return s;
  };
  this.size = function(){
    return this.list.length;
  };
  this.count = function(){
    var t = 0;
    for(var i=0;i<this.list.length;i++)
      t += this.list[i].qty;
    return t;
  };
  this.clone = function(){
    return new ItemList(this.toArray());
  };
  this.init = function(a){
    if(a !== undefined)
      this.fromArray(a);
  };
  this.init(a);
};

$add.Store.products = new ProductList();
$add.Store.categories = new CategoryList();
$add.Store.cart = new ItemList();

$add.Store.settings = {
  storename: "addstore",
  src: "src/",
  import: "store.json",
  importsrc: false,
  autosave: true,
  autoload: true,
  selector: "*[data-addui=store]",
  stripe: "pk_test_ibhRmgLIFskFWTvJAMOe9AOi",
  paypal: false,
  logo: false,
  customcheckout: false,
  customcheckoutselector: false,
  thankyouselector: false,
  thankyoutext: "<h1>Thank You</h1><p>Your order has been submitted. Please check your email for confirmation.</p>",
  onfront: function(){},
  onproduct: function(){},
  oncategories: function(){},
  oncategory: function(){},
  oncart: function(){},
  oncheckout: function(){},
  onthankyou: function(){}
};

$add.Store.import =  function(file, callback){
  if(file !== undefined && file !== false){
    if(file.indexOf("/")>-1)
      $add.Store.settings.importsrc = file;
    else {
      $add.Store.settings.import = file;
      $add.Store.settings.importsrc = $add.Store.settings.src + file;
    }
  } else if($add.Store.settings.importsrc === false){
    $add.Store.settings.importsrc = 
      $add.Store.settings.src + 
      $add.Store.settings.import;
  }
  $.get($add.Store.settings.importsrc, function(x){
    $add.Store.settings = $.extend($add.Store.settings, x.settings);
    $add.Store.products.fromArray(x.products);
    $add.Store.categories.fromArray(x.categories);
    $add.Store.loadCart();
    if($add.Store.settings.customcheckoutselector){
      var text = $($add.Store.settings.customcheckoutselector).html();
      if(text !== undefined && text.length > 0)
        $add.Store.settings.customcheckout = text;
      $($add.Store.settings.customcheckoutselector).remove();
    }
    if($add.Store.settings.thankyouselector){
      var text = $($add.Store.settings.thankyouselector).html();
      if(text !== undefined && text.length > 0)
        $add.Store.settings.thankyoutext = text;
      $($add.Store.settings.thankyouselector).remove();
    }
    $add.UI.hashRouter.call(location.hash);
    if(
      typeof(Stripe)==='undefined' && 
      $add.Store.settings.stripe
    ) loadScript(
      "https://checkout.stripe.com/checkout.js"
    );
    if(callback != undefined)callback();
  });
};
$add.Store.export = function(){
  var o = {
    settings: $add.Store.settings,
    products: $add.Store.products.toArray(),
    categories: $add.Store.categories.toArray()
  };
  if(o.settings.customcheckoutselector !== false && o.settings.customcheckoutselector.length > 0)
    delete o.settings.customcheckout;
  if(o.settings.thankyouselector !== false && o.settings.thankyouselector.length > 0)
    delete o.settings.thankyoutext;
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=urf-8,'+encodeURIComponent(JSON.stringify(o)));
  pom.setAttribute('download', 'store.json');
  pom.click();
};
$add.Store.saveCart = function(){
  var c = {
    cart: $add.Store.cart.toArray()
  };
  c = JSON.stringify(c);
  window.localStorage.setItem("addStore-"+$add.Store.settings.storename, c);
};
$add.Store.loadCart = function(){
  var c = window.localStorage["addStore-"+$add.Store.settings.storename];
  if(c != undefined){
    c = JSON.parse(c);
    $add.Store.cart = new ItemList();
    $add.Store.cart.fromArray(c.cart);
    return true;
  } return false;
};
$add.Store.checkCart = function(callback){
  $.ajax({
    url: $add.Store.settings.src+"api/checkcart.php",
    data: {
      cart: JSON.stringify($add.Store.cart.toArray()),
      subtotal: $add.Store.cart.subtotal(),
      shipping: $add.Store.cart.shipping(),
      total: $add.Store.cart.total(),
      path_to_store: $add.Store.settings.importsrc,
      path_to_src: $add.Store.settings.src
    },
    success: function(x){
      console.log(x);
      if(x.valid && callback !== undefined)
        callback.call($add.Store);
      if(!x.valid){
        location.reload();
      }
    }
  })
};
$add.Store.categories.renderTree = function(){
  var s = "<ul>";
  for(var i=0;i<this.list.length;i++)
    if(this.list[i].parent === false)
      s += this.list[i].renderTree();
  s += "</ul>";
  return s;
};

$add.Store.action = {};
$add.Store.action.alert = function(msg){
  // TODO integrate other alert plugins
  alert(msg);
};
$add.Store.action.refresh = function(){
  $add.UI.hashRouter.call(location.hash);
};
$add.Store.action.removeItem = function(index){
  $add.Store.cart.list.splice(index, 1);
  if($add.Store.settings.autosave) $add.Store.saveCart();
  $add.Store.action.refresh();
};
$add.Store.action.addItem = function(product_slug){
  var options = [];
  $(".addui-store-optionList-select").each(function(){
    options.push($(this).val());
  });
  var qty = $(".addui-store-product-cart-qty").val();
  if( !qty || qty.length == 0)qty = 1;
  qty = parseInt(qty);
  $add.Store.cart.add({
    product_slug: product_slug,
    options: options,
    qty: qty
  });
  $add.UI.hashRouter.trigger("#!/cart");
};
$add.Store.action.updateItem = function(index){
  var qty = $(".addui-store-item-cart-qty-"+index).val();
  if(!qty || qty.length == 0)return;
  qty = parseInt(qty);
  $add.Store.cart.list[index].qty = qty;
  $add.Store.action.refresh();
  $add.Store.saveCart();
};
$add.Store.action.emptyCart = function(){
  $add.Store.cart = new ItemList();
  window.localStorage.setItem("addStore-"+$add.Store.settings.storename, "");
  $add.Store.saveCart();
  $add.UI.hashRouter.trigger("#!/store");
};
$add.Store.action.updateOption = function(index){
  var p = $add.Store.products.get(location.hash.split("/").pop());
  var v = $(".addui-store-optionList-select-"+index).val();
  var o = p.options[index].get(v);
  $(".addui-store-optionList-info-"+index).html(o.render());
};
$add.Store.action.stripeCheckout = function(){
  var config = {
    key: $add.Store.settings.stripe,
    name: $add.Store.settings.storename,
    amount: ($add.Store.cart.total()*100),
    token: function(x){
      $.ajax({
        url:
          $add.Store.settings.src 
          + "api/stripe_checkout.php",
        data: {
          stripeToken: x.id,
          cart: JSON.stringify($add.Store.cart.toArray()),
          subtotal: $add.Store.cart.subtotal(),
          shipping: $add.Store.cart.shipping(),
          total: $add.Store.cart.total(),
          path_to_store: $add.Store.settings.importsrc,
          path_to_src: $add.Store.settings.src
        },
        success: function(x){
          console.log(x);
          if(x.success){
            $add.Store.action.emptyCart();
            location.href= "#!/thankyou";
          } else {
            alert(x.errors.map(function(e){return e.message}).join("\n"));
          }
        },
        error: function(x){
          console.log(x);
        }
      });
    },
    address: $add.Store.cart.hasShipping()
  };
  if($add.Store.settings.logo)
    config.image = $add.Store.settings.logo
  var h = StripeCheckout.configure(config);
  h.open();
};
$add.Store.action.paypalCheckout = function(){
  alert("Checkout with PayPal Here");
  // TODO
};
$add.Store.action.checkout = function(){
  if($add.Store.cart.total() < 1){
    $add.Store.action.alert("A minimum purchase value of $1 is required. Please add more items to your cart before checking out.");
    return;
  }
  $add.Store.checkCart(function(){
    if(
      $add.Store.settings.stripe != false &&
      $add.Store.settings.paypal === false &&
      $add.Store.settings.customcheckout === false
    ){ // Only Stripe
      $add.Store.action.stripeCheckout();
    } else if (
      $add.Store.settings.stripe === false &&
      $add.Store.settings.paypal != false &&
      $add.Store.settings.customcheckout === false
    ) { // Only Paypal
      $add.Store.action.paypalCheckout();
    } else { // Show Checkout Page
      $add.UI.hashRouter.trigger("#!/checkout");
    }
  });
};


$add.Store.render.front = function(){
  var s = "<div class='addui-store addui-store-"+$add.Store.settings.storename.toSlug()+" addui-store-front'>";
    s += "<div class='addui-store-nav'>"+$add.Store.render.minicart()+"</div>";
    s += $add.Store.render.categoryNav();
    s += "<div class='addui-store-featured'>";
      s += $add.Store.products.getFeatured().render();
    s += "</div>";
  s += "</div>";
  return s;
};
$add.Store.render.categories = function(){
  var c = new CategoryList();
  for(var i=0;i<$add.Store.categories.list.length;i++)
    if($add.Store.categories.list[i].parent == false)
      c.list.push($add.Store.categories.list[i]);
  if(c == false) return "";
  var s = "<div class='addui-store addui-store-categories addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Store Front</a>"+$add.Store.render.minicart()+"</div>";
    s += $add.Store.render.categoryNav();
    s += c.render()
  s += "</div>";
  return s;
};
$add.Store.render.cart = function(){
  var s = "<div class='addui-store addui-store-cart addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Continue Shopping</a></div>";
    s += $add.Store.cart.render();
    s += "<div class='addui-store-cart-checkout'>";
      s += "<div class='addui-store-cart-itemCount'>"+$add.Store.cart.count()+"</div>";
      if($add.Store.cart.hasShipping()){
        s += "<div class='addui-store-cart-subtotal'>$"+$add.Store.cart.subtotal().toFixed(2)+"</div>";
        s += "<div class='addui-store-cart-shipping'>$"+$add.Store.cart.shipping().toFixed(2)+"</div>";
      }
      s += "<div class='addui-store-cart-total'>$"+$add.Store.cart.total().toFixed(2)+"</div>";
      s += "<div class='addui-store-cart-checkout-continue'><button onclick='$add.Store.action.checkout();'>Checkout</button></div>";
      s += "<a href='#!/store' class='addui-store-cart-checkout-back'>Continue Shopping</a>";
      s += "<div class='addui-store-cart-checkout-empty'><button onclick='$add.Store.action.emptyCart()'>Empty Cart</button></div>";
    s += "</div>";
  s += "</div>";
  return s;
};
$add.Store.render.category = function(category_slug){
  var c = $add.Store.categories.get(category_slug);
  if(c == false) return "";
  var s = "<div class='addui-store addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Store Front</a>"+$add.Store.render.minicart()+"</div>";
    s += $add.Store.render.categoryNav();
    s += c.render()
  s += "</div>";
  return s;
};
$add.Store.render.product = function(product_slug){
  var p = $add.Store.products.get(product_slug);
  if(p == false) return "";
  var s = "<div class='addui-store addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Store Front</a>"+$add.Store.render.minicart()+"</div>";
    s += p.render()
  s += "</div>";
  return s;
};
$add.Store.render.checkout = function(){
  var s = "<div class='addui-store addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Continue Shopping</a>"+$add.Store.render.minicart()+"</div>";
    s += "<div class='addui-store-checkout'>";
      if($add.Store.settings.customcheckout != false)
        s += "<div class='addui-store-checkout-custom'>"+$add.Store.settings.customcheckout+"</div>";
      if (
        $add.Store.settings.stripe != false ||
        $add.Store.settings.paypa != false
      ){ // (Paypal or Strip)
        s += "<div class='addui-store-checkout-serives'>";
          if($add.Store.settings.stripe != false)
            s += "<div class='addui-store-checkout-stripe'><button onclick='$add.Store.action.stripeCheckout();'>Checkout with Stripe</button></div>";
        if($add.Store.settings.paypal != false)
            s += "<div class='addui-store-checkout-paypal'><button onclick='$add.Store.action.paypalCheckout();'>Checkout with PayPal</button></div>";
        s += "</div>";
      }
    s += "</div>";
  s += "</div>";
  return s;
};
$add.Store.render.thankyou = function(){
  var s = "<div class='addui-store addui-store-"+$add.Store.settings.storename.toSlug()+"'>";
    s += "<div class='addui-store-nav'><a href='#!/store' class='addui-store-nav-home'>Continue Shopping</a>"+$add.Store.render.minicart()+"</div>";
    s += "<div class='addui-store-thankyou'>";
      s += $add.Store.settings.thankyoutext;
    s += "</div>";
  s += "</div>";
  return s;
};

$add.Store.render.minicart = function(){
  var s = "<a href='#!/cart' class='addui-store-minicart'>";
    s += $add.Store.cart.count()+ " Items<span class='addui-store-minicart-divider'></span>$"+$add.Store.cart.total().toFixed(2);
  s += "</a>";
  return s;
};
$add.Store.render.categoryNav = function(){
  var s = "<div class='addui-store-categoryNav'>";
    s += "<a href='#!/categories' class='addui-store-categoryNav-title'>Categories</a>";
    s += $add.Store.categories.renderTree();
  s += "</div>";
  return s;
};

$add.UI.hashRouter.add("", function(){location.hash = "#!/store";});
$add.UI.hashRouter.add("!/store", function(){
  $($add.Store.settings.selector).html($add.Store.render.front());
  $add.Store.settings.onfront.call($add.Store);
});
$add.UI.hashRouter.add("!/categories", function(){
  $($add.Store.settings.selector).html($add.Store.render.categories());
  $add.Store.settings.oncategories.call($add.Store);
});
$add.UI.hashRouter.add("!/cart", function(){
  $add.Store.checkCart(function(){
    $($add.Store.settings.selector).html(
      $add.Store.render.cart()
    );
    $add.Store.settings.oncart.call($add.Store);
  });
});
$add.UI.hashRouter.add("!/checkout", function(){
  $($add.Store.settings.selector).html($add.Store.render.checkout());
  $add.Store.settings.oncheckout.call($add.Store);
});
$add.UI.hashRouter.add("!/thankyou", function(){
  $($add.Store.settings.selector).html($add.Store.render.thankyou());
  $add.Store.settings.onthankyou.call($add.Store);
});
$add.UI.hashRouter.addPartial("!/category/", function(h){
  h = h.split("/").pop();
  $($add.Store.settings.selector).html($add.Store.render.category(h));
  $add.Store.settings.oncategory.call($add.Store);
});
$add.UI.hashRouter.addPartial("!/product/", function(h){
  h = h.split("/").pop();
  $($add.Store.settings.selector).html($add.Store.render.product(h));
  $add.Store.settings.onproduct.call($add.Store);
});

if(
  typeof(Stripe)==='undefined' && 
  $add.Store.settings.stripe
) loadScript("https://checkout.stripe.com/checkout.js");


$(function(){
  if($add.Store.settings.autoload) $add.Store.loadCart();
  var s = $($add.Store.settings.selector).data();
  if(s.onfront) s.onfront = s.onfront.toFunc();
  if(s.oncategories) s.oncategories = s.oncategories.toFunc();
  if(s.oncategory) s.oncategory = s.oncategory.toFunc();
  if(s.onproduct) s.onproduct = s.onproduct.toFunc();
  if(s.oncart) s.oncart = s.oncart.toFunc();
  if(s.oncheckout) s.oncheckout = s.oncheckout.toFunc();
  if(s.onthankyou) s.onthankyou = s.onthankyou.toFunc();
  $add.Store.settings = $.extend($add.Store.settings, s);
  $add.Store.import();
});