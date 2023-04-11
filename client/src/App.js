import "./App.css";
import {useEffect, useState} from 'react';
import axios from 'axios'

function App() {
const[name,setName]=useState();
const[age,setAge]=useState(0);
const[desription,setDsecription]=useState();
const[listsOf,setListOf]=useState([]);

const deleteDetails=(id)=>{
  axios.delete(`http://localhost:8000/delete/${id}`).then(()=>{
    setListOf(listsOf.filter((val)=>{
     return val._id!==id
    }))
  })
}

const updateDetails=(id)=>{
const newAge=prompt("enter the age:")
axios.put("http://localhost:8000/update",{newAge:newAge,id:id})
}

const addClick=()=>{
axios.post('http://localhost:8000/add',{name:name,age:age,description:desription}).then(()=>{
  // alert("yey.....this is worked")
  setListOf([...listsOf,{name:name,age:age,desription:desription}])
}).catch(()=>{
  alert("!!!!!error")
})
}
useEffect(()=>{
  axios.get('http://localhost:8000/read').then((response)=>{
    console.log(response)
    setListOf(response.data)
  }).catch(()=>{
    console.log("err")
  })
},[])

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder="Name" onChange={e=>setName(e.target.value)} />
        <input type="number" placeholder="Age" onChange={e=>setAge(e.target.value)} />
        <input type="text" placeholder="description"onChange={e=>setDsecription(e.target.value)} />
        <button onClick={addClick}>Add</button>
      </div>
      <div className="listoffriends">
      {listsOf.map((val)=> {
        return(
          <div className="friendContainer">
            <div className="friends">
          <h3>Name:{val.name}</h3>
          <h3>Age:{val.age}</h3>
          <h3>Description:{val.description}</h3>
          </div>
          <div>
          <button onClick={(id)=>{updateDetails(val._id)}}>Update</button>
          <button onClick={(id)=>{deleteDetails(val._id)}}>x</button>
          </div>
         
          </div> 
        
          )
       
      }
      )}
      </div>
      
    </div>
  );
}

export default App;
