import { observer } from "mobx-react-lite";
import React from "react";

import { store } from "..";
import ScrollContainer from "./ScrollContainer";
import Sidebar from "./Sidebar";

const App = () => {
    return (
        <div>
            <React.StrictMode>
                <Sidebar />
                <ScrollContainer posts={store.posts} />
            </React.StrictMode>
        </div>
    );
};

export default observer(App);
