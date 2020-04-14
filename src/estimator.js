import { outputData } from "./data/data";
const covid19ImpactEstimator = (data, initialData=outputData) => {
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

  //currentlyInfected initialData [0]
  initialData[0].estimate.impact = currentlyInfectedNormal;
  initialData[0].estimate.severeImpact = currentlyInfectedSevere;

  //infectionsByRequestedTime initialData [1]
  initialData[1].estimate.impact = infectionsByRTN;
  initialData[1].estimate.severeImpact = infectionsByRTS;

  //severeCasesByRequestedTime initialData [2]
  initialData[2].estimate.impact = severeCaseByRTN;
  initialData[2].estimate.severeImpact = severeCaseByRTS;
  
  //hospitalBedsByRequestedTime initialData [3]
  initialData[3].estimate.impact = getHospitalBedsByRequestedTime(severeCaseByRTN);
  initialData[3].estimate.severeImpact = getHospitalBedsByRequestedTime(severeCaseByRTS);

  //casesForICUByRequestedTime initialData [4]
  initialData[4].estimate.impact = getCasesForICUByRequestedTime(infectionsByRTN);
  initialData[4].estimate.severeImpact = getCasesForICUByRequestedTime(infectionsByRTS);

  //casesForVentilatorsByRequestedTime initialData [5]
  initialData[5].estimate.impact = getCasesForVentilatorsByRequestedTime(infectionsByRTN);
  initialData[5].estimate.severeImpact = getCasesForVentilatorsByRequestedTime(infectionsByRTS);

  //dollarsInFlight initialData [6]
  initialData[6].estimate.impact = getDollarsInFlight(infectionsByRTN);
  initialData[6].estimate.severeImpact = getDollarsInFlight(infectionsByRTS);

  
  // const responseData = {
  //   data: input,
  //   impact: {
  //     currentlyInfected: currentlyInfectedNormal,
  //     infectionsByRequestedTime: infectionsByRTN,
  //     severeCasesByRequestedTime: severeCaseByRTN,
  //     hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTN),
  //     casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTN),
  //     casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTN),
  //     dollarsInFlight: getDollarsInFlight(infectionsByRTN)
  //   },
  //   severeImpact: {
  //     currentlyInfected: currentlyInfectedSevere,
  //     infectionsByRequestedTime: infectionsByRTS,
  //     severeCasesByRequestedTime: severeCaseByRTS,
  //     hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTS),
  //     casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTS),
  //     casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTS),
  //     dollarsInFlight: getDollarsInFlight(infectionsByRTS)
  //   }
  // };

  // console.log(responseData);
  return initialData;
};

export default covid19ImpactEstimator;
