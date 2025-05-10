import { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";

type Props = ReturnType<typeof mapStateToProps>;

class Head extends Component<Props> {
  render() {
    return (
      <Helmet>
        <title>{this.props.seoTitle}</title>
        <meta name="description" content={this.props.seoDescription} />
      </Helmet>
    );
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    seoTitle: state.settings.seo.seo_title,
    seoDescription: state.settings.seo.seo_description,
  };
};

export default connect(mapStateToProps)(Head);