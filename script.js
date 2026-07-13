  // Select page elements
        const titleInput = document.getElementById("titleInput");
        const authorInput = document.getElementById("authorInput");
        const addBtn = document.getElementById("addBtn");
        const bookContainer = document.getElementById("bookContainer");
        const bookCounter = document.getElementById("bookCounter");

        // Store the number of books
        let totalBooks = 0;

        // Update the counter
        function updateCounter() {
            bookCounter.textContent = "Total Books: " + totalBooks;
        }

        // Add a new book
        function addBook() {

            // Get input values
            const title = titleInput.value.trim();
            const author = authorInput.value.trim();

            // Validate inputs
            if (title === "" || author === "") {
                alert("Please enter both title and author.");
                return;
            }

            // Create book card
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";

            // Create text
            const bookInfo = document.createElement("span");
            bookInfo.innerHTML =
                "<strong>Title:</strong> " + title +
                " | <strong>Author:</strong> " + author;

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            // Delete event
            deleteBtn.addEventListener("click", function () {
                deleteBook(bookCard);
            });

            // Add text and button to card
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(deleteBtn);

            // Display book
            bookContainer.appendChild(bookCard);

            // Increase counter
            totalBooks++;
            updateCounter();

            // Clear inputs
            titleInput.value = "";
            authorInput.value = "";
        }

        // Delete a book
        function deleteBook(bookElement) {
            bookContainer.removeChild(bookElement);

            totalBooks--;
            updateCounter();
        }

        // Add event to Add Book button
        addBtn.addEventListener("click", addBook);