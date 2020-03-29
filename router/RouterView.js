import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

export default class RouterView extends Component {
    render() {
        let { routes } = this.props;
        let redirect = routes.filter(v => v.redirect);
        routes = routes.filter(v => !v.redirect);
        let token = localStorage.getItem('token');
        return (
            <Switch>
                {routes.map((v, i) => (
                    <Route
                        key={i}
                        path={v.path}
                        name={v.name}
                        render={(props) => {
                            if (v.auth && !token) {
                                return <Redirect to={{pathname: '/login', state: {topath: v.path}}} />
                            }
                            if (v.children) {
                                return <v.component routes={v.children} {...props}></v.component>
                            } else {
                                return <v.component {...props}></v.component>
                            }
                        }}
                    ></Route>
                ))}
                {redirect.map((v, i) => <Redirect key={i} from={v.path} to={v.redirect} />)}
            </Switch>
        )
    }
}
