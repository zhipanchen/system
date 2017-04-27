<template>
	<div id="tchGrdInput">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<tch-grd-put-body></tch-grd-put-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchGradesInputPage/topBar2'
import tchGrdPutBody from '../../../components/teacher/tchGradesInputPage/tchGrdPutBody'

export default {
	name: 'tchGrdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar, tchGrdPutBody
	},
	methods: {

	}
}
</script>

<style>
.leftPart {
	margin: 0 5rem;
	float: left;
}
.rightPart {
	margin: 0 5rem;
	float: right;
}

</style>