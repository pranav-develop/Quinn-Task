//jshint esversion: 9

import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";

function Preview() {
    const elements = useSelector((store) => store.element);

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
                            inDragCanvas={false}
                            id={element.id}
                            styles={element.styles}
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
                            inDragCanvas={false}
                            id={element.id}
                            styles={element.styles}
                        />
                    </>
                );
            } else return <></>;
        });
    };

    return (
        <div className="preview-page">
            <div>{allScreenElements()}</div>
        </div>
    );
}

export default Preview;
