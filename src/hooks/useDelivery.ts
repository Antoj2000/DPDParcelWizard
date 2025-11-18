import { useEffect, useState} from "react";
import { Delivery } from '@/src/models/delivery';

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    // Temporary mock data
    const mock: Delivery[] = [
      { 
        consignmentNumber: "900090111",
        status: "OutForDelivery",
        recipient: "Anthony Johnson",
        sender: "Nike",
        address: "50 Valleycourt, Athlone, Co.Westmeath",
        eta: "Today 14:00 - 16:00"
      },
      {
        consignmentNumber: "900090112",
        status: "Delivered",
        recipient: "Anthony Johnson",
        sender: "HelloFresh",
        address: "50 Valleycourt, Athlone, Co.Westmeath",
      },
      {
        consignmentNumber: "900090113",
        status: "InTransit",
        recipient: "Anthony Johnson",
        sender: "Nike",
        address: "50 Valleycourt, Athlone, Co.Westmeath",
        eta: "Tomorrow 14:00 - 16:00"
      }
    ];

    // Later fetch from api 
    // fetch("https://api.example.com/deliveries")
    // .then(r =>json())
    // .then(data => setDeliveries(data))
    // .catch(error => console.error("Error fetching deliveries:", error));

    setDeliveries(mock);
}, []);

    return { deliveries };
}
      


