import {Component} from "./base-component";
import {projectState} from "../state/project-state";
import {Validatable, validate} from "../util/validation";
import {autobind} from "../decorators/autobind-decorator";


  // ProjectInput class - This class when instantiated will render a form.
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      // Needed for bind, but replaced with binding below in the addEventListener callback. 
      // this.submitHandler = this.submitHandler.bind(this);

      // Get access to the various inputs.
      // Notice that you are calling querySelector from this.element because this is the clone you created.
      this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;


      this.configure();
      // Calling a method in a constructor automatically executes that function.
    }

    configure() {
      // You leave out parenthisis because you don't want the callback to execute and return something right away.
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }

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
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }
