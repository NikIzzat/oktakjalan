const feature = (id, name, status, coordinates, reason = '') => ({
  type: 'Feature',
  properties: { id, name, status, reason },
  geometry: { type: 'LineString', coordinates },
})

export const routes = [
  {
    id: 'gate-library',
    destination: 'Central Library',
    category: 'Study spaces',
    accessible: true,
    reason: '',
    distance: '420 m',
    duration: '6 min',
    metadata: { surface: 'Paved path', incline: 'Low incline', ramps: true },
    start: [3.2501, 101.735],
    segments: [
      feature('gate-walkway', 'Main gate walkway', 'open', [
        [101.735, 3.2501], [101.7355, 3.25045], [101.736, 3.25065],
      ]),
      feature('library-ramp', 'Library approach ramp', 'open', [
        [101.736, 3.25065], [101.73655, 3.25085], [101.73705, 3.2511],
      ]),
    ],
  },
  {
    id: 'gate-cafe',
    destination: 'Garden Café',
    category: 'Food & drink',
    accessible: true,
    reason: '',
    distance: '310 m',
    duration: '4 min',
    metadata: { surface: 'Paved path', incline: 'Low incline', ramps: true },
    start: [3.2501, 101.735],
    segments: [
      feature('cafe-courtyard', 'Courtyard path', 'open', [
        [101.735, 3.2501], [101.73535, 3.24985], [101.7357, 3.2497],
      ]),
      feature('cafe-ramp', 'Café entrance ramp', 'open', [
        [101.7357, 3.2497], [101.73615, 3.24955], [101.7365, 3.24945],
      ]),
    ],
  },
  {
    id: 'gate-lecture',
    destination: 'Lecture Hall',
    category: 'Classrooms',
    accessible: true,
    reason: '',
    distance: '560 m',
    duration: '8 min',
    metadata: { surface: 'Paved path', incline: 'Gentle incline', ramps: true },
    start: [3.2501, 101.735],
    segments: [
      feature('hall-garden', 'Garden walkway', 'open', [
        [101.735, 3.2501], [101.7353, 3.2505], [101.73565, 3.2509],
      ]),
      feature('hall-entrance', 'Lecture hall entrance', 'maintenance', [
        [101.73565, 3.2509], [101.73595, 3.25135], [101.7362, 3.25175],
      ], 'Entrance ramp under repair'),
    ],
  },
  {
    id: 'gate-admin',
    destination: 'Administration Block',
    category: 'Campus services',
    accessible: false,
    reason: 'The north entrance has steep stairs and no step-free access.',
    distance: '—',
    duration: '—',
    metadata: { surface: 'Stone steps', incline: 'Steep', ramps: false },
    start: [3.2501, 101.735],
    segments: [
      feature('admin-steps', 'North entrance steps', 'closed', [
        [101.735, 3.2501], [101.73475, 3.25055], [101.73455, 3.25095],
      ], 'Steep stairs — no ramp'),
    ],
  },
]

export const initialSegmentStatuses = Object.fromEntries(
  routes.flatMap((route) => route.segments.map((segment) => [segment.properties.id, segment.properties.status])),
)
