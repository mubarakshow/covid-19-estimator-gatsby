const covid19ImpactEstimator = (data) => {
  const input = data;
  // console.log(input);
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    // population,
    totalHospitalBeds
  } = input;

  // Challenge 1
  const currentlyInfectedNormal = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;

  const checkRequestedTime = () => {
    let daysValue;
    if (periodType === 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType === 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    // console.log('daysValue: ', daysValue);
    return daysValue;
  };

  const getInfectionsByRequestedTime = (currentlyInfected) => {
    const days = checkRequestedTime();
    const x = currentlyInfected * (
      2 ** (Math.trunc(days / 3)));
    return x;
  };

  const infectionsByRTN = getInfectionsByRequestedTime(currentlyInfectedNormal);
  const infectionsByRTS = getInfectionsByRequestedTime(currentlyInfectedSevere);

  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.15);
    return x;
  };

  const severeCaseByRTN = getSevereCaseByRequestedTime(infectionsByRTN);
  const severeCaseByRTS = getSevereCaseByRequestedTime(infectionsByRTS);

  // get number of beds
  const getHospitalBedsByRequestedTime = (severeCaseByRT) => {
    const x = (totalHospitalBeds * (35 / 100));
    const y = Math.trunc(x - severeCaseByRT);
    return y;
  };

  // Challenge 3
  // casesForICUByRequestedTime
  const getCasesForICUByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.05);
    return x;
  };

  // casesForVentilatorsByRequestedTime
  const getCasesForVentilatorsByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.02);
    return x;
  };

  // dollarsInFlight
  const getDollarsInFlight = (infectionsByRT) => {
    const x = infectionsByRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const y = Math.trunc(x / checkRequestedTime());
    return y;
  };

  return [
    {
      id: 'currentlyInfected',
      title: 'Currently Infected',
      estimate: {
        impact: currentlyInfectedNormal,
        severeImpact: currentlyInfectedSevere
      }
    },
    {
      id: 'infectionsByRequestedTime',
      title: 'Infected By Requested Time',
      estimate: {
        impact: infectionsByRTN,
        severeImpact: infectionsByRTS
      }
    },
    {
      id: 'severeCasesByRequestedTime',
      title: 'Severe Cases By Requested Time',
      estimate: {
        impact: severeCaseByRTN,
        severeImpact: severeCaseByRTS
      }
    },
    {
      id: 'hospitalBedsByRequestedTime',
      title: 'Hospital Beds By Requested Time',
      estimate: {
        impact: getHospitalBedsByRequestedTime(severeCaseByRTN),
        severeImpact: getHospitalBedsByRequestedTime(severeCaseByRTS)
      }
    },
    {
      id: 'casesForICUByRequestedTime',
      title: 'Cases For ICU By Requested Time',
      estimate: {
        impact: getCasesForICUByRequestedTime(infectionsByRTN),
        severeImpact: getCasesForICUByRequestedTime(infectionsByRTS)
      }
    },
    {
      id: 'casesForVentilatorsByRequestedTime',
      title: 'Cases For Ventilators By Requested Time',
      estimate: {
        impact: getCasesForVentilatorsByRequestedTime(infectionsByRTN),
        severeImpact: getCasesForVentilatorsByRequestedTime(infectionsByRTS)
      }
    },
    {
      id: 'dollarsInFlight',
      title: 'Dollars In Flight',
      estimate: {
        impact: getDollarsInFlight(infectionsByRTN),
        severeImpact: getDollarsInFlight(infectionsByRTS)
      }
    }
  ];
};

export default covid19ImpactEstimator;
