#! /usr/bin/env node
import inquirer from "inquirer";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    console.log("Welcome to the countdown timer app!");
    await sleep();
}
await welcome();
async function appStart() {
    //Took userInput through inquirer
    const userInput = await inquirer.prompt([
        {
            type: "input",
            name: "targetDateAndTime",
            message: "Enter date in format YYYY-MM-DD HH:MM:SS", // Date format
            validate: (input) => {
                let checkFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; //Fancy method of checking format
                if (!checkFormat.test(input)) {
                    //check wether the userinput format is correct or not if not show error
                    console.error("Please enter date in correct Format:");
                    return;
                }
                return true; //if correct program will run
            },
        },
    ]);
    const { targetDateAndTime } = userInput;
    const [datestring, timeString] = targetDateAndTime.split(" "); //split target date and time from space .split the the date and time from userinput date and time
    const [yearstring, monthstring, daystring] = datestring.split("-"); //split date from "-" so year ,month and day will seperate
    const [hourString, minuteString, secondString] = timeString.split(":"); //split time from ":" so Hours,min,sec will seperate
    let year = parseInt(yearstring); // now convert the string into number the time previously have type "string as we mentioned in input during validation"
    let month = parseInt(monthstring) - 1;
    let day = parseInt(daystring);
    let hour = parseInt(hourString);
    let min = parseInt(minuteString);
    let sec = parseInt(secondString);
    setInterval(() => {
        // set interval function so it update on every one second
        const targetDateobj = new Date(year, month, day, hour, min, sec); // Pass the TargetTime that we converted into number from string
        const currentDate = Date.now(); // show  current date
        let timeDiff = targetDateobj.getTime() - currentDate; // time difference to calculate remaining time
        //isolate Days,Hours,min,Sec from timediff
        let calcDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let calcHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let calcmin = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let calsec = Math.floor((timeDiff % (1000 * 60)) / 1000);
        if (timeDiff <= 0) {
            console.log("Time has Expired"); // if timedifference less than 0 Program will exit
            process.exit();
        }
        if (timeDiff > 0) {
            if (calcDays > 0) {
                process.stdout.write('\r' + `Remaining Time :${calcDays} days  ${calcHours} hours ${calcmin} min ${calsec} sec`);
            }
            else if (calcDays <= 0 && calcHours > 0) {
                process.stdout.write('\r' + `Remaining Time :  ${calcHours} hours ${calcmin} min ${calsec} sec`);
            }
            else if (calcHours <= 0 && calcmin > 0) {
                process.stdout.write('\r' + `Remaining Time : ${calcmin} min ${calsec} sec`);
            }
            else if (calcmin <= 0 && calsec > 0) {
                process.stdout.write('\r' + `Remaining Time :  ${calsec} sec`);
            }
            else if (timeDiff <= 0) {
                console.log("Time has Expired"); // if timedifference less than 0 Program will exit
                process.exit();
            }
        }
    }, 1000);
}
appStart();
