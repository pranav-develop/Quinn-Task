//jshint esversion: 9
import React from "react";
import Button from "../components/Button";
import DragCanvas from "../components/DragCanvas";
import Input from "../components/Input";

function MainPage() {
    return (
        <div className="">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <div className="border p-5 border-2">
                            <div className="row row-cols-1">
                                <Input />
                                <Button />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <DragCanvas />
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
