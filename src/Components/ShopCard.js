import React, { Component } from "react";
import "../StyleSheets/Card.css";

class ShopCard extends Component {
  render() {
    // console.log(this.props.data);
    // console.log(this.props.id);
    const { name, area, category, openDate, closeDate } = this.props.data;
    // let openStr = `${openDate.getDate()}/${openDate.getMonth() + 1}/${
    //   openDate.getFullYear
    // }`;
    // let closeStr = `${closeDate.getDate()}/${closeDate.getMonth() + 1}/${
    //   closeDate.getFullYear
    // }`;
    // console.log(openStr);
    // console.log(closeStr);
    return (
      <div className="card_size">
        <div className="card" style={{ width: "18rem" }}>
          {/* <img src="..." className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Area : {area}</li>
            <li className="list-group-item">Category : {category}</li>
            <li className="list-group-item">Open : {openDate}</li>
            <li className="list-group-item">Close : {closeDate}</li>
          </ul>

          <div className="card-body">
            <a href="#" className="btn btn-outline-danger" onClick={ () => this.props.deleteHandler(this.props.id)}>
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCard;
