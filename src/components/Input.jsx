//jshint esversion:9
import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateElementAction } from "../redux/Elements/ElementActions";
import DragTypes from "../utils/DragTypes";

function Input({ values, position, styles, inDragCanvas, id, setControlPanelData }) {
    const dispatch = useDispatch();

    const [elementValues, setElementValues] = useState(values ? values : {});

    const [activateInput, setActivateInput] = useState(false);
    const input = useRef(null);

    const handleChange = (event) => {
        const { value } = event.target;
        setElementValues((prevState) => ({ ...prevState, label: value }));
        dispatch(updateElementAction(id, { values: elementValues }));
    };

    const [{ isDragging }, textDrag] = useDrag({
        type: DragTypes.TEXT,
        item: {
            type: DragTypes.TEXT,
            name: "text",
            prevData: {
                inDragCanvas: inDragCanvas ? inDragCanvas : false,
                id: id,
            },
            values: {
                label: "Text",
            },
            styles: {
                height: "40px",
                width: "221px",
                color: "#000",
                backgroundColor: "#fff",
            },
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <>
            <div
                style={{
                    top: position ? position.y + "px" : "auto",
                    left: position ? position.x + "px" : "auto",
                }}
                ref={textDrag}
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
                <input
                    ref={input}
                    style={styles}
                    disabled={activateInput ? false : true}
                    className="text-center border-0"
                    type={"text"}
                    value={elementValues.label ? elementValues.label : "Text"}
                    onBlur={() => {
                        setActivateInput(false);
                    }}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default Input;
