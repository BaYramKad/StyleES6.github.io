'use strict';
let incomeAmount = document.querySelector(".income-amount"),
    expensesTitle = document.querySelector(".expenses-title"),
    expensesAmount = document.querySelector(".expenses-amount"),
    incomeTitle = document.querySelector(".income-title"),
    data = document.querySelector(".data"),
    inp = data.querySelectorAll("input"),
    inputAll = document.querySelectorAll("input"),
    expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items"),
    addExpItem = document.querySelector(".additional_expenses-item"),
    targetAmout = document.querySelector(".target-amount"),
    checkbox = document.querySelector(".deposit-checkmark"),
    depositCheck = document.querySelector("#deposit-check"),
    income = document.querySelector(".income"),
    expenses = document.querySelector(".expenses"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    salaryAmount = document.querySelector(".salary-amount"),
    incomeBtnPlus = income.getElementsByTagName("button")[0],
    expensesBtnPlus = expenses.getElementsByTagName("button")[0],
    budGetDay = document.getElementsByClassName("budget_day-value")[0],
    expensesMonth = document.getElementsByClassName("expenses_month-value")[0],
    additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
    addExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
    incomePeriod = document.getElementsByClassName("income_period-value")[0],
    targetMonth = document.getElementsByClassName("target_month-value")[0],
    periodSelect = document.getElementsByClassName("period-select")[0],
    budgetMunth = document.querySelector(".budget_month-value"),
    periodAmount = document.querySelector(".period-amount"),
    buttonStart = document.getElementById("start"),
    cancel = document.querySelector("#cancel");
    
buttonStart.style.backgroundColor = "#0c1d71";

const AppData = function(){
    this.cloneIncome;
    this.cloneExpenses;
    this.amountSelect;
    this.amuntValue;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
}

AppData.prototype.reset = function(){
    inputAll = document.querySelectorAll("input");
    inputAll.forEach(item => {
        item.removeAttribute("readonly");
        item.style.backgroundColor = "rgba(255, 127, 99, 0)";
        item.value = "";
    });
    for (let i = 0; i < incomeItems.length; i++){
        if (i > 0){
            incomeItems[i].remove();
        }
        incomeBtnPlus.style.display = "inline-block";
    }
    for (let i = 0; i < expensesItems.length; i++){
        if (i > 0){
            expensesItems[i].remove();
        }
        expensesBtnPlus.style.display = "inline-block";
    }
    depositCheck.checked = false;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.budget = 0;
    this.addExpenses = [];
    this.addIncome = [];
    this.expenses = {};
    this.income = {};
    this.expensesMonth = 0;
    periodSelect.value = 0;
    periodAmount.textContent = 1;
    incomePeriod.value = 0;
    this.amountSelect = 0;
    this.amuntValue = 0;
    periodSelect.addEventListener("input", function(){
        if (salaryAmount.value !== ""){
            let resultAmount = 0;
            incomePeriod.value = +resultAmount;
        } else if (salaryAmount.value === ""){
            periodSelect.disabled = false;
        }
    });
    if (salaryAmount.value === "") {
        buttonStart.disabled = true;
    }else {
        buttonStart.disabled = false;
    }
    buttonStart.style.display = "inline-block";
    cancel.style.display = "none";
};

AppData.prototype.start = function() {
    this.budget = salaryAmount.value.replace(/[^0-9]+/g, "");
    this.getBudget();
    this.getAddIncome();
    this.getAddExpenses();
    this.getexpenses();
    this.getExpensesMonth();
    this.getIncome();
    this.showResult();
    inputAll = document.querySelectorAll("input");
    inputAll.forEach(item => {
        item.setAttribute("readonly", null);
        item.style.backgroundColor = "#dadada";
    });
    buttonStart.style.display = "none";
    cancel.style.display = "inline-block";
    periodSelect.disabled = false;
    incomeBtnPlus.style.display = "none";
    expensesBtnPlus.style.display = "none";
};

AppData.prototype.addExpensesBlock = function(){
    this.cloneExpenses = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(this.cloneExpenses, expensesBtnPlus);
    inp = data.querySelectorAll("input");
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3){
        expensesBtnPlus.style.display = "none";
    }
};

AppData.prototype.getexpenses = function(){
    let _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector(".expenses-title").value;
        let cashExpenses = item.querySelector(".expenses-amount").value;
        if(itemExpenses !== "" && cashExpenses !== ""){
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function(){
    console.log(this);
    this.cloneIncome = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(this.cloneIncome, incomeBtnPlus);
    inp = data.querySelectorAll("input");
    incomeItems = document.querySelectorAll(".income-items");
    if(incomeItems.length === 3){
        incomeBtnPlus.style.display = "none";
    }
};

AppData.prototype.getIncome = function(){
    let _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector(".income-title").value;
        let cashIncome = item.querySelector(".income-amount").value;
        if(itemIncome !== "" && cashIncome !== ""){
            _this.income[itemIncome] = +cashIncome;
        }
    });
};

AppData.prototype.showResult = function(){
    let _this = this;
    budgetMunth.value = this.budget;
    expensesMonth.value = this.expensesMonth;
    budGetDay.value = Math.ceil(this.budgetDay);
    addExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = +this.budgetMonth;
    periodSelect.addEventListener("input", function(){
        if (salaryAmount.value !== ""){
            let resultAmount = _this.budgetMonth * +_this.amuntValue;
            incomePeriod.value = +resultAmount;
        } else if (salaryAmount.value === ""){
            periodSelect.disabled = false;
        }
    });
};

AppData.prototype.getAddExpenses = function(){
    let _this = this;
    let addExpenses = addExpItem.value.split(", ");
    addExpenses.forEach(function(item){
        item = item.replace(/[^,a-zА-Яа-яA-Z]+/g, "");
        if(item !== ""){
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    let _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ""){
            _this.addIncome.push(itemValue);
        }
    });
};


AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for (let key in this.expenses) {
       sum+= +this.expenses[key]*1;
    }
    this.expensesMonth = +sum;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = +this.budget - +this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function() {
    return targetAmout.value.replace(/[^0-9]+/g, "") / this.budgetMonth;
};

AppData.prototype.calcSavedMoney = function(){
    let value = +periodSelect.value;
    this.amuntValue = periodAmount.textContent = +value;
    this.amountSelect = (this.amuntValue = +periodSelect.value);
    return this.amountSelect;
};
AppData.prototype.eventListeners = function(){
    salaryAmount.addEventListener("input", function() {
        if (salaryAmount.value === "") {
            buttonStart.disabled = true;
        }else {
            buttonStart.disabled = false;
        }
    });
    buttonStart.addEventListener("click", appData.start.bind(appData));
    cancel.addEventListener("click", appData.reset.bind(appData));
    expensesBtnPlus.addEventListener("click", appData.addExpensesBlock.bind(appData));
    incomeBtnPlus.addEventListener("click", appData.addIncomeBlock.bind(appData));
    periodSelect.addEventListener("input", appData.calcSavedMoney.bind(appData));
}
let appData = new AppData();
appData.eventListeners();
