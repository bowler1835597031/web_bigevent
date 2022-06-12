$.ajaxPrefilter((options) => {
  // console.log(options);
  options.url = 'http://big-event-api-t.itheima.net' + options.url;
  // 注入 token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }
  // 权限校验
  options.complete = (res) => {
    // console.log(res);
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      //  强制清空 token
      localStorage.removeItem('token');
      // 强制跳转到登录页面
      location.href = '/login.html';
    }
  };
});
