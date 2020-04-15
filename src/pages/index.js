import React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { Form, Button, Row, Col} from 'react-bootstrap'
// import { outputData } from '../data/data';
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
    
    return (
      <Layout>
        <Row>
          <SEO 
            title="Covid-19 Estimator by Mubarak Showole"
            description="estimate impact and severe impact of covid-19 around the world"
            lang="en" 
          />
          <Col xl={8} sm={8}>
            <Row className="text-center">
              <Col lg={6} xs={6} sm={6}>
                <h3>Normal Impact</h3>
              </Col>
              <Col lg={6} xs={6} sm={6}>
                <h3>Severe Impact</h3>
              </Col>
            </Row>
            {this.state.outputData.map(data => {
              const { id, title, estimate: {impact, severeImpact} } = data;
              return (
                <Row className="text-center impactDivs" key={id}>
                  <Col lg={6} xs={6} sm={6} className="neumorph normalImpact">                      
                    <h3>{impact}</h3>
                    <p>{title}</p>
                  </Col>
                  <Col lg={6} xs={6} sm={6} className="neumorph severeImpact">
                    <h3>{severeImpact}</h3>
                    <p>{title}</p>
                  </Col>
                </Row>
              )
            })}
          </Col>
          <Col className="formContainer" xl={4} sm={4}>
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
