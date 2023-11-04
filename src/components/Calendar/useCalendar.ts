import { useEffect, useState } from "react";
import { environment } from "../../environment";
import axios from "axios";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const dayOfWeek = dayjs().weekday();

export const useCalendar = () => {
  const [week, setWeek] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get(environment.GET_EVENTS_URL);
      setEvents(res?.data || []);
    };
    getEvents();
  }, []);

  const slicedEvents = events?.slice(0, (week + 1) * 40);
  return {
    slicedEvents,
    WEEKDAYS,
    dayOfWeek,
    setWeek,
    week,
  };
};
