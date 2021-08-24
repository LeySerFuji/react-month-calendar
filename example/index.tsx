import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import dayjs = require('dayjs');
import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import { MonthCalendar } from '../src/index';
import '../dist/react-month-calendar.css';
import './index.css';

enum EventType {
  Holiday = 1,
  Notification = 2,
  Reserve = 3,
}

const mockEvents = [
  // {
  //   title: "Children's day",
  //   start: dayjs('2021-07-01'),
  //   type: EventType.Holiday,
  //   allDay: true,
  // },
  // {
  //   title: 'Home work abccd',
  //   start: dayjs('2021-07-08 13:00:00'),
  //   end: dayjs('2021-07-08 15:00:00'),
  //   type: EventType.Notification,
  //   allDay: false,
  // },
  {
    title: '测试工作日测试工作日测试工作日测试工作日',
    start: dayjs('2021-07-23'),
    end: dayjs('2021-08-07'),
    type: EventType.Notification,
    allDay: true,
  },
  // { title: '秋分日', start: dayjs('2021-08-05'), type: EventType.Holiday },
  // { title: '英语课', start: dayjs('2021-08-05'), type: EventType.Reserve },
  // {
  //   title: '😊日语课第二节',
  //   start: dayjs('2021-08-05'),
  //   type: EventType.Reserve,
  // },
  {
    title: '开崔终了',
    start: dayjs('2021-08-05'),
    end: dayjs('2021-08-09'),
    type: EventType.Reserve,
  },
  // {
  //   title: '放假提醒',
  //   start: dayjs('2021-09-09'),
  //   end: dayjs('2021-09-15'),
  //   type: EventType.Notification,
  // },
];

const App = () => {
  return (
    <div>
      <MonthCalendar
        style={{ height: '80vh' }}
        locale={'ja'}
        defaultDate={dayjs('2021-08')}
        onClickDay={(day: Dayjs) => {
          console.log('you clicked on : ' + day.format('YYYY/MM/DD'));
        }}
        onMonthChange={(month: dayjs.Dayjs) => {
          console.log('month changed to : ' + month.format('YYYY/MM/DD'));
        }}
        // eventRender={(event, index, events) => {
        //   return (
        //     <div
        //       className={classNames('custom-event-title', {
        //         reserve: event!.type === EventType.Reserve,
        //         holiday: event!.type === EventType.Holiday,
        //         notification: event!.type === EventType.Notification,
        //       })}
        //     >
        //       {event.title}
        //     </div>
        //   );
        // }}
        events={mockEvents}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
