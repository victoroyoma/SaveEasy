# SaveEasy Mock Banking Functions - Complete Guide

## Overview
The SaveEasy app now includes comprehensive mock banking functions for withdrawal, deposit, savings, and group operations. These functions simulate realistic banking scenarios for investor demonstrations and testing.

## Core Banking Functions

### 1. DEPOSIT FUNCTIONS

#### Basic Deposit (`mockApi.savings.deposit`)
```typescript
// Basic deposit to savings account
const result = await mockApi.savings.deposit(5000); // ₦5,000 deposit
const result = await mockApi.savings.deposit(3000, 'goal-id'); // Deposit to specific goal
```

#### Enhanced Realistic Deposit (`mockApi.enhanced.simulateRealisticDeposit`)
```typescript
// More realistic deposit with source tracking
const result = await mockApi.enhanced.simulateRealisticDeposit(
  10000,           // Amount
  'salary',        // Source: 'salary' | 'freelance' | 'business' | 'gift' | 'bonus'
  'goal-id'        // Optional goal ID
);
```

**Features:**
- Variable processing delays (1.2-2.0 seconds)
- Daily deposit limits (₦100,000 max)
- Source-specific transaction descriptions
- Smart payment method selection (bank transfer for large amounts)
- Unique transaction IDs with source prefixes

### 2. WITHDRAWAL FUNCTIONS

#### Basic Withdrawal (`mockApi.savings.withdraw`)
```typescript
// Basic savings withdrawal
const result = await mockApi.savings.withdraw(2000, 'Emergency medical expense');
```

#### Enhanced Secure Withdrawal (`mockApi.enhanced.simulateSecureWithdrawal`)
```typescript
// Secure withdrawal with PIN verification
const result = await mockApi.enhanced.simulateSecureWithdrawal(
  5000,           // Amount
  'emergency',    // Purpose: 'emergency' | 'investment' | 'education' | 'business' | 'bills' | 'family'
  true            // Require PIN verification
);
```

**Security Features:**
- PIN verification for amounts > ₦10,000
- Daily withdrawal limits (₦50,000 max)
- Balance validation against mock balance (₦75,000)
- Extended processing time for security checks
- Purpose-specific transaction categories

#### Emergency Fund Access (`mockApi.savings.accessEmergencyFund` & `mockApi.enhanced.simulateEmergencyAccess`)
```typescript
// Basic emergency access
const result = await mockApi.savings.accessEmergencyFund(3000, 'Hospital bill payment');

// Enhanced emergency access with urgency levels
const result = await mockApi.enhanced.simulateEmergencyAccess(
  4000,               // Amount
  'medical',          // Type: 'medical' | 'job_loss' | 'family_crisis' | 'natural_disaster' | 'vehicle_breakdown'
  'critical'          // Urgency: 'low' | 'medium' | 'high' | 'critical'
);
```

**Emergency Features:**
- Emergency-type specific limits (Medical: ₦15,000, Vehicle: ₦5,000, etc.)
- Urgency-based processing times (Critical: 0.5s, Low: 3s)
- Immediate fund availability
- Priority transaction processing

### 3. SAVINGS GROUP FUNCTIONS

#### Basic Group Operations (`mockApi.groups`)
```typescript
// Join a savings group
const result = await mockApi.groups.joinGroup('group-id');

// Create a new group
const result = await mockApi.groups.createGroup({
  name: 'Tech Professionals',
  contributionAmount: 2000,
  frequency: 'monthly'
});

// Make group contribution
const result = await mockApi.groups.contribute('group-id', 1000);
```

#### Enhanced Group Joining (`mockApi.enhanced.simulateGroupJoining`)
```typescript
// Smart group joining with realistic approval process
const result = await mockApi.enhanced.simulateGroupJoining(
  'professional'    // Type: 'professional' | 'community' | 'family' | 'business' | 'student'
);
```

**Group Features:**
- Group-type specific templates and success rates
- Realistic approval process simulation
- Automatic group capacity checks
- Variable contribution amounts based on group type
- Detailed group information return

## Quick Demo Functions

### Available in `quickInvestorDemo`

#### Basic Quick Demos
```typescript
// Quick savings deposit
await quickInvestorDemo.quickSavings(actions, 5000);

// Quick withdrawal
await quickInvestorDemo.quickWithdrawal(actions, 2000);

// Quick emergency access
await quickInvestorDemo.quickEmergency(actions, 3000);

// Quick group joining
await quickInvestorDemo.quickGroupJoin(actions);
```

#### Enhanced Quick Demos
```typescript
// Enhanced realistic deposit
await quickInvestorDemo.quickEnhancedDeposit(actions, 5000, 'salary');

// Enhanced secure withdrawal
await quickInvestorDemo.quickEnhancedWithdrawal(actions, 3000, 'emergency');

// Enhanced emergency access
await quickInvestorDemo.quickEmergencyAccess(actions, 4000, 'medical');

// Enhanced group joining
await quickInvestorDemo.quickEnhancedGroupJoin(actions, 'professional');
```

## UI Integration

### Demo Center Buttons
The `DemoCenter` component includes buttons for all functions:

1. **Core Banking Functions**
   - Save Money (₦5,000 deposit)
   - Withdraw (₦2,000 withdrawal)
   - Emergency Fund (₦3,000 access)
   - Join Group (Professional network)

2. **Enhanced Banking Functions**
   - Enhanced Deposit (Realistic salary deposit)
   - Secure Withdrawal (PIN-protected withdrawal)
   - Emergency Access (Medical emergency fund)
   - Smart Group Join (Professional network with approval)

### Page-Level Integration

#### SavingsPage.tsx
- `handleSaveMoney()` - Uses `mockApi.savings.deposit`
- `handleWithdrawal()` - Uses `mockApi.savings.withdraw`
- Withdrawal modal with reason selection
- Success/error notifications

#### GroupSavingsPage.tsx
- `handleJoinGroup()` - Uses `mockApi.groups.joinGroup`
- Group selection modal
- Joining fee simulation
- Member notification system

#### Dashboard.tsx
- `handleQuickDeposit()` - Quick ₦500 deposit
- `handleQuickWithdraw()` - Quick ₦500 withdrawal
- Emergency fund access button

## Error Handling & Validation

### Common Error Scenarios
1. **Invalid Amounts** - Amounts ≤ 0 rejected
2. **Insufficient Funds** - Balance validation
3. **Daily Limits** - Deposit/withdrawal limits enforced
4. **Group Capacity** - Full groups reject new members
5. **Emergency Limits** - Type-specific emergency fund limits

### Success Patterns
- Realistic processing delays
- Transaction ID generation
- Notification system integration
- User balance updates
- Transaction history logging

## Testing & Demonstration

### For Investor Presentations
1. Use Enhanced Demo functions for most realistic experience
2. Demonstrate both success and failure scenarios
3. Show security features (PIN verification, limits)
4. Highlight group savings social features
5. Show real-time notifications and balance updates

### For Development Testing
1. Use basic mock functions for simple testing
2. Test error scenarios with invalid inputs
3. Verify UI state updates after transactions
4. Check notification system integration
5. Validate transaction history accuracy

## Configuration

### Adjustable Parameters
- Processing delays (in mockApi.ts)
- Daily limits (in enhanced functions)
- Group success rates (in simulateGroupJoining)
- Emergency fund limits (per emergency type)
- Mock balance amounts (for withdrawal validation)

This comprehensive mock system provides realistic banking simulation suitable for both investor demonstrations and development testing, with graduated complexity from basic functions to enhanced realistic scenarios.
