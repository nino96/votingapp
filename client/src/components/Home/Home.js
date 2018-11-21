import React, { Component } from "react";
import "./Home.css";
import Layout from '../../Layout';

class Home extends Component {
  render() {
    return (

      <Layout>  
      <div className="Home">
        <div className="lander">
          <h1>Vote</h1>
          <p>A simple vote taking app</p>
        </div>
      </div>
      </Layout>
    );
  }
}

export default Home;