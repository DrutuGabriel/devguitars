import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';


class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      console.log('success', JSON.stringify(payment));
    }

    const onCancel = (data) => {
      console.log('cancel',  JSON.stringify(data));
    }

    const onError = (err) => {
      console.log('error',  JSON.stringify(err));
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'AaAsSBMtcBtxYm9gZgK0FUDR76PgxEEPodBNIwjRJaL0xnAKthljRlt-TLAnXHWnZVCA6U8soR8v03ZJ',
      production: ''
    }

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
              size: 'large',
              color: 'blue',
              shape: 'rect',
              label: 'buynow'
            }}
          />
      </div>
    );
  }
}

export default Paypal;