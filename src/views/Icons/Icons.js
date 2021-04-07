/*eslint-disable*/
import React from "react";
// @material-ui/core components
// core components

const getFileUrl = () => {
  const fileId = window.location.href.slice(35, window.location.href.length);
  const baseBucketId = "https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/";
  console.log(fileId);
  return (baseBucketId + fileId);
}

export default function Icons() {
  return (
    <div>
      {
        // <iframe id="fred" title="PDF in an i-Frame" src="https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/sample_tomi.pdf" frameborder="1" scrolling="auto" height="1100" width="850" ></iframe>

        <iframe
          style={{
            height:"1300px", width:"1300px"
          }}
          src={`https://docs.google.com/viewer?url=${getFileUrl()}&embedded=true`}
        />

        // <object width="100%" height="1000" data="https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/sample_tomi.pdf" type="application/pdf">   </object>
        // <object width="100%" height="1000" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf">   </object>
      }
    </div>
  );
}
