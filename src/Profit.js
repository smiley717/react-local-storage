import React from 'react';
import { useHistory } from "react-router-dom";

const Price = () => {
  let history = useHistory();
  let max = 0;
  const [dprofit, setProfit] = React.useState(0);
  const [price, setPrice] = React.useState(''); 
  const [count , setCount] = React.useState('');
  
  const [stockList, setStockList] = React.useState(
    JSON.parse(localStorage.getItem('stock')) || []
  );

  const [remainList, setRemainList] = React.useState([])

  stockList.map((item) => {
    max += parseInt(item.count);
  });
    
  React.useEffect(() => {
    if (count > max) {
      alert('Input sell count correctly!');
      return;
    }
    if(count>0){
    let n = count;
    let profit = 0;
    let sIndex = 0;
    while(n>0){
      n -= stockList[sIndex].count;
      profit += (price - stockList[sIndex].price) * stockList[sIndex].count
      sIndex++;
    }
    profit += n * (price - stockList[sIndex-1].price) ;
    let remain = [];
    for(let i=sIndex-1;i<stockList.length;i++){
      remain.push({...stockList[i]});
    }
    remain[0].count = -n;
    if(n==0){
      remain.pop();
    }
    setProfit(profit);
    setRemainList(remain);
    }
  }, [count]);

  const handleClickBack = ()=> {
    history.push('/');
  };


  return (
    <div>
      <h1>Set Price & Sell & Profit</h1>

      <h3>Set Stock Sell Price</h3>
      <p>
        <label>Price: </label>
        <input value={price} type="number" onChange={(event)=>{setPrice(event.target.value)}} />
      </p>

      <h3>Sell Stock by: {price}$ </h3>
      <p>
        <label>Count: </label>
        <input value={count} placeholder={"Max stocks to sell: " + max} type="number" onChange={(event)=>{setCount(event.target.value)}} />
      </p>

      <button onClick={handleClickBack}>back</button>

      <h2>Profit: {dprofit}$</h2>

      <h3>Remaining StockList</h3>
        <ul>
          {
            remainList.map((stockItem, index) => 
              <li key={index}>Price: {stockItem.price}, Count: {stockItem.count}, Date: {stockItem.date}</li>
            )
          }
        </ul>

      <h3>Stock List</h3>
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

export default Price;
