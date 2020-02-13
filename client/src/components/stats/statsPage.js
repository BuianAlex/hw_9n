import React from 'react';

import { Bar, Pie, StackedBar } from 'react-roughviz';

export default function Stats() {
  return (
    <>
      <h1 className='section-header'>APP Stat</h1>
      <h3>Bar</h3>
      <Bar
        data='https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv'
        labels='flavor'
        values='price'
      />
      <h3>Pie</h3>
      <Pie
        data={{
          labels: ['North', 'South', 'East', 'West'],
          values: [10, 5, 8, 3]
        }}
        title='Regions'
        colors={['red', 'orange', 'blue', 'skyblue']}
        roughness={8}
        strokeWidth={3}
      />
      <StackedBar
        data={[
          { month: 'Jan', A: 20, B: 5, C: 10 },
          { month: 'Feb', A: 25, B: 10, C: 20 },
          { month: 'March', A: 30, B: 50, C: 10 }
        ]}
        labels='month'
        title='Monthly Revenue'
      />
    </>
  );
}
