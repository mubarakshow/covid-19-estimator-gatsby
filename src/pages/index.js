import React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { Form, Button} from 'react-bootstrap'
import { outputData } from '../data/data';
import covid19ImpactEstimator from '../estimator';

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
      outputData
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
        <SEO 
          title="Covid-19 Estimator by Mubarak Showole"
          description="estimate impact and severe impact of covid-19 around the world"
          lang="en" 
        />
        <div>
          <div className="neumorph displayContianer" style={{
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            {this.state.outputData.map(data => {
              const { id, title, estimate: {impact, severeImpact} } = data;
              return (
                <div className="impactDivs" key={id} style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto auto',
                  gridColumnGap: '3em',
                }}>                  
                  <div className="neumorph normalImpact">
                    <h3>{impact}</h3>
                    <p>{title}</p>
                  </div>
                  <div className="neumorph severeImpact">
                    <h3>{severeImpact}</h3>
                    <p>{title}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="formContainer">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="xyz">
                <Form.Control
                  data-population
                  value={this.state.population} 
                  placeholder="Population"
                  aria-Label="Population"
                  onChange={this.handlePopulationChange}
                />
                <Form.Control
                  data-reported-cases
                  value={this.state.reportedCases} 
                  placeholder="Reported Cases"
                  aria-Label="Reported Cases"
                  onChange={this.handleReportedCasesChange} 
                />
                <Form.Control 
                  data-total-hospital-beds
                  value={this.state.totalHospitalBeds} 
                  placeholder="Total Hospital Beds"
                  aria-Label="Total Hospital Beds"
                  onChange={this.handleHospitalBedsChange}
                />
              </Form.Group>
              <Form.Group controlId="zzz">
                <Form.Label>Period Type</Form.Label>
                <Form.Control as="select"
                  data-period-type
                  value={this.state.periodType}
                  aria-Label="Select Period Type"
                  onChange={this.handlePeriodTypeChange}
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </Form.Control>
                <Form.Control
                  data-time-to-elapse 
                  value={this.state.timeToElapse} 
                  placeholder="Time to Elapse"
                  aria-Label="Time to Elapse"
                  onChange={this.handleTimeElapsChange} 
                />
              </Form.Group>
              <Button 
                data-go-estimate 
                type="submit"
                aria-Label="Submit Button"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    );
  }

}

export default IndexPage
