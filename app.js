const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.static('public')); // Указываем, что статические файлы лежат в папке public и они доступны по запросу, теперь мы можем получить нашу gif с сервера, написав её в адресе. (саму папку /public/ можно не указывать)
app.set('view engine', 'hbs'); // указываем использование шаблонизатора handlebars, т.к. у express стоит PAG
app.engine('hbs', exhbs({
    extname: 'hbs'
}));


// регистрация слушателей входящего соединения
app.get('/', (req, res) => {
    // console.log('Это колбек для app.get("/")');
    // console.log(req.url); // покажет только "/"
    res.render('home', { pageTitle: 'Главная страница' });
});

app.get('/about', (req, res) => {
    // console.log('Это колбек для app.get("/about")');
    // console.log(req.url); // покажет только "/about"
    res.render('about', { cssFileName: 'about', pageTitle: 'О нас' });
});

app.get('/products', (req, res) => {
    res.render('products', { products, cssFileName: 'products', pageTitle: 'Наши продукты' });
});

app.get('/product/:productId', (req, res) => {
    console.log(req.params);

    const product = products.find(p => p.id === req.params.productId);

    res.render('product', { product });
});

// запустили жильцов в кв.
app.listen(PORT, () => {
    console.log(`Application server is running on port ${PORT}`);
}); // мы хотим локально на нашем компьютере поднять app-server на порте 4444