import { observer } from "mobx-react-lite";
import React from "react";

import { Tag } from "../types";
import { TagComponent } from "./Tag";

export interface Props {
    tags: Tag[];
}

export const TagList = observer(({ tags }: Props) => {
    return (
        <div>
            <ul>
                {tags.map((t) => (
                    <TagComponent key={t.tag} tag={t} />
                ))}
            </ul>
        </div>
    );
});
