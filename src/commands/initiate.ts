import chalk from 'chalk';
import { promises as fs } from 'fs';
import inquirer from 'inquirer';

export const initiate = async () => {
  console.log(chalk.blue('Initiating a new changelog...'));
  const startingText =
  `# Changelog
  
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
`;

  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'startingText',
    message: chalk.blue('Would you like to add any initial text to the changelog?'),
    default: startingText,
  }]);
  
  try {
    await fs.writeFile('CHANGELOG.md', answers.startingText || startingText);
    console.log(chalk.green('Successfully created changelog'));
  } catch (err) {
    console.error(chalk.red('Failed to create changelog'));
    console.log(err);
  }
}
