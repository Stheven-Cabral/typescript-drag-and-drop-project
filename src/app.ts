class ProjectInput {
  // The element types you see on the right of the colon are dom element types. In order to use this you have to add "dom" to "lib" of the tsconfig.json file.
  templateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // The '!' tells TS we will get an element with that type of id and will not be null.
    // Using 'as' is called typecasting (changing an entity into another type). We are telling TS what type we are getting from the id.
    this.templateElement = document.getElementById('project-input')!;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // importedNode is only exclusive to the constructor.
    const importedNode = document.importNode(this.templateElement, true);
    // 'content' is a property that sits on the HTMLTemplateElement type. References the content of an element.

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // The 'private' modifier only limits the 'attach' method to the 'ProjectInput' class.
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private submitHandler(event: Event) {
    // validate and do something with the inputs.
    // preventDefault() prevents a HTTP request from being sent.
    event.preventDefault();

    console.log(this.titleInputElement.value);
  }

  private configure() {
    // bind keeps the content of the class ('this') within the 'configure' method.
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
}

const prjInput = new ProjectInput();