module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({file}) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],

      //文章正文使用github-markdown.css，改变其样式
      //配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
};
