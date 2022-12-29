showBooks();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let bookName = document.getElementById('bookName');
    let authorName = document.getElementById('author');

    let programming = document.getElementById('programming');
    let mathmatics = document.getElementById('mathmatics');
    let science = document.getElementById('science');
    let other = document.getElementById('other');

    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    let type;
    if (programming.checked) {
        type = programming.value;
    }
    else if (mathmatics.checked) {
        type = mathmatics.value;
    }
    else if (science.checked) {
        type = science.value;
    }
    else if (other.checked) {
        type = other.value;
    }

    let myObj = {
        book: bookName.value,
        author: authorName.value,
        booktype: type
    }

    let message = document.getElementById('message');
    let boldText;
    let displayMessage;

    if (myObj.book.length < 1 || myObj.author.length < 2) {
        boldText = "Error";
        displayMessage = `Sorry you can't add this book.`;
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 1500);

    }
    else {
        boldText = "Success";
        displayMessage = 'Your book has been successfully added.';
        message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 1500);

        booksobj.push(myObj);
    }
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    localStorage.setItem('books', JSON.stringify(booksobj));
    bookName.value = "";
    authorName.value = "";
    type = "";
    // console.log(booksobj);
    e.preventDefault();
    showBooks();
});

// Function to show elements from localStorage...
function showBooks() {
    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    let html = '';
    booksobj.forEach(function (element, index) {
        let uiString = `<tr class='tab'>
                        <td>${index + 1}.</td>
                        <td>${element.book}</td>
                        <td>${element.author}</td>
                        <td>${element.booktype}</td>
                        <td id="${index}" onclick="deleteBook(this.id)" style='cursor:pointer; color:blue'>Delete Book</td>
                        </tr>`;
        html += uiString;
    });

    let booksElm = document.getElementById('tableBody');
    if (booksobj.length != 0) {
        booksElm.innerHTML = html;
    } else {
        booksElm.innerHTML = `Nothing to show! Use "Add a book" section above to add books.`;

    }
}

function  deleteBook(index) {
    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    booksobj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksobj));
    showBooks();
}

// Search the books by user...
let search = document.getElementById("searchTxt");
search.addEventListener('input', function(){
    // let inputVal = search.value.toLowerCase();
    let inputVal = search.value;
    // console.log("Input event fired!", inputVal);
    let tab = document.getElementsByClassName("tab");
    Array.from(tab).forEach(function(element){
        let rowTxt = element.getElementsByTagName('td')[1].innerText;
        if (rowTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})