<template>
  <div class="student">
         <div class="Header">
        <div class="login-tiltle">
          <h2>实操考试系统</h2>
        </div>
      </div>
    <div class="student-index" v-for="(item,index) in keMuList" :key="index">
      <div class="student-sele">
        <div class="student-sele-title">
          <h2>请选择当前考试</h2>
        </div>
        <div class="student-sele-content" >
          <select name id>
            <option>{{item.exam_name}}</option>
            <!-- <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option> -->
          </select>
        </div>
      </div>
      <div class="student-go" @click="goTest(item.exam_name,item.exam_id)">进入考生签到</div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            keMuList:{}
        }
    },
    mounted(){
      // let baseURL=this.baseURL
        this.$axios({
            // url:baseURL+'/SignIn/exams',
            url:'/api/SignIn/exams',
            method:"post",
            headers:{
                token:sessionStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res.data.data)
            this.keMuList=res.data.data
        })
    },
    methods:{
        goTest(exam_name,exam_id){
            this.$router.push({
                path:'/regover',
                query:{
                    exam_name,exam_id
                }
            })
        }
    }
};
</script>

<style lang='less' scoped>
  .login-tiltle {
    text-align: center;
    border-bottom: 1px solid black;
    padding: 20px 0;
  }
.student-index {
  .student-sele {
    display: flex;
    line-height: 30px;
    justify-content: center;
    margin: 20% 0;
    .student-sele-title {
      margin-right: 30px;
    }
    .student-sele-content {
      select {
        width: 200px;
        height: 30px;
      }
    }
  }
  .student-go {
    //  margin: 10px 25px 0 0;
    margin: 0 auto;
    padding: 5px 15px;
    width: 120px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    background-color: #02a7f0;
    color: white;
    margin-bottom: 30%;
  }
}
</style>