import React, { Component } from 'react'
import RouterView from '../../router/RouterView'
import Aside from '../../components/Aside'
import Top from '../../components/Top'

export default class Home extends Component {

    state = {
        // 顶部导航数据
        topmenu: [],
    }

    // 往顶部添加路由
    addLink = (link) => {
        // 数组去重
        let menu = new Set(this.state.topmenu);
        menu.add(link);
        this.setState({
            topmenu: [...menu]
        })
    }

    // 删除顶部导航
    remove = (index, v) => {
        // 拷贝一份顶部数据
        let menu = [...this.state.topmenu];
        // 删除当前点击的导航
        menu.splice(index, 1);
        this.setState({
            topmenu: [...menu]
        }, () => {
            if (menu.length <= 0) {
                // 顶部导航都关闭时跳转到登陆页面
                this.props.history.push('/login');
                localStorage.removeItem('token')
                return false
            } 
            if (this.props.location.pathname == v.path) {
                // 删除当前导航时跳转到第一个导航
                this.props.history.push(menu[0].path);
            }
        })
    }

    componentDidMount(){
        // 判断是否登陆
        // let token = localStorage.getItem('token');
        // if (!token) {
        //     this.props.history.replace('/login');
        // }
    }

    render() {
        return (
            <div className="home-wrap">
                <Aside addLink={this.addLink} />
                <main>
                    <Top topmenu={this.state.topmenu} remove={this.remove} />
                    <div className="con">
                        <RouterView routes={this.props.routes}/>
                    </div>
                </main>
            </div>
        )
    }
}
