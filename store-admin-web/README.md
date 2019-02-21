# 项目工程简要说明    

该项目基于React + AntDesign + Dvajs开发，(DvaJS为基于Redux + react-router + redux-saga的一个状态管理框架)

## 环境配置    
该工程基于npm管理，需要安装node最新版的环境。

## 工程初始化    
首次进入工程需要安装项目下的npm依赖，使用命令行工具在该工程目录下执行下面的命令，包没有更新的话之后不再需要执行该命令    
`npm install`

## 工程相关命令    
开发时只需启动一个server即可，在该工程目录下执行下面的命令即可    
`npm start`    
构建生产包只需在该工程目录下执行下面的命令即可，该命令可在该工程目录的dist目录下生成构建后的前端资源文件，包括html,js,css和图片等资源文件    
`npm run build`    

## 工程相关配置    
.roadhogrc文件中可配置代理的服务器地址，proxy配置下的请求可代理到配置的服务器地址，例如:    
`"proxy": {
    "/api": {
      "target": "http://localhost:8082/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }`    
  该配置可使所有访问/api/下的服务都代理到http://localhost:8082/服务器上，开发时只需配置下该地址即可调用服务器上的服务。         
        
        
## 使用淘宝npm镜像      
`
  npm config set registry https://registry.npm.taobao.org
`