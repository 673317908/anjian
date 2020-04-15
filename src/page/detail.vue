<template>
  <div class="detail">
    <div class="Header">
      <div class="login-tiltle">
        <i class="iconfont icon-arrow-lift" style="font-size:50px" @click="backout"></i>
        <span>实操考试系统</span>
      </div>
    </div>
    <div class="detail-index" v-for="(item,index) of  examList" :key="index">
      <div class="detail-index-date">当前时间：{{getNowFormatDate()}}</div>
      <div class="detail-index-userInfo">
        <h2>考官信息</h2>
        <p>姓名：{{item.examiner.examiner_name}}</p>
      </div>
      <div class="detail-index-list">
        <div class="detail-index-list-title">
          <h2>当天考试列表</h2>
        </div>
        <div class="detail-index-list-content" v-for="(val,index) in item.exams" :key="index">
          <div class="detail-index-list-l">
            <div class="detail-index-list-item">
              <h2>{{val.exam_name}}</h2>
              <p>考点:{{val.platform_name}}</p>
              <p>考试地址:{{val.platform_address}}区{{val.platform_address}}路</p>
              <p>考试时间：{{val.start_time}}</p>
            </div>
          </div>
          <div class="detail-list-b" v-show="isShow">
            <div class="detail-list" v-for="(sub,index) in val.subjects_details" :key="index">
              <div :class="{active:ind==index}" @click="selep(index)">
                <p @click="start(val.exam_id,sub.subject_id)">{{sub.subject_name}}</p>
              </div>
            </div>
            <div class="detail-start" @click="goTest">进入考试</div>
          </div>
          <div class="detail-index-list-r" @click="showList">选择考试科目</div>
        </div>
      </div>
      <div class="Black" v-show="isShow" @click="noneList"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      examList: {},
      isActive: false,
      testid: {
        exam_id: "",
        subject_id: ""
      },
      ind: "-1",
      activeIndex:0
    };
  },
  mounted() {
    // let baseURL=this.baseURL
    this.$axios({
      // url: baseURL+"/exams/lists",
      url: "/api/exams/lists",
      proxy: true,
      headers: {
        token: sessionStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.examList = res.data.data;
      let arrys = [];
      arrys.push(res.data.data);
      this.examList = arrys;
      if (res.data.msg == "请重新登录") {
        setTimeout(() => {
          this.$message({
            message: "请重新登录",
            type: "warning"
          });
          this.$router.push({
            path: "/login"
          });
        }, 2000);
      }
    });
  },
  methods: {
    selep(index) {
      this.ind = index;
    },
    noneList() {
      this.isShow = false;
    },
    getNowFormatDate() {
      var date = new Date(); //获取时间
      var year = date.getFullYear(); //年
      var month = date.getMonth() + 1; //月
      var strDate = date.getDate(); //日
      var hours = date.getHours(); //时
      var minutes = date.getMinutes(); //分
      var second = date.getSeconds(); //秒

      var currentdate =
        year +
        "-" +
        (month > 9 ? month : "0" + month) +
        "-" +
        (strDate > 9 ? strDate : "0" + strDate) +
        " " +
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (second > 9 ? second : "0" + second);

      console.log(currentdate);
      return currentdate;
    },
    showList(index) {
      // console.log(event)
        this.isShow = !this.isShow;
    },
    start(exam_id, subject_id, index) {
      this.testid = { exam_id, subject_id };
      console.log(this.testid);
      this.ind = index;
    },
    goTest() {
      console.log(this.testid);
      this.$router.push({
        path: "/number",
        query: {
          exam_id: this.testid.exam_id,
          subject_id: this.testid.subject_id,
          id:this.$route.query.id,
          name:this.$route.query.name
        }
      });
    },
    backout(){
      this.$router.push({
        path:'/'
      })
    }
  }
};
</script>

<style lang='less' scoped>
.Black {
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: absolute;
  filter: Alpha(opacity=60);
  opacity: 0.6;
  background: #000000;
  // display:none;
}
.active {
  border: 2px solid #c1c1c1;
}
.login-tiltle {
  display: flex;
  // text-align: center;
  border-bottom: 1px solid black;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  span {
    // margin: 10px auto;
    position: absolute;
    top: 35%;
    left: 40%;
    font-weight: 700;
    font-size: 20px;
  }
}
.detail-index {
  height: 100%;
  padding-bottom: 100%;
  .detail-index-date {
    text-align: right;
    padding: 5px 15px 3px 0;
    font-weight: 900;
    font-size: 14px;
  }
  .detail-index-userInfo {
    margin: 0 10px 40px 10px;
    border: 1px solid black;
    padding: 15px 15px 20px 15px;
    h2 {
      margin-bottom: 15px;
    }
    p {
      font-weight: 900;
      font-size: 16px;
    }
  }
  .detail-index-list {
    .detail-index-list-title {
      margin-left: 15px;
    }
    .detail-index-list-content {
      // display: flex;
      // justify-content: space-between;
      position: relative;
      h2 {
        margin-bottom: 5px;
      }
      padding: 15px;
      border: 1px solid black;
      margin: 12px 10px;
      .detail-index-list-l {
        p {
          font-weight: 900;
          font-size: 16px;
          span {
            color: #98f20b;
            font-weight: 900;
          }
        }
      }
      .detail-index-list-r {
        background-color: #26b2f3;
        color: white;
        margin: 10px 25px 0 0;
        padding: 0 15px;
        width: 120px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 5px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        box-sizing: border-box;
      }
      .detail-list-b {
        border: 1px solid rgb(2, 2, 2);
        padding: 10px;
        margin: 0 auto;
        width: 60%;
        position: absolute;
        top: 10%;
        left: 18%;
        z-index: 1;
        background-color: white;
        .detail-list {
          display: flex;
          justify-content: center;
          p {
            text-align: center;
            width: 150px;
            margin-bottom: 10px;
            padding: 15px 20px;
            background-color: #f2f2f2;
          }
          p:first-child {
            margin-top: 5px;
          }
          // p:hover{
          //   background-color: #c1c1c1;
          // }
        }
        .detail-start {
          margin: 10px 25px;
          color: white;
          padding: 5px 15px;
          width: 120px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: 5px;
          margin: 0 auto;
          background-color: #26b2f3;
        }
      }
    }
  }
}
</style>