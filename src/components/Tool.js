import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Tooltip from "@mui/material/Tooltip";
export { Tabs, TabItem };
import { useLocation } from "react-router-dom";

export const Remark = ({ children, type }) => {
  return (
    <p className="remark">
      <span className="type">{type}</span>
      {children}
    </p>
  );
};

export const Annotate = ({ children, title }) => {
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);
  return (
    <Tooltip
      open={tooltipIsOpen}
      onOpen={() => setTooltipIsOpen(true)}
      onClose={() => setTooltipIsOpen(false)}
      title={title}
      onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
    >
      <span>{children}</span>
    </Tooltip>
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
  const src = typeof children === "undefined" ? id : children;
  return (
    <div className="video-responsive">
      <iframe
        width="805"
        height="390"
        src={`https://www.youtube-nocookie.com/embed/${src}?start=${start}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export const Breadcrumbs = () => {
  const pathName = useLocation().pathname.split("/");
  let grade = pathName[pathName.length - 3];
  let yearTerm;
  switch (grade) {
    case "S1":
      yearTerm = "中一";
      break;
    case "S2":
      yearTerm = "中二";
      break;
    case "S3":
      yearTerm = "中三";
      break;
    default:
      yearTerm = grade;
  }

  let chapter = pathName[pathName.length - 2].charAt(2);
  switch (chapter) {
    case "一":
    case "二":
    case "三":
    case "四":
      yearTerm += "上";
      break;
    case "六":
    case "七":
    case "八":
    case "九":
      yearTerm += "下";
      break;
    default:
  }

  return (
    <nav className="breadcrumbs source-text">
      <ul className="breadcrumbs breadcrumbs--sm">
        <li className="breadcrumbs__item">
          <a
            className="breadcrumbs__link"
            href={pathName.slice(0, -2).join("/")}
          >
            {yearTerm}
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a
            className="breadcrumbs__link"
            href={
              "/library/category/" + grade + "/" + pathName[pathName.length - 2]
            }
          >
            {pathName[pathName.length - 2]}
          </a>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <a className="breadcrumbs__link" href={pathName.join("/")}>
            {pathName[pathName.length - 1].replace(
              /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/g,
              "$& "
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export function Recommend(props) {
  return <span style={{ color: "#999" }}>推薦：{props.level}</span>
}