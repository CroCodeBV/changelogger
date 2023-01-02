import chalk from 'chalk';
import fs, { promises as fsPromises } from 'fs';
import inquirer from 'inquirer';
import { ChangelogEntry, EntryType } from '../utils/ChangelogEntry';


export const merge = async () => {
  console.log('Merging changelog entries into CHANGELOG.md...');
  const dir = './changes';

  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: chalk.blue('What version are you merging?'),
  }, {
    type: 'input',
    name: 'date',
    message: chalk.blue('What date is this version being released?'),
    default: new Date().toISOString().substring(0, 10),
  }]);

  try {
    await fsPromises.access(dir);
    const files = await fsPromises.readdir(dir);
    if(files.length === 0) {
      console.log(chalk.red('No changelog entries to merge'));
      return;
    }
    const entries = await Promise.all(files.map((file) => 
    fsPromises.readFile(`${dir}/${file}`, 'utf-8')));
    // Convert the entries into a ChangelogEntry object
    const changelogEntry = new ChangelogEntry();
    entries.forEach((entry) => {
      const type = EntryType[entry.substring(0, entry.indexOf('-')).trim() as keyof typeof EntryType];
      const title = entry.substring(entry.indexOf('-') + 1).trim();
      changelogEntry.addEntry(type, title);
    });
    const originalContent = fs.readFileSync('CHANGELOG.md', 'utf-8');
    const firstPart = originalContent.substring(0, originalContent.indexOf('## ['));
    const secondPart = originalContent.substring(originalContent.indexOf('## ['));
    const stream = fs.createWriteStream('CHANGELOG.md', { flags: 'w+' });
    stream.write(firstPart);
    stream.write(`## [${answers.version}] - ${answers.date}\n\n`);
    stream.write(changelogEntry.toString());
    stream.write('\n');
    stream.write(secondPart);
    
    // Remove the changes directory just merged
    // fsPromises.rm(dir, { recursive: true, force: true }); // TODO uncomment when done testing
  } catch {
    console.log(chalk.red('No changes directory yet, please create changes before merging'));
    return;
  }
};
