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
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let cloneIncome,
    cloneExpenses,
    amountSelect,
    amuntValue;

let appData = { 
    income: {},   
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0,
    reset: function(){
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
        appData.budgetMonth = 0;
        appData.budgetDay = 0;
        appData.budget = 0;
        appData.addExpenses = [];
        appData.addIncome = [];
        appData.expenses = {};
        appData.income = {};
        appData.expensesMonth = 0;
        periodSelect.value = 0;
        periodAmount.textContent = 1;
        incomePeriod.value = 0;
        amountSelect = 0;
        amuntValue = 0;
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
    },
    start: function() {
        this.budget = salaryAmount.value.replace(/[^0-9]+/g, "");
        this.getBudget();
        this.getAddIncome();
        this.getAddExpenses();
        this.getexpenses();
        this.getExpensesMonth();
        this.getInfoDeposit();
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
    },
    addExpensesBlock: function(){
        cloneExpenses = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpenses, expensesBtnPlus);
        inp = data.querySelectorAll("input");
        expensesItems = document.querySelectorAll(".expenses-items");
        if (expensesItems.length === 3){
            expensesBtnPlus.style.display = "none";
        }
    },
    getexpenses: function(){
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if(itemExpenses !== "" && cashExpenses !== ""){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){
        cloneIncome = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncome, incomeBtnPlus);
        inp = data.querySelectorAll("input");
        incomeItems = document.querySelectorAll(".income-items");
        if(incomeItems.length === 3){
            incomeBtnPlus.style.display = "none";
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if(itemIncome !== "" && cashIncome !== ""){
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    showResult: function(){
        budgetMunth.value = this.budget;
        expensesMonth.value = this.expensesMonth;
        budGetDay.value = Math.ceil(this.budgetDay);
        addExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = +this.budgetMonth;
        periodSelect.addEventListener("input", function(){
            if (salaryAmount.value !== ""){
                let resultAmount = appData.budgetMonth * +amuntValue;
                incomePeriod.value = +resultAmount;
            } else if (salaryAmount.value === ""){
                periodSelect.disabled = false;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = addExpItem.value.split(", ");
        addExpenses.forEach(function(item){
            item = item.replace(/[^,a-zА-Яа-яA-Z]+/g, "");
            if(item !== ""){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ""){
                appData.addIncome.push(itemValue);
            }
        });
    },
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in this.expenses) {
           sum+= +this.expenses[key]*1;
        }
        this.expensesMonth = +sum;
    },
    getBudget: function() {
        this.budgetMonth = +this.budget - +this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function() {
        return targetAmout.value.replace(/[^0-9]+/g, "") / this.budgetMonth;
    },
    getStatusIncome: function(){
        let data = this.budgetDay;
        if (data >= 1200){  //9
            return ("У вас высокий уровень дохода")
        }else if (data >= 600 && data < 1200){
            return ("У вас средний уровень дохода")
        }else if (data < 600 && data >= 0){
            return ("К сожалению у вас уровень дохода ниже среднего");
        }else{
            return ("Что то пошло не так")
        }
    },
    getInfoDeposit: function(){
        let percDepositthis,
            sumDeposit;
        if (this.deposit){
            do{
                percDeposit = prompt("Какой годовой процент?", 10);
            }
            while(!isNumber(percDeposit));
            do{
                sumDeposit = prompt("Какая сумма заложена?", 10000);
            }
            while(!isNumber(sumDeposit));
            this.percentDeposit = percDeposit;
            this.moneyDeposit = sumDeposit;
        }
    },
    calcSavedMoney: function(){
        let value = +periodSelect.value;
        amuntValue = periodAmount.textContent = +value;
        amountSelect = (amuntValue = +periodSelect.value);
        return amountSelect;
    }
};
salaryAmount.addEventListener("input", function() {
    if (salaryAmount.value === "") {
        buttonStart.disabled = true;
    }else {
        buttonStart.disabled = false;
    }
});
buttonStart.addEventListener("click", appData.start.bind(appData));
cancel.addEventListener("click", appData.reset.bind(appData));
expensesBtnPlus.addEventListener("click", appData.addExpensesBlock);
incomeBtnPlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.calcSavedMoney);