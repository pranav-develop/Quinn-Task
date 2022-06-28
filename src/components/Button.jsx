//jshint esversion: 9
import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd/dist/hooks";
import DragTypes from "../utils/DragTypes";

function Button({ label, position, inDragCanvas, id }) {
    const [nameLabel, setNameLabel] = useState(label ? label : "Button");

    const [activateInput, setActivateInput] = useState(false);
    const input = useRef(null);

    const handleChange = (event) => {
        const { value } = event.target;
        setNameLabel(value);
    };

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
            onDoubleClick={() => {
                if (inDragCanvas) {
                    setActivateInput(true);
                    if (input.current) input.current.focus();
                }
            }}
        >
            <button className="btn btn-dark my-2  ">
                <input
                    ref={input}
                    disabled={activateInput ? false : true}
                    className="color-white text-center bg-transparent border-0"
                    type={"text"}
                    value={nameLabel}
                    onBlur={() => {
                        setActivateInput(false);
                    }}
                    onChange={handleChange}
                />

                {/* {!activateInput && (label ? label : "Button")} */}
            </button>
        </div>
    );
}

export default Button;
