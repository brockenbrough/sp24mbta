import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function MbtaMyPage() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/predictions?filter[route]=Orange&filter[stop]=place-north',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>Next Trains</Card.Title>
        <Card.Text>Arrives {alert.attributes.arrival_time} {alert.relationships.route.data.id}</Card.Text>
        </Card.Body>
      </Card>
      ))}


        <h1>Alerts!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}


export default MbtaMyPage;