const { nanoid } = require('nanoid');
const books = require('./books');

//MENAMBAHKAN BUKU
const addBookHandler = (request, h) => {
  const {
   name,
   year,
   author,
   summary,
   publisher,
   pageCount,
   readPage,
   reading } = request.payload;
   
   //VALIDASI JIKA NAMA BUKU KOSONG
   if(!name){
     return h.response({
       status: 'fail',
       message: 'Gagal menambahkan buku. Mohon isi nama buku',
     }).code(400);
   };
   //VALIDASI READPAGE
   if(readPage > pageCount){
     return h.response({
       status: 'fail',
       message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
     }).code(400);
   };
   
   //PENGOLAHAN DATA BUKU SERVER
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt
    }
  books.push(newBook);
  
  //VALIDASI BERHASIL
  const isSuccess = books.filter((books) => books.id === id).length > 0;
  if(isSuccess){
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    }).code(201);
  }
  //VALIDASI GAGAL
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  }).code(500);
};

//MENAMPILKAN SEMUA BUKU
const getAllBookHandler = (req) => {
  const { reading, finished, name } = req.query;
  
  if (reading !== undefined) {
    const filteredBooks = books.filter((books) => books.reading == reading);
    return {
      status: 'success',
      data: {
        book: filteredBooks.map((books) => ({
          id: books.id,
          name: books.name,
          publisher: books.publisher,
        }),
      )}
    };
  }

  if (finished !== undefined) {
    const filteredBooks = books.filter((books) => books.finished == finished);
    return {
      status: 'success',
      data: {
        books: filteredBooks.map((books) => ({
          id: books.id,
          name: books.name,
          publisher: books.publisher,
        }),
      )}
    };
  }
  
  if (name !== undefined) {
    const filteredBooks = books.filter((books) => books.name == name);
    return {
      status: 'success',
      data: {
        books: filteredBooks.map((books) => ({
          id: books.id,
          name: books.name,
          publisher: books.publisher,
        }),
      )}
    };
  }

  return {
    status: 'success',
    data: {
      books: books.map((books) => ({
        id: books.id,
        name: books.name,
        publisher: books.publisher,
      }),
    )}
  };
};

//MENAMPILKAN BUKU BERDASARKAN ID
const getBookByIdHandler = (request, h) => {
  const {id} = request.params;
  //MENCARI BUKU BERDASARKAN ID
  const book = books.find((books) => books.id === id);
  
  if(!book){
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }else{
    return h.response({
      status: 'success',
      data: {
        book
      }
    }).code(200);
  }
};

//MENAMPILKAN BUKU BERDASARKAN NAMA
//const getBookByNameHandler = (request, h) => {
//  const {nama} = request.params;
//  const bookName = book.find((book) => book.nama === nama);
  
 // if(!bookName){
 //   return h.response({
 //     status: 'fail',
 //     message: 'Buku tidak ditemukan'
 //   }).code(404);
 // }else{
 //   return h.response({
 //     status: 'success',
 //     data: {
 //       bookName
 //     }
 //   })
 // }
//};

//MENGUBAH BUKU
const editBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  //MENCARI BUKU BERDASARKAN INDEX
  const index = books.findIndex((books) => books.id === id);

  if (index !== -1) {
    //VALIDASI GAGAL JIKA NAMA KOSONG
    if (name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }
    //VALIDASI GAGAL JIKA readPage lebih dari pageCount
    if (pageCount < readPage) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }
//VALIDASI BERHASIL
    const finished = (pageCount === readPage);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
//VALIDASI JIKA ID TIDAK DITEMUKAN
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

//MENGHAPUS BUKU
const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;
 
  const index = books.findIndex((books) => books.id === id);
  //VALIDASI BERHASIL
  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }
  //VALIDASI GAGAL
  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = { 
  addBookHandler,
  getBookByIdHandler,
  //getBookByNameHandler,
  getAllBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler };