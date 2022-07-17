import { observer } from "mobx-react-lite";
import React from "react";

import { store } from "..";
import SearchButton from "./SearchButton";
import TagList from "./TagList";
import TagSearch from "./TagSearch";
import "./Sidebar.scss";

export const Sidebar = () => {
    const open = store.sidebarOpen;

    let className = "sidebar";
    let content;

    if (open) {
        className += " sidebar-open";
        content = (
            <>
                <div className="sidebar-content">
                    <SearchButton />
                    <TagSearch />
                    <TagList tags={store.tags} />
                </div>
                {/* <div className="sidebar-footer">
                    <a
                        href="https://github.com/Kangaroux/imgtweets"
                        target="_blank"
                        title="View the project on Github"
                    >
                        Github
                    </a>
                </div> */}
            </>
        );
    }

    return (
        <div className={className}>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <button
                        className="sidebar-menu-btn"
                        onClick={() => store.setSidebarOpen(!open)}
                    >
                        {open ? "close" : "menu"}
                    </button>
                </div>
                {content}
            </div>
        </div>
    );
};

export default observer(Sidebar);
