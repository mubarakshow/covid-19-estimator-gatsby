import React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import {
  Form, 
  Button, 
  Row, 
  Col
} from 'react-bootstrap'
// import { outputData } from '../data/data';
import InfoPopover from '../components/Popovers'
import covid19ImpactEstimator from '../estimator';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.css"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      periodType: '',
      outputData: [
        {
          id: 'currentlyInfected',
          title: 'Currently Infected',
          estimate: {
            impact: '',
            severeImpact: ''
          }
        },
        {
          id: 'infectionsByRequestedTime',
          title: 'Infected',
          estimate: {
            impact: '',
            severeImpact: ''
          }
        },
        {
          id: 'severeCasesByRequestedTime',
          title: 'Severe Cases',
          estimate: {
            impact: '',
            severeImpact: ''
          }
        },
        {
          id: 'hospitalBedsByRequestedTime',
          title: 'Hospital Beds',
          estimate: {
            impact: '',
            severeImpact: ''
          }
        },
        {
          id: 'casesForICUByRequestedTime',
          title: 'Cases For ICU',
          estimate: {
            impact: '',
            severeImpact: ''
          }
        },
        {
          id: 'casesForVentilatorsByRequestedTime',
          title: 'Cases For Ventilators',
          estimate: {
            impact: '',
            severeImpact: ''
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
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  handlePopulationChange = event => {
    this.setState({population: event.target.value})
  }
  handleReportedCasesChange = event => {
    this.setState({reportedCases: event.target.value})
  }
  handleHospitalBedsChange = event => {
    this.setState({totalHospitalBeds: event.target.value})
  }
  handleTimeElapsChange = event => {
    this.setState({timeToElapse: event.target.value})
  }
  handlePeriodTypeChange = event => {
    this.setState({periodType: event.target.value})
  }
  
  handleSubmit = event => {
    event.preventDefault();
    const outputData = covid19ImpactEstimator({
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 1,
        avgDailyIncomePopulation: 0.65
      },
      reportedCases: this.state.reportedCases,
      population: this.state.population,
      totalHospitalBeds: this.state.totalHospitalBeds,
      timeToElapse: this.state.timeToElapse,
      periodType: this.state.periodType
    });
    this.setState({outputData})
  }

  render() {
    const stringChecker = inputTitle => {
      if(inputTitle.slice(-18) === ' By Requested Time') {
        inputTitle = inputTitle.slice(0, -18)
      }
      return inputTitle;
    }
    
    return (
      <Layout>
        <Row>
          <SEO 
            title="Covid-19 Estimator by Mubarak Showole"
            description="estimate impact and severe impact of covid-19 around the world"
            lang="en" 
          />
          <Col xl={8} sm={8}>
            <Row className="text-center impactDivs" key='xxx'>
              <Col lg={4} md={4} xs={6} sm={6} className="normalImpact">
                <h3 className="col-title">Normal Impact</h3>
                {this.state.outputData.map(data => {
                  const { title, estimate: {impact} } = data;
                  if(title.slice(-18) === ' By Requested Time') {
                    return (
                      <div className="neumorph">
                        <h3>{impact}</h3>
                        <p>{stringChecker(title)}</p>
                        <span className="brt">by requested time</span>
                      </div>
                    )  
                  } else {
                    return (
                      <div className="neumorph">
                        <h3>{impact}</h3>
                        <p>{stringChecker(title)}</p>
                      </div>
                    )
                  }
                })}
              </Col>
              <Col lg={4} md={4} xs={6} sm={6} className="severeImpact">  
                <h3 className="col-title">Severe Impact</h3>                    
                {this.state.outputData.map(data => {
                  let { title, estimate: {severeImpact} } = data;
                  if(title.slice(-18) === ' By Requested Time') {
                    return (
                      <div className="neumorph">
                        <h3>{severeImpact}</h3>
                        <p>{stringChecker(title)}</p>
                        <InfoPopover
                          key="pop-pop"
                          placement="top"
                          title={title.slice(-17)}
                          content="This calculated by the time to elapse"
                        >
                          <span className="brt">by requested time</span>
                        </InfoPopover>
                      </div>
                    )
                  } else {
                    return(
                      <div className="neumorph">
                        <h3>{severeImpact}</h3>
                        <p>{stringChecker(title)}</p>
                      </div>
                    )
                  }
                })}
              </Col>
            </Row>
          </Col>
          <Col className="formContainer" xl={4} sm={12}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="xyz">
                  <Form.Control
                    data-population
                    value={this.state.population} 
                    placeholder="Population"
                    aria-label="Population"
                    onChange={this.handlePopulationChange}
                    style={{
                      marginBottom: '2em'
                    }}
                  />
                  <Form.Control
                    data-reported-cases
                    value={this.state.reportedCases} 
                    placeholder="Reported Cases"
                    aria-label="Reported Cases"
                    onChange={this.handleReportedCasesChange}
                    style={{
                      marginBottom: '2em'
                    }} 
                  />
                  <Form.Control 
                    data-total-hospital-beds
                    value={this.state.totalHospitalBeds} 
                    placeholder="Total Hospital Beds"
                    aria-label="Total Hospital Beds"
                    onChange={this.handleHospitalBedsChange}
                  />
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="zzz">
                <Form.Label>Period Type</Form.Label>
                  <Form.Control as="select"
                    data-period-type
                    value={this.state.periodType}
                    aria-label="Select Period Type"
                    onChange={this.handlePeriodTypeChange}
                    style={{
                      marginBottom: '2em'
                    }}
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </Form.Control>
                  <Form.Control
                    data-time-to-elapse 
                    value={this.state.timeToElapse} 
                    placeholder="Time to Elapse"
                    aria-label="Time to Elapse"
                    onChange={this.handleTimeElapsChange}
                  />  
              </Form.Group>
              <Button 
                data-go-estimate 
                type="submit"
                className="btn-danger button"
                aria-label="Submit Button"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    );
  }

}

export default IndexPage
