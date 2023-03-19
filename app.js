const {
  findById
} = require("./models/user");

var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User = require("./models/user"),
  nodemailer = require("nodemailer");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

// Connect mondoDB and mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/poda_im", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

//   Schema setup
var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Product = mongoose.model("Product", productSchema);

//==================
//Schemas start
//===================
var walletSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Wallet = mongoose.model("Wallet", productSchema);

var cupSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Cup = mongoose.model("Cup", productSchema);

var beltSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Belt = mongoose.model("Belt", productSchema);

var stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Stock = mongoose.model("Stock", productSchema);

var coverSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Cover = mongoose.model("Cover", productSchema);

var keychainSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Keychain = mongoose.model("Keychain", productSchema);

var tshirtSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Tshirt = mongoose.model("Tshirt", productSchema);

var hoodieSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Hoodie = mongoose.model("Hoodie", productSchema);

var magnetSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});
var Magnet = mongoose.model("Magnet", productSchema);
//==================
//Schemas end
//===================



app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.use("/images", express.static(__dirname + "/Images"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Hop hey lalaley",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function (req, res) {
  Product.find({}, function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        products: products
      });
    }
  });
});


//========================
//clothes round -- start
//========================
app.get("/clothes", function (req, res) {

  res.render("clothes");

});
//========================
//clothes round -- end
//========================

//========================
//leather round -- start
//========================
app.get("/leather", function (req, res) {
  res.render("leather");
});
//========================
//leather round -- end
//========================


//========================
//leather round -- start
//========================
app.get("/contacts", function (req, res) {

  res.render("contacts");
});
//========================
//leather round -- end
//========================


//========================
//wallets round -- start
//========================
app.get("/wallets", function (req, res) {
  Wallet.find({}, function (err, allWallets) {
    if (err) {
      console.log(err);
    } else {
      res.render("wallets/index", {
        wallets: allWallets
      });
    }
  });
});

app.post("/wallets", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newWallet = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new wallet and save it to DB
  Wallet.create(newWallet, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/wallets");
    }
  });
});

app.get("/wallets/new", isLoggedIn, function (req, res) {
  res.render("wallets/new");
});
app.get("/wallets/:id", function (req, res) {
  Wallet.findById(req.params.id, function (err, foundWallet) {
    if (err) {
      console.log(err);
    } else {
      res.render("wallets/show", {
        wallet: foundWallet,
        currentUser: req.user
      });
    }
  });
});
app.get("/wallets/:id/edit", isLoggedIn, function (req, res) {
  Wallet.findById(req.params.id, function (err, foundWallet) {
    if (err) {
      res.redirect("/wallets");
    } else {
      res.render("wallets/edit", {
        wallet: foundWallet
      });
    }
  });
});

//update wallet round

app.put("/wallets/:id", isLoggedIn, function (req, res) {
  Wallet.findByIdAndUpdate(req.params.id, req.body.wallet, function (err, updatedWallet) {
    if (err) {
      res.redirect("/wallets");
      console.log(err);
    } else {
      res.redirect("/wallets/" + req.params.id);
    }
  });
});

//destroy wallet round

app.delete("/wallets/:id", isLoggedIn, function (req, res) {
  Wallet.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/wallets");
    } else {
      res.redirect("/wallets");
    }
  });
});

//========================
//wallets round -- end
//========================

//========================
//cups round -- start
//========================
app.get("/cups", function (req, res) {
  Cup.find({}, function (err, allCups) {
    if (err) {
      console.log(err);
    } else {
      res.render("cups/index", {
        cups: allCups,
      });
    }
  });
});
app.post("/cups", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newCup = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new cup and save it to DB
  Cup.create(newCup, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cups");
    }
  });
});

app.get("/cups/new", isLoggedIn, function (req, res) {
  res.render("cups/new");
});
app.get("/cups/:id", function (req, res) {
  Cup.findById(req.params.id, function (err, foundCup) {
    if (err) {
      console.log(err);
    } else {
      res.render("cups/show", {
        cup: foundCup,
        currentUser: req.user
      });
    }
  });
});

app.get("/cups/:id/edit", isLoggedIn, function (req, res) {
  Cup.findById(req.params.id, function (err, foundCup) {
    if (err) {
      res.redirect("/cups");
    } else {
      res.render("cups/edit", {
        cup: foundCup
      });
    }
  });
});

//update cup round

app.put("/cups/:id", isLoggedIn, function (req, res) {
  Cup.findByIdAndUpdate(req.params.id, req.body.cup, function (err, updatedCup) {
    if (err) {
      res.redirect("/cups");
      console.log(err);
    } else {
      res.redirect("/cups/" + req.params.id);
    }
  });
});

//destroy cup round

