<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar1></top-bar1>
    
    <see-signin-list-body></see-signin-list-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/tchSalary/seeSigninListPage/topBar1'
import seeSigninListBody from '../../../../components/eduAdmin/tchSalary/seeSigninListPage/seeSigninListBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar1, seeSigninListBody
  },
  methods: {
   
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
