import { NonNullableInvoice, NonNullableOneCustomer, User } from "@app/lib/definitions";
import { formatCurrency } from "@app/lib/utils";
import { forwardRef } from "react";

const InvoiceHtml = forwardRef((
  {
    invoice,
    customer,
    user,
  }: {
    invoice: NonNullableInvoice;
    customer: NonNullableOneCustomer;
    user: User;
  },
  ref: any
) => {
  const unitPrice = (total: string, amount : string): number => {
    const unit = Number(total) / Number(amount)
    return unit
  };

  const totalPrice = invoice?.items?.reduce((acc, item) => {
    const priceAsNumber = Number(item.price);
    if (!isNaN(priceAsNumber)) {
      acc += priceAsNumber;
    }
    return acc;
  }, 0);

  return (
    <main className="invoice-container md:pt-14" ref={ref}>
      <div>
        <h1 className="company-name">{user.company}</h1>
        <p className="company-address">{user.address}</p>
        <div className="info-section">
          <div className="from-info">
            <p className="info-title">From</p>
            <p>{user.name}</p>
          </div>
          <div className="invoice-info">
            <p className="info-title">Invoice</p>
            <p>{invoice?.id}</p>
          </div>
        </div>
        <div className="info-section">
          <div className="to-info">
            <p className="info-title">To</p>
            <p>{customer?.name}</p>
            <p>{customer?.company}</p>
          </div>
          <div className="address-info">
            <p className="info-title">Address</p>
            <p>{customer?.address}</p>
          </div>
          <div className="date-info">
            <p className="info-title">Date</p>
            <p>{new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>QTY</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice?.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.unit}</td>
              <td>{item.name}</td>
              <td>{formatCurrency(unitPrice(item.price, item.unit))}</td>
              <td>{formatCurrency(Number(item.price))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-section">
        <p className="total-label">Total</p>
        <p className="total-amount">{formatCurrency(Number(totalPrice))}</p>
      </div>
      <div className="terms-section gap-10">
        <div className="terms-info">
          <p className="terms-label">Terms and Conditions</p>
          <p>Payment due a month from receipt of this invoice</p>
        </div>
        <div className="payment-info">
          <p className="payment-label">Payment Instructions</p>
          <p>
            Bank transfer to Jane Doe <br /> 28046102393 <br /> Gold Safe Bank Plc.
          </p>
        </div>
      </div>
    </main>
  );
});

InvoiceHtml.displayName = "InvoiceHtml";

export default InvoiceHtml;
