import { View } from "react-native";
import TimelineItem from "./TimelineItem";
export default function TimelineList({ events }) {
  return (
    <View>
      {events.map((event) => (
        <TimelineItem
          key={event.id}
          status={event.status}
          location={event.location}
          date={event.date}
          time={event.time}
        />
      ))}
    </View>
  );
}
