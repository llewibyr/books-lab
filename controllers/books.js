const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        console.log(allBooks)
        res.render('books/index', {books: allBooks, message: 'Choose a Genre Bum'});
    } catch (err) {
    res.redirect('/');
    }
};

const getOneBook = async (req, res) => {
    try {
        const foundBook = await Book.findById(req.params.id);


        const contextData = { book: foundBook};
        res.render('books/show', contextData);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const createBook = async (req, res) => {
    try{
        await Book.create(req.body);
        res.redirect('/books');
    } catch (err) {
     res.status(400).json({ error: err.message});
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch (err) {
        console.log(err);
        res.redirect(`/`);
    }
};

const getNewForm = (req, res) => {
    res.render('books/new');
};

const getEditForm = async (req, res) => {
    try {
        const bookToEdit = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).send('Book not found CHUMP');
        }
        res.render('books/edit', {book: bookToEdit });
    } catch (err) {
        console.log(err);
        res.redirect(`/`);
    }
};

const editBook = async (req, res) => {
    try{
        const book = await book.findById(req.params.id, req.body, {new: true});
        if (!book) {
            return res.status(404).send('Book not found');
        }

        
        res.redirect(`/books/${ book._id }`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting book');
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    deleteBook,
    editBook,
    getNewForm,
    getEditForm
};