<template>
    <div id="messageNot-selectDiv">

            <div class="selectDiv">
                <select id="stateSelect" name="stateSelect">
                    <option selected="selected">选择状态</option>
                    <option v-for="stateNum in stateNums" value="stateNum">{{ stateNum }}</option>
                </select>

            </div>
            <button id="freshButton" @click="freshMes">刷新</button>
    </div>
</template>

<script>
    export default {
        name: 'messageNot-selectDiv',
        data () {
            return {
                stateNums: [
                    '已读',
                    '未读',
                ]
            }
        },
        methods: {
            freshMes: function() {
                var stateSelect = document.getElementById("stateSelect");
                var index = stateSelect.selectedIndex;
                var value = stateSelect.options[index].value;

            }
        }
    }
</script>

<style lang="css">
    html{
        font-size: 16px;
    }
    #messageNot-selectDiv{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 4rem;
    }
    select{
        border: 0.1rem solid #d4d4d9;
        border-radius: 0.7rem;
        outline: none;
        padding: 0.3rem 0.5rem;
        margin: 0.1rem;
        font-size: 0.8rem;
    }/*修改选择框的样式*/

     .selectDiv{
        position: relative;
        text-align: left;
    }

    #freshButton{
        color: white;
        background-color: mediumseagreen;
        border: none;
        border-radius: 0.2rem;
        width: 5rem;
        height: 2rem;
        min-width: 5rem;
    }/*button的样式*/
    #freshButton:hover{
        cursor: pointer;
    }
    #freshButton:active{
        background-color: #00a539;
    }/*点击button时的样式*/

</style>
