module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:[]
    alias: {  //起别名
      'assets': "@/assets",
      'components': "@/components",
      'network': "@/network",
      'views': "@/views",
      'common': "@/common",
      
    }
    }
  }
}