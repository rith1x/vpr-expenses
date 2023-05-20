//1
const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-plus"
);
const money_minus = document.getElementById(
  "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const site = document.getElementById("site");
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

//last 
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions1'));

let transactions = localStorage.getItem('transactions1') !== null ? localStorageTransactions : [];

//5
//Add Transaction
function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add text and amount')
  }else{
    const transaction = {
      id:generateID(),
      date:date.value,
	  site:site.value,
      text:text.value,
      amount:+amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    date.value='';
	site.value='';
    text.value='';
    amount.value='';
  }
}


//5.5
//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//2

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );

  item.innerHTML = `
    ${transaction.date} ${transaction.site} ~ ${transaction.text} <span>${sign} Rs ${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}

//4

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText= `Rs ${total}`;
    money_plus.innerText = `Rs ${income}`;
    money_minus.innerText = `Rs ${expense}`;
}


//6 

//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions1',JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener('submit',addTransaction);
