// show design
var design;
var turn_off_image = 0;
var design_type;

function show_design(design) {
  document.getElementById("engraving-img-preview").style.display = "block";
  var і;
  switch (design) {
    case 0:
      document.getElementById("w-design-1").style.border = "none";
      document.getElementById("w-design-2").style.border = "none";
      document.getElementById("w-design-3").style.border = "none";
      document.getElementById("w-design-0").style.border = "2px solid #00a2ff";
      document.getElementById("engraving-img-preview").style.backgroundImage = "url('')";
      design_type = 0;
      break;

    case 1:
      document.getElementById("w-design-0").style.border = "none";
      document.getElementById("w-design-2").style.border = "none";
      document.getElementById("w-design-3").style.border = "none";
      document.getElementById("w-design-1").style.border = "2px solid #00a2ff";
      document.getElementById("engraving-img-preview").style.backgroundImage = "url('../Images/gallery/wallet-engraving/design-preview/preview-img-1.png')";
      design_type = 1;
      document.getElementById("first-buy-engraving-img").style.backgroundImage = "url('../Images/gallery/wallet-engraving/img1.png')";
      break;

    case 2:
      document.getElementById("w-design-0").style.border = "none";
      document.getElementById("w-design-1").style.border = "none";
      document.getElementById("w-design-3").style.border = "none";
      document.getElementById("w-design-2").style.border = "2px solid #00a2ff";
      document.getElementById("engraving-img-preview").style.backgroundImage = "url('../Images/gallery/wallet-engraving/design-preview/preview-img-2.png')";
      design_type = 2;
      document.getElementById("first-buy-engraving-img").style.backgroundImage = "url('../Images/gallery/wallet-engraving/img2.png')";
      break;

    case 3:
      document.getElementById("w-design-0").style.border = "none";
      document.getElementById("w-design-1").style.border = "none";
      document.getElementById("w-design-2").style.border = "none";
      document.getElementById("w-design-3").style.border = "2px solid #00a2ff";
      document.getElementById("engraving-img-preview").style.backgroundImage = "url('../Images/gallery/wallet-engraving/design-preview/preview-img-3.png')";
      design_type = 3;
      document.getElementById("first-buy-engraving-img").style.backgroundImage = "url('../Images/gallery/wallet-engraving/img3.png')";
      break;
  }
}
var design_text;
var design_type_text;

function show_design_text(design_text) {
  document.getElementById("engraving-text-preview").style.display = "block";
  switch (design_text) {
    case 0:
      document.getElementById("engraving-text-preview").style.backgroundImage = "url('../Images/gallery/wallet-engraving/design-preview/preview-text-0.png')";
      design_type_text = 0;
      document.getElementById("first-buy-text").innerHTML = "Тебя мы любим, уважаем и очень сильно обожаем, ты самый лучший муж на свете и лчший папа на планете!";
      document.getElementById("w-design-text-0").style.fontWeight = "bold";
      document.getElementById("w-design-text-1").style.fontWeight = "normal";
      break;
    case 1:
      document.getElementById("engraving-text-preview").style.backgroundImage = "url('../Images/gallery/wallet-engraving/design-preview/preview-text-1.png')";
      design_type_text = 1;
      document.getElementById("first-buy-text").innerHTML = "Тебя мы любим, уважаем и очень сильно обожаем, ты самый лучший муж на свете и лчший папа на планете!";
      document.getElementById("w-design-text-0").style.fontWeight = "normal";
      document.getElementById("w-design-text-1").style.fontWeight = "bold";
      break;
  }
}
var own_text;

function engraving_own_text() {
  own_text = document.getElementById("own-text").value;
  document.getElementById("my-own-text").style.display = "block";
  document.getElementById("my-own-text-span").innerHTML = own_text;
  document.getElementById("engraving-text-toggle").checked = false;
  document.getElementById("first-buy-own-text").innerHTML = own_text;
}
var packing_type;

