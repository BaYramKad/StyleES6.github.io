/* eslint-disable no-unused-vars */
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
    cancel = document.querySelector("#cancel"),
    depositAmount = document.querySelector(".deposit-amount"),
    depositPercent = document.querySelector(".deposit-percent"),
    depositBank = document.querySelector(".deposit-bank"),
    depositCalc = document.querySelector(".deposit-calc");
    
buttonStart.style.backgroundColor = "#0c1d71";
class AppData {
    constructor() {
        this.cloneIncome;
        this.cloneExpenses;
        this.amountSelect;
        this.amuntValue = 1;
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
        this.target = 0;
    }

    reset(){
        this.changePercent();
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
        depositCheck.disabled = false;
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
                const resultAmount = 0;
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
        depositBank.style.display = "none";            
        depositAmount.style.display = "none";
        depositPercent.style.display = "none";
        if (depositCheck.checked){
            depositPercent.style.display = "inline-block";
        } else {
            depositPercent.style.display = "none";
        }
        depositBank.value = "";
        depositAmount.value = "";
    }

    start(){
        this.budget = +salaryAmount.value.replace(/[^0-9]+/g, "");
        this.getInfoDeposit();
        this.changePercent();
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
        depositCheck.disabled = true;
        buttonStart.style.display = "none";
        cancel.style.display = "inline-block";
        depositPercent.style.display = "inline-block";
        depositPercent.value = this.percentDeposit;
        incomeBtnPlus.style.display = "none";
        expensesBtnPlus.style.display = "none";
        
    }

    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnPlus);
        expensesItems = document.querySelectorAll(".expenses-items");
        let cloneChildrenExpenses = cloneExpensesItem.querySelectorAll("*");

        for (let i = 0; i < cloneChildrenExpenses.length; i++){
            cloneChildrenExpenses[i].value = null;
        }

        if (expensesItems.length === 3){
            expensesBtnPlus.style.display = "none";
        }
    }

    getexpenses(){
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if(itemExpenses !== "" && cashExpenses !== ""){
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnPlus);
        incomeItems = document.querySelectorAll(".income-items");
        
        let cloneChildrenIncome = cloneIncomeItem.querySelectorAll("*");
        for (let i = 0; i < cloneChildrenIncome.length; i++) {
            cloneChildrenIncome[i].value = null;
        }

        if (incomeItems.length === 3){
            incomeBtnPlus.style.display = "none";
        }
    }
    
    getIncome(){
        incomeItems.forEach( item => {
            let itemIncome = item.querySelector(".income-title").value;
            let cashIncome = item.querySelector(".income-amount").value;
            if(itemIncome !== "" && cashIncome !== ""){
                this.income[itemIncome] = +cashIncome;
            }
        });
    }
    
    showResult(){
        budgetMunth.value   = +this.budget;
        expensesMonth.value = this.expensesMonth;
        budGetDay.value     = Math.ceil(this.budgetDay);
        addExpensesValue.value      = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonth.value   = Math.ceil(this.getTargetMonth());
        incomePeriod.value  = +this.budgetMunth;
        incomePeriod.value  = +this.budgetMonth * +this.amuntValue;
        if (isNaN(this.target) ){
            targetMonth.value   = "Введите число в поле 'Проценты'";
            budGetDay.value     = "Введите число в поле 'Проценты'";
            incomePeriod.value  = "Введите число в поле 'Проценты'";
        }
        periodSelect.addEventListener("input", () => {
            if (salaryAmount.value !== ""){
                const resultAmount = this.budgetMonth * +this.amuntValue;
                incomePeriod.value = +resultAmount;
            } else if (salaryAmount.value === ""){
                periodSelect.disabled = false;
            }
        });
    }
    
    getAddExpenses(){
        const addExpenses = addExpItem.value.split(", ");
        addExpenses.forEach(item => {
            item = item.replace(/[^,a-zА-Яа-яA-Z]+/g, "");
            if(item !== ""){
                this.addExpenses.push(item);
            }
        });
    }
    
    getAddIncome(){
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== ""){
                this.addIncome.push(itemValue);
            }
        });
    }
    
    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
           sum += +this.expenses[key]*1;
        }
        this.expensesMonth = +sum;
    }
    
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget - +this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30;
    }
    
    getTargetMonth() {
        return targetAmout.value.replace(/[^0-9]+/g, "") / this.budgetMonth;
    }
    
    calcSavedMoney(){
        const value = +periodSelect.value;
        this.amuntValue = periodAmount.textContent = +value;
        this.amountSelect = (this.amuntValue = +periodSelect.value);
        return this.amountSelect;
    }

    getInfoDeposit(){
        if (this.deposit){
            depositPercent.style.display = "inline-block";
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent(){
        let valueSelect = this.value;
        if (valueSelect === "other"){
            depositPercent.style.display = "inline-block";
        } else {
            depositPercent.style.display = "none";
            depositPercent.value = valueSelect;
        }
    }

    depositHandler(){
        if (depositCheck.checked){
            depositBank.style.display = "inline-block";            
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener("change", this.changePercent);
        } else {
            depositBank.style.display = "none";            
            depositAmount.style.display = "none";
            depositPercent.style.display = "none";
            depositBank.value = "";
            depositAmount.value = "";
            this.deposit = false;
            depositBank.removeEventListener("change", this.changePercent);
        }
    }

    validation(value){
        isNaN(parseFloat(value));
        return;
    }

    eventListeners(){
        salaryAmount.addEventListener("input", function(event) {
            let eventDepos = event.target.value;
            if (eventDepos === "") {
                buttonStart.disabled = true;
            } else {
                buttonStart.disabled = false;
            }
        });
        depositPercent.addEventListener("input", (event) => {
            this.target = +event.target.value;
            if (this.target < 0 || this.target >= 100){
                buttonStart.disabled = true;
                alert ("Введите процент от 0 до 100");
            }
             do {
                if (!isNaN(this.target)){
                    buttonStart.disabled = true;
                } 
                if (salaryAmount.value !== ""){
                    buttonStart.disabled = false;
                }
            } while(this.validation(this.target));
        });
        depositCheck.addEventListener("change", this.depositHandler.bind(this));
        buttonStart.addEventListener("click", appData.start.bind(appData));
        cancel.addEventListener("click", appData.reset.bind(appData));
        expensesBtnPlus.addEventListener("click", appData.addExpensesBlock.bind(appData));
        incomeBtnPlus.addEventListener("click", appData.addIncomeBlock.bind(appData));
        periodSelect.addEventListener("input", appData.calcSavedMoney.bind(appData));
    }
}
const appData = new AppData();
appData.eventListeners();
