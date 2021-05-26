import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
type TypeDataResponse = {
    _id:string
    name:string
}
function App() {
    const [user,setUsers] = useState<TypeDataResponse[] |null>(null)
    const [result,setResult] = useState<boolean|null>(null)
    const [name,setName] = useState<string>('')
    const addUser = ()=>{
        axios.post('http://localhost:7542/users',{name:name}).then(res=>{
            setResult(res.data.success)
            axios.get('http://localhost:7542/users').then(res=>{
                setUsers(res.data)
            })
        })
        setName('')
    }
    const deleteUser = (id:string)=>{
        axios.delete(`http://localhost:7542/users/${id}`).then(res=>{
            axios.get('http://localhost:7542/users').then(res=>{
                setUsers(res.data)
            })
        })


    }
    const updateUser = (id:string)=>{
        axios.put('http://localhost:7542/users',{id,name:name}).then(res=>{
            setName('')
            axios.get('http://localhost:7542/users').then(res=>{
                setUsers(res.data)
            })

        })
    }
    useEffect(()=>{
        axios.get('http://localhost:7542/users').then(res=>{
            setUsers(res.data)
        })
    },[])
  return <>
      {result&&console.log(result)}
     <div>
         <input value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
     </div>
      <button onClick={addUser}>Add User</button>
    <div className="App">
        {user&&user.map((user,id)=><div key={id}>{user.name}
        <button onClick={()=>deleteUser(user._id)}>X</button>
        <button onClick={()=>updateUser(user._id)}>Update</button>
        </div>)}
    </div>
  </>;
}

export default App;
