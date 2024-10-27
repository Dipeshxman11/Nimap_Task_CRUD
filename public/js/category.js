const baseUrl = 'http://localhost:3000/api';

async function loadCategories() {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    response.data.forEach(category => {
      const row = `<tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>
          <button onclick="editCategory(${category.id}, '${category.name}')">Edit</button>
          <button onclick="deleteCategory(${category.id})">Delete</button>
        </td>
      </tr>`;
      categoryList.innerHTML += row;
    });
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function addCategory() {
  const name = document.getElementById('categoryName').value;
  if (name) {
    try {
      await axios.post(`${baseUrl}/categories`, { name });
      document.getElementById('categoryName').value = '';
      loadCategories();
      alert('Category added successfully.');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error); // Shows 'Category already exists'
      } else {
        console.error('Error adding category:', error);
        alert('Failed to add category.');
      }
    }
  } else {
    alert("Please enter a category name.");
  }
}

function editCategory(id, name) {
  document.getElementById('categoryId').value = id;
  document.getElementById('categoryName').value = name;
}

async function updateCategory() {
  const id = document.getElementById('categoryId').value;
  const name = document.getElementById('categoryName').value;
  if (id && name) {
    try {
      await axios.put(`${baseUrl}/categories/${id}`, { name });
      document.getElementById('categoryId').value = '';
      document.getElementById('categoryName').value = '';
      loadCategories();
      alert('Category updated successfully.');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category.');
    }
  } else {
    alert("Please enter a category name.");
  }
}

async function deleteCategory(id) {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await axios.delete(`${baseUrl}/categories/${id}`);
      loadCategories();
      alert('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category.');
    }
  }
}

loadCategories();
