const express = require('express');
const handbar = require('express-handlebars');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Template Engine
app.engine('hbs', handbar.engine(
    {
        extname: '.hbs'
    }
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));
console.log('PATH: ',path.join(__dirname,'resources/views'));
app.get('/', (req, res)=> {
    res.render('home');
})
app.get('/form',(req, res, next)=>{
    res.render('form');
})
app.post('/submit', (req, res) => {
    // console.log(req.body)
    // return res.json({a: 1})
    const {first_name, last_name, email, password, address, address2, city, age} = req.body;

    const formData = `${first_name}, ${last_name}, ${email}, ${password}, ${address}, ${address2}, ${city}, ${age}\n`;
  
    fs.appendFile('form.txt', formData, err => {
      if (err) throw err;
      console.log('Data has been written to file!');
      res.send(`Thank you for submitting the form, !`);
    });
  });
app.listen(port, () => console.log(`Listen at http://localhost:${port}`))