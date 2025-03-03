import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TablaUsuarios() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    function fetchUsers() {
        fetch('http://localhost:8000/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log('Error:', err));
    }

    function deleteUser(id) {
        fetch(`http://localhost:8000/api/users/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => fetchUsers())
            .catch(err => console.log('Error:', err));
    }

    function editUserData(user) {
        setEditUser(user);
        setFormData({
            name: user.name,
            email: user.email
        });
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function saveEdit() {
        if (!editUser) return;
    
        fetch(`http://localhost:8000/api/users/${editUser.id}`, {
            method: 'PATCH',  // <-- CAMBIADO DE PUT A PATCH
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(() => {
            setEditUser(null);
            fetchUsers();
        })
        .catch(err => console.log('Error:', err));
    }
    

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">Lista de Usuarios</h2>
            <button className="btn btn-primary btn-lg w-100 mb-3" onClick={fetchUsers}>
                Obtener Usuarios
            </button>

            {editUser && (
                <div className="card mb-3 shadow-sm">
                    <div className="card-body bg-light rounded">
                        <h4 className="text-center">Editar Usuario</h4>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control form-control-lg rounded-3"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control form-control-lg rounded-3"
                            />
                        </div>
                        <button className="btn btn-success btn-lg w-100 mb-2" onClick={saveEdit}>
                            Guardar cambios
                        </button>
                        <button className="btn btn-secondary btn-lg w-100" onClick={() => setEditUser(null)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.id)}>
                                        Eliminar
                                    </button>
                                    <button className="btn btn-warning btn-sm" onClick={() => editUserData(user)}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaUsuarios;
