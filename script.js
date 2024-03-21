let items = [];

function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemAmount = parseFloat(document.getElementById('item-amount').value);

  if (itemName && !isNaN(itemAmount)) {
    const category = itemAmount >= 0 ? 'income' : 'expense';
    const newItem = { name: itemName, amount: Math.abs(itemAmount), category };

    items.push(newItem);
    updateUI();
  }

  document.getElementById('item-name').value = '';
  document.getElementById('item-amount').value = '';
}

function updateUI() {
  updateCategory('income', 'income-list', 'total-income');
  updateCategory('expense', 'expenses-list', 'total-expenses');

  const totalIncome = calculateTotal('income');
  const totalExpenses = calculateTotal('expense');

  document.getElementById('balance').textContent = (totalIncome - totalExpenses).toFixed(2);
}

function updateCategory(category, listId, totalId) {
  const categoryItems = items.filter(item => item.category === category);
  const list = document.getElementById(listId);
  const total = document.getElementById(totalId);

  list.innerHTML = '';
  let categoryTotal = 0;

  categoryItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.amount.toFixed(2)}</span>
      <button onclick="removeItem(${items.indexOf(item)})">Remove</button>
    `;

    categoryTotal += item.amount;
    list.appendChild(listItem);
  });

  total.textContent = categoryTotal.toFixed(2);
}

function removeItem(index) {
  items.splice(index, 1);
  updateUI();
}

function calculateTotal(category) {
  return items.filter(item => item.category === category)
              .reduce((total, item) => total + item.amount, 0);
}

// Initial UI update
updateUI();
