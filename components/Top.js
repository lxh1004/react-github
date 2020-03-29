import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

class Top extends Component {

    state = {
        username: localStorage.getItem('username')
    }

    exit = () => {
        // 点击退出清除token，跳转到登陆页面
        localStorage.removeItem('token');
        this.props.history.replace('/login')
    }

    render(){
        return (
            <div className="top">
                <div className="user">
                    <span>用户名：{this.state.username}</span> | 
                    <span onClick={this.exit}>退出</span>
                </div>
                <nav>
                    {this.props.topmenu.map((v, i) => (
                        <p  key={i}>
                            <NavLink to={v.path}>{v.text}</NavLink>
                            <span onClick={() => this.props.remove(i, v)}>X</span>
                        </p>
                    ))}
                </nav>
            </div>
        )
    }
}

Top = withRouter(Top)

export default Top