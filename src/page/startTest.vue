<template>
  <div class="startTest">
         <div class="Header">
        <div class="login-tiltle">
          <h2>实操考试系统</h2>
        </div>
      </div>
    <div class="startTest-index" v-for="(val,index) of scoreLists" :key="index">
      <div class="startTest-userInfo">
        <!-- 考试科目 -->
        <div class="startTest-content">
          <div class="startTest-content-l">
            <div class="startTest-content-title">
              <h2>{{val.Row.exam_name}}</h2>
            </div>
            <div class="startTest-content-list">
              <span>科目</span>:
              <span>{{val.Row.subject_name}}</span>
            </div>
            <div class="startTest-content-addres-date">
              考场：
              <span>{{val.Row.platform_name}}</span> 考试时间：
              <span>{{val.Row.start_time}}</span>
            </div>
          </div>
          <div class="startTest-content-r" @click="outNumber(val.subject_grade_id)">返回上一页</div>
        </div>
        <!-- 考生信息 -->
        <div class="student-info">
          <div class="student-info-title">
            <h2>考试信息</h2>
          </div>
          <div class="student-info-content">
            <div class="student-info-content-img">
              <img :src="val.grade.head_photo" alt />
            </div>
            <div class="student-info-content-list">
              <p>姓名：{{val.grade.examinee_name}}</p>
              <p>性别：{{val.grade.sex==1?'男':'女'}}</p>
              <p>身份证号：{{val.grade.ticket_num}}</p>
              <p>准考证号：{{val.grade.id_num}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 考试题目 -->
      <div class="student-test">
        <div class="student-test-title">
          <h2>考试题目</h2>
        </div>
        <div
          class="student-test-list"
          style="height:300px;overflow-y:auto;width:100%;overflow-x:auto;">
          <keep-alive>
          <table>
            <tr>
              <th>序号</th>
              <th>考评项目</th>
              <th>考评内容</th>
              <th>配分</th>
              <th>扣分原因</th>
              <th>扣分</th>
              <th>得分</th>
            </tr>
            <tr v-for="(item,index) in val.list.data" :key="index">
              <td>{{val.list.num}}</td>
              <td>{{val.list.subject_name}}</td>
              <td>
                <div>{{item.content_name}}</div>
              </td>
              <td>{{item.content_score}}</td>
              <td>
                <div v-for="(item2,index) in item.loses" :key="index">
                  <!-- {{item2.deduct_reason}} -->
                  <!-- @click="check(item2.lose_id,item2.is_check)" -->
                  {{val.list.num}}.{{item2.deduct_reason}}
                  <input
                    type="checkbox"
                    :checked='item2.is_check==1?true:false'
                    @click="check(item2,$event,item)"
                  />
                  <!-- @click="check(item2.lose_id,item2.is_check)" -->
                </div>
              </td>
              <td>
                <!-- v-model="koufenlist[index]" -->
                <!-- v-model="defenlist[index]" -->
                <input type="number" step=0.5 @keyup="getkoufen(item,$event)" :value="item.lose_point==0?'':item.lose_point"  />
              </td>
              <td>
                <input type="number" step=0.5  @keyup="getdefen(item,$event)" :value="item.get_point==0?'':item.get_point" />
              </td>
            </tr>
          </table>
          </keep-alive>
        </div>
      </div>
      <div class="student-test-sub">
        <div class="student-test-sub-btn" @click="subTest($route.query.subject_grade_id)">确定提交成绩</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreLists: {},
      koufenlist: [],
      defenlist: []
    };
  },
  methods: {
    outNumber(subject_grade_id) {
      let subject_id = this.$route.query.subject_id;
      let exam_id = this.$route.query.exam_id;
      this.$router.push({
        path: "/number",
        query: {
          subject_grade_id,
          subject_id,
          exam_id
        }
      });
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
    check(item2, event, item) {
      if (event.target.checked == true) {
        item2.is_check = 1;
      } else {
        item2.is_check = 2;
      }
      let postData = {
        lose_id: item2.lose_id,
        is_checked: item2.is_check
      };
      // let baseURL=this.baseURL
      this.$axios({
        // url: baseURL+"/Score/check",
        url: "/api/Score/check",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token")
        },
        data: postData
      }).then(res => {
        console.log(res);
      });
    },

    // 输入扣分触发
    getkoufen(item, event) {
      item.lose_point = event.target.value;
      let koufen=sessionStorage.setItem('koufen',item.lose_point)
      let kouData = {
        get_id: item.get_id,
        lose_point: item.lose_point
      };
      console.log(kouData);
      // let baseURL=this.baseURL
      this.$axios({
        url: "/api/Score/setLoseScore",
        // url: baseURL+"/Score/setLoseScore",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token")
        },
        data: kouData
      }).then(res => {
        console.log(res);
      });
    },

    // 输入得分触发
    getdefen(item, event2) {
      item.get_point = event2.target.value;
      let defen=sessionStorage.setItem('defen',item.get_point)
      let deData = {
        get_id: item.get_id,
        get_point: item.get_point
      };
      // let baseURL=this.baseURL
      this.$axios({
        // url: baseURL+"/Score/setGetScore",
        url: "/api/Score/setGetScore",
        method: "post",
        headers: {
          token: sessionStorage.getItem("token")
        },
        data: deData
      }).then(res => {
        console.log(res);
      });
    },
    subTest(subject_grade_id) {
      this.$confirm("是否提交成绩？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let subjData = { subject_grade_id: subject_grade_id };
        // let baseURL=this.baseURL
        this.$axios({
          // url: baseURL+"/Score/setGrade",
          url: "/api/Score/setGrade",
          method: "post",
          headers: {
            token: sessionStorage.getItem("token")
          },
          data: subjData
        }).then(res => {
          let subject_id = this.$route.query.subject_id;
          let exam_id = this.$route.query.exam_id;
          this.$router.push({
            path: "/number",
            query: {
              exam_id,
              subject_id
            }
          });
        });
      });
    }
  },
  mounted() {
    let getId = { id: this.$route.query.subject_grade_id };
    this.koufenlist=sessionStorage.getItem('koufen')
    this.defenlist=sessionStorage.getItem('defen')
    // let baseURL=this.baseURL
    this.$axios({
      url: "/api/Grade/start",
      // url: baseURL+"/Grade/start",
      headers: {
        token: sessionStorage.getItem("token")
      },
      params: getId
    }).then(res => {
      if (res.data.code == 1) {
        // let baseURL=this.baseURL
        this.$axios({
          // url: baseURL+"/Score/lists",
          url: "/api/Score/lists",
          headers: {
            token: sessionStorage.getItem("token")
          },
          params: getId
        }).then(res => {
          // console.log(res.data.data);
          let arrys = [];
          arrys.push(res.data.data);
          console.log(arrys);
          this.scoreLists = arrys;
        });
      }
    });
  }
};
</script>

