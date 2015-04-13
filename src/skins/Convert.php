<?php
class Convert {
  public static function dec2hex($d){
    return dechex($d);
  }
  public static function dec2bin($d){
    return decbin($d);
  }
  
  public static function hex2dec($h){
    return hexdec($h);
  }
  public static function hex2bin($h){
    return hex2bin($h);
  }
  
  public static function bin2dec($b){
    return bindec($b);
  }
  public static function bin2hex($b){
    return bin2hex($b);
  }
  
  public static function rgb2hex($rgb){
    $rgb=explode(",", $rgb);
    $r = (string)dechex($rgb[0]);
    if(strlen($r)==1)$r="0".$r;
    $g = (string)dechex($rgb[1]);
    if(strlen($g)==1)$g="0".$g;
    $b = (string)dechex($rgb[2]);
    if(strlen($b)==1)$b="0".$b;
    return $r.$g.$b;
  }
  public static function rgb2hsl($rgb){
    $rgb = explode(",", $rgb);
    $oldR = $rgb[0];
    $oldG = $rgb[1];
    $oldB = $rgb[2];
    $r = $oldR/255;
    $g = $oldG/255;
    $b = $oldB/255;
    $max = max($r, $g, $b);
    $min = min($r, $g, $b);
    $h;
    $s;
    $l = ($max + $min) / 2;
    $d = $max - $min;
    if($d == 0)
      $h = $s = 0;
    else {
      $s = $d / (1 - abs(2 * $l - 1));
      switch ($max) {
      case $r:
        $h = 60 * fmod((($g - $b) / $d) , 6);
        if ($b > $g)
          $h+= 360;
        break;
      case $g:
        $h = 60 * (($b - $r) / $d + 2);
        break;
      case $b:
        $h = 60 * (($r - $g) / $d + 4);
        break;
      }
    }
    $s *= 100;
    $l *= 100;
    $h=round($h, 2);
    $s=round($s, 2);
    $l=round($l, 2);
    return $h.",".$s.",".$l;
  }
  public static function rgb2hsla($rgb){
    $hsl = Convert::rgb2hsl($rgb);
    return $hsl.",1";
  }
  public static function rgb2rgba($rgb){
    return $rgb.",1";
  }
  
  public static function rgba2rgb($rgba){
    $rgb = explode(",", $rgba);
    array_pop($rgb);
    return implode(",", $rgb);
  }
  public static function rgba2hex($rgba){
    $rgb = Convert::rgba2rgb($rgba);
    return Convert::rgb2hex($rgb);
  }
  public static function rgba2hsl($rgba){
    $rgb = Convert::rgba2rgb($rgba);
    return Convert::rgb2hsl($rgb);
  }
  public static function rgba2hsla($rgba){
    $rgb = explode(",", $rgba);
    $a = array_pop($rgb);
    $rgb = implode(",", $rgb);
    $hsl = Convert::rgb2hsl($rgb);
    return $hsl.",".$a;
  }

  public static function hex2rgb($hex){
    $r = hexdec(substr($hex,0,2));
    $g = hexdec(substr($hex,2,2));
    $b = hexdec(substr($hex,4,2));
    return $r.",".$g.",".$b;
  }
  public static function hex2hsl($hex){
    $rgb = Convert::hex2rgb($hex);
    return Convert::rgb2hsl($rgb);
  }
  public static function hex2hsla($hex){
    $hsl = Convert::hex2hsl($hex);
    return $hsl.",1";
  }
  public static function hex2rgba($hex){
    $rgb = Convert::hex2rgb($hex);
    return $rgb.",1";
  }

