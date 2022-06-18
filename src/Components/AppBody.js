import React, { Component } from "react";
import { addShop, deleteShop } from "../redux/actionCreators.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopCard from "./ShopCard";
import { connect } from "react-redux";
import "../StyleSheets/AppBody.css";
import "../StyleSheets/navbar.css";
import Navbar from "./Navbar";
import Form from "./Form";

class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplay: false,
      searchVal: "",
      listOfShops: [],
      area: "",
      category: "",
      categoryList: [
        "Grocery",
        "Butcher",
        "Baker",
        "Chemist",
        "Stationery Shop",
      ],
      areaList: [
        "Thane",
        "Pune",
        "Mumbai Suburban",
        "Nashik",
        "Nagpur",
        "Ahmednagar",
        "Solapur",
      ],
      areaFilter: false,
      categoryFilter: false,
      openFilter: false,
      closeFilter: false,
    };
  }

  universalFilter = () => {
    let areaF = this.state.areaFilter;
    let cateF = this.state.categoryFilter;
    let openF = this.state.openFilter;
    let closeF = this.state.closeFilter;
    let dummyList = this.props.shopList;

    // Alternative Logic

    /*for(let k = 0 ; k < 4 ; k++)
    {
        switch(key){
            case areaF===key && k===0 :
                    console.log("Area ran")
                    break;

            case cateF===key && k===1 :
                    console.log("Category ran")
                    break;
            case openF===key && k===2 :
                console.log("OpenDate ran")
                break;
            case closeF===key && k===3 :
                console.log("CloseDate ran")
                break;
        }
    }*/

    if (areaF) {
      console.log("Area Done");
      dummyList = this.areaFilterArray(this.state.area, dummyList);
    }

    if (cateF) {
      console.log("Category Done");
      dummyList = this.categoryFilterArray(this.state.category, dummyList);
    }

    if (openF) {
      console.log("OpenDate Done");
      dummyList = this.openFilterArray(dummyList);
    }

    if (closeF) {
      console.log("CloseDate Done");
      dummyList = this.closeFilterArray(dummyList);
    }

    this.setState(
      {
        listOfShops: dummyList,
      }
      // ,
      // () => console.log(this.state.listOfShops)
    );
  };

  categoryHandler = (event) => {
    let val = event.target.value;
    this.setState(
      {
        category: val,
      },
      () => this.universalFilter()
    );
  };

  categoryFilterArray = (val, list) => {
    let dummy = list.filter((shop) => {
      if (val === "") return true;
      else if (shop.category === val) return true;
      else return false;
    });
    return dummy;
  };

  categoryfilterHandler = (event) => {
    let val = event.target.checked;
    this.setState({
      categoryFilter: val,
    });
    if (!val) {
      document.getElementById("category").value = "default";
      this.setState(
        {
          category: "",
        },
        () => this.universalFilter()
      );
    }
  };

  openFilterHandler = (event) => {
    let val = event.target.checked;
    this.setState(
      {
        openFilter: val,
      },
      () => this.universalFilter()
    );
    if (val) {
      let str = document.getElementById("close");
      if (str.checked === true) {
        str.checked = false;
        this.setState({
          closeFilter: false,
        });
      }
    }
  };

  openFilterArray = (list) => {
    let today = this.getTodaysFormattedDate();
    let dummy = list.filter((shop) => {
      if (this.checkIfDateLiesInRange(today, shop.openDate, shop.closeDate)) {
        console.log(
          this.checkIfDateLiesInRange(today, shop.openDate, shop.closeDate)
        );
        return true;
      } else return false;
    });
    return dummy;
  };

  closeFilterHandler = (event) => {
    let val = event.target.checked;
    this.setState(
      {
        closeFilter: val,
      },
      () => this.universalFilter()
    );
    if (val) {
      let str = document.getElementById("open");
      if (str.checked === true) {
        str.checked = false;
        this.setState({
          openFilter: false,
        });
      }
    }
  };

  closeFilterArray = (list) => {
    let today = this.getTodaysFormattedDate();
    let dummy = list.filter((shop) => {
      if (!this.checkIfDateLiesInRange(today, shop.openDate, shop.closeDate))
        return true;
      else return false;
    });
    return dummy;
  };

  getTodaysFormattedDate = () => {
    let dt = new Date();
    let formattedDate = `${dt.getDate() < 10 ? "0" : ""}${dt.getDate()}`;
    let fromattedMonth = `${dt.getMonth() + 1 < 10 ? "0" : ""}${
      dt.getMonth() + 1
    }`;
    let formattedYear = dt.getFullYear();
    let today = `${formattedDate}/${fromattedMonth}/${formattedYear}`;
    return today;
  };

  checkIfDateLiesInRange = (today, startDate, endDate) => {
    let todayDate = today.split("/");
    let start = startDate.split("/");
    let end = endDate.split("/");
    for (let k = 2; k >= 0; k--) {
      if (
        parseInt(todayDate[k]) > parseInt(start[k]) &&
        parseInt(todayDate[k]) < parseInt(end[k])
      ) {
        return true;
      } else if (
        parseInt(todayDate[k]) === parseInt(start[k]) &&
        parseInt(todayDate[k]) === parseInt(end[k])
      ) {
        continue;
      }
      return false;
    }
  };

  areaHandler = (event) => {
    let val = event.target.value;
    this.setState(
      {
        area: val,
      },
      () => this.universalFilter()
    );
  };

  areaFilterArray = (val, list) => {
    let dummy = list.filter((shop) => {
      if (val === "") return true;
      else if (shop.area === val) return true;
      else return false;
    });
    return dummy;
  };

  areafilterHandler = (event) => {
    let val = event.target.checked;
    this.setState({
      areaFilter: val,
    });
    if (!val) {
      document.getElementById("area").value = "default";
      this.setState(
        {
          area: "",
        },
        () => this.universalFilter()
      );
    }
  };

  addShopClickHandler = () => {
    this.setState({
      formDisplay: true,
    });
  };

  addHomeClickHandler = () => {
    this.setState({
      formDisplay: false,
    });
  };

  searchBarHandler = (event) => {
    this.setState(
      {
        searchVal: event.target.value,
      },
      () => console.log(this.state.searchVal)
    );
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    let shopName = event.target.shopname.value;
    let area = event.target.area.value;
    let category = event.target.category.value;
    let openDate = event.target.opendate.value;
    let closeDate = event.target.closedate.value;

    if (area !== "default" && category !== "default") {
      let tmp = {
        name: shopName,
        area: area === "default" ? "Unknown" : area,
        category: category === "default" ? "Uncategorized" : category,
        openDate: openDate,
        closeDate: closeDate,
      };
      this.props.addShop(tmp);
      this.setState({
        formDisplay: false,
      });
    } else {
      document.getElementById("error").innerHTML = `${
        area === "default" ? "* Area cannot be null " : ""
      }${category === "default" ? "\n* Category cannot be null " : ""}`;
      document.getElementById("error").focus();
    }
  };

  componentDidMount = () => {
    this.setState({
      listOfShops: this.props.shopList,
    });
    window.addEventListener("beforeunload", this.saveLocally);
  };

  componentDidUpdate = (prevprops, prevState) => {
    if (this.props.shopList !== prevprops.shopList) {
      this.setState({
        listOfShops: this.props.shopList,
      });
      console.log(this.props.shopList);
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.saveLocally);
  };

  saveLocally = (e) => {
    console.log("saved locally called");
    localStorage.setItem("shopList", JSON.stringify(this.props.shopList));
  };

  deleteShopHandler = (id) => {
    this.props.deleteShop(id);
  };

  render() {
    return (
      <div id="appBodyRoot">
        <Navbar
          shopclickHandler={this.addShopClickHandler}
          homeclickhandler={this.addHomeClickHandler}
          searchInputHandler={this.searchBarHandler}
        />

        {this.state.formDisplay ? (
          <Form
            listOfCategories={this.state.categoryList}
            listOfAreas={this.state.areaList}
            submitHandler={this.formSubmitHandler}
          />
        ) : (
          <>
            <div className="filter-group">
              <div className="filterName">
                Filters
                <i className="fa-solid fa-filter"></i>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="areaInput"
                  onChange={this.areafilterHandler}
                />
                <label className="form-check-label" htmlFor="areaInput">
                  Area
                </label>
                <select
                  id="area"
                  name="area"
                  disabled={!this.state.areaFilter}
                  className="form-select"
                  defaultValue={"default"}
                  onChange={this.areaHandler}
                >
                  <option value={"default"} disabled>
                    Choose...
                  </option>
                  {this.state.areaList.map((ar, index) => (
                    <option key={index}>{ar}</option>
                  ))}
                </select>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  // value=""
                  id="categoryInput"
                  onChange={this.categoryfilterHandler}
                />
                <label className="form-check-label" htmlFor="categoryInput">
                  Category
                </label>
                <select
                  disabled={!this.state.categoryFilter}
                  id="category"
                  name="category"
                  className="form-select"
                  defaultValue={"default"}
                  onChange={this.categoryHandler}
                >
                  <option value={"default"} disabled>
                    Choose...
                  </option>
                  {this.state.categoryList.map((cg, index) => (
                    <option key={index}>{cg}</option>
                  ))}
                </select>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  // value=""
                  id="open"
                  onChange={this.openFilterHandler}
                />
                <label className="form-check-label" htmlFor="open">
                  Open
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  // value=""
                  id="close"
                  onChange={this.closeFilterHandler}
                />
                <label className="form-check-label" htmlFor="close">
                  Close
                </label>
              </div>
            </div>

            <div className="grid">
              {this.state.listOfShops.map((shop, index) => (
                <ShopCard
                  id={index}
                  key={index}
                  data={shop}
                  deleteHandler={this.deleteShopHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shopList: state.Shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShop: (tmp) => dispatch(addShop(tmp)),
    deleteShop: (tmp) => dispatch(deleteShop(tmp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBody);
