<template>
  <div class="regOver">
    <div class="Header">
      <div class="login-tiltle">
        <i class="iconfont icon-arrow-lift" style="font-size:50px;cursor: pointer;color:white;" @click="backout"></i>
        <span>实操考试系统</span>
      </div>
    </div>
    <div class="regOver-index animated fadeInRight">
      <div class="regOver-index-title">考生签到</div>
      <div class="regOver-index-content">
        <p>当前考点:考点一</p>
        <p>当前考试:{{this.$route.query.exam_name}}</p>
      </div>
      <div class="student-number">
        <div class="student-number-id">
          <input type="text" placeholder="请输入身份证号" v-model="userInfoId" />
        </div>
      </div>
      <div class="qiandao-btn" @click="chenggong">签到</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfoId: ""
    };
  },
  methods: {
    chenggong() {
      let postUserInfo = {
        exam_id: this.$route.query.exam_id,
        idNum: this.userInfoId
      };
      let baseURL=this.baseURL
      this.$axios({
        // url: "/api/SignIn/sign",
        url: baseURL+'/SignIn/sign',
        method: "post",
        data: postUserInfo
      }).then(res => {
        this.$message({
          message: "签到成功",
          type: "success"
        });
        setTimeout(() => {
          this.userInfoId=''
        }, 3000);
        setTimeout(() => {
          this.$router.push({
            path:'/studentQiandao'
          })
        }, 4000);
      });
    },
    backout(){
      this.$router.push({
        path:'/studentQiandao'
      })
    }
  }
};
</script>

<style lang='less' scoped>
.regOver {
  height: 100%;
  margin-bottom: 50%;
  .login-tiltle {
    display: flex;
    text-align: center;
    // border-bottom: 1px solid black;
    padding: 20px 0;
    background-color: #26b2f3;
    color: white;
    position: relative;
    span {
       position: absolute;
      top: 35%;
      left: 45%;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .regOver-index {
    transition: 1s;
    .regOver-index-title {
      font-size: 30px;
      font-weight: 800;
      text-align: center;
      padding: 30px 0;
    }
    .regOver-index-content {
      margin-left: 30px;
      p {
        font-weight: 900;
        font-size: 16px;
      }
    }
    .student-number {
      margin-top: 30px;
      .student-number-id {
        border: 1px solid black;
        margin: 0 auto;
        text-align: center;
        // padding: 0 15px;
        font-weight: 800;
        width: 75%;
        box-sizing: border-box;
        input {
          width: 100%;
          padding: 10px 0;
          outline-style: none;
        }
      }
    }
    .qiandao-btn {
      background-color: #26b2f3;
      color: white;
      margin: 30px auto;
      padding: 0 15px;
      width: 120px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 5px;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
}
</style>