// Transaction utility functions
export const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit': return 'savings';
    case 'withdrawal': return 'emergency';
    case 'bill_payment': return 'bills';
    case 'group_contribution': return 'community';
    case 'goal_contribution': return 'goals';
    default: return 'savings';
  }
};

export const getTransactionColor = (type: string) => {
  switch (type) {
    case 'deposit': return '#228B22';
    case 'withdrawal': return '#FF4040';
    case 'bill_payment': return '#87CEEB';
    case 'group_contribution': return '#FFD700';
    case 'goal_contribution': return '#228B22';
    default: return '#87CEEB';
  }
};

export const formatTransactionAmount = (transaction: { type: string; amount: number }) => {
  const isCredit = transaction.type === 'deposit' || transaction.type === 'goal_contribution';
  const sign = isCredit ? '+' : '-';
  return `${sign}₦${transaction.amount.toLocaleString()}`;
};

export const getTransactionDisplayName = (transaction: { type: string; description: string }) => {
  // Use description if available, otherwise format the type
  if (transaction.description) {
    return transaction.description;
  }
  
  switch (transaction.type) {
    case 'deposit': return 'Savings Deposit';
    case 'withdrawal': return 'Withdrawal';
    case 'bill_payment': return 'Bill Payment';
    case 'group_contribution': return 'Group Contribution';
    case 'goal_contribution': return 'Goal Contribution';
    default: return 'Transaction';
  }
};
