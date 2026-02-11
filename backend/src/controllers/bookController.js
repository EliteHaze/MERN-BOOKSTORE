import Book from "../models/bookModel.js";
export async function getAllBooks(_, res) {
    try {
        const books = await Book.find().sort({ createdAt: -1})
        res.status(200).json(books)
    } catch (error) {
        console.error("Error in getAllBooks controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
    // console.log("getAllBooks")
    // res.status(200).json("getAllBooks")
}

export async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message: 'book not found'})
            res.status(200).json(book)
    } catch (error) {
        console.error("Error in getBookById controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
    // console.log("getBookById")
    // res.status(200).json("getBookById")
}

export async function createBook(req, res) {
    try {
        const { title, author, publishYear } = req.body
        if(!title || !author || !publishYear){
            return res.status(404).json({message: 'All field are required'})
        }
        const book = new Book({title, author, publishYear})

        const savedBook = await book.save()
        res.status(201).json({ savedBook })
    } catch (error) {
        console.error("Error in createBook controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
    //console.log("createBook")
    //res.status(200).json("createBook")
}

export async function updateBook(req, res) {
    try {
        const { title , author, publishYear } = req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {title , author, publishYear}, {new: true})
        if(!updatedBook) return res.status(404).json({message: 'book not found'})
            res.status(200).json(updatedBook)
    } catch (error) {
        console.error("Error in updatedBook controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
    // console.log("updateBook")
    // res.status(200).json("updateBook")
}

export async function deleteBook(req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if(!deletedBook) return res.status(404).json({message: "book not found"})
            res.status(200).json({message: 'Book deleted successfully'})
    } catch (error) {
        console.error("Error in deleteBook controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
    // console.log("deleteBook")
    // res.status(200).json("deleteBook")
}