import { observer } from "mobx-react-lite";
import React from "react";
import { Search } from "./Search";
import { TagList } from "./TagList";
import { store } from "..";

export const App = observer(() => {
    return (
        <div>
            <Search />
            <TagList tags={store.tags} />
        </div>
    );
});
