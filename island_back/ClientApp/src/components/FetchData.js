import React, { useState, useEffect } from 'react';

export function FetchData(props){
    const [tktype,setTktype] = useState([]);

    const fd =async ()=>{
        const response = await fetch('ticket');
        const data = await response.json();
        setTktype(data);
    };

    useEffect(()=>{fd();},[]);


    return <>
    <ol>
            {tktype.map((tk,index) =>
                <li key={tk.activityID}>
                    {tk.activityNotes }
                    {/*JSON.stringify(tk)*/} 
                </li>
            )}
    </ol>
    </>;
}

/*
{
        "activityID": 1,
        "activityTypeID": 0,
        "activityCreationDate": "2024-08-27T09:07:39.493989+02:00",
        "activityDueTime": "2024-09-10T09:07:39.4939914+02:00",
        "activityDoneTime": "9999-12-31T23:59:59.9999999",
        "isDeleted": false,
        "isDone": false,
        "activityTargetID": 0,
        "activityTargetName": "",
        "activityCreatorID": 0,
        "activityCreatorName": "",
        "activityAssigneeID": 0,
        "activityAssigneeName": ""
    },
{tktype.map(tk =>
            <li key={tk.ActivityTypeID}>
              {tk.ActivityTypeDescription}
            </li>
          )}
export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
//*/