  public static function hsl2rgb($hsl){
    $hsl = explode(",", $hsl);
    $h = $hsl[0];
    $s = $hsl[1];
    $l = $hsl[2];
    $s /= 100;
    $l /= 100;
    $r;
    $g;
    $b;
    $c = (1 - abs(2 * $l - 1)) * $s;
    $x = $c * (1 - abs(fmod(($h / 60) , 2) - 1));
    $m = $l - ($c / 2);
    if ($h < 60) {
      $r = $c;
      $g = $x;
      $b = 0;
    }
    else if ($h < 120) {
      $r = $x;
      $g = $c;
      $b = 0;
    }
    else if ($h < 180) {
      $r = 0;
      $g = $c;
      $b = $x;
    }
    else if ($h < 240) {
      $r = 0;
      $g = $x;
      $b = $c;
    }
    else if ($h < 300) {
      $r = $x;
      $g = 0;
      $b = $c;
    }
    else {
      $r = $c;
      $g = 0;
      $b = $x;
    }
    $r = ($r + $m) * 255;
    $g = ($g + $m) * 255;
    $b = ($b + $m) * 255;
    $r = round($r);
    $g = round($g);
    $b = round($b);
    return $r.",".$g.",".$b;
  }
  public static function hsl2hex($hsl){
    $rgb = Convert::hsl2rgb($hsl);
    return Convert::rgb2hex($rgb);
  }
  public static function hsl2rgba($hsl){
    $rgb = Convert::hsl2rgb($hsl);
    return $rgb.",1";
  }
  public static function hsl2hsla($hsl){
    return $hsl.",1";
  }
  
  public static function hsla2hsl($hsla){
    $hsl = explode(",", $hsla);
    array_pop($hsl);
    return implode(",", $hsl);
  }
  public static function hsla2rgb($hsla){
    $hsl = Convert::hsla2hsl($hsla);
    return Convert::hsl2rgb($hsl);
  }
  public static function hsla2hex($hsla){
    $hsl = Convert::hsla2hsl($hsla);
    return Convert::hsl2hex($hsl);
  }
  public static function hsla2rgba($hsla){
    $hsl = explode(",", $hsla);
    $a = array_pop($hsl);
    $hsl = implode(",", $hsl);
    $rgb = Convert::hsl2rgb($hsl);
    return $rgb.",".$a;
  }
}
class Adjust {
  public static function hslBrightness($hsl, $ajustment){
    $hsl = explode(",", $hsl);
    $hsl[2]= floatval($hsl[2])+$ajustment;
    if($hsl[2]>100)$hsl[2]=100;
    if($hsl[2]<0)$hsl[2]=0;
    return implode(",",$hsl);
  }
  public static function hslHue($hsl, $adjustment){
    $hsl = explode(",", $hsl);
    $hsl[0] = floatval($hsl[0])+$adjustment;
    if($hsl[0]>=360)$hsl[0]-=360;
    if($hsl[0]<0)$hsl[0]+=360;
    return implode(",",$hsl);
  }
  public static function hslSaturation($hsl, $adjustment){
    $hsl = explode(",", $hsl);
    $hsl[1]= floatval($hsl[1])+$adjustment;
    if($hsl[1]>100)$hsl[1]=100;
    if($hsl[1]<0)$hsl[1]=0;
    return implode(",", $hsl);
  }
  public static function hsl2grayscale($hsl, $method = "rec601"){
    $rgb = Convert::hsl2rgb($hsl);
    $rgb = Adjust::rgb2grayscale($rgb, $method);
    return Convert::rgb2hsl($rgb);
  }
  
