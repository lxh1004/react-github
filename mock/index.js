import Mock from 'mockjs'

Mock.mock('/login', 'post', function(options){
    let { params } = JSON.parse(options.body);
    let { username, pwd } = params;
    if (username === 'zyx' && pwd === '123456') {
        return {
            code: 200,
            msg: '登陆成功',
            token: username + pwd
        }
    } else {
        return {
            code: 10086,
            msg: '用户名或密码错误'
        }
    }
})