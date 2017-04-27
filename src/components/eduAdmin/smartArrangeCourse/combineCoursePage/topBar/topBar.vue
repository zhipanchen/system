<template>
    <div id="combineCourse_topBar" class="topBarDiv am-btn-group">
        <button id="topBarButton" class="am-btn am-btn-success btn-active">合课设置</button>
    </div>
</template>

<script>
    export default {
        name: 'combineCourse_topBar',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    html {
    }
    #topBarButton{
      margin-left: 5rem;
    }
    @media screen and (max-width: 1023px) {
        html {
        }
    }
</style>
