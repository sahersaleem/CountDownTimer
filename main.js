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
    async function remainingTimeCalculation() {
        setInterval(() => {
            // set interval function so it update on every one second
            const targetDateobj = new Date(year, month, day, hour, min, sec); // Pass the TargetTime that we converted into number from string
            const currentDate = Date.now(); // show  current date
            const timeDiff = targetDateobj.getTime() - currentDate; // time difference to calculate remaining time
            if (timeDiff <= 0) {
                console.log("Time has Expired"); // if timedifference less than 0 Program will exit
                process.exit();
            }
            //isolate Days,Hours,min,Sec from timediff
            let calcDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            let calcHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let calcmin = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let calsec = Math.floor((timeDiff % (1000 * 60)) / 1000);
            console.clear();
            setTimeout(remainingTimeCalculation, 1000);
            console.log(`Remaining Time : ${calcDays}Days ${calcHours}hours ${calcmin}min ${calsec}sec`);
        }, 1000);
    }
    setTimeout(remainingTimeCalculation);
}
appStart(); // start program
