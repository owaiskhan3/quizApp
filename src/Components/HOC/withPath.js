import React from "react";

const wrapperComponent = Component => {
  return class extends React.Component {
    componentDidMount() {
      localStorage.path = this.props.location.pathname;
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};

export default wrapperComponent;
