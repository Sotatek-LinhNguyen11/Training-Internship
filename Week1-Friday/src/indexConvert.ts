import   { Application, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

const app: Application = Application();
const port = 3000;

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log('PATH: ', path.join(__dirname, 'resources/views'));

app.get('/', (req: Request, res: Response): void => {
    res.render('home');
});

app.get('/form', (req: Request, res: Response): void => {
    res.render('form');
});

app.post('/submit', (req: Request, res: Response): void => {
    const { first_name, last_name, email, password, address, address2, city, age } = req.body;

    const formData = `${first_name}, ${last_name}, ${email}, ${password}, ${address}, ${address2}, ${city}, ${age}\n`;

    fs.appendFile('form.txt', formData, err => {
        if (err) throw err;
        console.log('Data has been written to file!');
        res.send(`Thank you for submitting the form, !`);
    });
});

app.listen(port, () => console.log(`Listen at http://localhost:${port}`));
