import CardTransaction from "@/components/CardTransaction/CardTransaction";
import { Button } from "@/components/ui/button";
import UserAndBalance from "@/components/UserAndBalance/UserAndBalance";
import { fetchTransactionHistory } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);

  const { isLoadingTransactionHistory, transactionHistory } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchTransactionHistory({ offset: 0, limit: limit }));
  }, [dispatch, limit]);

  if (isLoadingTransactionHistory) {
    return <div>Loading....</div>;
  }
  const data = transactionHistory?.data?.records;
  console.log(data);

  // console.log(data?.created_on);

  return (
    <div className="flex flex-col gap-3">
      <UserAndBalance />
      <span className="text-xl font-semibold">Semua Transaksi</span>
      {data?.map((items) => {
        return (
          <CardTransaction
            key={items.invoice_number}
            totalAmount={items.total_amount}
            description={items.description}
            transactionType={items.transaction_type}
            createdOn={items.created_on}
          />
        );
      })}
      <Button
        className="bg-transparent text-red-500 hover:bg-transparent hover:text-red-400"
        onClick={() => setLimit(limit + limit)}
      >
        Show More
      </Button>
    </div>
  );
};

export default Transaction;
