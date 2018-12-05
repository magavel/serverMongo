import * as Chalk from 'chalk';
import * as moment from 'moment';

const chalk = Chalk.constructor();

//exporter 3 fonction
// 1: succes -> param msg (string)
//2: info para msg
///3 : error param msg


//pour mettre en couleur    success
// chalk.green(string)       error
//chalk.red(string)            info

//ppour afficher l(heuree
//moment().formtat('HH:mm');
//    --->  ds chzcune des methode   console.log(chalk(heure +message)
export const succes=(msg)=>{
    const now = moment().format('HH:mm');
     console.log(chalk.green(`${now} ${msg}`));

}

export const info=(msg)=>{
    const now = moment().format('HH:mm');
    console.log(chalk.blue(`${now} ${msg}`));

}

export const error=(msg)=>{
    const now = moment().format('HH:mm');
    console.log(chalk.red(`${now} ${msg}`));

}

