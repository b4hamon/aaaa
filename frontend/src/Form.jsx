import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'

function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const guardar = () => {
    const newUser = {
      nombre: name,
      correo: email,
      contrasenia: password
    }

    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))




      
  }

  return (
    <div className='container'>
      <label htmlFor="name">Ingrese el nombre:</label>
      <input
        type="text"
        id="name"
        className='form-control'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Ingrese el correo:</label>
      <input
        type="email"
        id='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Ingrese la contraseña:</label>
      <input
        className='form-control'
        placeholder='Ingrese la contraseña del producto'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='btn btn-primary mt-3' onClick={guardar}>
        Guardar
      </button>
    </div>
  )
}

export default Form
