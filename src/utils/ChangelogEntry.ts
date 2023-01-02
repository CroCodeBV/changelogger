export enum EntryType {
  Added = 'Added',
  Changed = 'Changed',
  Deprecated = 'Deprecated',
  Removed = 'Removed',
  Fixed = 'Fixed',
  Security = 'Security',
  Other = 'Other',
}

export class ChangelogEntry {
  entries: Record<EntryType, string[]>

  constructor() {
    this.entries = {
      Added: [],
      Changed: [],
      Deprecated: [],
      Removed: [],
      Fixed: [],
      Security: [],
      Other: [],
    }
  }

  public addEntry(type: EntryType, entry: string) {
    this.entries[type].push(entry);
  }

    private writeAsBlock(type: EntryType, entries: string[]) {
      let changelog = '';
      if (entries.length > 0) {
        changelog += `### ${type}\n\n`;
        entries.forEach((entry) => {
          changelog += `- ${entry}\n`;
        });
      }
      return changelog;
    }

    public toString() {
      return Object.entries(this.entries)
      .filter(([_, changes]) => changes.length > 0)
      .map(([type, changes]) => this.writeAsBlock(type as EntryType, changes))
      .join("\n");
    }
  }
