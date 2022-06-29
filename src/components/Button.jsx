//jshint esversion: 9
import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd/dist/hooks";
import { useDispatch } from "react-redux";
import { updateElementAction } from "../redux/Elements/ElementActions";
import DragTypes from "../utils/DragTypes";

function Button({ values, position, styles, inDragCanvas, id, setControlPanelData }) {
    const dispatch = useDispatch();

    const [elementValues, setElementValues] = useState(values ? values : {});

    const [activateInput, setActivateInput] = useState(false);
    const input = useRef(null);

    const handleChange = (event) => {
        const { value } = event.target;
        setElementValues((prevState) => ({ ...prevState, label: value }));
        dispatch(updateElementAction(id, { values: elementValues }));
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
            values: {
                label: "Button",
            },
            styles: {
                height: "40px",
                width: "221px",
                color: "#fff",
                backgroundColor: "#000",
            },
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            style={{
                top: position ? position.y + "px" : "auto",
                left: position ? position.x + "px" : "auto",
            }}
            ref={buttonDrag}
            onDoubleClick={() => {
                if (inDragCanvas) {
                    setActivateInput(true);
                    if (input.current) input.current.focus();
                }
            }}
            onClick={() => {
                if (inDragCanvas) {
                    setControlPanelData({
                        isOpen: true,
                        elementId: id,
                    });
                }
            }}
            className="position-absolute"
        >
            <button className="btn btn-dark my-2" style={styles}>
                <input
                    ref={input}
                    style={{ color: "inherit" }}
                    disabled={activateInput ? false : true}
                    className="text-center bg-transparent border-0"
                    type={"text"}
                    value={elementValues.label ? elementValues.label : "Button"}
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
