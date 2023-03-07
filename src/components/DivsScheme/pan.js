 
 export function addScale(elemId){

    const { renderer } = require("./render");
    const container = document.getElementById(elemId);
    const instance = renderer({ minScale: .1, maxScale: 30, element: container.children[0], scaleSensitivity: 10 });
    container.addEventListener("wheel", (event) => {
        // if (!event.ctrlKey) {
        //     return;
        // }
      
        event.preventDefault();
        instance.zoom({
            deltaScale: Math.sign(event.deltaY) > 0 ? -1 : 1,
            x: event.pageX,
            y: event.pageY
        });
    });
    container.addEventListener("dblclick", (event) => {
       
        instance.panTo({
            originX: 0,
            originY: 0,
            scale: 1,
        });
    });

    var mousedown = false;
    container.addEventListener('mousedown', (event) =>{
        
        
        if(event.button == 1){
            mousedown = true;
            event.preventDefault();
        }
    })
     container.addEventListener('mouseup', (event) =>{
   
        mousedown = false;
        
    })
    container.addEventListener("mousemove", (event) => {
        // if (!event.shiftKey) {
        //     return;
        // }
       event.preventDefault();
        if (!mousedown){
            return;
        }
        event.preventDefault();
        instance.panBy({
            originX: event.movementX,
            originY: event.movementY
        });
    })

}