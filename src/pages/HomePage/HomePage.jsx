import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import ModalApp from "./Modal";
import Cookies from "js-cookie";
import { userLogged } from "../../services/user";
import { findAllTransactions } from "../../services/transactions";

const HomePage = () => {
  const [userResponse, setUserResponse] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  function validateToken() {
    const token = Cookies.get("token");
    if (!token) navigate("/signin");
  }

  async function getUser() {
    try {
      const user = await userLogged();
      setUserResponse(user.data);
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  }

  function calculateBalance(transaction) {
    let total = 0;
    transaction.forEach((transaction) => {
      transaction.type === "input"
        ? (total += Number(transaction.value))
        : (total -= Number(transaction.value));
    });
    setBalance(total);
  }

  async function getTransactions() {
    try {
      const transactionsResponse = await findAllTransactions();
      setUserTransactions(transactionsResponse.data);
      calculateBalance(transactionsResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  }

  useEffect(() => {
    validateToken();
    getUser();
    getTransactions();
  }, [userTransactions]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-semibold">My Digital Wallet</h1>
        <Link
          to="/signin"
          className="text-white hover:underline"
          onClick={() => Cookies.remove("token")}
        >
          <FaSignOutAlt size={24} className="cursor-pointer" title="Logout" />
        </Link>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex justify-between bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="">
            <h2 className="text-xl font-semibold mb-4">
              Hello, {userResponse.name}
            </h2>
            <p className="text-2xl">
              Available Balance{" "}
              <span
                className={`text-${balance < 0 ? "red" : "green"}-600 bold`}
              >
                ${balance}
              </span>
            </p>
          </div>
          <ModalApp />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          {userTransactions.length === 0 ? (
            <h1 className="text-center text-gray-600 text-xl">
              You haven't made any transactions yet.
            </h1>
          ) : (
            <ul className="space-y-4">
              {userTransactions.map((transaction) => (
                <li
                  key={transaction._id}
                  className="flex items-center justify-between"
                >
                  <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
                  <p
                    className={`text-${
                      transaction.type === "output" ? "red" : "green"
                    }-600 bold`}
                  >
                    {transaction.type === "output" ? "-" : "+"}$
                    {Math.abs(transaction.value).toFixed(2)}
                  </p>
                  <p className="text-gray-600">{transaction.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
