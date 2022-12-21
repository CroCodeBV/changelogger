import { program } from 'commander';
import {  list } from './commands/list';
import { add } from './commands/add';
import { textSync } from 'figlet';
import clear from 'clear';
import chalk from 'chalk';

clear();
console.log(
  chalk.yellow(
    textSync('Changelogger', { horizontalLayout: 'full' })
));

program
  .version('0.1.0')
  .description('Changelogger CLI')
  .option("list, ls", "list all changelog entries")
  .option("list-new, lsn", "list all new (unmerged) changelog entries")
  .option("add, a", "add a new changelog entry")
  .option("merge, m", "merge changelog entries into CHANGELOG.md")

program
  .command('list')
  .alias('ls')
  .description('list all changelog entries')
  .action(list);

  program
  .command('list-new')
  .alias('lsn')
  .description('list all new (unmerged) changelog entries')
  .error("Not implemented yet!")

program
  .command('add')
  .alias('a')
  .description('add a new changelog entry')
  .action(add);

program
  .command('merge')
  .alias('m')
  .description('merge changelog entries into CHANGELOG.md')
  .error("Not implemented yet!")
