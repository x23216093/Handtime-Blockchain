$(document).ready(function(){if(r("cart")){var t=JSON.parse(r("cart")).length;if(0==t)$("#cartProducts").hide(),$(".emptyCart").show();else{var e=(1e-4*t).toFixed(4);$(".final-price").empty().append(e),$(".final-price-button").attr("data-price",e),$(".emptyCart").hide(),a()}}else $("#cartProducts").hide(),$(".emptyCart").show();function a(){var t=JSON.parse(r("cart")).length;t>0?($("#countBadge").attr("data-count",t),$("#countBadge").addClass("cartIcon")):($("#countBadge").attr("data-count",""),$("#countBadge").removeClass("cartIcon"))}function r(t){let e=t+"=",a=decodeURIComponent(document.cookie).split(";");for(let r=0;r<a.length;r++){let o=a[r];for(;" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return""}function o(t){let e=r("cart")?JSON.parse(r("cart")):[];var a=e.indexOf(t);a>-1&&e.splice(a,1),c(JSON.stringify(e))}function c(t){document.cookie="cart="+t}document.querySelectorAll(".cartButton").forEach(t=>{let e=t.getAttribute("data-id");(r("cart")?JSON.parse(r("cart")):[]).includes(e)&&(t.innerHTML="Remove from Cart",$(t).addClass("remove"),$(t).removeClass("addToCart"))}),document.querySelectorAll(".product").forEach(t=>{let e=t.getAttribute("data-id");(r("cart")?JSON.parse(r("cart")):[]).includes(e)||$("#"+e).hide()}),$(document).on("click",".cartButton",function(t){var e;t.preventDefault();let o;e=$(this).attr("data-id"),(o=r("cart")?JSON.parse(r("cart")):[]).includes(e)||(o.push(e),c(JSON.stringify(o))),a(),$(this).html("Remove from Cart"),$(this).addClass("remove"),$(this).removeClass("addToCart")}),$(document).on("click",".remove",function(t){t.preventDefault(),o($(this).attr("data-id")),a(),$(this).html("Add to Cart"),$(this).addClass("addToCart"),$(this).removeClass("remove")}),$(".removeFromList").click(function(t){o($(this).attr("data-id")),location.reload()}),$(".contactUsForm").submit(function(t){t.preventDefault(),alert("Thank you for your message! We will get back to you soon."),location.reload()}),$("#contactForm").submit(function(t){t.preventDefault(),alert("Thank you for your message! We will get back to you soon."),location.reload()})});