import { promises as fs } from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';

export const list = async () => {
  console.log(chalk.blue('Listing all changelog entries...'));
  try {
    const file = await fs.readFile('CHANGELOG.md', 'utf-8');
    if(file.length === 0) {
      console.error(chalk.red('Changelog is empty'));
      return;
    }
    console.log(file);
  } catch (err) {
    console.error(chalk.red('Failed to read changelog'));
    const answers = await inquirer.prompt([{
      type: 'confirm',
      name: 'create',
      message: chalk.blue('Would you like to create a new changelog?'),
    }]);
    if(answers.create) {
      await fs.writeFile('CHANGELOG.md', '');
      console.log(chalk.green('Successfully created changelog'));
    } else {
      console.log(chalk.blue('Stopped the program. No changelog was created'));
    }
  }
};
