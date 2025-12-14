import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { productAPI, userAPI } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userAPI.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchUsers();
    }
  }, [activeTab]);

  // Handle add product
  const handleAddProduct = async (productData) => {
    try {
      await productAPI.createProduct(productData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    }
  };

  // Handle edit product
  const handleEditProduct = async (productData) => {
    try {
      await productAPI.updateProduct(editingProduct._id, productData);
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product. Please try again.');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Open edit form
  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Handle add user
  const handleAddUser = async (userData) => {
    try {
      await userAPI.createUser(userData);
      setShowUserForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user. Please try again.');
    }
  };

  // Handle edit user
  const handleEditUser = async (userData) => {
    try {
      await userAPI.updateUser(editingUser._id, userData);
      setShowUserForm(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user. Please try again.');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id) => {
    try {
      await userAPI.deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  // Open edit user form
  const openEditUserForm = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  // Close user form
  const closeUserForm = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <Navbar />

      <div className="app-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </div>

        <div className="app-header">
          <h2>{activeTab === 'products' ? 'Products' : 'Users'}</h2>
          <button
            className="btn-add-product"
            onClick={() => activeTab === 'products' ? setShowForm(true) : setShowUserForm(true)}
          >
            ➕ Add New {activeTab === 'products' ? 'Product' : 'User'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {activeTab === 'products' ? (
          <ProductList
            products={products}
            onEdit={openEditForm}
            onDelete={handleDeleteProduct}
            loading={loading}
          />
        ) : (
          <UserList
            users={users}
            onEdit={openEditUserForm}
            onDelete={handleDeleteUser}
            loading={loading}
          />
        )}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
          onCancel={closeForm}
        />
      )}

      {showUserForm && (
        <UserForm
          onSubmit={editingUser ? handleEditUser : handleAddUser}
          initialData={editingUser}
          onCancel={closeUserForm}
        />
      )}
    </div>
  );
}

export default App;
