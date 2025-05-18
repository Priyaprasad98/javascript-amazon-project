import dayjs from "https://esm.sh/dayjs";
console.log("hello");
export const deliveryOption = [
  {
    id: "1",
    deliveryPriceCents: 0,
    deliveryDays: 7
  },
  {
    id: "2",
    deliveryPriceCents: 499,
    deliveryDays: 5
  },
  {
    id: "3",
    deliveryPriceCents: 999,
    deliveryDays: 3
  }
];
const today = dayjs();
export function calculateDeliveryDate(deliveryOption) {
  const newDeliveryDays = skipWeekend(deliveryOption.deliveryDays);
  const deliveryDate = today.add(newDeliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

function skipWeekend(deliveryDays) {
  for (let i = 1; i <= deliveryDays; i++) {
    const weekDay = today.add(i, "days").format("dddd");
    if (weekDay === "Sunday" || weekDay === "Saturday") {
      deliveryDays++;
    }
  }
  return deliveryDays;
}
