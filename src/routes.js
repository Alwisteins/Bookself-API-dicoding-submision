const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  //getBookByNameHandler,
  editBookByIdHandler,
  deleteBookByIdHandler } = require('./handler');

const Routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
   method: 'GET',
   path: '/books',
   handler: getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  //{
  //  method: 'GET',
  //  path: '/books/{nama}',
  //  handler: getBookByNameHandler,
  //},
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  }];
  
  module.exports = Routes;