  public static function rgbBrightness($rgb, $adjustment){
    $hsl = Convert::rgb2hsl($rgb);
    $hsl = Adjust::hslBrightness($hsl, $adjustment);
    return Convert::hsl2rgb($hsl);
  }
  public static function rgbHue($rgb, $adjustment){
    $hsl = Convert::rgb2hsl($rgb);
    $hsl = Adjust::hslHue($hsl, $adjustment);
    return Convert::hsl2rgb($hsl);
  }
  public static function rgbSaturation($rgb, $adjustment){
    $hsl = Convert::rgb2hsl($rgb);
    $hsl = Adjust::hslSaturation($hsl, $adjustment);
    return Convert::hsl2rgb($hsl);
  }
  public static function rgb2grayscale($rgb, $method = "rec601"){
    $method = strtolower($method);
    $rgb = explode(",", $rgb);
    if($method=="average"){
      $g = (intval($rgb[0])+intval($rgb[1])+intval($rgb[2]))/3;
      return $g.",".$g.",".$g;
    } else if($method=="max"){
      $g = max($rgb);
      return $g.",".$g.",".$g;
    } else if($method=="min"){
      $g = min($rgb);
      return $g.",".$g.",".$g;
    } else if($method=="desaturate"){
      $rgb = implode(",", $rgb);
      $rgb = Adjust::rgbSaturation($rgb, -100);
      return $rgb;
    } else if($method=="rec601"){
      $r = intval($rgb[0])/255;
      $g = intval($rgb[1])/255;
      $b = intval($rgb[2])/255;
      $g = ( ($r*0.229)+($g*0.587)+($b*0.114) )*255;
      return $g.",".$g.",".$g;
    } else if($method == "rec709"){
      $r = intval($rgb[0])/255;
      $g = intval($rgb[1])/255;
      $b = intval($rgb[2])/255;
      $g = ( ($r*0.2125)+($g*0.7152)+($b*0.0722) )*255;
      return $g.",".$g.",".$g;
    } else if($method == "smpte249m"){
      $r = intval($rgb[0])/255;
      $g = intval($rgb[1])/255;
      $b = intval($rgb[2])/255;
      $g = ( ($r*0.212)+($g*0.701)+($b*0.087) )*255;
      return $g.",".$g.",".$g;
    } else return Adjust::rgb2grayscale(implode(",",$rgb), "rec601");
  }
  
  public static function hexBrightness($hex, $adjustment){
    $hsl = Convert::hex2hsl($hex);
    $hsl = Adjust::hslBrightness($hsl, $adjustment);
    return Convert::hsl2Hex($hsl);
  }
  public static function hexHue($hex, $adjustment){
    $hsl = Convert::hex2hsl($hex);
    $hsl = Adjust::hslHue($hsl, $adjustment);
    return Convert::hsl2Hex($hsl);
  }
  public static function hexSaturation($hex, $adjustment){
    $hsl = Convert::hex2hsl($hex);
    $hsl = Adjust::hslSaturation($hsl, $adjustment);
    return Convert::hsl2Hex($hsl);
  }
  public static function hex2grayscale($hex, $method = "rec601"){
    $rgb = Convert::hex2rgb($hex);
    $rgb = Adjust::rgb2grayscale($rgb, $method);
    return Convert::rgb2hex($rgb);
  }
  
  public static function hslaBrightness($hsla, $adjustment){
    $hsla = explode(",", $hsla);
    $a = array_pop($hsla);
    $hsl = implode(",", $hsla);
    $hsl = Adjust::hslBrightness($hsl, $adjustment);
    return $hsl.",".$a;
  }
  public static function hslaHue($hsla, $adjustment){
    $hsla = explode(",", $hsla);
    $a = array_pop($hsla);
    $hsl = implode(",", $hsla);
    $hsl = Adjust::hslHue($hsl, $adjustment);
    return $hsl.",".$a;
  }
  public static function hslaSaturation($hsla, $adjustment){
    $hsla = explode(",", $hsla);
    $a = array_pop($hsla);
    $hsl = implode(",", $hsla);
    $hsl = Adjust::hslSaturation($hsl, $adjustment);
    return $hsl.",".$a;
  }
  public static function hslaAlpha($hsla, $adjustment){
    $hsla = explode(",", $hsla);
    $hsla[3] = floatval($hsla[3])+$adjustment;
    if($hsla[3]<0)$hsla[3]=0;
    if($hsla[3]>1)$hsla[3]=1;
    return implode(",", $hsla);
  }
  public static function hsla2grayscale($hsla, $method = "rec601"){
    $hsl = explode(",", $hsla);
    $a = array_pop($hsl);
    $hsl = implode(",", $hsl);
    $hsl = Adjust::hsl2grayscale($hsl, $method);
    return $hsl.",".$a;
  }
  
  public static function rgbaBrightness($rgba, $adjustment){
    $rgba = explode(",", $rgba);
    $a = array_pop($rgba);
    $rgb = implode(",", $rgba);
    $rgb = Adjust::rgbBrightness($rgb, $adjustment);
    return $rgb.",".$a;
  }
  public static function rgbaHue($rgba, $adjustment){
    $rgba = explode(",", $rgba);
    $a = array_pop($rgba);
    $rgb = implode(",", $rgba);
    $rgb = Adjust::rgbHue($rgb, $adjustment);
    return $rgb.",".$a;
  }
  public static function rgbaSaturation($rgba, $adjustment){
    $rgba = explode(",", $rgba);
    $a = array_pop($rgba);
    $rgb = implode(",", $rgba);
    $rgb = Adjust::rgbSaturation($rgb, $adjustment);
    return $rgb.",".$a;
  }
  public static function rgbaAlpha($rgba, $adjustment){
    $rgba = explode(",", $rgba);
    $rgba[3] = floatval($rgba[3])+$adjustment;
    if($rgba[3]<0)$rgba[3]=0;
    if($rgba[3]>1)$rgba[3]=1;
    return implode(",", $rgba);
  }
  public static function rgba2grayscale($rgba, $method = "rec601"){
    $rgb = explode(",", $rgba);
    $a = array_pop($rgb);
    $rgb = implode(",", $rgb);
    $rgb = Adjust::rgb2grayscale($rgb, $method);
    return $rgb.",".$a;
  }
  
  public static function cssBrightness($css, $adjustment){
    $rgba = Format::css2rgba($css);
    $rgba = Adjust::rgbaBrightness($rgba, $adjustment);
    $css = Format::rgba2css($rgba);
    return $css;
  }
  
  public static function size($size, $factor = 1, $adjustment = 0){
    $units;
    $value;
    if(is_int($size)){
      $value = $size;
      $units = "px";
    } else {
      $value = floatval($size);
      if(false !== strpos("px", $size))$units = "px";
      else if(false !== strpos($size, "em"))$units = "em";
      else if(false !== strpos($size, "ex"))$units = "ex";
      else if(false !== strpos($size, "%"))$units = "%";
      else if(false !== strpos($size, "cm"))$units = "cm";
      else if(false !== strpos($size, "mm"))$units = "mm";
      else if(false !== strpos($size, "in"))$units = "in";
      else if(false !== strpos($size, "pt"))$units = "pt";
      else if(false !== strpos($size, "pc"))$units = "pc";
      else if(false !== strpos($size, "s"))$units = "s";
      else if(false !== strpos($size, "ms"))$units = "ms";
      else if(false !== strpos($size, "ch"))$units = "ch";
      else if(false !== strpos($size, "rem"))$units = "rem";
      else if(false !== strpos($size, "vh"))$units = "vh";
      else if(false !== strpos($size, "vw"))$units = "vw";
      else if(false !== strpos($size, "vmin"))$units = "vmin";
      else if(false !== strpos($size, "vmax"))$units = "vmax";
      else $units = "px";
    }
    $value *= $factor;
    $value += $adjustment;
    return $value.$units;
  }
}
class Format {
  public static function rgb2css($rgb){
    return "rgb(".$rgb.")";
  }
  public static function rgba2css($rgba){
    return "rgba(".$rgba.")";
  }
  public static function hex2css($hex){
    return "#".$hex;
  }
  public static function hsl2css($hsl){
    $hsl = explode(",", $hsl);
    return "hsl(".$hsl[0].",".$hsl[1]."%,".$hsl[2]."%)";
  }
  public static function hsla2css($hsla){
    $hsla = explode(",", $hsla);
    return "hsla(".$hsla[0].",".$hsla[1]."%,".$hsla[2]."%,".$hsla[3].")";
  }
  
