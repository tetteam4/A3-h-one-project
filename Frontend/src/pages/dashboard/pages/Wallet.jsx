import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const Wallet = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);
  const fetchBranches = async () => {
    try {
      const resBranch = await axios.get(`${BASE_URL}/api/api/branches/`);
      setBranches(resBranch.data);
      console.log(resBranch.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-2">
      <div className="grid grid-cols-3 gap-6 mb-6">
        {console.log(branches)}
        {branches.map((branch) => (
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Transactions</h2>
            <p className="text-2xl">{branch.name}</p>
            <p className="text-2xl">{120000}</p>
            <button className="bg-yellow-600 rounded hover:bg-yellow-400 p-2">
              Cleaning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
