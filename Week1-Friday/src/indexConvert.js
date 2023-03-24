"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_handlebars_1 = require("express-handlebars");
var path_1 = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// Template Engine
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'resources/views'));
console.log('PATH: ', path_1.default.join(__dirname, 'resources/views'));
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/form', function (req, res) {
    res.render('form');
});
app.post('/submit', function (req, res) {
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, password = _a.password, address = _a.address, address2 = _a.address2, city = _a.city, age = _a.age;
    var formData = "".concat(first_name, ", ").concat(last_name, ", ").concat(email, ", ").concat(password, ", ").concat(address, ", ").concat(address2, ", ").concat(city, ", ").concat(age, "\n");
    fs.appendFile('form.txt', formData, function (err) {
        if (err)
            throw err;
        console.log('Data has been written to file!');
        res.send("Thank you for submitting the form, !");
    });
});
app.listen(port, function () { return console.log("Listen at http://localhost:".concat(port)); });
