import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => {
  if (numeral.locales["user-locale"] === undefined) {
    numeral.register("locale", "user-locale", {
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t"
      },
      currency: {
        symbol: "₪"
      }
    });
    numeral.locale("user-locale");
  }

  const amountShekel = numeral(amount / 100).format("$0,0.00");
  return (
    <Link
      className="list-item"
      to={ `/edit/${id}` }>
      <div>
        <div className="list-item__sub-title">
          { moment(createdAt).format("DD MMMM, YYYY") }
        </div>
        <h3  className="list-item__title">{ description }</h3>
        <div>{ note }</div>
      </div>
      <h3 className="list-item__data">{ amountShekel }</h3>
      </Link>
  );
};

export default ExpenseListItem;