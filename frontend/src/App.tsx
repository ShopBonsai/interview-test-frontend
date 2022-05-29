import './App.css';
import React from "react";
import {RecoilProductList} from "./state/recoil/recoilProductList";
import {RecoilRoot} from "recoil";

const App: React.FC = () =>
    <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
            <RecoilProductList/>
        </React.Suspense>
    </RecoilRoot>;

export default App;
