import React from "react";

const Error = () => {
  return (
    <div>
      <h3>
        Failed to call the API please contact{" "}
        <a href="mailto:support@rxnt.com?Subject=Failed to call IMO&Body=Failed to call IMO, please fix it.">
          support@rxnt.com
        </a>
      </h3>
    </div>
  );
};

export default Error;
