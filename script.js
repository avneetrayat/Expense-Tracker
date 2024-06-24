const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const expenseText = document.getElementById('expense-text');
const amount = document.getElementById('amount');
const total = document.getElementById('total');

let expenses = [];


expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    
    const expenseValue = expenseText.value.trim();
    const amountValue = amount.value.trim();

    if (expenseValue === '' || amountValue === '') {
        alert('Please enter both expense and amount');
        return;
    }

    if (isNaN(amountValue) || +amountValue <= 0) {
        alert('Please enter a valid positive number for amount');
        return;
    }

    
    const expense = {
        id: generateID(),
        text: expenseValue,
        amount: +amountValue
    };

    
    expenses.push(expense);
    addExpenseToList(expense);
    updateTotal();

    
    expenseText.value = '';
    amount.value = '';
});


expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.id;

        
        expenses = expenses.filter(expense => expense.id !== id);

        
        event.target.parentElement.remove();

        
        updateTotal();
    }
});


function addExpenseToList(expense) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerHTML = `
        ${expense.text}: $${expense.amount.toFixed(2)}
        <button class="delete-btn" data-id="${expense.id}">X</button>
    `;
    expenseList.appendChild(listItem);
}


function updateTotal() {
    const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    total.textContent = totalAmount.toFixed(2);
}


function generateID() {
    return Math.random().toString(36).substr(2, 9);
}
