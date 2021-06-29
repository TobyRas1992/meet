import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function EventPieChart(props) {
  const { events } = props;
  const [data, setData] = useState([]); // allows us to add state to a function component.
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS']; //values used for checking checking the events summaries. 
  const COLORS = ['#f2a365', '#BBE1FA', '#903749', '#219897', '#616f39'];

  const getDataForPieChart = () => {
    let data = genres.map(genre => {
      const value = events.filter(event => event.summary.replace(',', '').replace('.', '').split(' ').includes(genre)).length; // replace() used to change commas and full stops into nothing. split() each summary by space to turn summary into array of words. includes() checks if the summary includes the genre. returns true or false. then use length to count number. 
      return { name: genre, value };
    })
    data = data.filter(data => data.value); //removes duplicates
    return data;
  }

  useEffect(() => { //listens for changes to events prop (from App.js). 
    setData(() => getDataForPieChart())
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          innerRadius={20}
          fill="#bbe1fa"
          stroke="#1b262c"
          dataKey="value"
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))
          }
        </Pie>
        <Legend align="center" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}