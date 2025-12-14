import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
            onDelete(user._id);
        }
    };

    return (
        <div className="user-card">
            <div className="user-image">
                <div className="no-image">👤</div>
                {user.role && (
                    <span className="user-role">{user.role}</span>
                )}
            </div>
            <div className="user-content">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
                {user.phone && (
                    <p className="user-phone">📞 {user.phone}</p>
                )}
                <div className="user-actions">
                    <button className="btn-edit" onClick={() => onEdit(user)}>
                        ✏️ Edit
                    </button>
                    <button className="btn-delete" onClick={handleDelete}>
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
