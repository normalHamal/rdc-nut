import '../common/plugins/index';

import './vue.entry';

import Layout from './layout';

export default {
    name: 'layout-kaola-advanced',

    type: 'layout',

    async apply(ctx) {
        let layout = null

        await ctx.api.layout.register({
            name: 'kaola-advanced',

            mount(node, {
                ctx
            }) {
                if (!layout) {
                    const sidebar = ctx.api.sidebar.get()

                    sidebar.forEach(s => s.open = s.active)

                    layout = new Layout()

                    layout.$on('logout', () => {
                        ctx.events.emit('layout:logout')
                    })
                }

                layout.$mount(node)
            },

            unmount(node) {
                if (!layout) {
                    return
                }

                layout.$destroy();
            },

            update(data = {}) {
                if (!layout) {
                    return
                }

                layout.ctx = data.ctx
                layout.$forceUpdate()
            },

            getMountNode() {
                return layout && layout.$refs.$$mount
            },
        })
    }
}