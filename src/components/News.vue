<template>
  <div class="app-container">
    <div class="new-container">
      <div class="title">{{this_new.title}}</div>
      <div class="ref">装载自  {{this_new.ref}}</div>
      <div class="context">{{this_new.context}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      this_new: {
        id: '',
        title: '',
        context: '',
        ref: ''
      }
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
      }
    }
  }
}
</script>

<style lang="scss">
.new-container {
  margin: 0px 6%;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0px;
  }

  .ref {
    font-size: 14px;
  }

  .context {
    font-size: 17px;
    margin: 20px 0px;
    text-indent: 2em;
  }
}
</style>
