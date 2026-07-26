import './App.css'
import { useState } from 'react';


const App = () => {


  const [items, setItems] = useState([
    { id: 2, name: 'Milk', status: 'Buy' },
    { id: 1, name: 'Bread', status: 'Buy' },
    { id: 4, name: 'Jam', status: 'Buy' },
    { id: 3, name: 'Eggs', status: 'Buy' }
  ]);

  const onItemClick = (index) => {



    // console.log('Item clicked:', items[index]);

    if(items[index].status === 'Buy'){

      const updatedItems = [...items];

      updatedItems[index].status = 'Done';
      setItems(updatedItems);
    }
    
    

  }

  const onItemDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();


    
    const formData = new FormData(e.target);
    
    const name = formData.get('item-name');
    const status = 'Buy';
    const id = getMaxRecordId() + 1;

    if(name){
      const record = { id, name, status };
      const updatedList = [...items, record];
      setItems(updatedList);
    }

    e.target.reset();
  }

  const getMaxRecordId = () => {
    if(items.length === 0){
      return 0;
    }else{
      const sortedItems = items.sort((a, b) => {
        return a.id - b.id;
      });
      return sortedItems[sortedItems.length - 1].id;
    }

  }

  return <>
    <ul className='g-list'>
      <li>
        <form onSubmit={onFormSubmit}>
          <input type="text" name='item-name' placeholder='Add Item' />
          <button type='submit'>Add</button>
        </form>
      </li>
      {items.map((item, index) => (
        <li className={`g-item ${item.status === 'Done' && 'item-done'}`} key={item.id}>
          
          {item.name} 
            <div>
              {item.status === 'Buy' ? <span className='buy' onClick={()=>{onItemClick(index)}} >{item.status}</span> : <span className='buy-done'>{item.status}</span>}
              {item.status === 'Buy' && <span className='delete' onClick={()=>{onItemDelete(index)}} >Delete</span>}
            </div>
          </li>
      ))}
    </ul>
  </>

}




/*

function App() {

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <main className="student-page">
      <section className="student-shell">

        <button onClick={incrementCount}>Count: {count}</button>
      </section>
    </main>
  )
}

*/

export default App
