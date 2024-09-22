import './App.css';
import {useEffect, useState} from "react"; 
function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]); 
  useEffect(()=>{
    getTransactions().then(setTransactions) 

    })

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions'
    const response = await fetch(url); 
    return await response.json(); 
  }
  function addTransaction(ev) {
    ev.preventDefault(); 
    const url = process.env.REACT_APP_API_URL + '/transaction';

    const price = name.split(' ')[0];
  
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({
        price, 
        name:name.substring(price.length+1),            
        description, 
        datetime,
      })
    })
    .then(response => response.json())  
    .then(json => {
      setName(''); 
      setDateTime(' ');
      setDescription('')
      console.log('result', json);  
    })
    .catch(error => {
      console.error('Error:', error); 
    });
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  
  balance = balance.toFixed(2); // Correct use of toFixed to format with 2 decimal places
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ${balance}<span className="text-xl text-gray-600"></span>
      </h1>

        <form onSubmit = {addTransaction}className="mb-8">
          <div className="mb-4">
            <input 
              type="text" 
              value={name}
              onChange = {ev => setName(ev.target.value)} //update the name state
              placeholder={'+200 new samsung tv'} 
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />

            <input 
              type="datetime-local" 
              value = {datetime}
              onChange = {ev => setDateTime(ev.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <input 
              type="text" 
              value={description}
              onChange = {ev => setDescription(ev.target.value)}
              placeholder={'description'} 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
          >
            Add new transaction
          </button>
        </form>

        <div className="transactions space-y-4">
  {transactions.length > 0 && transactions.map(transaction => (
    <div className="transaction bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between" key={transaction._id}>
      <div className="left">
        <div className="name text-lg font-bold">{transaction.name}</div>
        <div className="description text-sm text-gray-600">{transaction.description}</div>
      </div>
      <div className="right text-right">
        {console.log(transaction.price)}
        {/* Correct the ternary logic for dynamic class based on price */}
        <div className={`price text-lg font-bold ${transaction.price < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {transaction.price}
        </div>
        <div className="datetime text-sm text-gray-500">{transaction.datetime}</div>
      </div>
    </div>
  ))}
</div>

      </div>
    </main>
  );
}

export default App;
