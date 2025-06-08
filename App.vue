<style>
@import './static/styles/iconfont.css';

</style>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 直接跳转到登录页
			uni.reLaunch({
				url: '/pages/login/login'
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
