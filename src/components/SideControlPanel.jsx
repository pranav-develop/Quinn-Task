//jshint esversion: 9
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeElementAction, updateElementAction } from "../redux/Elements/ElementActions";

function SideControlPanel({ setDoReload, elementId, setControlPanelData }) {
    const dispatch = useDispatch();

    const elements = useSelector((store) => store.element);

    const [label, setLabel] = useState("");

    const [error, setError] = useState({
        hasError: false,
        msg: "",
    });

    const [elementStyle, setElementStyle] = useState({});

    useEffect(() => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].id === elementId) {
                setElementStyle(elements[i].styles);
                setLabel(elements[i].values.label);
                break;
            }
        }
    }, [elementId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "height" || name === "width") {
            setElementStyle((prevState) => ({ ...prevState, [name]: value + "px" }));
        } else {
            setElementStyle((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleReset = () => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].id === elementId) {
                setElementStyle(elements[i].styles);
                break;
            }
        }
    };

    const handleSave = () => {
        setError({ hasError: false, msg: "" });
        if (parseInt(elementStyle.width.replace("px", "")) <= 0) {
            setError({ hasError: true, msg: "Please enter a valid width" });
            return;
        }
        if (parseInt(elementStyle.height.replace("px", "")) <= 0) {
            setError({ hasError: true, msg: "Please enter a valid height" });
            return;
        }
        if (elementStyle.color.length <= 2) {
            setError({ hasError: true, msg: "Please enter a valid color" });
            return;
        }
        if (elementStyle.backgroundColor.length <= 2) {
            setError({ hasError: true, msg: "Please enter a valid background color" });
            return;
        }
        dispatch(updateElementAction(elementId, { styles: elementStyle }));
        setDoReload();
    };

    return (
        <>
            <div className="side-control-panel w-100">
                <div className="border border-2 p-5 py-4 m-2">
                    <div className="text-center pb-3 fw-bold">{label}</div>
                    <div className="size">
                        <div className="width pb-4 row fs-6">
                            <div className="fw-bold col-4">Width</div>
                            <div className="col-8 px-3 d-flex">
                                <input
                                    className="form-control"
                                    onChange={handleChange}
                                    type={"number"}
                                    name="width"
                                    placeholder=""
                                    value={elementStyle.width ? parseInt(elementStyle.width.replace("px", "")) : ""}
                                />
                                <span>px</span>
                            </div>
                        </div>
                        <div className="height pb-4 d-flex justify-content-between fs-6">
                            <div className="fw-bold col-4">Height</div>
                            <div className="col-8 px-3 d-flex">
                                <input
                                    className="form-control"
                                    onChange={handleChange}
                                    type={"number"}
                                    name="height"
                                    placeholder=""
                                    value={elementStyle.height ? parseInt(elementStyle.height.replace("px", "")) : ""}
                                />
                                <span>px</span>
                            </div>
                        </div>
                    </div>
                    <div className="color pb-4 d-flex justify-content-between fs-6">
                        <div className="fw-bold col-4">Color</div>
                        <div className="col-8 px-3">
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type={"text"}
                                name="color"
                                placeholder=""
                                value={elementStyle.color}
                            />
                        </div>
                    </div>
                    <div className="background-color pb-4 d-flex justify-content-between fs-6">
                        <div className="fw-bold col-4">Background Color</div>
                        <div className="col-8 px-3">
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type={"text"}
                                name="backgroundColor"
                                placeholder=""
                                value={elementStyle.backgroundColor}
                            />
                        </div>
                    </div>
                    {error.hasError && <div className="text-danger fs-7 pb-2">{error.msg}</div>}
                    <div className="">
                        <div className="pt-3 d-flex justify-content-between align-items-center">
                            <div className="px-3">
                                <button onClick={handleReset} className="btn btn-outline-dark">
                                    Reset
                                </button>
                            </div>
                            <div className="px-3">
                                <button onClick={handleSave} className="btn btn-dark">
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center py-4">
                            <button
                                onClick={() => {
                                    dispatch(removeElementAction(elementId));
                                    setControlPanelData({ isOpen: false, elementId: "" });
                                }}
                                className="btn btn-outline-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideControlPanel;
