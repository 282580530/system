<template>
  <div :class="prefixCls">
    <quill-editor v-model="content" value="1111" ref="myQuillEditor" :options="editorOption"
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
// 定义工具栏
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  // [{ align: [] }],
  // ["link", "image", "video"],
  // ["clean"], // remove formatting button
];
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
      editorOption: {
        placeholder: "请输入内容",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector("#quill-upload").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
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