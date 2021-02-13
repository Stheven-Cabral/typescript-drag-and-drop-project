import { Project, ProjectStatus } from "../models/project-model";


// Project State Management
// This is made into a Singleton with a 'private constructor' so that 'ProjectState' only has one instance since it holds state.
type Listener<T> = (item: T[]) => void;


export class State<T> {
  // Adding protexted in front of this property means it can be accessed only within the base class and if it is inherited.
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}



class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState;
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      // slice returns a copy of the array, not the original array.
      listenerFn(this.projects.slice());
    }

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // slice returns a copy of the array, not the original array.
      listenerFn(this.projects.slice());
    }
  }
}

// Global instance of 'ProjectState'.
export const projectState = ProjectState.getInstance();
