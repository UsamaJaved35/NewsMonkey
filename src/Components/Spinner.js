import React, { Component } from 'react'
import spinner from './spinner.gif'
export default class  extends Component {
  render() {
    return (
      <div className='text-center mx-3 my-3'>
        <img src={spinner} alt='loading'/>
      </div>
    )
  }
}
