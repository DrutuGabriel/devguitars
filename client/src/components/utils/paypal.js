import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);

       // success = {
      //   paid: true,
      //   cancelled: false,
      //   payerID: "MVS8XQ9MDZWUG",
      //   paymentID: "PAYID-MAPHO3Q3NE10065UC447180J",
      //   paymentToken: "EC-015098574U075963L",
      //   returnUrl:
      //     "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-MAPHO3Q3NE10065UC447180J&token=EC-015098574U075963L&PayerID=MVS8XQ9MDZWUG",
      //   address: {
      //     recipient_name: "test buyer",
      //     line1: "1 Main St",
      //     city: "San Jose",
      //     state: "CA",
      //     postal_code: "95131",
      //     country_code: "US",
      //   },
      //   email: "gabriel.drutu-buyer@gmail.com",
      // };
    };

    const onCancel = (data) => {
      console.log("cancel", data);
    };

    const onError = (err) => {
      console.log("error", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AaAsSBMtcBtxYm9gZgK0FUDR76PgxEEPodBNIwjRJaL0xnAKthljRlt-TLAnXHWnZVCA6U8soR8v03ZJ",
      production: "",
    };

    return (
      <div>
        <PaypalExpressBtn
          total={total}
          currency={currency}
          client={client}
          env={env}
          onError={onError}
          onCancel={onCancel}
          onSuccess={onSuccess}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "buynow",
          }}
        />
      </div>
    );
  }
}

export default Paypal;
