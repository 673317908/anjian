<template>
  <div class="login">
    <div class="login-index">
      <!-- <div class="Header">
        <div class="login-tiltle">
          <h2>实操考试系统</h2>
        </div>
      </div> -->
      <div class="login-content animated zoomIn">
        <!-- 头像 -->
        <div class="login-content-img">
          <img src="../image/logo.png" alt />
        </div>
        <!-- 输入框 -->
        <div class="login-box">
          <div class="login-ele">
            <el-form ref="userForm" :rules="rules" :model="users">
              <el-form-item prop="userName">
                <el-input
                  type="text"
                  placeholder="请输入您的账号"
                  v-model="users.userName"
                  style="width:300px;"
                />
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input
                  type="password"
                  placeholder="请输入您的密码"
                  v-model="users.userPwd"
                  style="width:300px;"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 登录按钮 -->
        <div class="login-btn" @click="login('userForm')">
          <span>登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: {
        userName: "",
        userPwd: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login(userForm) {
      console.log(this.users);
      var that = this;
      this.$refs[userForm].validate(valid => {
        if (valid) {
          // this.$router.push({
          //   path: "/detail"
          // });
          let postData = that.$qs.stringify({
            account: this.users.userName,
            password: this.users.userPwd
          });
          let baseURL=this.baseURL
          that
            .$axios({
              url: baseURL+"/public/dologin",
              // url: "/api/public/dologin",
              method: "post",
              proxy: true,
              data: postData
            })
            .then(res => {
              const token = res.data.data.token;
              const usertoken = sessionStorage.setItem("token", token);
              console.log(res.data.data.token);
              console.log(res.data.data);
              if (res.data.code == 1) {
                this.$router.push({
                  path: "/detail",
                  query: {
                    id: res.data.data.examiner_id,
                    name: res.data.data.examiner_name
                  }
                });
              }
            });
          console.log("成功");
        } else {
          console.log("请输入用户名和密码");
        }
      });
      // var data={account:this.users.userName,password:this.users.userPwd}
      // var datas=JSON.stringify(data)
    }
  }
};
</script>

<style lang='less' scoped>
.w {
  margin: 0 auto;
}
.login {
  .login-index {
  box-sizing: border-box;
  margin-top: 17%;
  .login-tiltle {
    text-align: center;
    border-bottom: 1px solid black;
    padding: 20px 0;
  }
  .login-content {
    margin: 0 auto;
    transition: 1s;
    // 头像
    .login-content-img {
      width: 300px;
      height: 170px;
      margin: 50px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 输入框
    .login-box {
      display: flex;
      justify-content: center;
    }
    // 登录按钮
    .login-btn {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #169bd5;
      border-radius: 10px;
      margin-top: 20px;
      color: white;
      padding: 0 10px;
      margin: 0 auto 180px auto;
    }
  }
}
}

</style>