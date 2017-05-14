//DataStore for this Demo
import {observable,useStrict,action} from "mobx";
useStrict(true);
class BookStore {

  @observable  _books = [];

  constructor() {
    this.fetchBooks();
    //this._observer = null;
  }
  get books() {
    return this._books;
  }

  @action
  changeBooks(books){
    return this._books.replace(books);
  }

  @action
  addBook(book){
    this._books.push(book);
  }

  @action
  deleteBook(book){
    this._books.splice(book.id-1, 1);
  }

  getBook(id) {
    return this._books.filter((book) => {
      return book.id === Number(id);
    })[0];
  }

  fetchBooks = ()=> {
    fetch("http://localhost:7777/books")
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.changeBooks(response);
        console.log("Got books from server");
       /* if (this._observer) {
          this._observer.dataReady();
        }*/
      })
  }
}

let store = new BookStore();
window.store = store;

export default store;