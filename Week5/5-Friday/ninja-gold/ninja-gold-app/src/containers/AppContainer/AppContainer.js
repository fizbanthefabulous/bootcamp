import React from 'react';
import './AppContainer.css';
import { connect } from 'react-redux';
import { initState } from '../../store/redux';
import { getCurrentBankState } from '../../utility/helpers';
import GoldDisplay from '../../components/GoldDisplay/GoldDisplay';
import GoldActions from '../../components/GoldActions/GoldActions';
import HistoryDisplay from '../../components/HistoryDisplay/HistoryDisplay';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        getCurrentBankState()
            .then((bankState) => {
                console.log("BankState",bankState);
                this.props.initState(bankState.history, bankState.gold);
            })
    }

    render() {
        console.log("Rendering Container!")
        return (
            <div className="app-container">
                <GoldDisplay />
                <GoldActions />
                <HistoryDisplay />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    initState: (history, gold) => dispatch(initState(history, gold)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer)