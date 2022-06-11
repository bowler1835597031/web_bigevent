$(function () {
  const form = layui.form;
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
    },
  });

  //获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取用户信息失败');
        layer.msg('获取用户信息成功');
        console.log(res);
        //填充表单
        form.val('formUserInfo', res.data);
      },
    });
  };
  //重置表单
  $('#btnReset').click((e) => {
    e.preventDefault(); //阻止重置带来的跳的行为
    initUserInfo();
  });
  //更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault(); //阻止submit带来的跳的行为
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg('更新用户信息失败');
        layer.msg('更新用户信息成功');
        //通知父页面 更新用户信息
        window.parent.getUserInfo(); //这也是为什么index.js里为什么不使用入口函数的原因。（会使window.功能失效）
        // console.log(window);
      },
    });
  });

  initUserInfo();
});
