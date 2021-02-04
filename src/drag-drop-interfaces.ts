// Drag and Drop Interfaces
// Draggable interface can be used on a class that creates a project item, such as the project item class.
// The DragTarget interface will be assigned to Project List class.
namespace App {
  // namespaces is only a TS feature

  export interface Draggable {
    // 'void' means that nothing is returned.
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }
  
  export interface DragTarget {
    // permits drop
    dragOverHandler(event: DragEvent): void;
  
    // handles drop
    dropHandler(event: DragEvent): void;
  
    // reverts target when dropping is abandoned
    dragLeaveHandler(event: DragEvent): void;
  }
}

