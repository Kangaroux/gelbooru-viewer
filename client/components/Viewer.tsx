import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "..";

export const Viewer = observer(() => {
    return (
        <div>
            {store.posts.map((p) => (
                <div>
                    <img src={p.sample.url} />
                </div>
            ))}
        </div>
    );
});
