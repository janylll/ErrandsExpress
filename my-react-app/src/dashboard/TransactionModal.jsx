import React, { useState } from 'react';

function TransactionModal({ show, onClose, onSubmit, userType, adminInfo }) {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);

  if (!show) return null;

  const handleSubmit = () => {
    onSubmit({ accountName, accountNumber, amount, receiptFile });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Transaction Details</h3>

        {userType === 'runner' ? (
          <>
            <label>GCash/Maya Account Name:</label>
            <input value={accountName} onChange={(e) => setAccountName(e.target.value)} />

            <label>GCash/Maya Account Number:</label>
            <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />

            <label>Upload Receipt:</label>
            <input type="file" onChange={(e) => setReceiptFile(e.target.files[0])} />
          </>
        ) : (
          <>
            <p><strong>Send payment to:</strong></p>
            <p>GCash: {adminInfo.gcashNumber} - {adminInfo.name}</p>
            <p>Maya: {adminInfo.mayaNumber} - {adminInfo.name}</p>

            <label>Amount Sent:</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />

            <label>Upload Proof of Payment:</label>
            <input type="file" onChange={(e) => setReceiptFile(e.target.files[0])} />
          </>
        )}

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TransactionModal;
