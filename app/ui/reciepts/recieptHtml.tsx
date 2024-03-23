import { NonNullableReciept, NonNullableOneCustomer, Product, User } from "@app/lib/definitions";
import { formatCurrency } from "@app/lib/utils";
import { forwardRef } from "react";

const RecieptHtml = forwardRef((
  {
    reciept,
    customer,
    products,
    user,
  }: {
    reciept: NonNullableReciept;
    customer: NonNullableOneCustomer;
    products: Product[];
    user: User;
  },
  ref: any
) => {
  const unitPrice = (name: string): number => {
    const oneProduct = products.find((product) => product.name === name);
    return oneProduct?.price!;
  };

  const totalPrice = reciept?.items?.reduce((acc, item) => {
    const priceAsNumber = Number(item.price);
    if (!isNaN(priceAsNumber)) {
      acc += priceAsNumber;
    }
    return acc;
  }, 0);

  return (
    <main className="invoice-container" ref={ref}>
      <div>
        <h1 className="company-name">{user.company}</h1>
        <p className="company-address">{user.address}</p>
        <div className="info-section">
          <div className="from-info">
            <p className="info-title">From</p>
            <p>{user.name}</p>
          </div>
          <div className="invoice-info">
            <p className="info-title">Reciept</p>
            <p>{reciept?.id}</p>
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
          {reciept?.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.unit}</td>
              <td>{item.name}</td>
              <td>{formatCurrency(Number(unitPrice(item.name)))}</td>
              <td>{formatCurrency(Number(item.price))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-section">
        <p className="total-label">Total</p>
        <p className="total-amount">{formatCurrency(Number(totalPrice))}</p>
      </div>
      <div className="terms-section">
        <div className="terms-info">
          <p className="terms-label">PAID IN FULL</p>
        </div>
      </div>
    </main>
  );
});

RecieptHtml.displayName = "RecieptHtml";

export default RecieptHtml;
