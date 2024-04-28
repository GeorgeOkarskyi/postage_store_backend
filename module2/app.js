const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');

const UNIX_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const COMMANDS_MAP = {
    'Linux': UNIX_COMMAND,
    'Darwin': UNIX_COMMAND,
    'Windows_NT': `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
}


function getCommand(){
    const processDetailsCommand = COMMANDS_MAP[os.type()];

    if(!processDetailsCommand) {
        console.log("Unsupported OS");
        process.exit(1)
    }

    return processDetailsCommand;
}

function logData(data) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const logData = `${currentTime}: ${data}\n`;

    fs.appendFile('./activityMonitor.log', logData, ( error ) => {
        if( error ) {
            console.error('Failed to load the log file', error);
        }
    });
}

function logProcessDetailsPeriodically() {
    exec(getCommand(), (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        process.stdout.write("\r");
        // process.stdout.write(stdout.trim());

        if (!this.lastLogged || Date.now() - this.lastLogged >= 60000) {
            logData(stdout.trim());
            this.lastLogged = Date.now();
        }
    });
}

setInterval(logProcessDetailsPeriodically, 100);