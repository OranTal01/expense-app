import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
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
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>
        {amountShekel}-{moment(createdAt).format("DD MMMM, YYYY")}
      </p>
    </div>
  );
};

export default ExpenseListItem;