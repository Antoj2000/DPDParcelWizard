import SectionCard from "./SectionCard";
import TimelineList from "./TimelineList";

export default function TrackingHistory({ events }) {
  return (
    <SectionCard title="Tracking History">
      <TimelineList events={events} />
    </SectionCard>
  );
}
