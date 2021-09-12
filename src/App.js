import logo from './logo.svg';
import './App.scss';

function App() {
  let draggingEle;

// The current position of mouse relative to the dragging element
  let x = 0;
  let y = 0;
  let placeholder;
  let isDraggingStarted = false;

  const isAbove = function(nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
  };
  const swap = function(nodeA, nodeB) {
      const parentA = nodeA.parentNode;
      const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

      // Move `nodeA` to before the `nodeB`
      nodeB.parentNode.insertBefore(nodeA, nodeB);

      // Move `nodeB` to before the sibling of `nodeA`
      parentA.insertBefore(nodeB, siblingA);
  };

  const mouseDownHandler = function(e) {
    draggingEle = e.target;
    // Calculate the mouse position
    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
 };

 const mouseMoveHandler = function(e) {
  // Set position for dragging element
 const draggingRect = draggingEle.getBoundingClientRect();

  if (!isDraggingStarted) {
      // Update the flag
      isDraggingStarted = true;
      
      // Let the placeholder take the height of dragging element
      // So the next element won't move up
      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      console.log(draggingEle.nextSibling);
      draggingEle.parentNode.insertBefore(
          placeholder,
          draggingEle.nextSibling
      );
   

      // Set the placeholder's height
      placeholder.style.height = `${draggingRect.height}px`;
  }
  draggingEle.style.position = 'absolute';
  console.log(x,y)
  draggingEle.style.top = `${e.pageY - y}px`; 
  draggingEle.style.left = `${e.pageX - x}px`;
  const prevEle = draggingEle.previousElementSibling;
  const nextEle = placeholder.nextElementSibling;
  if (prevEle && isAbove(draggingEle, prevEle)) {
        // The current order    -> The new order
        // prevEle              -> placeholder
        // draggingEle          -> draggingEle
        // placeholder          -> prevEle
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);
        return;
    }
  if (nextEle && isAbove(nextEle, draggingEle)) {
        // The current order    -> The new order
        // draggingEle          -> nextEle
        // placeholder          -> placeholder
        // nextEle              -> draggingEle
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
    }
 };

 const mouseUpHandler = function() {
  // Remove the placeholder
   placeholder && placeholder.parentNode.removeChild(placeholder);
   // Reset the flag
   isDraggingStarted = false;
   // Remove the position styles
   draggingEle.style.removeProperty('top');
   draggingEle.style.removeProperty('left');
   draggingEle.style.removeProperty('position');

   x = null;
   y = null;
   draggingEle = null;

   // Remove the handlers of `mousemove` and `mouseup`
   document.removeEventListener('mousemove', mouseMoveHandler);
   document.removeEventListener('mouseup', mouseUpHandler);
};

 const mouseEnterEvent = (e)=>{
   console.log(e.target,"somthing");

 }


  return (
    <div className="App" >
      <div className="draggable" onDragEnter={mouseEnterEvent}>
        <div className="draggable__column"  onMouseDown={mouseDownHandler}>Element 1</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 2</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 3</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 4</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 5</div>
      </div>
      <div className="draggable" onDragEnter={mouseEnterEvent}>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 1</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 2</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 3</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 4</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 5</div>
      </div>
      <div className="draggable" onDragEnter={mouseEnterEvent}>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 1</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 2</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 3</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 4</div>
        <div className="draggable__column" onMouseDown={mouseDownHandler}>Element 5</div>
      </div>
    </div>
  );
}

export default App;
