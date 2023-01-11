import './App.css';
import {useState, useRef, useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState();
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [edit, setEdit] = useState(false);
  const [myIndex, setMyIndex] = useState('');
  const focusRef = useRef(null)

  useEffect(() => {
    if(edit){
       focusRef.current.focus()
    }
  }, [edit])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(value && edit){
      list.splice(myIndex, 0, value);
      setEdit(false);
      setValue(''); 
    }
    else if (value) {
      setList([...list, value]);
      setValue('');
      setAdded(true);
      setTimeout(() => {
        setAdded(false)
      }, 2000);
      
    }
  }

  const handleChangedInput = (e) => {
    setValue(e.target.value)
  }

  const removeItem = (id) => {
    const newList= list.filter((item, index) => index !== id )
    setList(newList);
    setRemoved(true);
      setTimeout(() => {
        setRemoved(false)
      }, 2000);
    
  }

  const editItem = (id) => {
    setEdit(true);
    setList(list.filter((item) => item !== list[id]))  ;
    setValue(list[id]);
    setMyIndex(id)
    
  }

  const clearList = () => {
    setList([]);
  }
  
  return (
    <main>
      <div className= 'card'>
        <div className= 'added'>{added && 'Item added'}</div>
        <div className= 'removed'>{removed && 'Item removed'}</div>
        
        <h2>Grocery List</h2>
    
        <form onSubmit= {handleSubmit}>
          <input 
            ref= {focusRef}
            type= 'text' 
            placeholder= 'Enter Item' 
            value= {value}
            onChange= {handleChangedInput}
          />
          <button type= 'submit'>{edit ? 'edit' : 'Add Item'}</button>
        </form>
        
        <div className= 'items'>
          {list.map((item, index) => {
          return(
            <div 
              className= 'list-item' 
              key={index}
              >
              {item}
              <span>
                <MdDelete className= 'del' onClick= {() => {removeItem(index)}}/>
                <TbEdit className= 'edit' onClick= {() => {editItem(index)}}/>
              </span>
            </div>
          )
              })}
            </div>

          <div><span className= 'clear' onClick= {clearList}>Clear List</span></div>
        
      </div>
    </main>
  )
}

export default App;
