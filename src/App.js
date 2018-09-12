import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: [],
      Message: ""
    };
  }

  addProduct(e) {
    e.preventDefault();
    const { buyItems } = this.state;
    const newProduct = {
      key: this.newProduct.value,
      naam: this.newProduct.value,
      aantal: this.newProductAantal.value,
      actief: true
    };
    const isOnList = buyItems.includes(newProduct.naam);
    if (isOnList) {
      this.setState({
        message: "Product staat al op de lijst."
      });
    } else {
      newProduct.naam !== "" &&
        this.setState({
          buyItems: [...this.state.buyItems, newProduct],
          message: ""
        });
    }

    this.addForm.reset();
  }

  removeItem(item) {
    const newBuyItems = this.state.buyItems.filter(buyItems => {
      return buyItems !== item;
    });
    this.setState({
      buyItems: [...newBuyItems]
    });

    if (newBuyItems.length === 0) {
      this.setState({
        message: "Geen boodschappen op de lijst!"
      });
    }
  }

  clearAll() {
    this.setState({
      buyItems: [],
      message: "Geen boodschappen op de lijst!"
    });
  }

  sortTable() {
    const buyItems = this.state.buyItems;
    console.log(buyItems);
    buyItems.sort(function(a, b) {
      if (a.naam > b.naam) {
        return 1;
      }
      if (a.naam < b.naam) {
        return -1;
      }

      return 0;
    });
    console.log(buyItems);
    this.setState({
      buyItems: [...buyItems]
    });
  }

  inActivate(item) {
    const buyItems = this.state.buyItems;
    if (item.actief === true) {
      item.actief = false;
      this.setState({
        buyItems: [...buyItems]
      });
    } else {
      item.actief = true;
      this.setState({
        buyItems: [...buyItems]
      });
    }
  }

  render() {
    const { buyItems, message } = this.state;
    return (
      <div>
        <header>
          <h1>Boodschappen lijst</h1>

          <form
            ref={input => {
              this.addForm = input;
            }}
            className="form-inline"
            onSubmit={e => {
              this.addProduct(e);
            }}
          >
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">
                Voeg product toe
              </label>
              <input
                ref={input => {
                  this.newProduct = input;
                }}
                type="text"
                placeholder="Brood"
                className="form-control"
                id="newItemInput"
              />
              <input
                ref={inputAantal => {
                  this.newProductAantal = inputAantal;
                }}
                type="number"
                placeholder="1"
                className="form-control"
                id="newAantalInput"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {" "}
              Toevoegen{" "}
            </button>
          </form>
        </header>
        <div className="content">
          {(message !== "" || buyItems.length === 0) && (
            <p className="message text-danger">{message}</p>
          )}
          {buyItems.length > 0 && (
            <table className="table table-hover table-responsive">
              <caption />
              <thead className="thead-dark">
                <tr>
                  <th>Done</th>
                  <th>Aantal</th>
                  <th>Product</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyItems.map(item => {
                  return (
                    <tr
                      key={Math.floor(Math.random() * 10000)}
                      className={item.actief ? "actief" : "inactief"}
                    >
                      <td>
                        <button
                          onClick={e => this.inActivate(item)}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          x
                        </button>
                      </td>
                      <th scope="row">{item.aantal}</th>
                      <td>{item.naam}</td>
                      <td>
                        <button
                          onClick={e => this.removeItem(item)}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          Verwijderen
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-right">
                    <button
                      onClick={e => this.sortTable()}
                      className="btn btn-default btn xs"
                    >
                      Sorteren op #
                    </button>
                  </td>
                  <td colSpan="0">&nbsp;</td>
                  <td className="text-right">
                    <button
                      onClick={e => this.clearAll()}
                      className="btn btn-default btn-xs"
                    >
                      Clear list
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
}
