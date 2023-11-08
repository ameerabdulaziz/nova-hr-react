import { Grid } from '@mui/material';
import React, { useState } from 'react';
import PayRollLoader from '../Component/PayRollLoader';
import JobCard from './components/JobCard';
import Section from './components/Section';

const DUMMY_JOBS = [
  {
    id: 1,
    code: 'NZ-MWT',
    title: 'Food Chemist',
    experience: 0,
    organization: 'Divanoodle',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    requirement: [
      'Home',
      'Home',
      'Shoes',
      'Clothing',
      'Tools',
      'Grocery',
      'Automotive',
      'Outdoors',
      'Music',
      'Toys',
    ],
  },
  {
    id: 2,
    code: 'US-OR',
    title: 'Senior Cost Accountant',
    experience: 7,
    organization: 'Zoomdog',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    requirement: [
      'Automotive',
      'Toys',
      'Tools',
      'Outdoors',
      'Games',
      'Jewelry',
      'Beauty',
      'Books',
      'Baby',
      'Tools',
    ],
  },
  {
    id: 3,
    code: 'US-PA',
    title: 'Systems Administrator I',
    experience: 0,
    organization: 'Riffwire',
    description:
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    requirement: [
      'Computers',
      'Grocery',
      'Baby',
      'Home',
      'Home',
      'Automotive',
      'Industrial',
      'Garden',
      'Grocery',
      'Jewelry',
    ],
  },
  {
    id: 4,
    code: 'AU-VIC',
    title: 'VP Quality Control',
    experience: 5,
    organization: 'Realbridge',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    requirement: [
      'Music',
      'Baby',
      'Outdoors',
      'Kids',
      'Automotive',
      'Industrial',
      'Sports',
      'Outdoors',
      'Health',
      'Garden',
    ],
  },
  {
    id: 5,
    code: 'US-AK',
    title: 'Geologist I',
    experience: 9,
    organization: 'Rhynoodle',
    description:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    requirement: [
      'Clothing',
      'Garden',
      'Grocery',
      'Electronics',
      'Industrial',
      'Kids',
      'Garden',
      'Home',
      'Books',
      'Tools',
    ],
  },
];

function JobVacation() {
  const [jobs, setJobs] = useState(DUMMY_JOBS);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Section
        title='We Offer Great Jobs'
        description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.'
      >
        <div className='cv-container'>
          <Grid
            container
            mt={5}
            spacing={3}
            justifyContent='center'
            alignItems='stretch'
          >
            {jobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Section>
    </PayRollLoader>
  );
}

export default JobVacation;
