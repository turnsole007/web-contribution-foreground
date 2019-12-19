* 页面
    个人中心
        # 显示个人相关信息（用户名、githubid、得分）
        # 修改信息(按钮 添加@click 在方法中改变布尔值ischange),
        input输入框，先显示原有信息，然后修改
    贡献度排行榜
        # 表格，展示排行榜   
        # 排行榜刷新
        # *搜索（晚点加）* 
* component
    navigator
        # logout
    header
    footer
* css
    table


# 登录过滤
# http拦截  token验证
# 错误处理
# 路由跳转


问题
1. 导航栏靠左浮动布局  不能自动居中
2. index的内容
3. 登录注册页是否不显示导航栏

TODO
*RankList     table表头固定加滚动条*
*登录注册页是否不显示导航栏*


1. 问题：
token 存在本地缓存，看看怎么更改
项目开发版和发布版
静态资源路径
阿里云环境
conf ->  index.js  环境的配置  改成环境变量



*computed    mounted   怎么运行*



会议纪要

* 添加功能：
实名认证，尽快出一个方案

* 界面修改：
    # 首页
        ·项目简介
        ·新闻动态，自动生成
    # 排行榜
        ·删除列school、githubID
        ·点击username跳转到个人主页
    # 个人主页
        ·展示用户github的详细统计信息
        ·仓库跳转
        ·个人分数的变化图
    