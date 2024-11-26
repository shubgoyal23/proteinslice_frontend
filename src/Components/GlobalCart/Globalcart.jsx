import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Items from "./Items";
import { useNavigate } from "react-router-dom";
import { currencyConvert } from "../../service/currencyConvertor/currencyConvert";

function GlobalCart() {
  const cart = useSelector((state) => state.cart.items);
  const userCurrency = useSelector((state) => state.currency.userCurrency);
  const navigate = useNavigate();
  const [displayPrice, setDisplayPrice] = useState({
    amt: 0,
    symbol: "??",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentValue) => {
      let value =
        (currentValue.price *
          currentValue.Qty *
          (100 - currentValue.discount)) /
        100;
      return accumulator + value;
    }, 0);

    (async () => {
      const data = await currencyConvert(
        userCurrency,
        cart[0]?.currency,
        total
      );
      if (data) {
        setDisplayPrice(data);
      }
    })();
  }, [cart, userCurrency]);

  return (
    <div className="lg:p-6 p-3 flex flex-col lg:flex-row">
      <div className="min-h-72 min-w-60 flex-1 mt-4 lg:m-4 bg-gray-200 dark:bg-gray-600 rounded-lg lg:p-6 p-3 pt-10 pb-16 flex justify-start flex-col items-center">
        <div className="border-b-2 border-gray-700 dark:border-gray-300 w-full pb-2 mb-4">
          <h1 className="text-2xl">Cart</h1>
        </div>

        {cart.length === 0 ? <h1>Your cart is Empty</h1> : ""}

        {cart?.map((item) => (
          <Items data={item} key={item.id} />
        ))}

        <div className="border-t-2 border-gray-700 dark:border-gray-300 w-full pt-2 mt-4">
          <h1 className="text-2xl text-end">
            Subtotal ({cart.length} items): {displayPrice.symbol || "$"}
            {displayPrice?.amt?.toFixed(2)}
          </h1>
        </div>

        <button
          className="mt-10 h-12 w-4/5 px-6 rounded-full bg-amber-400 text-white"
          onClick={() => navigate("/checkout")}
        >
          Proceed to CheckOut
        </button>
      </div>
    </div>
  );
}

export default GlobalCart;
