class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // The '!' tells TS we will get an element with that type of id and will not be null.
    // Using 'as' is called typecasting (changing an entity into another type). We are telling TS what type we are getting from the id.
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // importedNode is only exclusive to the constructor.
    const importedNode = document.importNode(this.templateElement.content, true);
    // 'content' is a property that sits on the HTMLTemplateElement type. References the content of an element.

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.attach();
  }

  // The 'private' modifier only limits the 'attach' method to the 'ProjectInput' class.
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();