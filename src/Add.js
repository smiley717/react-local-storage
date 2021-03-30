import React from 'react';
import { useHistory } from "react-router-dom";

const Add = () => {
  let history = useHistory();
  const [price, setPrice] = React.useState(''); 
  const [count , setCount] = React.useState('');
  const [stockList, setStockList] = React.useState(
    JSON.parse(localStorage.getItem('stock')) || []
  );

  const handleClickSave = () => {
    if(!price || !parseInt(price) > 0) {
      alert('Please insert the price of the stock correctly.');
      return;
    }
    if(!count || !parseInt(count) > 0) {
      alert('Please insert the count of the stock correctly.');
      return;
    }

    const stock = [
      {
        price: price,
        count: count,
        date: new Date().getTime()
        
      }
    ]

    let get_stock = JSON.parse(localStorage.getItem('stock'));
    if (get_stock) {
      let flag = false;
      get_stock.map((item) => {
        if (item.price === stock[0].price) {
          item.count = Number(item.count) + Number(stock[0].count);
          flag = true;
          return;
        }
      })

      if (!flag) {
        get_stock.push(stock[0]);
      }
        localStorage.setItem('stock', JSON.stringify(get_stock));
        setStockList(get_stock);
    } else {
      localStorage.setItem('stock', JSON.stringify(stock));
      setStockList(stock);
    }
  }

  const handleClickNext = () => {
    history.push('/profit');
  }
  return (
    <div>
      <h1>Add Stock!</h1>
      <p>
        <label>Price: </label>
        <input value={price} type="number" onChange={(event)=>{setPrice(event.target.value)}} />
      </p>
      <p>
        <label>Count: </label>
        <input value={count} type="number" onChange={(event)=>{setCount(event.target.value)}} />
      </p>
      
      <button onClick={handleClickSave}>Add</button>&nbsp;&nbsp;
      <button onClick={handleClickNext}>Next</button>

      <h1>Stock List</h1>
        <ul>
          {
            stockList.map((stockItem, index) => 
              <li key={index}>Price: {stockItem.price}, Count: {stockItem.count}, Date: {stockItem.date}</li>
            )
          }
        </ul>
    </div>
  );
};

export default Add;
