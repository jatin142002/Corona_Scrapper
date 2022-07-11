import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

// feature -> request
console.log("Start Scrapping");
request("https://www.worldometers.info/coronavirus/", (error, response, html)=>{
    if(error)
    {
        console.error('error : ', error);
    }
    else
    {
        console.log('Status Code : ', response && response.statusCode);
        handleHTML(html);
    }
})
console.log("End Scrapping");

function handleHTML(html)
{
    let selectTool = cheerio.load(html);

    let dataArr = selectTool("#maincounter-wrap span");

    // dataArr[i] => wrap it again in selectTool 
    // for(let i=0 ; i<dataArr.length ; i++)
    // {
    //     let data = selectTool(dataArr[i]).text();
    //     console.log(data);
    // }

    let totalCases = selectTool(dataArr[0]).text();
    let totalDeaths = selectTool(dataArr[1]).text();
    let totalRecovered = selectTool(dataArr[2]).text();

    console.log(chalk.yellow("Total Cases : "+totalCases));
    console.log(chalk.red("Total Deaths : "+totalDeaths));
    console.log(chalk.green("Total Recovered : "+totalRecovered));
}