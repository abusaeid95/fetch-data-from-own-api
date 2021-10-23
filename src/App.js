import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers]=useState([])
  const namRef = useRef("")
  const emailRef = useRef("")
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  const handleAddUser = (e) =>{
    const name= namRef.current.value;
    const email = emailRef.current.value;
    const newUsers = {name: name, email: email}

    // send data to ther server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers:{'content-type' : 'application/json'},
      body: JSON.stringify(newUsers)
    })
    .then(res=>res.json())
    .then(data =>{
      console.log(data);
      const addedUser =  data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
    })
    namRef.current.value='';
    emailRef.current.value='';
    e.preventDefault();
  }
    return (
    <div className="App">
      <h1>Users: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={namRef} />
        <input type="text" ref={emailRef}/>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li>{user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
