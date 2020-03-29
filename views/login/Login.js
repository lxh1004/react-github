import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {

    login = () => {
        axios.post('/login', {
            params: {
                username: this.user.value,
                pwd: this.pwd.value
            }
        }).then(r => {
            let data = r.data;
            if (data.code == 200) {
                let token = data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('username', this.user.value);
                let topath = this.props.location.state ? this.props.location.state.topath : '/home';
                this.props.history.replace(topath)
            } else {
                alert(data.msg)
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className="login-wrap">
                <div className="con">
                    <p>用户名：<input type="text" ref={el => this.user = el}/></p>
                    <p>密码：<input type="password" ref={el => this.pwd = el}/></p>
                    <button onClick={this.login}>登陆</button>
                </div>
            </div>
        )
    }
}
