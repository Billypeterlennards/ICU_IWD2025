/*
📖 Introduction to JavaScript (JS)
--------------------------------------------------------
What is JavaScript?
JavaScript (JS) is a high-level programming language used to add 
interactivity, functionality, and logic to web pages. Unlike static 
HTML and CSS, JavaScript allows developers to create dynamic and 
responsive websites.

What Does JavaScript Stand For?
Java – JavaScript was originally inspired by the Java programming language but is entirely different.
Script – JavaScript is a scripting language, meaning it executes small programs (scripts) directly in the browser.

Why is JavaScript Important?
✅ Makes web pages interactive (e.g., animations, form validation, image sliders)
✅ Handles dynamic content (e.g., fetching books from an API)
✅ Improves user experience (UX) by responding to user actions
✅ Works with HTML & CSS to create fully functional web applications
--------------------------------------------------------

✅ CSS and JavaScript fully explained with detailed comments for every line and element
✅ Abbreviations expanded and defined (e.g., DOM, ul, img)
✅ Clear and easy-to-understand explanations on how each line works
*/

/* Enforces strict mode to catch errors and enforce safer coding practices */
"use strict"; 

// Waits for the entire HTML document to load before running the script
document.addEventListener("DOMContentLoaded", function () { 
    
    let slideIndex = 0; 
    // Stores the index of the current slide

    /**
     * Function to handle the image slider
     * Loops through images and changes them every 3 seconds
     */
    function showSlides() {
        let slides = document.getElementsByClassName("slide"); 
        // Selects all elements with the class "slide"
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
            // Hides all slides initially
        }
        slideIndex++; 
        // Moves to the next slide
        
        if (slideIndex > slides.length) { 
            slideIndex = 1; 
            // Resets to the first slide after reaching the last one
        }
        
        slides[slideIndex - 1].style.display = "block"; 
        // Displays the current slide
        
        setTimeout(showSlides, 3000); 
        // Calls the showSlides function every 3 seconds
    }
    
    showSlides(); 
    // Starts the slider

    // Toggles dark mode on and off when the button is clicked
    document.getElementById("darkModeToggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode"); 
        // Adds or removes the "dark-mode" class on the body element
    });

    /**
     * Function to fetch books from Google Books API
     * @param {string} category - The category of books to fetch
     */
    function fetchBooks(category = "all") {
        let query = category === "all" ? "library" : category; 
        // Sets the default query to "library" unless another category is selected

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6`) 
        // Calls the Google Books API to fetch books
        
            .then(response => response.json()) 
            // Converts the response to JSON format
            
            .then(data => {
                let bookList = document.getElementById("book-list"); 
                // Gets the container where books will be displayed
                bookList.innerHTML = ""; 
                // Clears previous books

                data.items.forEach(book => { 
                    // Loops through each book in the fetched data
                    let bookDiv = document.createElement("div"); 
                    // Creates a new <div> element for the book

                    let isBorrowed = Math.random() < 0.5; 
                    // Randomly assigns a borrowed status

                    bookDiv.innerHTML = `
                        <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200'}">
                        <h4>${book.volumeInfo.title}</h4>
                        <button class="borrow-btn ${isBorrowed ? 'borrowed' : ''}">
                            ${isBorrowed ? "Borrowed" : "Borrow"}
                        </button>
                    `;
                    bookList.appendChild(bookDiv);
                });
            });
    }

    fetchBooks(); 
    // Loads books when the page loads
});
