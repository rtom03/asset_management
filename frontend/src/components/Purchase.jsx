import React from "react";
import PurchaseHeader from "./PurchaseHeader";
import TopBar from "./TopBar";
import DashboardStats from "./DashboardStats";
import PurchaseTable from "./PurchaseTable";

const Purchase = () => {
  return (
    <div>
      <TopBar>
        <PurchaseHeader />
      </TopBar>
      <div className="mt-28">
        <DashboardStats />
      </div>
      <div>
        <PurchaseTable />
      </div>
    </div>
  );
};

export default Purchase;