app.delete("/cups/:id", isLoggedIn, function (req, res) {
  Cup.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/cups");
    } else {
      res.redirect("/cups");
    }
  });
});
//========================
//cups round -- end
//========================

//========================
//belts round -- start
//========================
app.get("/belts", function (req, res) {
  Belt.find({}, function (err, allBelts) {
    if (err) {
      console.log(err);
    } else {
      res.render("belts/index", {
        belts: allBelts,
      });
    }
  });
});
app.post("/belts", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newBelt = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new belt and save it to DB
  Belt.create(newBelt, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/belts");
    }
  });
});

app.get("/belts/new", isLoggedIn, function (req, res) {
  res.render("belts/new");
});
app.get("/belts/:id", function (req, res) {
  Belt.findById(req.params.id, function (err, foundBelt) {
    if (err) {
      console.log(err);
    } else {
      res.render("belts/show", {
        belt: foundBelt,
        currentUser: req.user

      });
    }
  });
});

app.get("/belts/:id/edit", isLoggedIn, function (req, res) {
  Belt.findById(req.params.id, function (err, foundBelt) {
    if (err) {
      res.redirect("/belts");
    } else {
      res.render("belts/edit", {
        belt: foundBelt
      });
    }
  });
});

//update belt round

app.put("/belts/:id", isLoggedIn, function (req, res) {
  Belt.findByIdAndUpdate(req.params.id, req.body.belt, function (err, updatedBelt) {
    if (err) {
      res.redirect("/belts");
      console.log(err);
    } else {
      res.redirect("/belts/" + req.params.id);
    }
  });
});

//destroy belt round

app.delete("/belts/:id", isLoggedIn, function (req, res) {
  Belt.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/belts");
    } else {
      res.redirect("/belts");
    }
  });
});
//========================
//belts round -- end
//========================

//========================
//stock round -- start
//========================
app.get("/stock", function (req, res) {
  Stock.find({}, function (err, allStocks) {
    if (err) {
      console.log(err);
    } else {
      res.render("stock/index", {
        stocks: allStocks,
      });
    }
  });
});
app.post("/stock", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newStock = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new stock and save it to DB
  Stock.create(newStock, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/stock");
    }
  });
});

app.get("/stock/new", isLoggedIn, function (req, res) {
  res.render("stock/new");
});
app.get("/stock/:id", function (req, res) {
  Stock.findById(req.params.id, function (err, foundStock) {
    if (err) {
      console.log(err);
    } else {
      res.render("stock/show", {
        stock: foundStock,
        currentUser: req.user

      });
    }
  });
});

app.get("/stock/:id/edit", isLoggedIn, function (req, res) {
  Stock.findById(req.params.id, function (err, foundStock) {
    if (err) {
      res.redirect("/stock");
    } else {
      res.render("stock/edit", {
        stock: foundStock
      });
    }
  });
});

//update stock round

app.put("/stock/:id", isLoggedIn, function (req, res) {
  Stock.findByIdAndUpdate(req.params.id, req.body.stock, function (err, updatedStock) {
    if (err) {
      res.redirect("/stock");
      console.log(err);
    } else {
      res.redirect("/stock/" + req.params.id);
    }
  });
});

//destroy stock round

app.delete("/stock/:id", isLoggedIn, function (req, res) {
  Stock.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/stock");
    } else {
      res.redirect("/stock");
    }
  });
});
//========================
//stock round -- end
//========================

//========================
//cover round -- start
//========================
app.get("/covers", function (req, res) {
  Cover.find({}, function (err, allCovers) {
    if (err) {
      console.log(err);
    } else {
      res.render("covers/index", {
        covers: allCovers,
      });
    }
  });
});
app.post("/covers", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newCover = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new cover and save it to DB
  Cover.create(newCover, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/covers");
    }
  });
});

app.get("/covers/new", isLoggedIn, function (req, res) {
  res.render("covers/new");
});
app.get("/covers/:id", function (req, res) {
  Cover.findById(req.params.id, function (err, foundCover) {
    if (err) {
      console.log(err);
    } else {
      res.render("covers/show", {
        cover: foundCover,
        currentUser: req.user
      });
    }
  });
});

app.get("/covers/:id/edit", isLoggedIn, function (req, res) {
  Cover.findById(req.params.id, function (err, foundCover) {
    if (err) {
      res.redirect("/covers");
    } else {
      res.render("covers/edit", {
        cover: foundCover
      });
    }
  });
});

//update cover round

app.put("/stock/:id", isLoggedIn, function (req, res) {
  Cover.findByIdAndUpdate(req.params.id, req.body.cover, function (err, updatedCover) {
    if (err) {
      res.redirect("/covers");
      console.log(err);
    } else {
      res.redirect("/covers/" + req.params.id);
    }
  });
});

//destroy cover round

