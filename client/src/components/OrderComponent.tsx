import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../tools/orders.model";

//importing indiviual icons from font awesome
import { faCircleInfo, faPizzaSlice, faList, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

// created orderComponent based off of orders.model.ts
export default function OrderComponent ({ id, name, address, city, size, delivered, toppings, notes}:Order) {

    return (
        // using font awesome icons, interpol. the data, and adding tailwind css to style.
        <div className="py-4 font-sans text-xl m-0 p-0">
            <h2 className="font-bold text-2xl mb-4 text-[#b82308]">Order #{ id }</h2>
            <div className="customerInformation leading-6">
                <h3 className="font-bold">
                    <FontAwesomeIcon icon={faCircleInfo} /> <span> Customer Information </span>
                </h3>
                <div>{ name }</div>
                <div>{ address }</div>
                <div>{ city }</div>
            </div>

            <div className="pizzaSlice leading-6">
                <h3 className="font-bold pt-4">
                    <FontAwesomeIcon icon={faPizzaSlice} /> <span> Pizza Slice </span>
                </h3>
                <div>{ size }</div>
            </div>

            {/* using map as notes and toppings are both arrays ad i want to loop over each topping/note in their arrays */}
            <div className="orderDetails leading-6">
                <h3 className="font-bold pt-4">
                    <FontAwesomeIcon icon={faList} /><span> Order Details </span>
                </h3>
                <div className="toppings">
                    {toppings.map((topping, index) => (
                        <div key={index}>{ topping.topping }</div>
                    ))}
                </div>
            </div>

            {/* using map as notes and toppings are both arrays ad i want to loop over each topping/note in their arrays */}
            <div className="orderNotes leading-6">
                <h3 className="font-bold pt-4">
                    <FontAwesomeIcon icon={faNoteSticky} /> <span> Order Notes </span>
                </h3>
                <div className="notes">
                    {notes.map((note, index) => (
                        <div key={index}>{ note.note }</div>
                    ))}
                </div>
            </div>
        </div>
    );
}