function packing() {
  packing_type = 0;
  document.getElementById("packing-img").style.display = "block";
  if (document.getElementById("packing-toggle-one").checked === true) {
    document.getElementById("packing-img").style.backgroundImage = 'url("../Images/gallery/wallet-engraving/packing/packing-default.jpg")';
  } else if (document.getElementById("packing-toggle-two").checked === true) {
    packing_type = 1;
    document.getElementById("packing-img").style.backgroundImage = 'url("../Images/gallery/wallet-engraving/packing/packing-envelope.jpg")';
    document.getElementById("envelope-text").style.display = "block";
    document.getElementById("envelope-text-textarea").style.display = "block";
  } else {
    packing_type = 2;
    document.getElementById("packing-img").style.backgroundImage = 'url("../Images/gallery/wallet-engraving/packing/packing-box.jpg")';
  }
}
var own_text_envelope;

function envelope_text() {
  own_text_envelope = document.getElementById("envelope-text-textarea").value;
  document.getElementById("envelope-text-span").innerHTML = own_text_envelope;
  document.getElementById("packing-toggle").checked = false;
  document.getElementById("envelope-text").style.display = "none";
  document.getElementById("envelope-custom-text").style.display = "block";
}

var hide_var;

function hide_envelope_text(hide_var) {
  if (hide_var == 0 || hide_var == 2) {
    document.getElementById("envelope-custom-text").style.display = "none";
  } else {
    document.getElementById("envelope-custom-text").style.display = "block";
  }
}
var i = 0;
//add to cart
var engraving_design;
var all_products = [];
var retrievedObject;
var product_number;
var if_shopped;
var cat = [];
var number;
var myJSON;
var product = "Cart";
var index;
var name = document.getElementById("product-name").innerHTML;
var price = document.getElementById("product-price").innerHTML;
var description = document.getElementById("product-description").innerHTML;
var src = document.getElementById("show-product-page-image").src;
var engraving_src;
var p;
var cart_not_empty = false;

function create_cart() {
  p = JSON.parse(localStorage.getItem("Cart"));
  console.log(p.length);
  if (p.length > 0) {
    document.getElementById("shopping-cart-icon").style.display = "inline";
    document.getElementById("shopping-cart-icon").innerHTML = p.length;
    document.getElementById("check-out").style.display = "block";
  }

  for (var i = 0; i < p.length; i++) {
    temp = document.createElement("div");
    temp.className = "results" + i;
    temp.setAttribute("id", "cart" + i);
    document.getElementsByTagName("main")[0].appendChild(temp);

    temp_name = document.createElement("h4");
    temp_price = document.createElement("p");
    temp_description = document.createElement("p");
    temp_own_text = document.createElement("p");
    temp_img = document.createElement("img");
    temp_img_engraving = document.createElement("img");
    temp_text_engraving = document.createElement("img");
    temp_delete_item = document.createElement("i");

    temp_name.className = "cart_headers";
    temp_price.className = "cart_price";
    temp_description.className = "cart_description";
    temp_img.className = "cart_img";
    temp_img_engraving.className = "engraving_img";
    temp_text_engraving.className = "engraving_text";
    temp_own_text.className = "own_text";
    temp_delete_item.className = "fas fa-trash-alt delete-item-from-cart";
    temp_delete_item.setAttribute("id", "delete-item-from-cart" + i);

    document.getElementsByClassName("results" + i)[0].appendChild(temp_delete_item);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_name);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_img);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_img_engraving);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_text_engraving);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_own_text);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_description);
    document.getElementsByClassName("results" + i)[0].appendChild(temp_price);

    temp_delete_item.onclick = delete_item_from_cart;
    temp_img.src = p[i].src;
    temp_name.innerHTML = p[i].name;
    temp_description.innerHTML = p[i].description;
    temp_price.innerHTML = p[i].price;
    if (p[i].design_type == undefined) {
      temp_img_engraving.src = "/Images/gallery/wallet-engraving/design-preview/preview-img-0.png";
    } else {
      temp_img_engraving.src = "/Images/gallery/wallet-engraving/design-preview/preview-img-" + p[i].design_type + ".png";
    }
    if (p[i].design_type_text == undefined) {
      temp_text_engraving.src = "/Images/gallery/wallet-engraving/design-preview/preview-text-0.png";
    } else {
      temp_text_engraving.src = "/Images/gallery/wallet-engraving/design-preview/preview-text-" + p[i].design_type_text + ".png";
    }
    if (p[i].own_text == undefined) {
      temp_own_text.innerHTML = "";
    } else {
      temp_own_text.innerHTML = "<strong>Текст на гаманці:</strong> " + p[i].own_text;
    }
  }
}



