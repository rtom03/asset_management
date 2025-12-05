import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const AlertToast = ({ alert }) => {
  return (
    <div>
      {/* <Alert variant="default | destructive">
        <Terminal />
        <AlertTitle>{user.message}</AlertTitle>
        <AlertDescription>{user.message} </AlertDescription>
      </Alert> */}
      {alert.message && (
        <Alert
          className={`mt-4 ${
            alert.type === "success" ? "border-green-500" : "border-red-500"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AlertToast;
