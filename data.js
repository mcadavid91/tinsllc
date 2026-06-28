// Data for TINS Studio site

const APPS = [
  {
    id: 'clearfit',
    name: 'ClearFit',
    tagline: 'Know your cardiovascular health — every number auditable.',
    description: 'ClearFit turns your Apple Health data into a clear picture of your cardiovascular health. Its headline Cardio Age score distills VO₂ Max, resting heart rate, and HRV into a single age-equivalent — fully auditable, so you can tap any number to see how it was computed. Workout details break down each session, and the Trends tab charts your progress over time.',
    platform: 'iOS',
    price: '$8.99',
    color: '#2e3a36',
    initial: 'C',
    iconSrc: 'assets/clearfit-icon.png',
    version: '1.0',
    features: [
      { title: 'Fast logging', body: 'Start a workout and record sets in a tap or two. Built for the gym floor, not a spreadsheet.' },
      { title: 'Clear progress', body: 'See personal records, volume, and trends at a glance — without drowning in charts.' },
      { title: 'Your data, your device', body: 'No account required. Your training history stays private and stays with you.' },
      { title: 'One-time purchase', body: 'Pay once. Free updates for life. There is no subscription.' },
    ],
  },
  {
    id: 'calcpro',
    name: 'TVM Financial Calc',
    tagline: 'Everyday math to financial modeling — one calculator.',
    description: 'TVM Financial Calc goes from your basic calculator functions all the way to the Time Value of Money calculations you’d otherwise need an expensive financial calculator for — and everything in between. Loans, rates, payments, present and future value, and more, all in one fast, clean app you own outright.',
    platform: 'iOS',
    price: '$4.99',
    color: '#33373d',
    initial: 'C',
    iconSrc: 'assets/calcpro-icon.png',
    version: '1.0',
  },
];

window.TINS_DATA = { APPS };
