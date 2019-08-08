import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import {connect} from 'react-redux'
import { requestUserData } from './../../ducks/userReducer'
import { requestBudgetData, addPurchase, removePurchase } from './../../ducks/budgetReducer'

//since we are passing values from prop those all need to be imported at the top and passed down on "component"

class Budget extends Component {
  componentDidMount(){
    //both of these action BUILDER are defined in separate files but allowed here because of the combineReducers in store
    this.props.requestUserData()
    this.props.requestBudgetData()
  }
  render() {
    const { loading, purchases, budgetLimit } = this.props.budget
    const { firstName, lastName} = this.props.user
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          {/* The Nav component is expecting firstName & lastName from prop. I need to pass these on the component  */}
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase}/>
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}
//Don't forget The second arg to the connect method is an object that you can put any needed action creators in
export default connect(mapStateToProps, { requestUserData, requestBudgetData, addPurchase, removePurchase })(Budget);
