import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

const navlist = [
    {
        title: '资金管理',
        list: [
            {
                text: '资金组成',
                path: '/home/composition',
                type: 0
            },
            {
                text: '资金流向',
                path: '/home/flows',
                type: 0
            },
            {
                text: '资金来源',
                path: '/home/source',
                type: 0
            }
        ]
    },
    {
        title: '系统管理',
        list: [
            {
                text: '用户管理',
                path: '/home/user',
                type: 1
            }
        ]
    }
];
const allLink = navlist.map(v => v.list).flat();

class Aside extends Component {

    state = {
        // 左侧导航数据
        navlist: navlist,
        // 所有路由
        allLink: allLink,
        // 当前导航
        curLink: {},
        // 左侧导航的选中下标
        curIndex: 0
    }

    changeTab = (i) => {
        this.setState({
            curIndex: i
        })

        // 跳转到当前tab下第一个导航
        let firstLink = this.state.navlist[i].list[0];
        // 把当前路由添加到顶部
        this.props.addLink(firstLink);
        // 点击tab跳转当前tab下第一个路由
        this.props.history.push(firstLink.path);
    }

    // 设置当前导航信息
    setCurLink = (location) => {
        // 从所有路由数据里筛选出当路由
        let curLink = this.state.allLink.filter(v => v.path == location.pathname)[0];
        if (!curLink) return; 
        // 把当前路由添加到顶部
        this.props.addLink(curLink);
        // 设置当前导航和当前tab高亮
        this.setState({
            curLink: curLink,
            curIndex: curLink.type
        })
    }

    componentDidMount(){
        // 监听路由变化
        this.unlisten = this.props.history.listen(this.setCurLink);
        // 设置当前导航
        this.setCurLink(this.props.location);
    }

    // 组件销毁之前
    componentWillUnmount(){
        // 取消监听
        this.unlisten();
    }

    render(){
        let { navlist, curIndex } = this.state;
        let { addLink } = this.props;
        return (
            <aside>
                <nav>
                    {navlist.map((v,i) => (
                        <span className={curIndex === i ? 'active' : ''} onClick={() => this.changeTab(i)} key={i}>{v.title}</span>
                    ))}
                </nav>

                <div className="submenu">
                    <h2>{this.state.curLink.text}</h2>

                    {navlist[curIndex].list.map((v, i) => (
                        <NavLink activeClassName="active" onClick={() => addLink(v)} to={v.path} key={i}>{v.text}</NavLink>
                    ))}
                </div>
            </aside>
        )
    }
}
Aside = withRouter(Aside)

export default Aside