<template>
	<view class="school-detail-page">
		<view class="sticky-tabs">
			<view
				v-for="tab in tabs"
				:key="tab.key"
				class="tab-item"
				:class="{ active: activeTab === tab.key }"
				@click="activeTab = tab.key"
			>
				{{ tab.label }}
			</view>
		</view>

		<school-info-tab v-if="activeTab === 'schoolInfo'" :school="school"></school-info-tab>
		<recommended-papers-tab v-else-if="activeTab === 'papers'"></recommended-papers-tab>
	</view>
</template>

<script>
import SchoolInfoTab from './tabs/school-info-tab.vue'
import RecommendedPapersTab from './tabs/recommended-papers-tab.vue'

export default {
	components: {
		SchoolInfoTab,
		RecommendedPapersTab
	},
	data() {
		return {
			activeTab: 'schoolInfo',
			tabs: [
				{ key: 'schoolInfo', label: '学校详情' },
				{ key: 'papers', label: '推荐试题' }
			],
			school: {
				name: '实验中学',
				logo: '/static/uni.png',
				tags: ['省重点', '示范高中', '百强中学'],
				address: '北京市海淀区学院路 88 号',
				phone: '010-6666-8899',
				introHtml:
					'<div style="line-height:1.9;color:#4f5a76;font-size:14px;">' +
					'<p>实验中学创建于1952年，秉承“求真、笃学、创新、致远”的育人理念，形成了以学科竞赛、综合素养与生涯规划并重的人才培养体系。</p>' +
					'<p>学校拥有完善的智慧教学平台和教学资源库，在高考改革背景下构建了多元课程矩阵，覆盖强基计划、学科拓展与艺术体育融合课程。</p>' +
					'<p>近三年学校重点本科上线率持续提升，多个学科在市级教学质量评估中位居前列。</p>' +
					'</div>'
			}
		}
	},
	onLoad(options) {
		if (options.name) this.school.name = decodeURIComponent(options.name)
	}
}
</script>

<style>
.school-detail-page { min-height: 100vh; background: #f5f7fb; }
.sticky-tabs { position: sticky; top: 0; z-index: 20; display: flex; gap: 26rpx; padding: 18rpx 24rpx 12rpx; background: #f5f7fb; border-bottom: 1px solid #e9edf7; }
.tab-item { padding: 10rpx 2rpx; font-size: 27rpx; color: #6f7b96; position: relative; }
.tab-item.active { color: #1f2433; font-weight: 700; }
.tab-item.active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6rpx; margin: auto; width: 100%; height: 6rpx; border-radius: 999rpx; background: linear-gradient(135deg, #4f7bff, #3f67f3); }
</style>
