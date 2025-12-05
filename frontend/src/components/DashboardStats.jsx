import React from "react";

const DashboardStats = () => {
  const data = [
    { title: "New", all: 0, my: 0 },
    { title: "RFQ Sent", all: 1, my: 0 },
    { title: "Late RFQ", all: 1, my: 0, highlight: true },
    { title: "Not Acknowledged", all: 0, my: 0 },
    { title: "Late Receipt", all: 0, my: 0 },
  ];

  const extra = [
    { title: "OTD", all: "0 %", my: "0 %" },
    { title: "Days to Order", all: "0.01", my: "0.01" },
  ];

  return (
    <div className="flex items-center justify-around">
      <div className=" text-white p-4 flex gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          {/* "All" row */}
          <div className="flex items-center gap-2">
            <span className="w-10 text-sm text-gray-300">All</span>
            {data.map((item, i) => (
              <div
                key={i}
                className={`w-40 h-20 rounded bg-[#12151d] flex flex-col items-center justify-center border 
                ${
                  item.highlight
                    ? "bg-[#3a2c00] border-[#5b4500]"
                    : "border-[#2a2f3b]"
                }`}
              >
                <div className="text-lg font-semibold">{item.all}</div>
                <div className="text-xs text-gray-400">{item.title}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 text-sm text-gray-300">My</span>

            {data.map((item, i) => (
              <div
                key={i}
                className="w-40 h-20 rounded bg-[#12151d] flex flex-col items-center justify-center border border-[#2a2f3b]"
              >
                <div className="text-lg font-semibold">{item.my}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Section */}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {extra.map((item, i) => (
            <div
              key={i}
              className="w-40 h-20 rounded bg-[#12151d] border border-[#2a2f3b] flex flex-col items-center justify-center"
            >
              <div className="text-xl font-semibold">{item.all}</div>
              <div className="text-xs text-gray-400">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {extra.map((item, i) => (
            <div
              key={i}
              className="w-40 h-20 rounded bg-[#12151d] border border-[#2a2f3b] flex flex-col items-center justify-center"
            >
              <div className="text-xl font-semibold">{item.my}</div>
              <div className="text-xs text-gray-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