app.delete("/covers/:id", isLoggedIn, function (req, res) {
  Cover.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/covers");
    } else {
      res.redirect("/covers");
    }
  });
});
//========================
//cover round -- end
//========================

//========================
//keychain round -- start
//========================
app.get("/keychains", function (req, res) {
  Keychain.find({}, function (err, allKeychains) {
    if (err) {
      console.log(err);
    } else {
      res.render("keychains/index", {
        keychains: allKeychains,
      });
    }
  });
});
app.post("/keychains", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newKeychain = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new keychain and save it to DB
  Keychain.create(newKeychain, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/keychains");
    }
  });
});

app.get("/keychains/new", isLoggedIn, function (req, res) {
  res.render("keychains/new");
});
app.get("/keychains/:id", function (req, res) {
  Keychain.findById(req.params.id, function (err, foundKeychain) {
    if (err) {
      console.log(err);
    } else {
      res.render("keychains/show", {
        keychain: foundKeychain,
        currentUser: req.user

      });
    }
  });
});
app.get("/keychains/:id/edit", isLoggedIn, function (req, res) {
  Keychain.findById(req.params.id, function (err, foundKeychain) {
    if (err) {
      res.redirect("/keychains");
    } else {
      res.render("keychains/edit", {
        keychain: foundKeychain
      });
    }
  });
});

//update keychains round

app.put("/keychains/:id", isLoggedIn, function (req, res) {
  Keychain.findByIdAndUpdate(req.params.id, req.body.keychain, function (err, updatedKeychain) {
    if (err) {
      res.redirect("/keychains");
      console.log(err);
    } else {
      res.redirect("/keychains/" + req.params.id);
    }
  });
});

//destroy keychains round

app.delete("/keychains/:id", isLoggedIn, function (req, res) {
  Keychain.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/keychains");
    } else {
      res.redirect("/keychains");
    }
  });
});

//========================
//keychain round -- end
//========================


//========================
//t-shirt round -- start
//========================
app.get("/t-shirts", function (req, res) {
  Tshirt.find({}, function (err, allTshirts) {
    if (err) {
      console.log(err);
    } else {
      res.render("t-shirts/index", {
        tshirts: allTshirts,
      });
    }
  });
});
app.post("/t-shirts", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newTshirt = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new t-shirts and save it to DB
  Tshirt.create(newTshirt, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/t-shirts");
    }
  });
});

app.get("/t-shirts/new", isLoggedIn, function (req, res) {
  res.render("t-shirts/new");
});
app.get("/t-shirts/:id", function (req, res) {
  Tshirt.findById(req.params.id, function (err, foundTshirt) {
    if (err) {
      console.log(err);
    } else {
      res.render("t-shirts/show", {
        tshirt: foundTshirt,
        currentUser: req.user
      });
    }
  });
});

app.get("/t-shirts/:id/edit", isLoggedIn, function (req, res) {
  Tshirt.findById(req.params.id, function (err, foundTshirt) {
    if (err) {
      res.redirect("/t-shirts");
    } else {
      res.render("t-shirts/edit", {
        tshirt: foundTshirt
      });
    }
  });
});

//update t-shirt round

app.put("/t-shirts/:id", isLoggedIn, function (req, res) {
  Tshirt.findByIdAndUpdate(req.params.id, req.body.tshirt, function (err, updatedTshirt) {
    if (err) {
      res.redirect("/t-shirts");
      console.log(err);
    } else {
      res.redirect("/t-shirts/" + req.params.id);
    }
  });
});

//destroy t-shirt round

app.delete("/t-shirts/:id", isLoggedIn, function (req, res) {
  Tshirt.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/t-shirts");
    } else {
      res.redirect("/t-shirts");
    }
  });
});
//========================
//t-shirt round -- end
//========================

//========================
//hoodie round -- start
//========================
app.get("/hoodies", function (req, res) {
  Hoodie.find({}, function (err, allHoodies) {
    if (err) {
      console.log(err);
    } else {
      res.render("hoodies/index", {
        hoodies: allHoodies,
      });
    }
  });
});
app.post("/hoodies", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newHoodie = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new hoodies and save it to DB
  Hoodie.create(newHoodie, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/hoodies");
    }
  });
});

app.get("/hoodies/new", isLoggedIn, function (req, res) {
  res.render("hoodies/new");
});
app.get("/hoodies/:id", function (req, res) {
  Hoodie.findById(req.params.id, function (err, foundHoodie) {
    if (err) {
      console.log(err);
    } else {
      res.render("hoodies/show", {
        hoodie: foundHoodie,
        currentUser: req.user
      });
    }
  });
});

