// Imports
const exoress = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bookController = require('./controllers/books.js')

//Middleware
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = ('path');

//App Config
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

//Connection to MONGODB
mongoose.connect(process.env.MONGODB_URI);

//Event Listeners
mongoose.connection.on('error', (err) => {
    console.log(err);
});

//Import for MONGOOSE Models
const Book = requires('./models/book');

//Config View Engine
app.set('view engine', 'ejs');

//More Middleware
app.use(express.urlendcoded({extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// Landing Page
app.get('/', (req,res) => {
    res.render('index');
});

// Routes
// NEW Route
app.get('/books/new', bookController.getNewForm);

// INDEX Route
app.get('/books', bookController.getAllBooks);

// SHOW Route
app.get('/books/:id', bookController.getOneFruit);

// POST Route
app.post('/books', bookController.createFruit);

// DELETE Route
app.delete('/books/id:', bookController.deleteBook);

// EDIT Route
app.get('books/:bookID/edit', bookController.getEditForm);

// UPDATE Route
app.put('books/:id', bookController.editBook);

// CREATE IMAGE Route
app.post('/books/:bookID/images', async (req, res) => {
    console.log('req.body', req.body);
    console.log('req.params', req.params);

    try{
        const foundBook = await Book.findById(req.params.bookID);

        if (req.body.uploadedBy === '') {
            delete req.body.uploadedBy;
            console.log('after parsing', req.body)
        }
        foundBook.images.push(req.body);

        await foundBook.save();

        res.redirect(`/books/${req.params.bookId}`);
       } catch (err) {
        console.log(err);
        res.redirect(`/books/${req.params.bookId}`);
       }
    });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


