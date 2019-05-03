import axios from 'axios'
import VueCookie from 'vue-cookie'
export default ({ app, store }) => {
  console.log('store',store.state.cartState.shopCar)
  store.commit("SAVE_CART_NUM",store.state.cartState.shopCar)
  console.log('store',store.state.cartState.shopCar)
  // app.router.beforeEach((to, from, next) => {
  //   console.log(to,"aaaaaa")
  //   const noLoginRoutes = ["/", "/login", "/goods","/detail"] // 这些路由未登录就可以访问
  //   if (noLoginRoutes.includes(to.path)) {
  //     next()
  //   } else {
  //     const { loginState } = store.state;
  //     if (loginState.userInfo.id) {
  //       next()
  //     } else {
  //       axios.get("/api/portal/portalIndexData").then(getData => {
  //         const { data } = getData;
  //         if (data && data.userDetail) {
  //           // debugger
  //
  //           store.commit("SAVE_UERINFO", data.userDetail)
  //           switch (to.path) {
  //             // case value:
  //
  //             //   break;
  //
  //             default:
  //               next(to.fullPath)
  //               break;
  //           }
  //           // next("/center")
  //         }
  //       })
  //     }
  //
  //   }
  // })
}
