<template>
    <el-row class="uploade-student">
        <h1>上传学生数据</h1>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="uploade-ruleForm"
        >
            <el-form-item label="姓名" prop="xingming">
                <el-input v-model="ruleForm.xingming"></el-input>
            </el-form-item>
             <el-form-item label="年龄" prop="nianling">
                <el-input v-model.number="ruleForm.nianling"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="xingbie">
                <el-radio-group v-model="ruleForm.xingbie">
                    <el-radio label="男" value="男"></el-radio>
                    <el-radio label="女" value="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="shenfenzheng">
                <el-input v-model="ruleForm.shenfenzheng"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="xuehao">
                <el-input v-model="ruleForm.xuehao"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="banji">
                <el-select v-model="ruleForm.banji" placeholder="请选择班级">
                    <el-option label="全栈-6-1905A" value="1905A"></el-option>
                    <el-option label="全栈-6-1904A" value="1904A"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="学期" prop="xueqi">
                <el-radio-group v-model="ruleForm.xueqi">
                    <el-radio label="P1" value="P1"></el-radio>
                    <el-radio label="P2" value="P2"></el-radio>
                    <el-radio label="P3" value="P3"></el-radio>
                    <el-radio label="P4" value="P4"></el-radio>
                    <el-radio label="P5" value="P5"></el-radio>
                    <el-radio label="P6" value="P6"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="末班生" prop="moban">
                <el-switch v-model="ruleForm.moban"></el-switch>
            </el-form-item>
        </el-form>
         
        <div class="progress">
            <el-progress v-show='progress' :text-inside="true" :stroke-width="26" :percentage="progress | toFixed"></el-progress>
        </div>
        
        <el-upload
            
            class="avatar-uploader"
            action="/api/img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="progressEvent"
            :before-upload="beforeAvatarUpload"
            v-loading="$store.state.loading"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="submitBtn">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: "",
            progress:0,
            lock: false,
            ruleForm: {
                xingming: "",
                nianling:"",
                xingbie:'男',
                shenfenzheng: "",
                xuehao: "",
                banji: "",
                xueqi: "",
                moban: false,
                imageUrl: "",
            },
            rules: {
                xingming: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 5,
                        message: "姓名应在2-5字符",
                        trigger: "blur"
                    }
                ],
                shenfenzheng: [
                    {
                        required: true,
                        message: "请输入身份证号",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 1,
                        message: "身份证号码应在18字符",
                        trigger: "blur"
                    }
                ],
                nianling: [
                    {
                        required: true,
                        message: "请输入年龄",
                        trigger: "blur"
                    },
                    {
                        min: 18,
                        max: 50,
                        type: 'number',
                        message: "年龄应该为 18 - 50",
                        trigger: "blur"
                    }
                ],
                xingbie: [
                    { required: true, message: "请选择性别", trigger: "change" }
                ],
                xuehao: [
                    {
                        required: true,
                        message: "请输入学号",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        max: 6,
                        message: "学号应在4-6字符",
                        trigger: "blur"
                    }
                ],
                banji: [
                    { required: true, message: "请选择班级", trigger: "change" }
                ],
                xueqi: [
                    { required: true, message: "请选择学期", trigger: "change" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // alert("submit!");
                    this.$store.dispatch("ADDSTUDENT", {
                        from: this.ruleForm,
                        cb: this.cbRouter
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        cbRouter(){
            this.$router.push({path: '/list'})
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
            // 只是为了显示图片而已
            this.imageUrl = URL.createObjectURL(file.raw);
            // 将文件名 赋值给ruleForm里面 让addstudent 时候 post出去
            this.ruleForm.imageUrl = res;
        },
        progressEvent(evevt, file, fileList){
            this.progress = evevt.percent
            // console.log(evevt, file, fileList);
            // this.lock 是一把锁 防止commit 多次触发
            if(evevt.percent > 99 && this.lock){
                this.$store.commit('ISLOADING', false)
                this.lock = false;
            }
            if(evevt.percent > 0 && evevt.percent < 99 && !this.lock){
             this.$store.commit('ISLOADING', true)
             this.lock = true;
            }
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error("上传头像图片只能是 JPG 格式!");
            // }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        }
    }
};
</script>

<style scoped lang='stylus'>
.progress{
    width :240px;
    margin: 0px 75px;
}

.uploade-student {
    h1 {
        font-size: 24px;
        width: 96%;
        margin: 20px auto;
        font-weight: normal;
    }

    .uploade-ruleForm {
        width: 96%;
        margin: 0px auto;
    }

    .avatar-uploader, .submitBtn {
        margin: 30px 75px;
    }
}

>>>.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

>>>.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

>>>.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
>>>.el-loading-mask{
    width: 180px;
    height: 180px;
}
>>>.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>