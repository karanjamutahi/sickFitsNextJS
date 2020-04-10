import React, { Component } from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Loading extends Component {
    render() {
        return (
        <div className="sweet-loading">
            <ClipLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={this.props.loading}
            />
        </div>
        );
    }
}

export default Loading;