let currentPage = 1;
const pageSize = 10;
const baseUrl = 'http://localhost:3000/api';

async function loadCategories() {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option value="">Select Category</option>'; // Clear previous options

    response.data.forEach(category => {
      const option = `<option value="${category.id}">${category.name}</option>`;
      categorySelect.innerHTML += option;
    });
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function addProduct() {
  const name = document.getElementById('productName').value;
  const categoryId = document.getElementById('categorySelect').value;
  const id = document.getElementById('productId').value; // Check if we're updating

  if (name && categoryId) {
    try {
      if (id) {
        await axios.put(`${baseUrl}/products/${id}`, { name, categoryId });
        alert('Product updated successfully.');
      } else {
        await axios.post(`${baseUrl}/products`, { name, categoryId });
        alert('Product added successfully.');
      }
      clearForm();
      loadProducts(currentPage); // Reload the product list
    } catch (error) {
      console.error('Error adding/updating product:', error);
      alert('Failed to add/update product.');
    }
  } else {
    alert("Please enter a product name and select a category.");
  }
}

function clearForm() {
  document.getElementById('productName').value = '';
  document.getElementById('categorySelect').value = '';
  document.getElementById('productId').value = ''; // Clear the hidden field
}

async function loadProducts(page = 1) {
  currentPage = page;
  try {
    const response = await axios.get(`${baseUrl}/products?page=${page}&pageSize=${pageSize}`);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    response.data.products.forEach(product => {
      const row = `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.Category.name}</td>
        <td>${product.Category.id}</td>
        <td>
          <button onclick="editProduct(${product.id}, '${product.name}', ${product.Category.id})">Update</button>
          <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
      </tr>`;
      productList.innerHTML += row;
    });

    document.querySelector('button[onclick="loadProducts(currentPage - 1)"]').disabled = currentPage === 1;
    document.querySelector('button[onclick="loadProducts(currentPage + 1)"]').disabled = currentPage === response.data.totalPages;
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Failed to load products.');
  }
}

function editProduct(id, name, categoryId) {
  document.getElementById('productId').value = id;
  document.getElementById('productName').value = name;
  document.getElementById('categorySelect').value = categoryId;
}

async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      loadProducts(currentPage); // Reload the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  }
}

// Load categories and products on page load
loadCategories();
loadProducts();
