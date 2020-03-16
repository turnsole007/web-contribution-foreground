<template>
  <div class="app-container">
    <div class="new-container">
      <div class="title">{{this_new.title}}</div>
      <div class="ref">装载自  {{this_new.ref}}</div>
      <article class="markdown-body" style="text-align:left" v-html="content"></article>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import 'github-markdown-css/github-markdown.css'

export default {
  name: 'News',
  data () {
    return {
      this_new: {
        id: '',
        title: '',
        context: '',
        ref: ''
      },
      content: ''
    }
  },
  mounted () {
    this.getNew()
  },
  methods: {
    getNew () {
      if (JSON.stringify(this.$route.params).search('id') !== -1) {
        this.this_new.id = this.$route.params.id
        this.this_new.title = this.$route.params.title
        this.this_new.context = this.$route.params.context
        this.this_new.ref = this.$route.params.ref
        // marked将markdown语法渲染成html语法
        this.content = marked(this.this_new.context)
        window.console.log('content')
        window.console.log(this.content)
      }
    }
  }
}
</script>

<style lang="scss">
.new-container {
  margin: 0px 6%;

  .title {
    font-size: 25px;
    font-weight: bold;
    margin: 20px 0px;
    text-align: center;
  }

  .ref {
    font-size: 14px;
    text-align: center;
  }

  /* .context {
    font-size: 17px;
    margin: 20px 0px;
    text-indent: 2em;
  } */
}
// 编写容器的一些css，根据需要进行调整
.markdown-body {
  box-sizing: border-box;
  box-shadow: 2px 4px 6px gray;
  min-width: 200px;
  /* max-width: 980px; */
  /* padding: 45px; */
  max-width: 98%;
  margin-top: 10px;
  padding: 10px;
  padding-bottom: 50px;
  margin-bottom: 40px
}

//这个要配合移动端 不是很理解
@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>
