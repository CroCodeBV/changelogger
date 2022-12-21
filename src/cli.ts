import { program } from 'commander';
import {  list } from './commands/list';
import { add } from './commands/add';
import figlet from 'figlet';
import clear from 'clear';
import chalk from 'chalk';

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Changelogger', { horizontalLayout: 'full' })
));

program
  .version('0.1.0')
  .description('Changelogger CLI')
  .option("list", "list all changelog entries")
  .option("add", "add a new changelog entry")
  .option("merge", "merge changelog entries into CHANGELOG.md")

program
  .command('list')
  .description('list all changelog entries')
  .action(list);

program
  .command('add')
  .description('add a new changelog entry')
  .action(add);
