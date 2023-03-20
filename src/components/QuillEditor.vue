<template>
  <div :class="prefixCls">
    <quill-editor  class="ql-editor-class" v-model="content" value="1111" ref="myQuillEditor" :options="editorOption"
      @change="onEditorChange($event)">
    </quill-editor>
    <input type="file" id="quill-upload" @change="up" hidden />
  </div>
</template>
 
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
//
export default {
  name: "QuillEditor",
  components: {
    quillEditor,
  },
  props: {
    prefixCls: {
      type: String,
      default: "ant-editor-quill",
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String,
    },
  },
  data() {
    return {
      content: null,
     // 富文本编辑器配置
    editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{ direction: 'rtl' }], // 文本方向
            [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['image', 'video'] // 链接、图片、视频
          ]
        },
        placeholder: '请输入正文'
      },
    };
  },

  methods: {
    // 单独上传图片,返回url
    up(e) {
      console.log(e);
      let fi = e.target.files[0];
      let fd = new FormData();
      fd.append("pic", fi);
      this.axios({//请求自己的接口
        url: "/home/detail/detail_pic",
        method: "post",
        data: fd,
      }).then((res) => {
        console.log(res);
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.status == 200) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(
            length,
            "image",
            "http://mobile.xlteacher.cn" + res.data
          );
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
      });
    },
    // onEditorBlur(quill) {
    //   console.log('editor blur!', quill)
    // },
    // onEditorFocus(quill) {
    //   console.log('editor focus!', quill)
    // },
    // onEditorReady(quill) {
    //   console.log('editor ready!', quill)
    // },
    onEditorChange({ quill, html, text }) {
      // console.log(this.content)
      this.$emit("change", html);
    },
  },
  watch: {
    value(val) {
      this.content = val;
      console.log(val);
    },
  },
};
</script>
 
<style lang="scss" >
.ql-editor {
            height: 200px;
        }
</style>

<style type="text/less"  lang="scss" scoped>
    .ql-editor-class {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        padding: 0 !important;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        word-wrap: break-word;
    }
</style>