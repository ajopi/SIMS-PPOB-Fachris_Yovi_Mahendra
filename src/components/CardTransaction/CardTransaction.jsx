import { formatDate, rupiahFormat } from "@/lib/utils";

const CardTransaction = ({
  totalAmount,
  description,
  createdOn,
  transactionType,
}) => {
  
  return (
    <div className="flex flex-col border rounded-md border-gray-300 p-5 gap-3">
      <div className="flex items-center justify-between">
        <span
          className={
            transactionType === "TOPUP"
              ? "text-xl text-green-500 font-semibold"
              : "text-xl text-red-500 font-semibold"
          }
        >
          {transactionType === "TOPUP" ? "+" : "-"}{" "}
          {"Rp." + rupiahFormat(totalAmount) || "Rp."}
        </span>
        <span className="text-sm">{description || ""}</span>
      </div>

      <span className="text-xs text-gray-400">
        {formatDate(createdOn) || ""}
      </span>
    </div>
  );
};

export default CardTransaction;
