import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import styles from "./Tool.module.scss"

export const Remark = ({ children, type }) => {
  return (
    <p className={styles.remark}>
      <span className={styles.type}>{type}</span>
      {children}
    </p>
  );
};

export const Annotate = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      open={open}
      title={title}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <span className={styles.Tooltip}>{children}</span>
    </Tooltip >
  );
};

export const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    {children}
  </span>
);

export const Youtube = ({ children, id, start = 0 }) => {
  const src = children ?? id;
  return (
    <div className={styles.videoResponsive}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${src}?start=${start}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export const Bilibili = ({ children, id }) => {
  const src = children ?? id;
  return (
    <div className={styles.videoResponsive}>
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${src}&page=1&as_wide=1&high_quality=1&danmaku=0`}
        scrolling="no"
        border="0"
        frameBorder="no"
        allowFullScreen
      />
    </div>
  );
}

export const Recommend = (props) => {
  return <span style={{ color: "#999" }}>推薦：{props.level || props.children}</span>
}