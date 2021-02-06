import { ProjectList } from "./components/project-list";
import { ProjectInput } from "./components/project-input";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
