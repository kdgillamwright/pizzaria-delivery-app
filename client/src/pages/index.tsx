// importing google font for NextJS
import { getJSONData } from '@/tools/Toolkit';
import { Content, Griffy } from 'next/font/google';
const griffy = Griffy({ weight: "400", subsets: ['latin'] });

import { Orders, Order } from "@/tools/orders.model";
import { useEffect, useState } from 'react';
import OrderComponent from '@/components/OrderComponent';
import { notStrictEqual } from 'assert';
import LoadingOverlay from '@/components/LoadingOverlay';
// import Order from '@/components/Orders';

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT: string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

  //-------------------------------------------- state variables

  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  //------------------------------------------ event handlers
  const onRespoonse = (data: Orders) => {
    //set overlay to false because once that data retrieval is succssesful i want it to be hidden.
    // console.log(pendingOrders);
    //console.log(data);
    setPendingOrders(data.orders);
    setShowOverlay(false);
  };

  const onError = (message: string) => {
    console.log(`**** ERROR retrieving pizza order data :( | ${message}`);
  }


  const getOrders = (e: any) => {
    // fetch the data from the api
    //set overlay to true so it will appear when the data is being fetched.
    setShowOverlay(true);
    getJSONData(RETRIEVE_SCRIPT, onRespoonse, onError);
  };

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

      {/* added my loading overlay component and set the property values. */}
      <LoadingOverlay
        enabled={showOverlay}
        bgColor={"#FF0000"}
        spinnerColor={"#FFFFFF"}
        showSpinner={true} />

      <div className="flex flex-nowrap items-center justify-center
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
            <button
              className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5"
              onClick={getOrders}>Get Orders
            </button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        // using a turnary to show or hide no orders retrieved or the orders.
        <div id="output" className="divide-dashed divide-y-2 divide-accent">
          {
            // the conditon checking if the array is empty.
            (pendingOrders.length === 0) ?

              // if the condition is true, do this (yes, the array is empty)
              <div>No orders retrieved...</div>
              :
              //if the condition is not true, do this. (no the array is not empty)
              //targeting the JSONdata.
              pendingOrders.map(
                (data: Order, i: number) => <OrderComponent key={i}
                  id={data.id}
                  name={data.name}
                  address={data.address}
                  city={data.city}
                  size={data.size}
                  delivered={data.delivered}
                  toppings={data.toppings}
                  notes={data.notes} />
              )
          }
        </div>
      </div>
    </main>
  );
}