<template>
  <div class="login-contain">
    <div class="login-block">
      <h2 class="login-fail-message">登录</h2>
      <span>{{loginFailMessage}}</span>
      <el-form
        class="login-form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        size="medium"
      >
        <el-form-item prop="username">
          <el-input
            class="login-input"
            type="text"
            prefix-icon="el-icon-lx-people"
            @keyup.enter.native="login('loginForm')"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login-input"
            type="password"
            prefix-icon="el-icon-lx-lock"
            v-model="loginForm.password"
            @keyup.enter.native="login('loginForm')"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button
              class="login-button"
              type="primary"
              :loading="isLoginning"
              :disabled="isLoginning"
              @click="login('loginForm')"
            >登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-main',
  data() {
    return {
      isLoginning: false,
      loginFail: false,
      loginFailMessage: '',
      loginForm: {
<<<<<<< HEAD
        username: 'DLS00017',
        password: 'F62R666f'
=======
        username: '',
        password: ''
>>>>>>> d2ee0bdea8f98e6d4b5f571397a773c93b5de7b6
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        imageCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoginning = true
          this.$store
            .dispatch('userLogin', {
              ...this.loginForm
            })
            .then(getData => {
              if (getData.code === 200 && getData.dataMap) {
                const userInfo = {}
                Object.keys(getData.dataMap.userDetail).map(key => {
                  if (getData.dataMap.userDetail[key]) {
                    userInfo[key] = getData.dataMap.userDetail[key]
                  }
                })
                this.$cookie.set('userInfo', JSON.stringify(userInfo))
                this.$store
                  .dispatch('agentPass', {
                    agentCode: this.loginForm.username
                  })
                  .then(getData => {
                    this.isLoginning = false
                    const agentStatusData = getData.dataMap
                    const {
                      accountAuditStatus, //代理商审核 0:不通过，
                      detailAuditStatus //企业信息审核
                    } = agentStatusData
                    this.$cookie.set(
                      'accountAuditStatus',
                      JSON.stringify(agentStatusData)
                    )
                    if (accountAuditStatus !== 4) {
                      // 账号信息没有审核通过
                      this.loginFailMessage = '账号信息处于审核中'
                    } else if (detailAuditStatus === 0) {
                      // 企业信息处于待审核状态，代理商需要去完善信息
                      this.$confirm('企业信息未完善,请去完善企业信息', '提示', {
                        confirmButtonText: '去完善',
                        cancelButtonText: '取消',
                        type: 'warning'
                      })
                        .then(() => {
                          this.$router.replace(
                            `/center?center=info&agentCode=${
                              this.loginForm.username
                            }`
                          )
                        })
                        .catch(() => {
                          this.$router.replace('/')
                        })
                    } else {
                      this.$router.replace('/')
                    }
                  })
                  .catch(error => {
                    this.isLoginning = false
                    this.$alert('出现错误')
                  })
              } else {
                this.isLoginning = false
                this.loginFailMessage = getData.message
              }
            })
            .catch(error => {
              this.isLoginning = false
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-contain {
  height: 600px;
  background: url('~assets/img/login_banner.jpg') no-repeat;
  background-size: cover;
  position: relative;
  .login-block {
    background: #ffffff;
    width: 350px;
    height: 280px;
    padding: 20px;
    border-radius: 9px;
    position: absolute;
    top: 25%;
    right: 15%;
  }
  h2 {
    font-size: 18px;
    line-height: 60px;
  }

  .login-form {
    width: 400px;
    .login-input {
      width: 300px;
    }
    .login-button {
      width: 300px;
    }
  }
}
</style>
