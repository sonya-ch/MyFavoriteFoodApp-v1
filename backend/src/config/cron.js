import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function() 
{
    // API_URL = URL from the render.com>dashboard>your app>settings>environment 
    https
    .get(process.env.API_URL, (res) => 
        {
        if(res.statusCode === 200) 
            console.log("GET request sent successfully");
        else
            console.log("GET request failed with status code:", res.statusCode);
        })
    .on("error", (e) => { console.error("Error occurred while sending GET request:", e)});
});
        
export default job;

//CRON JOBS = Scheduler that runs a task at specified intervals. 
// In this case, the task is to send a GET request to the API_URL every 14 minutes. 
// This is useful for keeping the server awake and preventing it from going idle, 
// especially on platforms like Heroku that may put the app to sleep after a period of inactivity.

//? Examples [ Minute, Hour, Day of Month, Month, Day of Week ]
// * 14 * * * * - Every 14 minutes
// * 0 0 * * * - Every day at midnight
// * 0 0 * * 0 - Every Sunday at midnight
// * 0 * * * * - Every hour at the start of the hour
// * 30 3 15 * * - Every month on the 15th at 3:30 AM