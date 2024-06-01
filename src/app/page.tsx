import moment from "moment";
import client from "./shopify";
export default async function Home() {
  const productQuery = `
  query Order($handle: String) {
    product(handle: $handle) {
      id
      title
      handle
    }
  }
`;
  const res = await client.getOrders();

  type NoteAttr = {
    name: string;
    value: string;
  };
  const findNoteAttr = (attrs: NoteAttr[], name: string) => {
    return attrs.find(({ name: thisName }) => name == thisName)?.value;
  };

  //from 24/05/24 to moment
  const formatDate = (date: string | undefined) => {
    if (date) {
      let dateArr = date.split("/");
      let year = "20" + dateArr[2];
      let month = parseInt(dateArr[1]) - 1;
      let day = dateArr[0];
      return moment([year, month, day]);
    }
    return null;
  };
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      {/* <div className="w-80">{JSON.stringify(res.data.orders[0])}</div> */}

      <br />
      <br />
      {res.data.orders
        .sort((orderA: any, orderB: any) => {
          if (
            formatDate(findNoteAttr(orderA.note_attributes, "date"))?.isBefore(
              formatDate(findNoteAttr(orderB.note_attributes, "date"))
            )
          )
            return 1;
          else return -1;
        })
        .map((order: any) => (
          <div className="flex flex-nowrap gap-4 w-full md:w-auto mb-10">
            <div>{order.name}</div>
            <div className="w-32">
              {formatDate(findNoteAttr(order.note_attributes, "date"))?.format(
                "YYYY MM DD"
              )}
            </div>
            <div className="w-32">
              {order.shipping_address ? "delivery" : "pick-up"}
            </div>
            <div className="message-card w-80">
              {findNoteAttr(order.note_attributes, "messageCard")}
            </div>
            <div className="name-card">
              <div>
                <span>{order.customer.first_name}</span>{" "}
                <span>{order.customer.last_name}</span>
              </div>
              <div>
                <span>{order.shipping_address?.address1}</span>
                <span>{order.shipping_address?.address2}</span>
              </div>
              <div>
                <span className="mr-1">{order.shipping_address?.city}</span>
                <span className="mr-1">
                  {order.shipping_address?.province_code}
                </span>
                <span>{order.shipping_address?.zip}</span>
              </div>
              <div>{order.shipping_address?.phone}</div>
            </div>
          </div>
        ))}
    </main>
  );
}
