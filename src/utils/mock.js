import Mock from 'mockjs';

const users = [
  { username: 'admin', password: 'admin123', role: '管理员', token: 'admin-token' },
  { username: 'user', password: 'user123', role: '普通用户', token: 'user-token' }
];

Mock.mock('/api/login', 'post', (options) => {
  const jsonResponse = JSON.parse(options.body)
  const username = jsonResponse.username
  const password = jsonResponse.password
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: user.token,
        role: user.role
      }
    }
  } else {
    return {
      code: 400,
      message: '用户名或密码错误'
    };
  }
});


export default Mock
