import { useEffect, useState } from "react";
import { environment } from "../../environment";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import axios from "axios";
import dayjs from "dayjs";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const todayIndexOnWeek = dayjs().weekday();

export const useCalendar = () => {
  // if current day is saturday (6), show new week by default (sunday is 0)
  const [week, setWeek] = useState(todayIndexOnWeek === 6 ? 1 : 0);
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
    todayIndexOnWeek,
    slicedEvents,
    WEEKDAYS,
    setWeek,
    week,
  };
};
