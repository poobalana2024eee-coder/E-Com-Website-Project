import React from 'react';
import UserCard from './UserCard';
import './UserList.css';

const UserList = ({ users, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">👤</div>
                <h3>No Users Found</h3>
                <p>Start by adding your first user!</p>
            </div>
        );
    }

    return (
        <div className="user-list">
            {users.map((user) => (
                <UserCard
                    key={user._id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default UserList;
