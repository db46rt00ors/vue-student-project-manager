<template>
    <div id="app" v-height >
        <el-row>
            <el-row class="header">
                <el-col :span="4" class="logo">
                    <div>logo</div>
                </el-col>
                <el-col :span="20" class="title">xxxx学生管理系统</el-col>
            </el-row>
            <el-row class="content" v-loading='$store.state.loading'>
                <el-col :span="4" class="navList" v-height="60">
                    <el-row
                        class="item"
                        v-for="(item, index) in navList"
                        :key="index"
                        @click.native="routerGo(item.url)"
                    >
                        <el-col>{{item.title}}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="20">
                    <transition  mode="out-in"
                        appear-class='displaynone'
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                        :duration="{ enter: 500, leave: 300 }"
                    >
                        <router-view></router-view>
                    </transition>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navList: [
                {
                    title: "学生列表",
                    url: "/list"
                },
                {
                    title: "上传信息",
                    url: "/uploader"
                }
            ]
        };
    },
    methods: {
        routerGo(url) {
            // console.log("url:", url);
            this.$router.push({ path: url });
        }
    }
};
</script>
<style scoped lang='stylus'>
.displaynone{
    opacity 0
}
.header {
    height: 60px;
    line-height: 60px;
    background-color: #1e91ca;
    text-align: center;
    color: #fff;
    font-size: 26px;

    .logo {
        padding-left: 20px;
    }
}

.content {
    .navList {
        background-color: #27b8ff;
        .item {
            height: 50px;
            border-bottom: 1px solid #fff;
            text-align: center;
            line-height: 50px;
            color: #fff;
            font-weight: bolder;
            cursor: pointer;
        }
    }
}
</style>
