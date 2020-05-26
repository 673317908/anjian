<template>
  <div class="detail">
    <div class="Header">
      <div class="login-tiltle">
        <i
          class="iconfont icon-arrow-lift"
          style="font-size:50px;cursor: pointer;color:white;"
          @click="backout"
        ></i>
        <span>实操考试系统</span>
      </div>
    </div>
    <div class="detail-index" v-for="(item,index) of  examList" :key="index">
      <div class="detail-index-date">当前时间：{{gettime}}</div>
      <div class="detail-index-userInfo animated fadeInRight">
        <h2>考官信息</h2>
        <div class="detail-index-userInfo-list">
          <div class="detail-index-userInfo-list-content">
            <p>姓名：{{item.examiner.examiner_name}}</p>
            <p>工号:{{item.examiner.verify_id}}</p>
            <p>电话:{{item.examiner.mobile}}</p>
          </div>
          <div class="detail-index-userInfo-list-img">
            <img src alt />
            <!-- <input type="file" accept="image/*"> -->
            <van-uploader :after-read="afterRead" accept=‘image/*‘ capture='camera' :max-count="2"/>
          </div>
        </div>
      </div>
      <div class="detail-index-list">
        <div class="detail-index-list-title">
          <h2>当天考试列表</h2>
        </div>
        <div
          class="detail-index-list-content animated bounceInUp"
          v-for="(val,index) in item.exams"
          :key="index"
        >
          <div class="detail-index-list-l">
            <div class="detail-index-list-item">
              <h2>{{val.exam_name}}</h2>
              <p>考点:{{val.platform_name}}</p>
              <p>考试地址:{{val.platform_address}}区{{val.platform_address}}路</p>
              <p>考试时间：{{val.start_time}}</p>
            </div>
          </div>
          <div class="detail-index-list-r" @click="showList(val.exam_id)">进入考试</div>
          <!-- <div class="detail-list-b" v-show="curindex==index?true:false">
            <div class="detail-list" v-for="(sub,index) in val.subjects_details" :key="index">
              <div :class="{active:ind==index}" @click="selep(index)">
                <p @click="start(val.exam_id,sub.subject_id)">{{sub.subject_name}}</p>
              </div>
          </div>-->
          <!-- <div class="detail-start" @click="goTest">进入考试</div> -->
          <!-- </div> -->
        </div>
      </div>
      <!-- v-show="curindex==index?true:false" -->
      <!-- <div class="Black" v-show="zhaoziindex==maskindex?true:false" @click="noneList"></div> -->
      <div class="down">已经到底了...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zhaoziindex: !0,
      isShow: false,
      curindex: "-1",
      examList: {},
      isActive: false,
      testid: {
        exam_id: "",
        subject_id: ""
      },
      ind: "-1",
      activeIndex: 0,
      activeListIndex: "",
      gettime: "",
      maskindex: "",
      list: []
    };
  },
  mounted() {
    let baseURL=this.baseURL
    this.$axios({
      url: baseURL+"/exams/lists",
      // url: "/api/exams/lists",
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
    this.currentTime();
  },
  methods: {
    detailShow(e) {
      //  console.log(e)
      return "dels" + e;
    },
    selep(index) {
      this.ind = index;
    },
    // noneList(index) {
    //   // console.log(index);
    //   this.zhaoziindex = "-1";
    //   this.curindex = "-1";
    // },
    getNowFormatDate() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      setInterval(this.getNowFormatDate, 500);
    },
    showList(exam_id) {
      // console.log(index);
      console.log(exam_id);
      // this.maskindex = index;
      // this.zhaoziindex = index;
      // this.curindex = index;
      //  this.isShow =!this.isShow;

      // this.$router.push({
      //   path: "/number",
      //   query: {
      //     exam_id: exam_id,
      //     id: this.$route.query.id,
      //     name: this.$route.query.name
      //   }
      // });
      // let postId = { exam_id: exam_id };
      // this.$axios({
      //   url: "/api/Grade/calls",
      //   method: "post",
      //   headers: {
      //     token: sessionStorage.getItem("token")
      //   },
      //   data: postId
      // }).then(res => {
      //   console.log(res);
      this.$router.push({
        path: "/number",
        query: {
          exam_id: exam_id,
          id: this.$route.query.id,
          name: this.$route.query.name
        }
      });
      // });
    },
    // start(exam_id, subject_id, index) {
    //   this.testid = { exam_id, subject_id };
    //   // console.log(this.testid);
    //   this.ind = index;
    // },
    // goTest() {
    //   // console.log(this.testid);
    //   this.$router.push({
    //     path: "/number",
    //     query: {
    //       exam_id: this.testid.exam_id,
    //       subject_id: this.testid.subject_id,
    //       id: this.$route.query.id,
    //       name: this.$route.query.name
    //     }
    //   });
    // },
    backout() {
      this.$router.push({
        path: "/"
      });
    },
    afterRead(file){
      console.log(file)
    }
  }
};
</script>

<style lang='less' scoped>
.down {
  padding: 20px 0;
  text-align: center;
  color: white;
  font-size: 20px;
}
.dels {
  display: none;
}
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
  border: 1px solid #c1c1c1;
  box-sizing: border-box;
}
.detail {
  height: 100%;
  position: relative;
  .login-tiltle {
    display: flex;
    // text-align: center;
    // border-bottom: 1px solid black;
    padding: 10px 0;
    box-sizing: border-box;
    position: relative;
    background-color: #26b2f3;
    color: white;
    span {
      // margin: 10px auto;
      position: absolute;
      top: 35%;
      left: 41%;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .detail-index {
    height: 100%;
    // padding-bottom: 100%;
    background-color: #e6e6e6;
    .detail-index-date {
      text-align: right;
      padding: 20px 15px;
      font-weight: 900;
      font-size: 14px;
    }
    .detail-index-userInfo {
      margin: 0 10px 40px 10px;
      // border: 1px solid black;
      padding: 15px 15px 20px 15px;
      transition: 1s;
      background-color: white;
      border-radius: 10px;
      h2 {
        margin-bottom: 15px;
      }
      p {
        font-weight: 900;
        font-size: 16px;
      }
      .detail-index-userInfo-list {
        display: flex;
        justify-content: space-between;
        .detail-index-userInfo-list-img {
          img {
            width: 100px;
          }
        }
        .detail-index-userInfo-list-content {
          margin-left: 15px;
        }
      }
    }
    .detail-index-list {
      padding: 0 10px;
      .detail-index-list-title {
        margin-left: 15px;
      }
      .detail-index-list-content {
        // display: flex;
        // justify-content: space-between;
        padding: 0 10px;
        background-color: white;
        position: relative;
        border-radius: 10px;
        transition: 1s;
        h2 {
          margin-bottom: 5px;
        }
        padding: 15px;
        // border: 1px solid black;
        margin-top: 12px;
        .detail-index-list-l {
          p {
            font-weight: none;
            font-size: 16px;
            margin-bottom: 5px;
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
          top: 30%;
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
              box-sizing: border-box;
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
            margin: 20px auto;
            background-color: #26b2f3;
          }
        }
      }
    }
  }
}
</style>