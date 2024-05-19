import { useState } from "react";
import "./style.scss";
import LinkInput from "../../components/LinkInput";
import ImageUpload from "../../components/ImageUpload";
import PdfUpload from "../../components/PdfUpload";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState([]);

  const addLink = (link) => {
    setResources([...resources, { ...link, type: "link" }]);
  };

  const addImage = (image) => {
    setResources([...resources, { ...image, type: "image" }]);
  };

  const addPdf = (pdf) => {
    setResources([...resources, { ...pdf, type: "pdf" }]);
  };

  return (
    <>
      <div>
        <div className="Header">
          <div className="container">
            <div className="left">
              <span>Course builder</span>
            </div>

            <button
              onClick={() => setOpen(!open)}
              // onMouseLeave={() => setOpen(false)}
              className="right"
            >
              <img src="header_img/AddOutlined.svg" alt="" />
              <span>Add</span>
              <img className="rot" src="header_img/CaretUpFilled.svg" alt="" />
            </button>
          </div>
          {open && (
            <div onMouseEnter={() => setOpen(true)} className="menu">
              <button className="btn">
                <img src="dropdown/mid.svg" alt="" />
                <LinkInput onAdd={addLink} />
              </button>
              <button className="btn">
                <img src="dropdown/prefix.svg" alt="" />
                <ImageUpload onUpload={addImage} />
              </button>
              <button className="btn">
                <img src="dropdown/prefix.svg" alt="" />
                <PdfUpload onUpload={addPdf} />
              </button>
            </div>
          )}
        </div>
        <div className="res">
          <h2>Resources</h2>
          <ul>
            {resources.map((resource, index) => (
              <li className="item" key={index}>
                {resource.type === "link" && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.name}
                  </a>
                )}
                {resource.type === "image" && (
                  <img src={resource.url} alt={resource.name} />
                )}
                {resource.type === "pdf" && (
                  <embed
                    src={resource.url}
                    type="application/pdf"
                    width="100%"
                    height="400px"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
