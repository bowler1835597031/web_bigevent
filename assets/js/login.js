$(function () {
  //点击切换 登陆和注册
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
  //先引入form来自layui
  const form = layui.form;
  //自定义校验规则
  form.verify({
    //数组方式
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //函数方式
    repwd: (value) => {
      //1.先获取密码框的值
      const pwd = $('.reg-box [name=password]').val();
      console.log(pwd, value);
      if (pwd !== value) return '两次输入的密码不一致';
    },
  });
  //基本路径
  //   const baseUrl = 'http://www.liulongbin.top:3007';
  //禁止注册提交时的默认跳转事件
  $('#form_reg').submit((e) => {
    e.preventDefault();
    //发送注册请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');
        //模拟点击事件，跳转到登陆
        $('#link_login').click();
      },
    });
  });
  //监听登陆表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
          console.log(res);
        if (res.status !== 0) {
          return layer.msg('登陆失败');
        }
        layer.msg('登陆成功');
        //1.要把token 存在本地
        localStorage.setItem('token', res.token);
        //2.跳转到首页
        location.href = '/index.html';
      },
    });
  });
});
