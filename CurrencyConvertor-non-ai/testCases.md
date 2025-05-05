
## 11. Test Cases

### Test Case 1: Basic Currency Conversion
**Description**: Verify basic currency conversion functionality
**Steps**:
1. Select USD as source currency
2. Select EUR as target currency
3. Enter amount: 100
4. Click convert button
**Expected Result**: 
- Conversion result should be displayed
- Result should be a positive number
- Result should match current exchange rate
- History should be updated with this conversion

### Test Case 2: Input Validation
**Description**: Verify input validation for different scenarios
**Steps**:
1. Try to enter non-numeric characters
2. Try to enter negative numbers
3. Try to enter very large numbers
4. Try to leave input empty
**Expected Result**:
- Non-numeric input should be prevented
- Negative numbers should be prevented
- Large numbers should be handled properly
- Empty input should show appropriate error message

### Test Case 3: Currency Selection
**Description**: Verify currency selection functionality
**Steps**:
1. Click on source currency dropdown
2. Select different currencies
3. Click on target currency dropdown
4. Select different currencies
**Expected Result**:
- Dropdown should open properly
- All major currencies should be available
- Country flags should display correctly
- Currency codes should be accurate

### Test Case 4: History Functionality
**Description**: Verify history tracking and display
**Steps**:
1. Perform multiple conversions
2. Check history section
3. Verify history entries
4. Try to clear history
**Expected Result**:
- All conversions should be recorded
- History should show correct timestamps
- History should show correct amounts
- Clear history should remove all entries

### Test Case 5: Error Handling
**Description**: Verify error handling for various scenarios
**Steps**:
1. Disconnect internet connection
2. Enter invalid API response
3. Try to convert with invalid data
4. Check error messages
**Expected Result**:
- Network errors should be handled gracefully
- Invalid API responses should show proper error
- Invalid data should show appropriate messages
- Error messages should be user-friendly
