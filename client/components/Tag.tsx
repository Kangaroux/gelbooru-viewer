import { observer } from "mobx-react-lite";
import React from "react";

import { Tag } from "../types";

interface Props {
    tag: Tag;
}

const TagComponent = ({ tag }: Props) => {
    return <div>{tag.tag}</div>;
};

export default observer(TagComponent);
