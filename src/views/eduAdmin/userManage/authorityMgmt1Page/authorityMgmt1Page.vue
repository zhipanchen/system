<template>
	<div id="authorityMgmt1">
		<top-title></top-title>
   	<top-bar1></top-bar1>
    <!-- <div id="main">
      <div class="lPart">
        <roles></roles>
      </div>
      <div class="rPart">
        <personal-authorities></personal-authorities>
      </div>
    </div> -->
    <role-manage></role-manage>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/topBar1'
import roleManage from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/roleManage'

export default {
	name: 'authorityMgmt1',
	components: {
    	topTitle, topBar1, roleManage
  	}
}
</script>

<style>
#main {
  /*width: 80%;*/
  margin: 2.7rem 5rem;
  display: flex;
  justify-content: center;
}
.lPart, .rPart {
  margin: 0 3rem;
}

</style>
