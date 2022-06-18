import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../StyleSheets/Form.css";

class form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "default",
      area: "default",
      shop_name: "",
      open_date: null,
      close_date: null,
    };
  }

  categoryHandler = (event) => {
    this.setState({
      category: event.target.value,
    });
  };
  areaHandler = (event) => {
    this.setState({
      area: event.target.value,
    });
  };
  shopNameHandler = (event) => {
    this.setState({
      shop_name: event.target.value,
    });
  };

  openDateHandler = (event) => {
    if (
      this.state.close_date !== null &&
      event.getTime() > this.state.close_date.getTime()
    ) {
      document.getElementById("error").innerHTML =
        "* Opening date cannot be greater than Closing date";
      window.setTimeout(() => document.getElementById("error").focus(), 0);
    } else {
      this.setState({
        open_date: event,
      });
      document.getElementById("error").innerHTML = "";
    }
  };
  closeDateHandler = (event) => {
    if (
      this.state.open_date !== null &&
      this.state.open_date.getTime() > event.getTime()
    ) {
      document.getElementById("error").innerHTML =
        "* Closing date cannot be lesser than Opening date";
      window.setTimeout(() => document.getElementById("error").focus(), 0);
    } else {
      this.setState({
        close_date: event,
      });
      document.getElementById("error").innerHTML = "";
    }
  };

  componentDidMount = () => {
    let sname = document.getElementById("shopname");
    sname.addEventListener("input", () => {
      if (
        sname.validity.tooLong ||
        sname.validity.tooShort ||
        sname.validity.valueMissing
      ) {
        sname.setCustomValidity("Name must be minimum of 6 characters.");
        sname.reportValidity();
      } else {
        sname.setCustomValidity("");
      }
    });
  };

  render() {
    return (
      <div className="parentFlex">
        <form
          id="main"
          className="row g-4  form-control flexform"
          onSubmit={this.props.submitHandler}
        >
          <div id="error"></div>
          <div className="f1 col-md-4">
            <label htmlFor="shopname" className="form-label">
              Shop-Name
            </label>
            <input
              type="text"
              className="form-control offset-md-1"
              id="shopname"
              name="shopname"
              required
              pattern="[A-Za-z ]{6,}"
              title="Only alphabets and minimum 6 characters allowed"
              value={this.state.shop_name}
              onChange={this.shopNameHandler}
            />
          </div>

          <div className="f1 col-md-4">
            <label htmlFor="area" className="form-label">
              Area
            </label>
            <select
              id="area"
              name="area"
              className="form-select offset-md-1"
              value={this.state.area}
              onChange={this.areaHandler}
              required={true}
            >
              <option value={"default"} disabled>
                Choose...
              </option>
              {this.props.listOfAreas.map((ar, index) => (
                <option key={index}>{ar}</option>
              ))}
            </select>
          </div>

          <div className="f1 col-md-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-select offset-md-1"
              value={this.state.category}
              onChange={this.categoryHandler}
              required={true}
            >
              <option value={"default"} disabled>
                Choose...
              </option>
              {this.props.listOfCategories.map((cg, index) => (
                <option key={index}>{cg}</option>
              ))}
            </select>
          </div>

          <div className="f1 col-md-4">
            <label htmlFor="opendate" className="form-label">
              Open-Date
            </label>
            <DatePicker
              className="form-control offset-md-1"
              id="opendate"
              name="opendate"
              selected={this.state.open_date}
              onChange={this.openDateHandler}
              dateFormat="dd/MM/yyyy"
              required
              title="Opening date cannot be greater than Closing date"
            />
          </div>

          <div className="f1 col-md-4">
            <label htmlFor="closedate" className="form-label">
              Close-Date
            </label>
            <DatePicker
              className="form-control col-md-4 offset-md-1"
              id="closedate"
              name="closedate"
              selected={this.state.close_date}
              onChange={this.closeDateHandler}
              dateFormat="dd/MM/yyyy"
              required
              title="Closing date cannot be lesser than Opening date"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default form;
