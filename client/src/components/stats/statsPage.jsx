import React, { useEffect, useState } from 'react';
import { usersStats } from '../../services/api';
import { Bar, Pie, StackedBar, Donut } from 'react-roughviz';

export default function Stats() {
  return (
    <>
      <h1 className='section-header'>APP Stat</h1>
      <div className='mui-container-fluid'>
        <h3>Server Stats</h3>
        <div className='mui-row'>
          <div class='mui-panel mui-col-md-4'>
            <Pie
              data={{
                labels: ['q', 'w', 'e', 'r', 't', 'y'],
                values: [1, 2, 3, 4, 5, 6]
              }}
              title='HTTP ERROR'
              colors={['pink', 'skyblue', 'orange']}
              roughness={5}
              strokeWidth={3}
            />
          </div>
          <div class='mui-panel mui-col-md-4'>
            <Bar
              title='Users online'
              data={{
                labels: ['q', 'w', 'e', 'r', 't', 'y'],
                values: [1, 2, 3, 4, 5, 6]
              }}
              labels='flavor'
              values='price'
            />
          </div>
          <div class='mui-panel mui-col-md-4'>
            <Donut
              title='Working time'
              data={{
                labels: ['q', 'w', 'e', 'r', 't', 'y'],
                values: [1, 2, 3, 4, 5, 6]
              }}
              labels='flavor'
              values='price'
            />
          </div>
        </div>
      </div>
    </>
  );
}