app.get("/hoodies/:id/edit", isLoggedIn, function (req, res) {
  Hoodie.findById(req.params.id, function (err, foundHoodie) {
    if (err) {
      res.redirect("/hoodies");
    } else {
      res.render("hoodies/edit", {
        hoodie: foundHoodie
      });
    }
  });
});

//update hoodies round

app.put("/hoodies/:id", isLoggedIn, function (req, res) {
  Hoodie.findByIdAndUpdate(req.params.id, req.body.hoodie, function (err, updatedHoodie) {
    if (err) {
      res.redirect("/hoodies");
      console.log(err);
    } else {
      res.redirect("/hoodies/" + req.params.id);
    }
  });
});

//destroy hoodies round

app.delete("/hoodies/:id", isLoggedIn, function (req, res) {
  Hoodie.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/hoodies");
    } else {
      res.redirect("/hoodies");
    }
  });
});
//========================
//hoodies round -- end
//========================


//========================
//magnet round -- start
//========================
app.get("/magnets", function (req, res) {
  Magnet.find({}, function (err, allMagnets) {
    if (err) {
      console.log(err);
    } else {
      res.render("magnets/index", {
        magnets: allMagnets,
      });
    }
  });
});
app.post("/magnets", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;
  var newMagnet = {
    name: name,
    price: price,
    description: description,
    image: image,
  };
  //Create a new magnets and save it to DB
  Magnet.create(newMagnet, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/magnets");
    }
  });
});

app.get("/magnets/new", isLoggedIn, function (req, res) {
  res.render("magnets/new");
});
app.get("/magnets/:id", function (req, res) {
  Magnet.findById(req.params.id, function (err, foundMagnet) {
    if (err) {
      console.log(err);
    } else {
      res.render("magnets/show", {
        magnet: foundMagnet,
        currentUser: req.user

      });
    }
  });
});

app.get("/magnets/:id/edit", isLoggedIn, function (req, res) {
  Magnet.findById(req.params.id, function (err, foundMagnet) {
    if (err) {
      res.redirect("/magnets");
    } else {
      res.render("magnets/edit", {
        magnet: foundMagnet
      });
    }
  });
});

//update magnet round

app.put("/magnets/:id", isLoggedIn, function (req, res) {
  Magnet.findByIdAndUpdate(req.params.id, req.body.magnet, function (err, updatedMagnet) {
    if (err) {
      res.redirect("/magnets");
      console.log(err);
    } else {
      res.redirect("/magnets/" + req.params.id);
    }
  });
});

//destroy magnets round

app.delete("/magnets/:id", isLoggedIn, function (req, res) {
  Magnet.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/magnets");
    } else {
      res.redirect("/magnets");
    }
  });
});
//========================
//magnets round -- end
//========================


app.get("/cart", function (req, res) {
  res.render("cart");
});
app.get("/checkout", function (req, res) {

  user_firstname = "Ім'я: " + req.body.firstname;
  user_lastname = "Прізвище: " + req.body.lastname;
  user_phone = "Телефон: " + req.body.phonenumber;


  res.render("checkout");

});
app.get("/payment", function (req, res) {
  res.render("payment");
});
app.get("/complete", function (req, res) {
  res.render("complete");
});
let user_firstname, user_lastname, user_phone, city, delivery, post_office, index_code, user_comment, user_order, user_payment;
var is_it_done;
app.post("/complete", urlencodedParser, function (req, res) {

  is_it_done = req.body.c_true;


  user_firstname = "Ім'я: " + req.body.firstname;
  user_lastname = req.body.lastname;
  user_phone = "Телефон: " + req.body.phone;
  city = "Населений пункт: " + req.body.city;
  post_office = "Поштове відділення або адреса: " + req.body.post_office;
  user_comment = "Коментар до замовлення: " + req.body.comment;
  user_payment = "Метод оплати: " + req.body.payment;
  delivery = "Доставка: " + req.body.delivery;
  index_code = "Індекс: " + req.body.user_index;
  user_order = "Замовлення " + req.body.order;

  let name_for_mail, surname_for_mail, phone_for_mail;
  name_for_mail = req.body.firstname;
  surname_for_mail = req.body.lastname;
  phone_for_mail = req.body.phone;


  var transporter = nodemailer.createTransport({
    host: "mail.adm.tools",
    port: 2525,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: '<zakaz@poda.com.ua>',
    to: "zakaz@poda.com.ua",
    subject: surname_for_mail + " " + name_for_mail + " " + phone_for_mail,
    text: user_firstname + " " + user_lastname + "\n" + user_phone + "\n" + delivery + "\n" + city + "\n" + post_office + "\n" + user_comment + "\n" + user_order + "\n" + user_payment,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.render("complete");
    }
  });
});



// show login form
app.get("/login", function (req, res) {
  res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function (req, res) {
  res.send("Login logic");
});
//logic route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, 'localhost');