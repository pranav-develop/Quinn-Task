//jshint esversion: 9
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import DragCanvas from "../components/DragCanvas";
import Input from "../components/Input";
import SideControlPanel from "../components/SideControlPanel";
import { removeAllElements } from "../redux/Elements/ElementActions";

function MainPage() {
    const dispatch = useDispatch();

    const [controlPanelData, setControlPanelData] = useState({
        elementId: "",
        isOpen: false,
    });

    const [reload, setReload] = useState(false);

    const setDoReload = () => {
        setReload(!reload);
    };

    const clearCanvas = () => {
        dispatch(removeAllElements());
        setControlPanelData({ isOpen: false, elementId: "" });
    };

    return (
        <div className="">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <div className="w-100">
                            <div className="fw-bold fs-5 py-3">Elements</div>
                            <div className="row row-cols-1 position-relative">
                                <div className="position-relative py-3">
                                    <Input />
                                </div>

                                <div className="position-relative py-3">
                                    <Button />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <DragCanvas setControlPanelData={setControlPanelData} />
                    </div>
                    <div className="col-3">
                        {controlPanelData.isOpen && (
                            <SideControlPanel
                                setDoReload={setDoReload}
                                elementId={controlPanelData.elementId}
                                setControlPanelData={setControlPanelData}
                            />
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <div className="px-3">
                        <button onClick={clearCanvas} className="btn btn-outline-dark px-5 py-3">
                            Clear Canvas
                        </button>
                    </div>
                    <div className="btn btn-dark px-5 py-3">
                        <Link className="color-white text-decoration-none" rel="no-referrer" target={"_blank"} to={"/preview"}>
                            Preview
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
