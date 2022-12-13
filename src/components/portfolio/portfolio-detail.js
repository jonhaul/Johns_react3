import React, { Component } from "react";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super( props);
    }

      componentWillmount() {
        this.getPortfolioItem();
    }

      getPortfolioItem() {
        axios
          .get(
            `https://zoran.devcamp.space/portfolio/portfolio_items/${
              this.props.match.params.slug
            }`,
            { withCredentials: true }
          )
          .then(response => {
            this.setState({
                PortfolioItem: response.data.portfolio_item
            });
          })
          .catch(error => {
            console.log("getportfolioitem error", error);
          });
      }

    render() {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.PortfolioItem;

        const bannerStyles = {
          backgroundImage: "url(" + banner_image_url + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center"
        };

        const logoStyles = {
          width: "200px"
        };

    return (
      <div className="port-det-wrap">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} />
        </div>

        <div className="port-det-des-wrap">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-cont-wrap">
            <a href={url} className="site-link" target="_blank">
              visit {name}
            </a>
        </div>
      </div>
    );
  }
}