import './App.css';
import React from "react";
import {JotaiProductList} from "./state/jotai/jotaiProductList";

const App: React.FC = () =>
    <React.Suspense fallback={<div>Loading...</div>}>
        <JotaiProductList/>
    </React.Suspense>

export default App;
