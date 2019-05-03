import axios from 'axios'
import VueCookie from 'vue-cookie'
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    const userInfo = JSON.parse(VueCookie.get("userInfo") || "{}");
    const noLoginRoutes = ["/", "/login", "/goods", "/login/", "/goods/", "/detail", "/detail/",] // 这些路由未登录就可以访问
    if (noLoginRoutes.includes(to.path)) {
      next()
    } else {
      if (userInfo && userInfo.id) {
        next()
      } else {
        axios.get("/api/portal/portalIndexData").then(getData => {
          const { data } = getData;
          if (data && data.userDetail) {
            // debugger
            const newUserInfo = {}
            Object.keys(getData.dataMap.userDetail).map(key => {
              if (getData.dataMap.userDetail[key]) {
                newUserInfo[key] = getData.dataMap.userDetail[key]
              }
            })
            VueCookie.set(
              'userInfo',
              JSON.stringify(newUserInfo)
            )
            switch (to.path) {
              // case value:

              //   break;

              default:
                next(to.fullPath)
                break;
            }
            // next("/center")
          }
        })
      }

    }
  })
}
