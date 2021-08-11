import './App.css';

import React from 'react';
import { ApiSpaces } from './components/ApiSpaces';
import { ApiClient } from './clients/ApiClient';

export class App extends React.Component {
  apiClient = new ApiClient();

  constructor()  {
    super();
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const newData = await this.apiClient.getApiData();
    this.setState({
      data: newData
    });
  }

  render() {
    console.log("\n####\n");
    console.log(this.state);
    console.log("\n####\n");
    return (
      <div className="App">
        <ApiSpaces spaces={this.state.data}></ApiSpaces>
      </div>
    );
  }
}

