import { observer } from "mobx-react-lite";
import React from "react";

import { Tag } from "../types";
import TagComponent from "./Tag";

interface Props {
    tags: Tag[];
}

const TagList = ({ tags }: Props) => {
    return (
        <div>
            <ul>
                {tags.map((t) => (
                    <TagComponent key={t.tag} tag={t} />
                ))}
            </ul>
        </div>
    );
};

export default observer(TagList);
