#! /usr/bin/env node

import inquirer from "inquirer"

let randomNumber: number = Math.round(10000 + Math.random() * 90000)
let myBalance: number = 500000;

let answer = await inquirer.prompt([{
    name: "student",
    type: "input",
    message: "Enter student name:",
    validate: function(value){
        if (value.trim() !== ""){
            return true

        }return "Please enter a non-empty value"
    },
    
},{
    name: "courses",
    type: "list",
    message: "Select a course from given choices:",
    choices: ["CA & OP", "TypeScript", "Python", "Prompt Engineering", "JavaScript"]
}]);

const courseFee: {[key: string]: number} = {
    "CA & OP": 10000,
    "TypeScript": 15000,
    "Python": 20000,
    "Prompt Engineering": 25000,
    "JavaScript": 30000
}

console.log(`\n Course Fee: ${courseFee[answer.courses]}/-`);

console.log(`Balance: ${myBalance}\n`);

let paymentMethod = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment Method",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "input",
        message: "Transferd Money",
        validate: function(value){
            if(value.trim() !== ""){
                return true
            }return "Please enter nono-empty value:"
        }
    }
]);

console.log(`\n You Selected ${paymentMethod.payment} Method`);
const tutionFee = courseFee[answer.courses]
const paymentAmount = parseFloat(paymentMethod.amount)
console.log(`\n ${tutionFee} rupees has been transacted`);
console.log(`\n Your remaining balance is: ${myBalance-tutionFee}/-rupees.`);

if(tutionFee === paymentAmount){
    console.log(`\n Congratulations! You have enrolled for ${answer.courses}.`);
    let ans = await inquirer.prompt([{
        name: "options",
        type: "list",
        message: "What you like to do now?",
        choices: ["View Status", "Exit"]
    }]);
    if(ans.options === "View Status"){
        console.log("\n Status:");
        console.log(`\n Student's Name: ${answer.student}`);
        console.log(`Student's ID: ${randomNumber}`);
        console.log(`Enrolled Course: ${answer.courses}`);
        console.log(`Paid Fee: ${paymentAmount}`);
        console.log(`Balance: ${myBalance -= paymentAmount}`);
        
    }else{
        console.log("\n Exit from student Account");
        
    }
    
}else{
    console.log("\n Your amount to low to enroll in course!");
    console.log("\n Better to try next time with sufficient Amount!");
    console.log("\n Thank You!");
}



