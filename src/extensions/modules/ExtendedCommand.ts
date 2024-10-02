import { CommandType } from "@types";

export class ExtendedCommand {
  constructor(options: CommandType) {
    options.dmPermission = false;
    Object.assign(this, options);
  }
}