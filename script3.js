
    // Select page elements
    const nameInput = document.getElementById("nameInput");
    const priceInput = document.getElementById("priceInput");
    const quantityInput = document.getElementById("quantityInput");

    const addBtn = document.getElementById("addBtn");
    const clearBtn = document.getElementById("clearBtn");

    const cartContainer = document.getElementById("cartContainer");
    const totalDisplay = document.getElementById("totalDisplay");

    // Add a new item
    function addItem() {

        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);

        // Validate inputs
        if (
            name === "" ||
            isNaN(price) || price <= 0 ||
            isNaN(quantity) || quantity <= 0
        ) {
            alert("Please enter valid product information.");
            return;
        }

        // Create cart row
        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <span class="product-name">${name}</span>

            <span class="price">${price.toFixed(2)}</span>

            <div class="controls">
                <button class="minus-btn">-</button>

                <span class="quantity">${quantity}</span>

                <button class="plus-btn">+</button>
            </div>

            <button class="remove-btn">Remove</button>
        `;

        // Add item to cart
        cartContainer.appendChild(item);

        // Update total
        calculateTotal();

        // Clear inputs
        nameInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";
    }

    // Remove item
    function removeItem(itemElement) {
        itemElement.remove();
        calculateTotal();
    }

    // Update quantity
    function updateQuantity(itemElement, change) {

        const quantityElement = itemElement.querySelector(".quantity");

        let quantity = parseInt(quantityElement.textContent);

        quantity += change;

        if (quantity <= 0) {
            removeItem(itemElement);
            return;
        }

        quantityElement.textContent = quantity;

        calculateTotal();
    }

    // Calculate total price
    function calculateTotal() {

        let total = 0;

        const items = document.querySelectorAll(".cart-item");

        items.forEach(item => {

            const price =
                parseFloat(item.querySelector(".price").textContent);

            const quantity =
                parseInt(item.querySelector(".quantity").textContent);

            total += price * quantity;

        });

        totalDisplay.textContent =
            "Total: $" + total.toFixed(2);
    }

    // Add item button
    addBtn.addEventListener("click", addItem);

    // Event delegation
    cartContainer.addEventListener("click", function(event) {

        const item = event.target.closest(".cart-item");

        if (!item) return;

        if (event.target.classList.contains("plus-btn")) {
            updateQuantity(item, 1);
        }

        if (event.target.classList.contains("minus-btn")) {
            updateQuantity(item, -1);
        }

        if (event.target.classList.contains("remove-btn")) {
            removeItem(item);
        }

    });

    // Clear cart (Optional)
    clearBtn.addEventListener("click", function() {

        cartContainer.innerHTML = "";

        calculateTotal();

    });