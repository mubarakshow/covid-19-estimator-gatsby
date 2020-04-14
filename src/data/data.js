export let inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 1,
    avgDailyIncomePopulation: 0.65
  },
  reportedCases: '',
  population: '',
  totalHospitalBeds: '',
  timeToElapse: '',
  periodType: ''
};

export let outputData = [
  {
    id: 'currentlyInfected',
    title: 'Currently Infected',
    estimate: {
      impact: 1000,
      severeImpact: 50000
    }
  },
  {
    id: 'infectionsByRequestedTime',
    title: 'Infected By Requested Time',
    estimate: {
      impact: '',
      severeImpact: ''
    }
  },
  {
    id: 'severeCasesByRequestedTime',
    title: 'Severe Cases By Requested Time',
    estimate: {
      impact: '',
      severeImpact: ''
    }
  },
  {
    id: 'hospitalBedsByRequestedTime',
    title: 'Hospital Beds By Requested Time',
    estimate: {
      impact: '',
      severeImpact: ''
    }
  },
  {
    id: 'casesForICUByRequestedTime',
    title: 'Cases For ICU By Requested Time',
    estimate: {
      impact: '',
      severeImpact: ''
    }
  },
  {
    id: 'casesForVentilatorsByRequestedTime',
    title: 'Cases For Ventilators By Requested Time',
    estimate: {
      impact: 100,
      severeImpact: 5000
    }
  },
  {
    id: 'dollarsInFlight',
    title: 'Dollars In Flight',
    estimate: {
      impact: '',
      severeImpact: ''
    }
  }
];