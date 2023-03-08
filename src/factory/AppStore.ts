import {appDescriber} from "@/types/WindowServer";

export class AppDescriber implements appDescriber {
  appName: string;
  name: string;
  titleName: string | undefined;

  constructor(appName: string, name: string, titleName?: string) {
    this.appName = appName;
    this.name = name;
    if (titleName) {
      this.titleName = titleName;
    }
  }
}
