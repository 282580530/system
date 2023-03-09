<template>
    <div>
        <div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="标题名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="条件">
                    <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick">
                    </el-tree>
                </el-form-item>
                <el-form-item label="查询条件">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="是否正常">
                    <el-checkbox v-model="form.normal">正常</el-checkbox>
                    <el-checkbox v-model="form.unusual">异常</el-checkbox>
                </el-form-item>
                <el-form-item label="文本内容" class="editor">
                    <EditorBar></EditorBar>
                </el-form-item>
                <el-form-item label="附件上传">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                        :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div>
                <el-button>返回</el-button>
                <el-button>确定</el-button>
            </div>
        </div>

    </div>
</template>

<script>
import EditorBar from "../../components/QuillEditor.vue";
export default {
    components: {
        EditorBar,  //并注册

    },
    data() {
        return {
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            list: [{ name: '正常', value: 1 }, { name: '异常', value: 0 }],
            form: {
                name: '',
                label: '',
                normal: '',
                unusual: '',
            },
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleNodeClick(data) {
            console.log(data);
            this.form.label = data.label
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-form {
    display: flex;
    width: 100%;
    padding: 40px 0;
    flex-direction: column;

    .editor {
        width: 1000px;

        
    }
}

.el-form-item {
    width: 400px;
    padding: 0 40px;
}
</style>