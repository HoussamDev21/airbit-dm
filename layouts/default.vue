<template>
	<el-container class="top-level-container">
		<el-header class="navbar">
			<div class="navbar__logo">
				<img class="navbar__logo__emblem" src="https://airbit.com/img/logo/emblem-white.svg">
				<img class="navbar__logo__typo" src="https://airbit.com/img/logo/typo-white.svg">
			</div>
			<el-dropdown @command="switchUser">
				<el-button icon="el-icon-user" size="small">
					{{ $auth().name }}
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<template v-for="user in users">
						<el-dropdown-item :key="user.id" :command="user">
							{{ user.name }}
						</el-dropdown-item>
					</template>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<el-container class="dm-container">
			<el-aside class="sidebar" width="30%">
				<div class="sidebar__search hidden-sm-and-down">
					<el-input 
						prefix-icon="el-icon-search"
						placeholder="Find people and conversations"
					></el-input>
					<el-button class="sidebar__search__plus-btn" circle size="small" type="primary" icon="el-icon-plus" />
				</div>
				<el-tabs value="recent" class="sidebar__tabs">
					<el-tab-pane label="Recent" name="recent">
						<recentConversations />
					</el-tab-pane>
					<el-tab-pane label="Unreads" name="unreads"></el-tab-pane>
					<el-tab-pane label="Groups" name="groups"></el-tab-pane>
				</el-tabs>
			</el-aside>
			<el-main class="current-conversation">
				<nuxt />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import recentConversations from '~/components/app/recentConversations'
import users from '~/data/users'

export default {
	components: {
		recentConversations
	},
	data() {
		return {
			users
		}
	},
	methods: {
		switchUser(user) {
			this.$cookies.set('userId', user.id)
			location = '/'
		}
	}
}
</script>

<style lang="scss">
html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}

.top-level-container {
    height: 100vh;
}

.dm-container {
	height: calc(100vh - 60px);
}

.navbar {
    background: #221E23;
	height: 64px;
	padding-right: 16px !important;
	padding-left: 16px !important;
	display: flex;
	justify-content: space-between;
	align-items: center;
	&__logo {
		height: 100%;
		padding-top: 16px;
		padding-bottom: 16px;
		&__emblem {
			height: 100%;
			margin-right: 16px;
		}
		&__typo {
			height: 100%;
		}
	}
}

.sidebar {
	background: #2B272C;
	&__search {
		padding: 16px;
		position: relative;
		&__plus-btn {
			position: absolute;
			right: 32px;
			bottom: 0px;
			box-shadow: 0 0 0px 6px #8F38B111;
		}
	}
	&__tabs {
		.el-tabs__nav-scroll {
			padding-right: 16px;
			padding-left: 16px;
		}
		.el-tabs__item {
			color: #797979;
		}
		.el-tabs__nav-wrap::after {
			background: #4F4D50;
			height: 1px;
		}
		.el-tabs__active-bar {
			height: 4px;
			border-top-left-radius: 99px;
			border-top-right-radius: 99px;
		}
	}
}

.current-conversation {
	padding: 0 !important;
	background: #130F14;
	color: white;
}
</style>
