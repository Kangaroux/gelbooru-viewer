import { observer } from "mobx-react-lite";
import React from "react";
import { Tag } from "../types";

export interface Props {
    tag: Tag;
}

export const TagComponent = observer(({ tag }: Props) => {
    return <div>{tag.tag}</div>;
});
