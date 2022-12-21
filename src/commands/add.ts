import { promises as fs } from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);


export const add = async() => {
  console.log(chalk.blue('Adding a new changelog entry...'));
  const name = (await git.getConfig('user.name')).value;
  const email = (await git.getConfig('user.email')).value;
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message:chalk.blue( 'What type of change are you submitting today?'),
      choices: ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security', 'Other'],

    },
    {
      type: 'input',
      name: 'title',
      message: chalk.blue('What is the title of your change?'),
    },
    {
      type: 'input',
      name: 'author',
      message: chalk.blue('Who is the author of this change?'),
      default: `${name}<${email}>`,
    },
  ]) as {
    type: string;
    title: string;
    author: string;
  };

  const entry = `${answers.type} - ${answers.title} (${answers.author})`;
  console.log(chalk.blue(`Adding the following entry to the changelog:\n`), chalk.greenBright(entry));

  const dir = './changes';
  try {
    await fs.access( dir);
  } catch  {
    console.log(chalk.blue('No changes directory yet, creating changes directory...'));
    await fs.mkdir(dir);
    console.log(chalk.green('Successfully created changes directory'));
  }
  
  try {
    await fs.writeFile(`${dir}/${new Date().getTime()}`, entry);
    console.log(chalk.green('Successfully created changelog entry, be sure to run "changelogger merge" to merge your changes into CHANGELOG.md'));
  } catch (err) {
    console.log(chalk.red('Failed to create changelog entry'));
    console.log(err);
  }
};