  public static function css2hex($css){
    if(strpos($css, "hsl(")!==false){
      $hsl = str_replace(["%","hsl(", ")"], '', $css);
      return Convert::hsl2hex($hsl);
    } else if(strpos($css, "rgb(")!==false){
      $rgb = str_replace(["rgb(", ")"], '', $css);
      return Convert::rgb2hex($rgb);
    } else if(strpos($css, "#")!==false){
      $hex = str_replace("#", '', $css);
      return $hex;
    } else if(strpos($css, "hsla(")!==false){
      $hsla = str_replace(["%","hsla(", ")"], '', $css);
      return Convert::hsla2hex($hsla);
    } else if(strpos($css, "rgba(")!==false){
      $rgba = str_replace(["rgba(", ")"], '', $css);
      return Convert::rgba2hex($rgba);
    }
  }
  public static function css2rgb($css){
    if(strpos($css, "hsl(")!==false){
      $hsl = str_replace(["%","hsl(", ")"], '', $css);
      return Convert::hsl2rgb($hsl);
    } else if(strpos($css, "rgb(")!==false){
      $rgb = str_replace(["rgb(", ")"], '', $css);
      return $rgb;
    } else if(strpos($css, "#")!==false){
      $hex = str_replace("#", '', $css);
      return Convert::hex2rgb($hex);
    } else if(strpos($css, "hsla(")!==false){
      $hsla = str_replace(["%","hsla(", ")"], '', $css);
      return Convert::hsla2rgb($hsla);
    } else if(strpos($css, "rgba(")!==false){
      $rgba = str_replace(["rgba(", ")"], '', $css);
      return Convert::rgba2rgb($rgba);
    }
  }
  public static function css2hsl($css){
    if(strpos($css, "hsl(")!==false){
      $hsl = str_replace(["%","hsl(", ")", " "], '', $css);
      return $hsl;
    } else if(strpos($css, "rgb(")!==false){
      $rgb = str_replace(["rgb(", ")", " "], '', $css);
      return Convert::rgb2hsl($rgb);
    } else if(strpos($css, "#")!==false){
      $hex = str_replace(["#", " "], '', $css);
      return Convert::hex2hsl($hex);
    } else if(strpos($css, "hsla(")!==false){
      $hsla = str_replace(["%","hsla(", ")"], '', $css);
      return Convert::hsla2hsl($hsla);
    } else if(strpos($css, "rgba(")!==false){
      $rgba = str_replace(["rgba(", ")"], '', $css);
      return Convert::rgba2hsl($rgba);
    }
  }
  public static function css2hsla($css){
    if(strpos($css, "hsl(")!==false){
      $hsl = str_replace(["%","hsl(", ")", " "], '', $css);
      return Convert::hsl2hsla($hsl);
    } else if(strpos($css, "rgb(")!==false){
      $rgb = str_replace(["rgb(", ")", " "], '', $css);
      return Convert::rgb2hsla($rgb);
    } else if(strpos($css, "#")!==false){
      $hex = str_replace(["#", " "], '', $css);
      return Convert::hex2hsla($hex);
    } else if(strpos($css, "hsla(")!==false){
      $hsla = str_replace(["%","hsla(", ")"], '', $css);
      return $hsla;
    } else if(strpos($css, "rgba(")!==false){
      $rgba = str_replace(["rgba(", ")"], '', $css);
      return Convert::rgba2hsla($rgba);
    }
  }
  public static function css2rgba($css){
    if(strpos($css, "hsl(")!==false){
      $hsl = str_replace(["%","hsl(", ")"], '', $css);
      return Convert::hsl2rgba($hsl);
    } else if(strpos($css, "rgb(")!==false){
      $rgb = str_replace(["rgb(", ")"], '', $css);
      return Convert::rgb2rgba($rgb);
    } else if(strpos($css, "#")!==false){
      $hex = str_replace("#", '', $css);
      return Convert::hex2rgba($hex);
    } else if(strpos($css, "hsla(")!==false){
      $hsla = str_replace(["%","hsla(", ")"], '', $css);
      return Convert::hsla2rgba($hsla);
    } else if(strpos($css, "rgba(")!==false){
      $rgba = str_replace(["rgba(", ")"], '', $css);
      return $rgba;
    }
  }
  public static function css2grayValue($css, $method = "rec601"){
    $rgb = Format::css2rgb($css);
    $rgb = Adjust::rgb2grayscale($rgb, $method);
    $gv = explode(",", $rgb);
    $gv = end($gv);
    $gv = intval($gv);
    $gv = $gv/255;
    $gv = $gv*100;
    return $gv;
  }
  
}
function psize($size, $factor = 1, $adjustment = 0){
  echo Adjust::size($size, $factor, $adjustment);
}