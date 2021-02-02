// Project State Management
// This is made into a Singleton with a 'private constructor' so that 'ProjectState' only has one instance since it holds state.
class ProjectState {
  private projects: any = [];
  private instance: ProjectState;
  
  private constructot() {}

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random.toString(),
      title: title,
      description: description,
      people: numOfPeople
    };
    this.projects.push(newProject);
  }


}

// Global instance of 'ProjectState'.
const projectState = ProjectState.getInstance();


// Validation Logic
interface Validatable {
  // The question mark after the key indicates that undefined is acceptable or that key is optional.
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    // Trim removes any extra white space.
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // Checking if something is null ensures that '0' isn't an input.
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// Creating a Decorator to autobind 'this'.
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log(methodName);
  console.log(descriptor);

  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  //  get method is executed when the adjDescriptor is returned.
  return adjDescriptor;
}


// ProjectList class - Attaches list of projects to the page.
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') { 
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;

    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'; 
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}


// ProjectInput class - This class when instantiated will render a form.
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // Below we have to type cast 'HTMLTemplateElement' because the 'getElementById' method onlt returns 'HTMLElement', not 'HTMLInputElement'. 
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // 'content' returns what is inside the 'template' node. This is a copy and the 'original node' is untouched.
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // Add styling to the form.
    this.element.id = 'user-input';

    // Get access to the various inputs.
    // Notice that you are calling querySelector from this.element because this is the clone you created.
    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    // Needed for bind, but replaced with binding below in the addEventListener callback. 
    // this.submitHandler = this.submitHandler.bind(this);


    this.configure();
    // Calling a method in a constructor automatically executes that function.
    this.attach();
  }

  // private means this method can only be called from inside the class.
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }


  // The following private method grabs input values and validates them using the 'validate' method.
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    // Prevents http request from being executed.
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // Array.isArray is built into javascript, and tests if the argument is an array.
    if (Array.isArray(userInput)) {
      // Notice that you destructure the array can change the constant name that references each item in the array.
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    // You leave out parenthisis because you don't want the callback to execute and return something right away.
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');