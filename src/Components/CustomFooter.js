import React from "react";

import "./CustomFooter.css";

const CustomFooter = () => {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="footer px-4 py-4 bg-light">
        <div className="container-fluid">
          <div className="d-flex small">
            <div className="text-justify">
              <span>COPYRIGHT &copy;</span>
              <span> {new Date().getFullYear()}</span>
              <div>YNL LOGISTICS & SERVICES SDN. BHD. ALL RIGHTS RESERVED.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomFooter;
