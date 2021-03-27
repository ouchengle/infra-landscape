import SvgIcon from './SvgIcon'
import Vue from 'vue'

Vue.component('svg-icon', SvgIcon)

// 解析svg格式文件代码
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext =>requireContext.keys().map(requireContext);
requireAll(req);