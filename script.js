let items = [];

function addItem() {
  const itemName = document.getElementById('itemName').value.trim();
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);

  if (!itemName || itemQuantity <= 0 || itemPrice <= 0) {
    alert('Please enter valid item details!');
    return;
  }

  const itemTotal = itemQuantity * itemPrice;
  items.push({ itemName, itemQuantity, itemPrice, itemTotal });

  renderTable();
  clearForm();
}

function renderTable() {
  const tbody = document.getElementById('itemTable').querySelector('tbody');
  tbody.innerHTML = '';

  items.forEach((item, index) => {
    const row = `<tr>
      <td>${item.itemName}</td>
      <td>${item.itemQuantity}</td>
      <td>$${item.itemPrice.toFixed(2)}</td>
      <td>$${item.itemTotal.toFixed(2)}</td>
      <td><button onclick="deleteItem(${index})">Delete</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function deleteItem(index) {
  items.splice(index, 1);
  renderTable();
}

function clearForm() {
  document.getElementById('itemName').value = '';
  document.getElementById('itemQuantity').value = '';
  document.getElementById('itemPrice').value = '';
}

function generateInvoice() {
  const businessName = document.getElementById('businessName').value.trim();
  const customerName = document.getElementById('customerName').value.trim();
  const invoiceDate = document.getElementById('invoiceDate').value;
  const gstNumber = document.getElementById('gstNumber').value.trim();
  const gstRate = parseFloat(document.getElementById('gstRate').value);

  if (!businessName || !customerName || !invoiceDate || !gstNumber) {
    alert('Please fill out business and customer details!');
    return;
  }

  let subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  let gstAmount = subtotal * (gstRate / 100);
  let grandTotal = subtotal + gstAmount;

  let output = `
    <div class="invoice-header">
      <h2>Invoice</h2>
      <p><strong>Business Name:</strong> ${businessName}</p>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Date:</strong> ${invoiceDate}</p>
      <p><strong>GST Number:</strong> ${gstNumber}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>`;

  items.forEach(item => {
    output += `
      <tr>
        <td>${item.itemName}</td>
        <td>${item.itemQuantity}</td>
        <td>$${item.itemPrice.toFixed(2)}</td>
        <td>$${item.itemTotal.toFixed(2)}</td>
      </tr>`;
  });

  output += `
      </tbody>
    </table>

    <div class="invoice-summary">
      <h3>Subtotal: $${subtotal.toFixed(2)}</h3>
      <h3>GST (${gstRate}%): $${gstAmount.toFixed(2)}</h3>
      <h2>Grand Total: $${grandTotal.toFixed(2)}</h2>
    </div>
  `;

  document.getElementById('invoiceOutput').innerHTML = output;
}
