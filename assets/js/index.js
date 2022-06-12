//获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: (res) => {
      //   console.log(res);
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('获取用户信息成功');
      //调用渲染函数
      renderAvatar(res.data);
    },
    //用户如果没有登录，是否能够允许用户访问后台主页？肯定是不能的，所以我们需要进行权限的校验，可以利用请求后服务器返回的状态来决定
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: (res) => {
    //   // console.log(res);
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     //  强制清空 token
    //     localStorage.removeItem('token');
    //     // 强制跳转到登录页面
    //     location.href = '/login.html';
    //   }
    // },
  });
}
//渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  //渲染左侧欢迎语
  $('#welcome').html(`欢迎${name}`);
  //按需渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase(); //让用户名的首字母大写
    $('.text-avatar').html(first).show();
  }
};
// 退出登录
$('#btnExit').click(() => {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '提示' },
    function (index) {
      // 强制清空本地存储里面的 token
      localStorage.removeItem('token');
      // 重新跳转到登录页面
      location.href = '/login.html';
    }
  );
});

//获取用户列表
getUserInfo();

//发布文章后跳转到文章列表时切换高亮
function change() {
  $('#change').addClass('layui-this').next().removeClass('layui-this');
}
