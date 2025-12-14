import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            email: '',
            password: '',
            role: '',
            phone: '',
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="user-form-overlay">
            <div className="user-form-container">
                <div className="user-form-header">
                    <h2>{initialData ? '✏️ Edit User' : '➕ Add New User'}</h2>
                    <button className="close-btn" onClick={onCancel}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!initialData}
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="e.g., Admin, User"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            {initialData ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
