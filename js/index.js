const BOOK_API = ("http://localhost:3000/books")

document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.querySelector('ul')
    const showBook = document.getElementById('show-panel')
 
    renderNewBook = (book) => {
        bookTitle = document.createElement("li")
        bookTitle.innerText = book.title

        bookList.append(bookTitle)

        bookTitle.addEventListener('click', () => {
        event.preventDefault();

            bookShowTitle = document.createElement('h2')
            bookShowTitle.innerText = book.title

            bookImg = document.createElement('img')
            bookImg.src = book.img_url

            bookDescription = document.createElement('p')
            bookDescription = book.description

            usersUl = document.createElement('ul')
            
            const mapUsers = (book) => { 
                usersUl.innerHTML = ""
                book.users.map(user => {
                bookReaders = document.createElement('h3')
                bookReaders.innerText = user.username
                usersUl.append(bookReaders)
                }); }
                mapUsers(book);
                
            readBook = document.createElement('button')
            readBook.innerText = "Read Book"


            readBook.addEventListener('click', () => {
               
                const allUser = book.users;
                const finder = allUser.find(singleUser => singleUser.id == 1);
                 if (finder == undefined) {
                 allUser.unshift({ id: 1, username: "pouros" });
                } else {
                allUser.shift();
                }
                configOption = {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, 
                    body: JSON.stringify({
                        users: allUser
                    })
                }
                fetch(`${BOOK_API}/${book.id}`, configOption)
                .then(res => res.json())
                .then(book => mapUsers(book)) 
            })
           
            showBook.innerHTML = ""
            showBook.append(bookShowTitle, bookImg, bookDescription, usersUl, readBook)
            })
        
    }

    renderBooks = (books) => {
        console.log(books)
        books.forEach ( book =>
            renderNewBook(book))
    }

    const init = () => {
        fetch(BOOK_API)
        .then(res => res.json())
        .then(books => renderBooks(books))
    }
    init();
});
