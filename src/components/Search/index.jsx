import React, { Component } from 'react'
import axios from 'axios'

export default class extends Component {
  search=()=>{
    //get user input
    const {keyWordElement:{value:keyWord}}=this
    //update state before sending request
    this.props.updateAppState({isFirst:false,isLoading:true})
    //send request
    //http://api.github.com/search/users?/q=xxxxxx
    axios.get(`http://api.github.com/search/users?q=${keyWord}`).then(
      response=>{
        //request sending successed
        this.props.updateAppState({isLoading:false,users:response.data.items})
      },
      error=>{
        //request sending failed
        this.props.updateAppState({isLoading:false,err:error.message})
      }
    )
  }
  render() {
    return (
      <div>
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input ref={c=>this.keyWordElement=c} type="text" placeholder="enter the name you search"/>&nbsp;
                <button onClick={this.search}>Search</button>
            </div>
        </section>
      </div>
    )
  }
}
