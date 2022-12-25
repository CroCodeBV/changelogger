import { program } from 'commander';
import {  list } from './commands/list';
import { add } from './commands/add';
import figlet from 'figlet';
import clear from 'clear';
import chalk from 'chalk';
import { merge } from './commands/merge';
import { initiate } from './commands/initiate';

clear();
console.log(
  chalk.yellow(
   figlet. textSync('Changelogger', { horizontalLayout: 'full' })
));

program
  .version('0.1.0')
  .description('Changelogger CLI')

  program
  .command('initiate')
  .alias('i')
  .description('initiate a new changelog file')
  .action(initiate)

program
  .command('list')
  .alias('ls')
  .description('list all changelog entries')
  .action(list);

  // program
  // .command('list-new')
  // .alias('lsn')
  // .description('list all new (unmerged) changelog entries')
  // .error("Not implemented yet!")

program
  .command('add')
  .alias('a')
  .description('add a new changelog entry')
  .action(add);

program
  .command('merge')
  .alias('m')
  .description('merge changelog entries into CHANGELOG.md')
  .action(merge)

program.parse(process.argv);
