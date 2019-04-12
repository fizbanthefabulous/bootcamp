import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Author from './Author/Author';

const Home = (props) => {
    let authors = props.authorList.map((author, idx) => <Author author={author} key={idx} />)

    return (
        <div>
            <Link to='/new'>Add a quotable author</Link>
            <br />
            <span>We have quotes by:</span>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors}
                </tbody> 
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authorList: state.authors,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);