function add_to_cart() {
  if_shopped = JSON.parse(localStorage.getItem("Cart"));

  if (if_shopped === undefined) {
    document.getElementById("show-cart").style.display = "block";
  } else if (if_shopped !== undefined) {
    show_cart_2();
  }

  console.log(if_shopped);
  if (if_shopped !== null) {
    if_shopped = JSON.parse(localStorage.getItem("Cart"));

    number = if_shopped.length;
    console.log(number);

    for (var x = 0; x < if_shopped.length; x++) {
      all_products[x] = {
        name: if_shopped[x].name,
        price: if_shopped[x].price,
        description: if_shopped[x].description,
        design_type: if_shopped[x].design_type,
        design_type_text: if_shopped[x].design_type_text,
        own_text: if_shopped[x].own_text,
        packing_type: if_shopped[x].packing_type,
        own_text_envelope: if_shopped[x].own_text_envelope,
        src: if_shopped[x].src,
      };
    }
  } else {
    number = 0;
  }

  all_products[number] = {
    name: name,
    price: price,
    description: description,
    design_type: design_type,
    design_type_text: design_type_text,
    own_text: own_text,
    packing_type: packing_type,
    own_text_envelope: own_text_envelope,
    src: src,
  };

  myJSON = JSON.stringify(all_products);
  localStorage.setItem(product, myJSON);
  if_shopped = JSON.parse(localStorage.getItem("Cart"));
  console.log(if_shopped);
  // document.getElementById("tesst").innerHTML = retrievedObject.name;
  number++;
  document.getElementById("show-cart").style.display = "none";

  // count_cart();
  p = JSON.parse(localStorage.getItem("Cart"));
  console.log(p.length);
  if (p.length > 0) {
    document.getElementById("shopping-cart-icon").style.display = "inline";
    document.getElementById("shopping-cart-icon").innerHTML = p.length;
  }
}

function show_cart_2() {
  document.getElementById("show-cart-2").style.display = "block";
}

function close_cart() {
  document.getElementById("show-cart-2").style.display = "none";
}

var cart_for_order;

function delete_item_from_cart() {
  window.location = window.location;
  var current_id = this.id;
  for (var i = 0; i <= p.length; i++) {
    var x = "delete-item-from-cart" + i;
    if (x == current_id) {
      var y = i;
      var z = y + 1;
      p.splice(y, 1);
      localStorage.setItem("Cart", JSON.stringify(p));
      // document.getElementById("Cart" + y).remove();
    }
  }
}
var clients_name, clients_surname, clients_phone, city;

function payment() {
  clients_name = document.getElementById("clients-name").value;
  clients_surname = document.getElementById("clients-surname").value;
  clients_phone = document.getElementById("clients-phone").value;

  document.getElementById("user_firstname").value = clients_name;
  document.getElementById("user_lastname").value = clients_surname;
  document.getElementById("user_phone").value = clients_phone;

  if (clients_surname.length <= 0) {
    document.getElementById("clients-surname").style.border = "0.5px solid red";
  } else {
    document.getElementById("clients-surname").style.border = "0.5px solid grey";
  }
  if (clients_name.length <= 0) {
    document.getElementById("clients-name").style.border = "0.5px solid red";
  } else {
    document.getElementById("clients-name").style.border = "0.5px solid grey";
  }
  if (clients_phone.length < 10) {
    document.getElementById("clients-phone").style.border = "0.5px solid red";
  } else {
    document.getElementById("clients-phone").style.border = "0.5px solid grey";
  }

  if (clients_surname.length > 0 && clients_name.length > 0 && clients_phone.length > 9) {
    document.getElementById("checkout-first").style.display = "none";
    document.getElementById("checkout-second").style.display = "block";
  }
}

