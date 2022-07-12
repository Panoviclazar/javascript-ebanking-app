"use-strict";

// All dom elements

// Buttons
const loginBtn = document.querySelector(".login__btn");
const transferBtn = document.querySelector(".form__btn__transfer");
const loanBtn = document.querySelector(".form__btn__loan");
const closeBtn = document.querySelector(".form__btn__close");
const slider = document.querySelector(".slider");

// Labels
const labelWelcome = document.querySelector(".welcome__message");
const labelBalance = document.querySelector(".total__balance__value");
const labelIncomes = document.querySelector(".total__incomes__value");
const labelOutcomes = document.querySelector(".total__out__value");
const labelTime = document.querySelector(".time__and__date");
const labelCreditName = document.querySelector(".credit__card__holder");
const labelExpirationDate = document.querySelector(
  ".credit__card__expiration__date"
);
const labelCardNumber = document.querySelector(".credit__card__number");
const labelCreator = document.querySelector(".creator");
const logo = document.querySelector(".fa-landmark");

// Containers
const main = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

// Inputs
const inputLoginUsername = document.querySelector(".login__input__user");
const inputLoginPin = document.querySelector(".login__input__pin");
const inputTransferTo = document.querySelector(".form__input__to");
const inputTransferAmount = document.querySelector(".form__input__amount");
const inputLoanAmount = document.querySelector(".form__input__loan__amount");
const inputCloseUsername = document.querySelector(".form__input__user");
const inputClosePin = document.querySelector(".form__input__pin");

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// App info

const account1 = {
  owner: "Petar Petrovic",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  pin: 1111,
  expirationDate: "07/25",
  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-02-01T10:17:24.185Z",
    "2022-04-08T14:11:59.604Z",
    "2022-05-26T17:01:17.194Z",
    "2022-06-28T23:36:17.929Z",
    "2022-07-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "hr-HR",
  cardNumber: "8571 1354 5005 9018",
};

const account2 = {
  owner: "Marija Markovic",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  expirationDate: "10/27",
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-06T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
  cardNumber: "2054 0178 3345 4021",
};

const accounts = [account1, account2];

// App functionality

// Display movements date

const displayMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Making currency function

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// Display movements function

const displayMovements = function (acc) {
  containerMovements.innerHTML = ``;

  const moves = acc.movements;
  moves.forEach(function (move, i) {
    const type = move > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDates = displayMovementsDate(date, acc.locale);

    const formattedMov = formatCur(move, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type__${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDates}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Display balance, summaries, credit card infos and welcome message functions

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((cur, acu) => cur + acu);
  labelBalance.textContent = `$${Math.round(acc.balance).toFixed(2)}`;
};

const displaySummaries = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((cur, acu) => cur + acu);
  labelIncomes.textContent = `$${Math.trunc(incomes).toFixed(2)}`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((cur, acu) => cur + acu);
  labelOutcomes.textContent = `$${Math.trunc(outcomes).toFixed(2)}`;
};

const displayCreditCardInfo = function (acc) {
  const cardExp = acc.expirationDate;
  const cardHolder = acc.owner;
  const cardNumber = acc.cardNumber;
  labelCardNumber.textContent = cardNumber;
  labelCreditName.textContent = cardHolder;
  labelExpirationDate.textContent = cardExp;
};

const displayWelcomeMessage = function (acc) {
  let message;
  if (acc.owner === "Marija Markovic") message = "Welcome back";
  if (acc.owner === "Petar Petrovic") message = "Dobrodošao nazad";
  labelWelcome.textContent = `${message}, ${acc.owner.split(" ")[0]}`;
};

// Creating usernames

let currentAcc;

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ")[0];
  });
};
createUsernames(accounts);

// Update user interface function


const updateUi = function (acc) {
  displayBalance(acc);
  displaySummaries(acc);
  displayCreditCardInfo(acc);
  displayMovements(acc);
};

// Log in functionality

loginBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent page reload after submiting

  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  ); // username verification

  if (currentAcc?.pin === +inputLoginPin.value) { // pw verification
    displayWelcomeMessage(currentAcc); // welcome message
    main.style.display = "flex"; // display all the content
    labelCreator.style.display = "block"; // display all the content
    main.style.margin = "40px auto";
    labelTime.style.opacity = 1; // display time and date

    setInterval(function () {
      labelTime.innerHTML = "";
      labelTime.innerHTML = Intl.DateTimeFormat(currentAcc?.locale, {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date());
    }, 0.5); // live time and date

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    updateUi(currentAcc); // current user interface
  }
});

// Money transfer

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.round(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  ); // receiver username verification

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    amount < currentAcc.balance &&
    receiverAcc &&
    receiverAcc?.username !== currentAcc.username
  ) {
    currentAcc.movements.push(-amount); // transfer mooney from current acc
    receiverAcc.movements.push(amount); // add mooney to receiver acc

    currentAcc.movementsDates.push(new Date().toISOString()); // current acc new dates fot movements
    receiverAcc.movementsDates.push(new Date().toISOString()); // receiver acc new dates for movements

    updateUi(currentAcc);
  }
});

// Money loan from bank

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.round(inputLoanAmount.value);

  if (amount > 0 && amount * 5 < currentAcc.balance) { // approval conditions
    setTimeout(function () {
      currentAcc.movements.push(amount); // adding mooney to current acc
      currentAcc.movementsDates.push(new Date().toISOString());
      updateUi(currentAcc);
    }, 2500);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// Permanent closing bank account

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAcc.username === inputCloseUsername.value &&
    currentAcc.pin === +inputClosePin.value
  ) { // username and pw verification
    const index = accounts.findIndex(
      (acc) => currentAcc.username === acc.username
    ); // acc verification

    accounts.splice(index, 1); // deleting acc from accs list

    main.style.display = 'none'; // close all the content and back to main log in page
    labelCreator.style.display = 'none';
    main.style.margin = "70px auto";
    labelTime.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = "";
  inputClosePin.blur();
});

// light-dark mode

const body = document.body;

slider.addEventListener("click", () => {
  body.classList.toggle("dark__mode__body");
  labelWelcome.classList.toggle("dark__mode__body");
  labelTime.classList.toggle("dark__mode__body");
  logo.classList.toggle("dark__mode__body");
  labelCreator.classList.toggle("dark__mode__body");
  loginBtn.classList.toggle("dark__mode__body");
});