<style lang='less' scoped>
.startTest-index {
  //   border: 1px solid black;
    .login-tiltle {
    text-align: center;
    border-bottom: 1px solid black;
    padding: 20px 0;
  }
  .startTest-content {
    display: flex;
    justify-content: space-between;
    margin: 15px 7px;
    border: 1px solid black;
    .startTest-content-l {
      padding: 10px;
      font-weight: 900;
      .startTest-content-list {
        margin: 5px 0;
      }
      .startTest-content-addres-date {
        span {
          margin-right: 10px;
        }
      }
    }
    .startTest-content-r {
      margin: 10px 25px 0 0;
      background-color: #f5bd00;
      color: white;
      padding: 5px 15px;
      width: 120px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
    }
  }
  .student-info {
    border: 1px solid black;
    margin: 15px 7px;
    .student-info-title {
      padding: 20px 0 5px 5px;
    }
    .student-info-content {
      display: flex;
      .student-info-content-img {
        margin-left: 10px;
        margin-right: 15px;
        width: 123px;
        img {
          width: 100%;
        }
      }
      .student-info-content-list {
        font-size: 18px;
        font-weight: 800;
        p {
          margin: 7px 0;
        }
      }
    }
  }
  .student-test {
    margin: 15px 7px;
    .student-test-list {
      margin-top: 15px;
      // border: 1px solid black;
      box-sizing: border-box;
      text-align: center;
      table {
        width: 1000px;
        tr {
          th {
            padding: 10px 20px;
            text-align: center;
            border-top: 1px solid black;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            font-weight: 700;
            font-size: 16px;
          }
          th:nth-child(1) {
            border-left: 1px solid black;
          }
          td {
            border: 1px solid black;
            // border-left: none;
            border-top: none;
            padding: 10px;
            div {
              text-align: left;
              // padding: 10px 0;
              display: flex;
              justify-content: space-between;
            }
            input {
              height: 20px;
              width: 20px;
              margin-bottom: 10px;
              margin-left: 5px;
              border: 1px solid black;
            }
          }
        }
      }
    }
  }
  .student-test-sub {
    display: flex;
    padding: 10px;
    // margin: 50px 10px;
    // border: 1px solid black;
    height: 55px;
    justify-content: center;
    .student-test-sub-btn {
      margin: 10px 25px 0 0;
      padding: 5px 15px;
      width: 120px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      background-color: #02a7f0;
      color: white;
    }
  }
}
</style>