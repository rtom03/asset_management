import React from "react";
import { Button } from "@/components/ui/button";
import { InputGroupDropdown } from "./SearchQuery";
import DropdownTab from "./DropdownTab";
import SearchDropdown from "./SearchDropdown";

const PurchaseHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        <h2 className="text-2xl">Purchase</h2>
        <div className="flex items-center gap-1.5 w-full ">
          <DropdownTab
            label="Orders"
            items={[
              { name: "Requests for Quotation", link: "/purchase" },
              { name: "Purchase Orders", link: "/purchase-orders" },
              { name: "Vendors", link: "/vendors" },
            ]}
          />
          <DropdownTab
            label="Products"
            items={[{ name: "Products", link: "/products" }]}
          />
          <DropdownTab
            label="Reporting"
            items={[{ name: "Purchase", link: "/purchase" }]}
          />
        </div>
      </div>
      <div className="flex gap-72 left-0 mt-5">
        <div className="flex items-center gap-2.5 w-[600px]">
          <Button variant="purple">New</Button>
          <Button variant="outline">Upload</Button>
          <p className="w-full">Requests for Quotation</p>
          <SearchDropdown />
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
