import React, {Component, Fragment} from 'react';
import './App.css';
import {NotificationContainer} from "react-notifications";
import {logoutUser} from "./store/actions/usersActions";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router";
import {Col, Container, Row} from "reactstrap";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

class App extends Component {
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user}
                             logout={this.props.logoutUser}/>
                </header>
                <Container className="py-5">
                    <Row>
                        <Col xs="12" md="12">
                            <Switch>
                                {/*<Route path="/" exact component={}/>*/}
                                <Route path="/login" component={Login}/>
                                <Route path="/register" exact component={Register} />
                                {/*<Route path="//new" exact component={New}/>*/}
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
