import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentPage } from '../../store/redux';

const Home = (props) => {
    
    if(props.page !== 'home')
        props.updateCurrentPage('home');

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the Project Product Managment Company. Here we can manage a set of products. You are able to create products, remove old products, and edit products.</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
    page: state.page,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Home);