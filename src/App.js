import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount:amount});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items, response.data]);
        setAmount(items => [...items, response.data]);
        setItem('');
        setAmount('');
        console.log(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = items.filter((item) => item.id !== id);
        setItems(newListWithoutRemoved);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  return (
    <div className='container'>
      <form onSubmit={save}>
        <div>
        <h2>Shopping List</h2>
        </div>
        <label>New item </label>
        <input value={item} placeholder="Type description" onChange={e => setItem(e.target.value)}/>&nbsp;
        <input value={amount} placeholder="Type amount" onChange={e => setAmount(e.target.value)}/>&nbsp;
        <button>Add</button>
      </form>
      <ul>
        {items?.map(item => (
          <li key={item.id}>{item.description} {item.amount}&nbsp;<a href="#" className="delete" onClick={() => remove(item.id)}>Delete</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
