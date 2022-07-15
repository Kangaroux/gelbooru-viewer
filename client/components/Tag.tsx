import React from "react";
import { Tag } from "../types";

export interface Props {
    tag: Tag;
}

export const TagComponent = ({ tag }: Props) => {
    return <div>{tag.tag}</div>;
};
