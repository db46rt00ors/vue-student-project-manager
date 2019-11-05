<template>
    <el-row class="student-list">
        <h1>学生列表</h1>
        <el-row class='shaixuan'>
            <el-col :span='3'>筛选:</el-col>
            <el-col>
                <el-radio v-model="xingbie" label="nan">男</el-radio>
                <el-radio v-model="xingbie" label="nv">女</el-radio>
                <el-radio v-model="xingbie" label="all">查看全部</el-radio>
            </el-col>
        </el-row>
        <el-table 
            :data="list" 
            style="width: 96%" 
            max-height="500" 
            class="student-table"
            :default-sort = "{prop: 'xuehao', order: 'ascending'}"
        >
            <!-- <el-table-column prop="id" label="ID" width="150"></el-table-column> -->
            <el-table-column prop="xingming" label="姓名" width="100"></el-table-column>
            <el-table-column prop="nianling" sortable label="年龄" width="100"></el-table-column>
            <el-table-column prop="xingbie" label="性别" width="100"></el-table-column>
            <el-table-column prop="imageUrl" label="图片" width="120">
                <template slot-scope="scope">
                    <img :src="'/api'+ scope.row.imageUrl" alt style="width:100%;" />
                </template>
            </el-table-column>
            <el-table-column prop="shenfenzheng" label="身份证" width="140"></el-table-column>
            <el-table-column prop="xuehao" sortable label="学号" width="120"></el-table-column>
            <el-table-column prop="banji" label="班级" width="140"></el-table-column>
            <el-table-column prop="xueqi" label="学期" width="120"></el-table-column>
            <el-table-column prop="moban" label="末班生" width="80"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope)" type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            xingbie:"" 
        };
    },
    created() {
        this.$store.dispatch("GETALL");
        this.$store.commit("ISLOADING", true);
    },
    computed: {
        list() {
            return this.$store.state.list
        }
    },
    methods: {
        deleteRow(scope) {
            // console.log("删除的id:",scope.row.id);
            this.$store.dispatch("DEL", {
                id: scope.row.id
            });

            this.$store.commit("ISLOADING", true);
        }
    }
};
</script>

<style scoped lang='stylus'>
.shaixuan{
    font-size: 18px;
        width: 96%;
        margin: 40px auto;
}
.student-list {
    h1 {
        font-size: 24px;
        width: 96%;
        margin: 20px auto;
        font-weight: normal;
    }

    .student-table {
        border: 1px solid #eee;
        margin: 0 auto;
    }
}
</style>