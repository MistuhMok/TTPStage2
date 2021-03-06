# TTPStage2

### Description

App deployed to: https://ttpstage2.herokuapp.com/

The user can do all of the following in the user stories as well as check the price of stocks individually, sell stocks with a negative quantity, and the portfolio and cash balances will update correctly.

The biggest issue is when there are more than 5 API calls in a minute, which can happen when there are too many stocks in a portfolio or checking the price of stocks too frequently.

---

### User Stories

---

✔️ 1. As a user, I want to create a new account with my name, email, and passwords that I can buy and trade stocks.

- [x] Default the user’s cash account balance to \$5000.00 USD.
- [x] A user can only register once with any given email.

✔️ 2. As a user, I want to authenticate via email and password so that I can access my account.

✔️ 3. As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the number of shares so that I can invest.

- [x] A user can only buy whole number quantities of shares.
- [x] A user can only buy shares if they have enough cash in their account for a given purchase.
- [x] A user can only buy shares if the ticker symbol is valid.

✔️ 4. As a user, I want to view a list of all transactions I’ve made to date (trades) so that I can perform an audit.

✔️ 5. As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance.

- [x] Current values should be based on the latest price and quantity owned for a given stock.
- [x] Each stock owned should only appear once.

✔️ 6. As a user, I’d like to see the font color of stock symbols and current prices in my portfolio change dynamically to indicate performance.

- [x] Display red when the current price is less than the day’s open price.
- [x] Display grey when the current price is equal to the day’s open price.
- [x] Display green when the current price is greater than the day’s open price.
