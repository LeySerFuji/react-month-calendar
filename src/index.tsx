import dayjs, { Dayjs, isDayjs } from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { DateGrid } from './DateGrid/index';
import './styles/atom.css';
import './styles/index.css';
import { Direction, Event, EventRender } from './types';
import MonthSwitcher from './MonthSwitcher';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import arraySupport from 'dayjs/plugin/arraySupport';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ja';
import { groupEventsByDate, noop } from './utils';
import { defaultEventRender } from './defaultRenders';
import minMax from 'dayjs/plugin/minMax';

console.log('extend locale data: ', localeData);

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(arraySupport);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

export type MonthCalendarProps = {
  className?: string;
  style?: React.CSSProperties;
  onClickDay?: (day: Dayjs) => void;
  onMonthChange?: (month: Dayjs) => void;
  //locale string, should be standard locale just like ja, en, fr, etc.
  locale?: string;
  defaultDate: Dayjs;
  minMonth?: Dayjs;
  maxMonth?: Dayjs;
  events: Event[];
  eventRender?: EventRender;
  //if true, the calendar will always show fixed six weeks.
  fixedWeekCount?: boolean;
};

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const MonthCalendar = (props: MonthCalendarProps): JSX.Element => {
  const {
    className = '',
    style = {},
    defaultDate = dayjs(),
    onClickDay = noop,
    onMonthChange = noop,
    locale = 'en',
    events = [],
    eventRender = defaultEventRender,
    fixedWeekCount = true,
    minMonth = dayjs().subtract(2, 'year'),
    maxMonth = dayjs().add(2, 'year'),
  } = props;

  if (
    !(
      minMonth.isSameOrBefore(defaultDate, 'month') &&
      maxMonth.isSameOrAfter(defaultDate, 'month')
    )
  ) {
    throw new Error(
      'param error: minMonth should be beforeOrSame with defaultDate in month unit, and maxMonth should be afterOrSame with defaultDate in month unit'
    );
  }

  const [currentDate, setCurrentDate] = useState<Dayjs>(defaultDate);

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  const onChangeDate = (directionOrDate: Direction | Dayjs) => {
    let newCurrentDate: Dayjs;
    if (isDayjs(directionOrDate)) {
      newCurrentDate = directionOrDate;
    } else {
      if (directionOrDate === Direction.FORWARD) {
        newCurrentDate = currentDate.add(1, 'month');
      } else {
        newCurrentDate = currentDate.subtract(1, 'month');
      }
    }

    setCurrentDate(newCurrentDate);
    onMonthChange(newCurrentDate);
  };

  const eventsGroup = useMemo(() => {
    return groupEventsByDate(events);
  }, [events]);

  return (
    <div className={`calendar-container ${className}`} style={style}>
      <MonthSwitcher
        currentDate={currentDate}
        onDateChange={onChangeDate}
        minMonth={minMonth}
        maxMonth={maxMonth}
      />
      <DateGrid
        onClickDay={onClickDay}
        currentDate={currentDate}
        onDateChange={onChangeDate}
        eventRender={eventRender}
        events={events}
        eventGroup={eventsGroup}
        fixedWeekCount={fixedWeekCount}
      />
    </div>
  );
};
