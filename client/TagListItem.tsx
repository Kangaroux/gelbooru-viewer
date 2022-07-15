import React from "react";
import { Tag } from "./api";

export interface Props {
    tag: Tag;
}

export const TagListItem = ({ tag }: Props) => {
    return <div>{tag.tag}</div>;
};
