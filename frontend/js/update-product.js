document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("addProductForm");
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id");

    if (productId) {
        // If editing, fetch the product data and populate the form
        const product = await fetchProduct(productId);
        if (product) {
            populateForm(product);
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("product_id", document.getElementById("product_id").value);
        formData.append("product_name", document.getElementById("product_name").value);
        formData.append("category_name", document.getElementById("category_name").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("price", parseFloat(document.getElementById("price").value));
        formData.append("stock_quantity", parseInt(document.getElementById("stock_quantity").value));
        formData.append("product_rating", parseFloat(document.getElementById("product_rating").value));
        formData.append("origin", document.getElementById("origin").value);
        formData.append("benefit", document.getElementById("benefit").value);
        formData.append("skin_type", document.getElementById("skin_type").value);
        formData.append("quantity", parseInt(document.getElementById("quantity").value));
        formData.append("ingredients", document.getElementById("ingredients").value);
        formData.append("brand", document.getElementById("brand").value);

        const fileInput = document.getElementById("imageUpload");
        if (fileInput.files[0]) {
            formData.append("image", fileInput.files[0]);
        }

        if (productId) {
            // Update the product
            await updateProduct(formData, productId);
        } 

        window.location.href = "/product-manage"; // Redirect to product management page
    });
});

// Fetch product details for editing
async function fetchProduct(productId) {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
            console.error("Failed to fetch product:", response.statusText);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

// Populate the form with fetched product data
function populateForm(product) {
    document.getElementById("product_id").value = product.product_id || "";
    document.getElementById("product_name").value = product.product_name || "";
    document.getElementById("category_name").value = product.category_name || "Default";
    document.getElementById("description").value = product.description || "";
    document.getElementById("price").value = product.price || "";
    document.getElementById("product_rating").value = product.product_rating || "";
    document.getElementById("stock_quantity").value = product.stock_quantity || "";
    document.getElementById("origin").value = product.origin || "";
    document.getElementById("benefit").value = product.benefit || "";
    document.getElementById("skin_type").value = product.skin_type || "";
    document.getElementById("quantity").value = product.quantity || "";
    document.getElementById("ingredients").value = product.ingredients || "";
    document.getElementById("brand").value = product.brand || "";

    // Populate image preview if available
    if (product.image_url) {
        const preview = document.getElementById("imagePreview");
        preview.src = product.image_url;
        preview.style.display = "block";
    }
}

// Update product data in the backend
async function updateProduct(formData, productId) {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "PUT", // Use PUT for updating
            body: formData, // Send FormData directly
        });

        const result = await response.json();
        if (response.ok) {
            alert("Product updated successfully!");
        } else {
            alert(`Error updating product: ${result.message}`);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update the product.");
    }
}




// Add a new product to the backend
// async function addProduct(formData) {
//     try {
//         const response = await fetch("http://localhost:8080/api/products", {
//             method: "POST",
//             body: formData,
//         });

//         const result = await response.json();
//         if (response.ok) {
//             alert("Product added successfully!");
//         } else {
//             alert(`Error: ${result.message}`);
//         }
//     } catch (error) {
//         console.error("Error adding product:", error);
//         alert("Failed to add the product.");
//     }
// }