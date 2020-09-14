export default {
  state: {
    isCollapse: false,
    menu: [],
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        label: '首页',
        name: 'home',
        icon: 'home'
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      //val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      if (val.name !== 'home') {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      } else {
        state.currentMenu = null
      }
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
