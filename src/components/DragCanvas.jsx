//jshint esversion: 9
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import DragTypes from "../utils/DragTypes";
import { getRelativeCoordinate } from "../utils/helper";
import Button from "./Button";
import Input from "./Input";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addNewElementAction, updateElementAction } from "../redux/Elements/ElementActions";

function DragCanvas({ setControlPanelData }) {
    const elements = useSelector((store) => store.element);

    const dispatch = useDispatch();

    const outerRef = useRef();

    const [{ isOver }, drop] = useDrop({
        accept: [DragTypes.BUTTON, DragTypes.TEXT],
        drop: (item, monitor) => {
            if (item.prevData && item.prevData.inDragCanvas) {
                dispatch(
                    updateElementAction(item.prevData.id, {
                        position: getRelativeCoordinate(
                            monitor.getSourceClientOffset(),
                            outerRef.current.offsetLeft,
                            outerRef.current.offsetTop
                        ),
                    })
                );
                // setElements((prevState) => {
                //     prevState = prevState.filter((element) => element.id !== item.prevData.id);
                //     return [...prevState];
                // });
            } else {
                const newElement = {};
                newElement.id = nanoid();
                newElement.elementType = item.type;
                newElement.name = item.name;
                newElement.values = item.values;
                newElement.position = getRelativeCoordinate(
                    monitor.getSourceClientOffset(),
                    outerRef.current.offsetLeft,
                    outerRef.current.offsetTop
                );
                newElement.styles = item.styles;
                dispatch(addNewElementAction(newElement));
                // setElements((prevState) => {
                //     return [...prevState, newElement];
                // });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const allScreenElements = () => {
        return elements.map((element, index) => {
            console.log(element);
            if (element.name === "button") {
                return (
                    <>
                        <Button
                            key={element.id}
                            values={element.values}
                            position={element.position}
                            inDragCanvas={true}
                            id={element.id}
                            styles={element.styles}
                            setControlPanelData={setControlPanelData}
                        />
                    </>
                );
            } else if (element.name === "text") {
                return (
                    <>
                        <Input
                            key={element.id}
                            values={element.values}
                            position={element.position}
                            inDragCanvas={true}
                            id={element.id}
                            styles={element.styles}
                            setControlPanelData={setControlPanelData}
                        />
                    </>
                );
            } else return <></>;
        });
    };

    return (
        <div>
            <div ref={outerRef} className="w-100">
                <div ref={drop} className="border resizeable-canvas border-1 border-dark">
                    {/* <div className="test position-absolute" style={{ width: "5px", height: "5px", backgroundColor: "red" }}></div> */}
                    {elements && allScreenElements()}
                </div>
            </div>
        </div>
    );
}

export default DragCanvas;
