import { provideRouter, RouterStateSnapshot, TitleStrategy, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";
import { ApplicationConfig, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ContactInfo } from "../types/types";

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    const id = routerState.root.firstChild?.params['id']
    if (id) {
      const data = localStorage.getItem('contacts')
      const contacts: ContactInfo[] = JSON.parse(data!);
      const user = contacts.find(contact => contact.id === Number(id))
      const userName = `${user?.firstName} ${user?.lastName}`
      const path = routerState.root.firstChild?.routeConfig?.path
      if (path === 'contacts/:id') {
        this.title.setTitle(`Contactly | ${userName}`);
        return;
      }
    }

    else if (title !== undefined) {
      this.title.setTitle(`Contactly | ${title}`);
    }
  }
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ]
};