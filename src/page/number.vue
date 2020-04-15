<template>
  <div class="number">
    <div class="Header">
      <div class="login-tiltle">
        <i class="iconfont icon-arrow-lift" style="font-size:50px" @click="backout"></i>
        <span>实操考试系统</span>
      </div>
    </div>
    <div class="number-index" v-for="(val,index) of students" :key="index">
      <div class="number-index-list">
        <div class="number-index-list-l">
          <div class="number-index-list-title">
            <h2>
              {{val.examRow.exam_name}}
              <span>{{val.subjectName}}</span>
            </h2>
          </div>
          <div class="number-index-addres-date">
            <span>考场:xxx</span>
            <span>考试时间:{{val.examRow.start_time}}</span>
          </div>
          <div class="number-index-number">
            <span>考生总数{{val.allNum}}人</span>
            <span>当前签到{{val.signNum}}人</span>
          </div>
        </div>
        <div class="number-index-list-r" @click="blckIndex">返回主页面</div>
      </div>
      <div class="start-number" @click="addNumber">开始叫号</div>
      <div class="now-number">
        <div class="now-number-title">
          <h2>当前叫号</h2>
        </div>
        <div class="now-number-item">
          <div class="now-number-list">
            <div
              class="now-number-list-item"
              style="height:300px;overflow-y:auto;overflow-x:auto;box-sizing:border-box;"
            >
              <table
                style="border:1px solid black;width:740px;margin-left: 10px;max-margin:740px  "
              >
                <tr>
                  <th>序号</th>
                  <th>照片</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>准考证号</th>
                  <th>身份证号</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(exam,index) in val.signers" :key="index">
                  <td>{{exam.subject_grade_id}}</td>
                  <td>
                    <img :src="exam.head_photo" alt />
                  </td>
                  <td>{{exam.examinee_name}}</td>
                  <td>{{exam.sex==1?'男':'女'}}</td>
                  <td>{{exam.id_num}}</td>
                  <td>{{exam.ticket_num}}</td>
                  <td>
                    <span class="start" @click="startTest(exam.subject_grade_id)">开始考试</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: {}
    };
  },
  mounted() {
    let examID = {
      subject_id: this.$route.query.subject_id,
      exam_id: this.$route.query.exam_id
    };
    // let examID=this.$qs.stringify({
    //   subject_id:this.$route.query.subject_id,exam_id:this.$route.query.exam_id
    //   });
    // let baseURL=this.baseURL
    this.$axios({
      // url: baseURL+"/exams/enterSubject",
      url: "/api/exams/enterSubject",
      headers: {
        token: sessionStorage.getItem("token")
      },
      params: examID
    }).then(res => {
      console.log(res);
      if (res.data.code == 0) {
        this.$confirm("操作有误，您不负责监考本科目,请返回", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(() => {
          setTimeout(() => {
            this.$router.push({
              path: "/detail",
              query: {
                id: this.$route.query.id,
                name: this.$route.query.name
              }
            });
          }, 1000);
        });
      }
      if (res.data.code == 1) {
        // let baseURL=this.baseURL
        this.$axios({
          // url: baseURL+"/Grade/calls",
          url: "/api/Grade/calls",
          headers: {
            token: sessionStorage.getItem("token")
          },
          method: "post",
          data: examID
        }).then(res => {
          console.log(res.data.data);
          let arrys = [];
          arrys.push(res.data.data);
          console.log(arrys);
          this.students = arrys;
        });
      }
    });
  },
  methods: {
    blckIndex() {
      this.$router.push({
        path: "/detail"
      });
    },
    addNumber() {
      this.$router.go(0);
    },
    startTest(subject_grade_id) {
      let subject_id = this.$route.query.subject_id;
      let exam_id = this.$route.query.exam_id;
      this.$router.push({
        path: "/startTest",
        query: {
          subject_grade_id,
          subject_id,
          exam_id
        }
      });
    },
    backout() {
      this.$router.push({
        path: "/detail",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
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
.number-index {
  .number-index-list {
    border: 1px solid black;
    padding: 10px 5px;
    margin: 10px 5px 30px 5px;
    display: flex;
    justify-content: space-between;
    .number-index-list-l {
      font-weight: 700;
      font-size: 14px;
      .number-index-list-title {
        span {
          margin-left: 10px;
        }
      }
      .number-index-addres-date {
        margin: 5px 0;
        span {
          margin-right: 15px;
        }
      }
      .number-index-number {
        span {
          margin-right: 20px;
        }
      }
    }
    .number-index-list-r {
      // margin: 5px 5px;
      background-color: #f5bd00;
      color: white;
      padding: 5px 15px;
      width: 120px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .start-number {
    background-color: #26b2f3;
    color: white;
    padding: 5px 10px;
    width: 120px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px;
    border: none;
  }
  .now-number {
    // margin: 1%;
    // padding: 1%;
    // padding: 0 20px;
    width: 100%;
    .now-number-title {
      margin-left: 1%;
    }
  }
  .now-number-item {
    // margin: 0 30px;
    table {
      border-top: 1px solid black;
      border-left: 1px solid black;
    }
    .now-number-list {
      margin: 30px 0 80px 0;
      text-align: center;
      // border: 1px solid black;
      //   border-top: 1px solid black;
      // border-right: none;
      //   border-left: 1px solid black;
      .now-number-list-item {
        th {
          border-right: 1px solid black;
          border-bottom: 1px solid black;
          text-align: center;
          padding: 10px 15px;
          font-weight: 700;
          font-size: 1%;
        }
        td {
          padding: 0 1%;
          // height: 60px;
          // line-height: 60px;
          // width: 1%;
          border-bottom: 1px solid black;
          border-right: 1px solid black;
          img {
            margin: 1% 0;
            width: 100%;
            margin: 20px auto;
          }
          .start {
            // padding: 1% 2%;
            padding: 5%;
            background-color: #02a7f0;
            color: white;
            border-radius: 15%;
          }
        }
      }
    }
  }
}
</style>