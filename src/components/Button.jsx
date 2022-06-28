//jshint esversion: 9
import React from "react";
import { useDrag } from "react-dnd/dist/hooks";
import DragTypes from "../utils/DragTypes";

function Button({ label, position, inDragCanvas, id }) {

    const [{ isDragging }, buttonDrag] = useDrag({
        type: DragTypes.BUTTON,
        item: {
            type: DragTypes.BUTTON,
            name: "button",
            prevData: {
                inDragCanvas: inDragCanvas ? inDragCanvas : false,
                id: id,
            },
            values: {},
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            style={
                position
                    ? {
                          opacity: isDragging ? "0.6" : "1",
                          top: position.y + "px",
                          left: position.x + "px",
                      }
                    : {
                          opacity: isDragging ? "0.6" : "1",
                      }
            }
            ref={buttonDrag}
            onDoubleClick
        >
            <button className="btn btn-dark my-2 py-3 px-4">{label ? label : "Button"}</button>
        </div>
    );
}

export default Button;
