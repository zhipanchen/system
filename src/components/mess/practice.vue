<template>
    <div id="example-1">
        <button @click="counter += 1">增加 1</button>
        <p>这个按钮被点击了 {{ counter }} 次。</p>
    </div>
</template>

<script>
    export default {
        el: '#example-1',
        data: {
            counter: 0
        }

    }
</script>

<style lang="css">
    #example-1{

    }
</style>
