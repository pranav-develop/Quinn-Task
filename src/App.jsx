//jshint esversion: 9
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Preview from "./pages/Preview";

function App() {
    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                    <Routes>
                        <Route path="/preview" element={<Preview />} />
                    </Routes>
                </BrowserRouter>
            </DndProvider>
        </Provider>
    );
}

export default App;
