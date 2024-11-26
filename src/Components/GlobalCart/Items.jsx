import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, addQty, decreaseQty } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { currencyConvert } from "../../service/currencyConvertor/currencyConvert";

function Items({ data }) {
  const dispatch = useDispatch();
  const userCurrency = useSelector((state) => state.currency.userCurrency);
  const [displayPrice, setDisplayPrice] = useState({
    amt: 0,
    symbol: "??",
  });
  useEffect(() => {
    (async () => {
      const crr = await currencyConvert(
        userCurrency,
        data?.currency,
        data.price
      );
      if (crr) {
        setDisplayPrice(crr);
      }
    })();
  }, [userCurrency]);
  return (
    <div className="w-full flex justify-start mb-3">
      <div className="w-1/5 max-w-20 aspect-square rounded-md overflow-hidden m-3 mx-auto">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-4/5 md:ml-3 px-3 border-b-[1px] border-gray-500">
        <Link to={`/product?id=${data._id}`} className="text-xl text-lime-500">
          {data.name}
        </Link>

        <div className="flex gap-2 justify-between items-start w-full my-2 md:flex-row">
          <div>
            <button
              className="size-6 dark:bg-gray-500 bg-gray-300 rounded-full text-red-500"
              onClick={() => dispatch(decreaseQty(data))}
            >
              -
            </button>
            <span className="mx-3">{data.Qty}</span>
            <button
              className="size-6 dark:bg-gray-500 bg-gray-300 rounded-full text-lime-500"
              onClick={() => dispatch(addQty(data))}
            >
              +
            </button>
          </div>
          <button
            className="dark:text-gray-300 text-gray-500 underline"
            onClick={() => dispatch(removeItem(data))}
          >
            delete
          </button>
        </div>
        <div className="flex gap-2 justify-between items-center w-full md:w-auto mt-2">
          <span className="text-sm text-red-500">
            Discount {data.discount}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Price:{" "}
            <span className="text-red-500 line-through mr-1">
              {displayPrice?.symbol}
              {displayPrice?.amt?.toFixed(2)}
            </span>
            <span className="text-lime-500">
              {displayPrice?.symbol}
              {((displayPrice?.amt * (100 - data.discount)) / 100).toFixed(2)}
            </span>
            <span className="dark:text-white text-gray-800"> x </span>
            <span className="text-lime-500">{data.Qty}</span>
            <span className="dark:text-white text-gray-800"> = </span>
            <span className="text-amber-500">
              {displayPrice?.symbol || "$"}
              {(
                ((displayPrice?.amt * (100 - data.discount)) / 100) *
                data.Qty
              ).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Items;
