import { promises as fs } from 'fs';
import chalk from 'chalk';

export const list = async () => {
  console.log(chalk.blue('Listing all changelog entries...'));
  const file = await fs.readFile('CHANGELOG.md', 'utf-8');
  if (!file) {
    console.error(chalk.red('No changelog found'));
    return;
  } else if(file.length === 0) {
    console.error(chalk.red('Changelog is empty'));
    return;
  }
  console.log(file);
};
