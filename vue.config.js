module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule("vue")
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .tap(options => {
  //       options.compilerOptions.directives = {
  //         html(node, directiveMeta) {
  //           (node.props || (node.props = [])).push({
  //             name: "innerHTML",
  //             value: `xss(_s(${directiveMeta.value}))`
  //           });
  //         }
  //       };
  //       return options;
  //     });
  // }
}