var c, t;

function fill_the_cart(c) {
  correct_order_for_mail();

  if (document.getElementById("shipping_1").style.display == "block") {
    document.getElementById("delivery").value = "Нова пошта";
    document.getElementById("user_city").value = document.getElementById("city_np").value;
    document.getElementById("post_office").value = document.getElementById("postal_office_np").value;
    document.getElementById("user_comment").value = document.getElementById("comment_np").value;

  } else if (document.getElementById("shipping_2").style.display == "block") {
    document.getElementById("delivery").value = "Укрпошта";
    document.getElementById("user_city").value = document.getElementById("city_up").value;
    document.getElementById("post_office").value = document.getElementById("postal_office_up").value;
    document.getElementById("user_comment").value = document.getElementById("comment_up").value;
    document.getElementById("paying_method_1").style.borderBottom = "2px solid #6e7174";
    document.getElementById("paying_method_2").style.borderBottom = "none";
    document.getElementById("paying_method_innerText").innerHTML = "Доставка Укрпоштою лише за умови повної передплати";
  } else {
    document.getElementById("delivery").value = "Самовивіз";
    document.getElementById("user_city").value = "Самовивіз";
    document.getElementById("post_office").value = "Самовивіз";
    document.getElementById("user_comment").value = document.getElementById("comment_sm").value;
  }

  if (c == 1) {
    document.getElementById("c_true").value = "true";
    document.getElementById("cart").value = JSON.parse(localStorage.getItem("Cart"));
  }
}

function correct_order_for_mail() {
  cart_for_order = JSON.parse(localStorage.getItem("Cart"));
  for (var i = 0; i < cart_for_order.length; i++) {
    delete cart_for_order[i].src;
    delete cart_for_order[i].description;
  }
  t = JSON.stringify(cart_for_order);
  document.getElementById("user_order").value = t;
}

function shipping(x) {
  switch (x) {
    case 0:
      document.getElementById("shipping_0").style.display = "block";
      document.getElementById("shipping_1").style.display = "none";
      document.getElementById("shipping_2").style.display = "none";

      document.getElementById("noshipping").style.borderBottom = "2px solid #186ccc";
      document.getElementById("novaposhta-shipping").style.borderBottom = "none";
      document.getElementById("ukrposhta-shipping").style.borderBottom = "none";

      break;
    case 1:
      document.getElementById("shipping_1").style.display = "block";
      document.getElementById("shipping_0").style.display = "none";
      document.getElementById("shipping_2").style.display = "none";

      document.getElementById("noshipping").style.borderBottom = "none";
      document.getElementById("novaposhta-shipping").style.borderBottom = "2px solid red";
      document.getElementById("ukrposhta-shipping").style.borderBottom = "none";
      break;
    case 2:
      document.getElementById("shipping_2").style.display = "block";
      document.getElementById("shipping_0").style.display = "none";
      document.getElementById("shipping_1").style.display = "none";

      document.getElementById("noshipping").style.borderBottom = "none";
      document.getElementById("novaposhta-shipping").style.borderBottom = "none";
      document.getElementById("ukrposhta-shipping").style.borderBottom = "2px solid rgb(218, 218, 0)";
      break;
  }
}

function paying_method(x) {
  if (x == 0) {
    document.getElementById("paying_method_1").style.borderBottom = "2px solid #6e7174";
    document.getElementById("paying_method_2").style.borderBottom = "none";
    document.getElementById("paying_method_innerText").innerHTML = "Передплата на картку ПриватБанку.";
    document.getElementById("user_payment").value = "Передплата на картку ПриватБанку.";

  } else {
    document.getElementById("paying_method_1").style.borderBottom = "none";
    document.getElementById("paying_method_2").style.borderBottom = "2px solid #6e7174";
    document.getElementById("paying_method_innerText").innerHTML = "Оплата після отримання товару.";
    document.getElementById("user_payment").value = "Оплата після отримання товару.";

  }
}