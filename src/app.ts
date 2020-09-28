class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;

  constructor() {
    // The '!' tells TS we will get an element with that type of id and will not be null.
    // Using 'as' is called typecasting. We are telling TS what type we are getting from the id.
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
  }
}